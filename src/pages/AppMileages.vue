<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {onMounted} from 'vue';
import MileageList from '~/components/MileageList.vue';
import Centered from '~/layouts/Centered.vue';
import {closeModal, openModal} from '~/services/modal';
import {insertOneMileage, getAllMileages, mileages} from '~/state/mileage';

onMounted(async () => {
  await pipe(
    getAllMileages()
  )();
});

function addMileage(): void {
  openModal(
    () => import('~/components/MileageForm.vue'),
    {},
    {
      cancel: (): void => closeModal(),
      save: async (data: FormData): Promise<void> => {
        await pipe(
          insertOneMileage(data),
          TE.matchW(
            (e) => {
              // todo: display error to the user.
              console.error(e);
            },
            () => closeModal()
          )
        )();
      }
    });
}
</script>

<template>
  <Centered>
    <div class="row">
      <div class="w-100 my-3" />

      <div class="col">
        <div class="row justify-content-between">
          <div class="col">
            <h1>Kilometers</h1>
            <p>...</p>
          </div>

          <div class="col-auto my-auto">
            <button
              class="btn btn-primary"
              @click="addMileage"
            >
              Nieuw
            </button>
          </div>
        </div>
      </div>

      <div class="w-100 my-3" />

      <div class="col">
        <MileageList :mileages="mileages" />
      </div>
    </div>
  </Centered>
</template>
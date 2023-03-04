<template>
  <Centered>
    <div class="row">
      <div class="w-100 my-3" />

      <div class="col">
        <div class="row justify-content-between">
          <div class="col">
            <h1>Kilometers</h1>
            <p>Noteer hier de kilometerstanden van jouw motoren.</p>
          </div>

          <div class="col-auto my-auto">
            <button
              class="btn btn-primary"
              @click="addMileage"
            >
              <i class="bi bi-plus" />
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

<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {defineAsyncComponent, onMounted} from 'vue';
import MileageList from '~/components/MileageList.vue';
import Centered from '~/layouts/Centered.vue';
import {closePopUp, openModal} from '~/services/pop-up';
import {getAllMileages, insertOneMileage, mileages} from '~/state/mileage';

onMounted(async () => {
  await pipe(
    getAllMileages()
  )();
});

function addMileage(): void {
  openModal({
    slot: defineAsyncComponent(() => import('~/components/MileageForm.vue')),
    emits: {
      cancel: (): void => {
        closePopUp();
      },
      save: async (data: FormData): Promise<void> => {
        await pipe(
          insertOneMileage(data),
          TE.matchW(
            (e) => {
              console.error(e);
            },
            () => {
              closePopUp();
            }
          )
        )();
      }
    }
  });
}
</script>

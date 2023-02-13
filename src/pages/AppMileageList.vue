<script setup lang="ts">
import * as TE from 'fp-ts/lib/TaskEither';
import {pipe} from 'fp-ts/lib/function';
import {onMounted} from 'vue';
import MileageList from '~/components/MileageList.vue';
import Centered from '~/layouts/Centered.vue';
import {closeModal, openModal} from '~/services/modal';
import {addOne, getAll, mileages} from '~/state/mileage';

onMounted(async () => {
  await pipe(
    getAll(),
  )();
});

/**
 * Add a new mileage.
 */
function addMileage(): void {
  openModal(
    () => import('~/components/MileageForm.vue'),
    {},
    {
      /**
       * Close the modal on cancel.
       */
      cancel: (): void => closeModal(),
      /**
       * Add the vehicle on save.
       */
      save: async (data: FormData): Promise<void> => {
        await pipe(
          addOne(data, ''),
          TE.match(
            (e) => {
              // todo: display error to the user.
              console.error(e);
            },
            () => {
              // The vehicle was added sucessfully.
              closeModal();
            },
          ),
        )();
      }
    });
}
</script>

<template>
  <Centered>
    <div class="row">
      <div class="w-100 my-3"></div>

      <div class="col">
        <div class="row justify-content-between">
          <div class="col">
            <h1>Kilometers</h1>
            <p>...</p>
          </div>

          <div class="col-auto my-auto">
            <button class="btn btn-primary" @click="addMileage">
              Nieuwe registratie
            </button>
          </div>
        </div>

      </div>

      <div class="w-100 my-3"></div>

      <div class="col">
        <MileageList :mileages="mileages" />
      </div>
    </div>
  </Centered>
</template>
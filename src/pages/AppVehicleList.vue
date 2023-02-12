<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {onMounted} from 'vue';
import VehicleList from '~/components/VehicleList.vue';
import Centered from '~/layouts/Centered.vue';
import {closeModal, openModal} from '~/services/modal';
import {addOne, getAll, vehicles} from '~/state/vehicle';

onMounted(async () => {
  await pipe(
    getAll(),
  )();
});

/**
 * Add a new vehicle.
 */
function addVehicle(): void {
  openModal(
    () => import('~/components/VehicleForm.vue'),
    {},
    {
      /**
       * Close the modal on cancel.
       */
      cancel: (): void => closeModal(),
      /**
       * Save to the database.
       */
      save: async (data: FormData): Promise<void> => {
        await pipe(
          addOne(data),
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
            <h1>Voertuigen</h1>
            <p>Een overzicht van al jouw voertuigen.</p>
          </div>

          <div class="col-auto my-auto">
            <button class="btn btn-primary" @click="addVehicle">
              Nieuw voertuig
            </button>
          </div>
        </div>
      </div>

      <div class="w-100 my-3"></div>

      <div class="col">
        <VehicleList :vehicles="vehicles" />
      </div>
    </div>
  </Centered>
</template>
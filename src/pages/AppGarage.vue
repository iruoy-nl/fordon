<template>
  <Centered>
    <div class="row">
      <div class="w-100 my-3" />

      <div class="col">
        <div class="row justify-content-between">
          <div class="col">
            <h1>Garage</h1>
            <p>Een overzicht van al jouw motoren.</p>
          </div>

          <div class="col-auto my-auto">
            <button
              class="btn btn-primary"
              @click="addVehicle"
            >
              Motor toevoegen
            </button>
          </div>
        </div>
      </div>

      <div class="w-100 my-3" />

      <div class="col">
        <VehicleList :vehicles="vehicles" />
      </div>
    </div>
  </Centered>
</template>

<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {defineAsyncComponent, onMounted} from 'vue';
import VehicleList from '~/components/VehicleList.vue';
import Centered from '~/layouts/Centered.vue';
import {closePopUp, openModal} from '~/services/pop-up';
import {getAllVehicles, insertOneVehicle, vehicles} from '~/state/vehicle';

onMounted(async () => {
  await pipe(
    getAllVehicles()
  )();
});

function addVehicle(): void {
  openModal({
    slot: defineAsyncComponent(() => import('~/components/VehicleForm.vue')),
    emits: {
      cancel: (): void => {
        closePopUp();
      },
      save: async (data: FormData): Promise<void> => {
        await pipe(
          insertOneVehicle(data),
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

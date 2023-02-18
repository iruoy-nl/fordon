<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {onMounted} from 'vue';
import VehicleList from '~/components/VehicleList.vue';
import Centered from '~/layouts/Centered.vue';
import {closeModal, openModal} from '~/services/modal';
import {insertOneVehicle, getAllVehicles, vehicles} from '~/state/vehicle';

onMounted(async () => {
  await pipe(
    getAllVehicles(),
  )();
});

function addVehicle(): void {
  openModal(
    () => import('~/components/VehicleForm.vue'),
    {},
    {
      cancel: (): void => closeModal(),
      save: async (data: FormData): Promise<void> => {
        await pipe(
          addVehicle(data),
          TE.matchW(
            (e) => {
              // todo: display error to the user.
              console.error(e);
            },
            () => closeModal()
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
            <p>...</p>
          </div>

          <div class="col-auto my-auto">
            <button class="btn btn-primary" @click="addVehicle">
              Nieuw
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
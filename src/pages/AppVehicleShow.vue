<script setup lang="ts">
import * as A from 'fp-ts/lib/Array';
import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import {computed, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import Centered from '~/layouts/Centered.vue';
import {closeModal, openModal} from '~/services/modal';
import {updateVehicleById, getVehicleById, deleteVehicleById, vehicles} from '~/state/vehicle';
import {Vehicle} from '~/types';

const {currentRoute, push} = useRouter();

const id = computed(() => {
  return pipe(currentRoute.value.params.id, String);
});

const vehicle = computed(() => {
  return pipe(
    vehicles.value,
    A.findFirst((a) => a.id === id.value)
  );
});

onMounted(async () => {
  await pipe(
    getVehicleById(id.value)
  )();
});

function editVehicle(
  vehicle: O.Option<Vehicle>,
): void {
  if (O.isNone(vehicle)) return;

  openModal(
    () => import('~/components/VehicleForm.vue'),
    {
      defaultValue: vehicle.value,
    },
    {
      cancel: (): void => closeModal(),
      save: async (data: FormData): Promise<void> => {
        await pipe(
          updateVehicleById(vehicle.value.id, data),
          TE.match(
            (e) => {
              // todo: display error to the user.
              console.error(e);
            },
            () => closeModal()
          ),
        )();
      }
    }
  );
}

function removeVehicle(
  vehicle: O.Option<Vehicle>,
): void {
  if (O.isNone(vehicle)) return;

  openModal(
    () => import('~/components/ModalConfirm.vue'),
    {
      title: 'Weet je het zeker?',
      body: `
        Als je het voertuig ${vehicle.value.model} verwijdert worden ook alle
        bijbehorende kilometers verwijderd.
      `,
    },
    {
      cancel: (): void => closeModal(),
      confirm: async (): Promise<void> => {
        await pipe(
          deleteVehicleById(vehicle.value.id),
          TE.match(
            (e) => {
              // todo: display error to the user.
              console.error(e);
            },
            () => {
              closeModal();
              push({name: 'vehicle-list'});
            },
          ),
        )();
      },
    }
  );
}
</script>

<template>
  <Centered :columns="4">
    <template v-if="O.isNone(vehicle)">
      ...
    </template>

    <template v-else>
      <div class="row pt-5">
        <div class="col">
          <h1>{{ vehicle.value.model }}</h1>
        </div>

        <div class="w-100 my-2"></div>

        <div class="col">
          <img :src="vehicle.value.photoUrl" class="w-100 rounded">
        </div>

        <div class="w-100 my-2"></div>

        <div class="col">
          <div class="row">
            <div class="col-auto">
              <button class="btn btn-primary" @click="editVehicle(vehicle)">Wijzigen</button>
            </div>

            <div class="col-auto">
              <button class="btn btn-danger" @click="removeVehicle(vehicle)">Verwijderen</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Centered>
</template>
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

        <div class="w-100 my-2" />

        <div class="col">
          <img
            :src="vehicle.value.photoUrl"
            class="w-100 rounded"
          >
        </div>

        <div class="w-100 my-2" />

        <div class="col">
          <div class="row">
            <div class="col-auto">
              <button
                class="btn btn-primary"
                @click="editVehicle(vehicle)"
              >
                Wijzigen
              </button>
            </div>

            <div class="col-auto">
              <button
                class="btn btn-danger"
                @click="removeVehicle(vehicle)"
              >
                Verwijderen
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Centered>
</template>

<script setup lang="ts">
import * as A from 'fp-ts/lib/Array';
import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import {computed, defineAsyncComponent, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import Centered from '~/layouts/Centered.vue';
import {closePopUp, openModal} from '~/services/pop-up';
import {deleteVehicleById, getVehicleById, updateVehicleById, vehicles} from '~/state/vehicle';
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
  vehicle: O.Option<Vehicle>
): void {
  if (O.isNone(vehicle)) return;

  openModal({
    slot: defineAsyncComponent(() => import('~/components/VehicleForm.vue')),
    props: {
      defaultValue: vehicle.value
    },
    emits: {
      cancel: (): void => {
        closePopUp();
      },
      save: async (data: FormData): Promise<void> => {
        await pipe(
          updateVehicleById(vehicle.value.id, data),
          TE.match(
            (e) => {
              console.error(e);
            },
            () => {
              closePopUp()
            }
          )
        )();
      }
    }
  });
}

function removeVehicle(
  vehicle: O.Option<Vehicle>
): void {
  if (O.isNone(vehicle)) return;

  openModal({
    slot: defineAsyncComponent(() => import('~/components/PopUpModalConfirm.vue')),
    props: {
      title: 'Let op!',
      body: `
        Weet je zeker dat je ${vehicle.value.model} wilt verwijderen? Alle
        bijbehorende kilometers en onderdelen zullen ook verwijderd worden.
      `
    },
    emits: {
      cancel: (): void => {
        closePopUp();
      },
      confirm: async (): Promise<void> => {
        await pipe(
          deleteVehicleById(vehicle.value.id),
          TE.match(
            (e) => {
              console.error(e);
            },
            () => {
              closePopUp();
              push({name: 'garage'});
            }
          )
        )();
      }
    }
  });
}
</script>

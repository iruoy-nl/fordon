<script setup lang="ts">
import * as A from 'fp-ts/lib/Array';
import {constUndefined, pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import {computed, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import Centered from '~/layouts/Centered.vue';
import {closeModal, openModal} from '~/services/modal';
import {editById, getById, vehicles} from '~/state/vehicle';

const {currentRoute} = useRouter();

/**
 * The id of the selected vehicle.
 */
const id = computed(() => {
  return pipe(currentRoute.value.params.id, String);
});

/**
 * The selected vehicle.
 */
const vehicle = computed(() => {
  return pipe(
    vehicles.value,
    A.findFirst((a) => a.id === id.value)
  );
});

onMounted(async () => {
  await pipe(
    getById(id.value)
  )();
});

/**
 * Edit an existing vehicle.
 */
function editVehicle(): void {
  openModal(
    () => import('~/components/VehicleForm.vue'),
    {
      vehicle: pipe(
        vehicle.value,
        O.matchW(constUndefined, (a) => a)
      ),
    },
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
          editById(id.value, data),
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
  <Centered :columns="4">
    <template v-if="O.isNone(vehicle)">
      ...
    </template>

    <template v-else>
      <div class="row pt-5">
        <div class="col">
          <h1>{{vehicle.value.model}}</h1>
        </div>

        <div class="w-100 my-2"></div>

        <div class="col">
          <img :src="vehicle.value.photoUrl" class="w-100 rounded">
        </div>

        <div class="w-100 my-2"></div>

        <div class="col-auto">
          <button class="btn btn-primary" @click="editVehicle">Wijzigen</button>
        </div>
      </div>
    </template>
  </Centered>
</template>
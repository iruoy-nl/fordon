<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {useRouter} from 'vue-router';
import VehicleForm from '~/components/VehicleForm.vue';
import Centered from '~/layouts/Centered.vue';
import {addOne} from '~/state/vehicle';

const {push} = useRouter();

async function onSave(
  data: FormData,
): Promise<void> {
  await pipe(
    addOne(data),
    TE.match(
      (e) => {
        // todo: display error to the user.
        console.error(e);
      },
      () => {
        // The vehicle was added sucessfully.
        push({name: 'vehicle-list'});
      },
    ),
  )();
}
</script>

<template>
  <Centered :columns="4">
    <div class="row mt-5">
      <div class="col">
        <h1>Nieuw voertuig</h1>
      </div>

      <div class="w-100 my-2"></div>

      <div class="col">
        <VehicleForm @save="onSave" @cancel="push({name: 'vehicle-list'})" />
      </div>
    </div>
  </Centered>
</template>
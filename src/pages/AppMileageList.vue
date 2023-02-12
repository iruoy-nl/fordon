<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import {onMounted} from 'vue';
import MileageList from '~/components/MileageList.vue';
import Centered from '~/layouts/Centered.vue';
import {getAll, mileages} from '~/state/mileage';

onMounted(async () => {
  await pipe(
    getAll(),
  )();
});
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
            <button class="btn btn-primary">
              Kilometers registeren
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
<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import {onMounted} from 'vue';
import VehicleList from '~/components/VehicleList.vue';
import Centered from '~/layouts/Centered.vue';
import {getAll, vehicles} from '~/state/vehicle';

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
            <h1>Voertuigen</h1>
            <p>Een overzicht van al jouw voertuigen.</p>
          </div>

          <div class="col-auto my-auto">
            <router-link class="btn btn-primary" :to="{name: 'vehicle-add'}">
              Nieuw voertuig
            </router-link>
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
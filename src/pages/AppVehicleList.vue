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
        <div class="row g-2">
          <template v-for="vehicle of vehicles">
            <div class="col-4">
              <div class="card">
                <img :src="vehicle.photoUrl || ''" class="card-img-top" :alt="`Photo of ${vehicle.model}`">

                <div class="card-body">
                  <router-link class="btn btn-link p-0" :to="{name: 'vehicle-show', params: {id: vehicle.id}}">
                    {{vehicle.model}}
                  </router-link>

                  <p class="card-text">
                    32.483km
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Centered>
</template>

<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import {onMounted} from 'vue';
import Centered from '~/layouts/Centered.vue';
import {listVehicles, vehicles} from '~/state/vehicles';

onMounted(async () => {
  await pipe(
    listVehicles(),
  )();
});
</script>

<style scoped lang="scss">
.card img {
  height: 10rem;
  object-fit: cover;

  // Fallback
  background: $light;
}
</style>
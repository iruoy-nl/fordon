<script setup lang="ts">
import {Vehicle} from '~/types';

defineProps<{
  vehicles: Vehicle[];
}>();
</script>

<template>
  <div class="row g-2">
    <template v-for="vehicle of vehicles">
      <div class="col-4">
        <div class="card">
          <img :src="vehicle.photoUrl" class="card-img-top">

          <div class="card-body">
            <router-link class="btn btn-link p-0" :to="{name: 'garage-show', params: {id: vehicle.id}}">
              {{ vehicle.model }}
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
img {
  height: 12rem;
  background: $light;
}
</style>
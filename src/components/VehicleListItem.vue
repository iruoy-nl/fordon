<script setup lang="ts">
import {Vehicle} from "~/types";

defineProps<{
  vehicle: Vehicle;
}>();
</script>

<template>
  <div class="card">
    <template v-if="vehicle.photoUrl !== null">
      <img class="card-img-top" :src="vehicle.photoUrl" alt="photo" />
    </template>

    <div class="card-body">
      <router-link class="text-primary text-decoration-none"
        :to="{name: 'garage-details', params: {id: vehicle.id}}">
        {{vehicle.model}}
      </router-link>

      <p class="card-text">31.583 km</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  height: 12rem;
  object-fit: cover;
}
</style>

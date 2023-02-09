<script setup lang="ts">
import {Vehicle} from '~/types';

type Props = {
  vehicles: Vehicle[];
};

defineProps<Props>();
</script>

<template>
  <div class="row g-2">
    <template v-for="vehicle of vehicles">
      <div class="col-4">
        <div class="card">
          <template v-if="vehicle.photoUrl">
            <img :src="vehicle.photoUrl" class="card-img-top">
          </template>
          <template v-else>
            <img src="..." class="card-img-top">
          </template>

          <div class="card-body">
            <router-link class="btn btn-link p-0" :to="{name: 'vehicle-show', params: {id: vehicle.id}}">
              {{vehicle.model}}
            </router-link>

            <p class="card-text">
              ...
            </p>
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
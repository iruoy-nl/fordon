<script setup lang="ts">
import {Part} from '~/types';

defineProps<{
  parts: Part[];
}>();
</script>

<template>
  <div class="row g-2">
    <template v-for="part of parts">
      <div class="col-3">
        <div class="card">
          <div class="card-body">
            <a :href="part.url" target="_blank" class="btn btn-link p-0">
              {{ part.title }}
            </a>

            <p class="card-text mt-2">
              <img :src="part.vehicle.photoUrl" style="height: 24px; width: 24px;" class="rounded">
              {{ part.vehicle.model }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import VehicleListItem from "~/components/VehicleListItem.vue";
import { Vehicle } from "~/types";

defineProps<{
  vehicles: Vehicle[];
}>();
</script>

<template>
  <div class="row">
    <template v-for="vehicle in vehicles">
      <div class="col-3">
        <VehicleListItem :vehicle="vehicle" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>

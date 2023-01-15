<script setup lang="ts">
import * as E from "fp-ts/lib/Either";
import { onMounted } from "vue";
import VehicleList from "~/components/VehicleList.vue";
import { addNotification } from "~/state/notifications";
import { getVehicles, vehicles } from "~/state/vehicles";

onMounted(async () => {
  const task = await getVehicles();

  if (E.isLeft(task)) {
    addNotification({
      type: "danger",
      message: task.left.message,
    });
  }
});
</script>

<template>
  <div class="container-fluid py-3">
    <div class="row">
      <div class="col">
        <h1>Garage</h1>
        <p>Een overzicht van alle voertuigen in jouw garage.</p>
      </div>
    </div>

    <div class="w-100 my-4">
      <VehicleList :vehicles="vehicles" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

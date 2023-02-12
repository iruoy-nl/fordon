<script setup lang="ts">
import type {Mileage} from '~/types';

defineProps<{
  mileages: Mileage[],
}>();
</script>

<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">Kilometerstand</th>
          <th scope="col">Datum</th>
          <th scope="col">Voertuig</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="mileage in mileages" :key="mileage.id">
          <tr>
            <td>{{mileage.mileage}}</td>
            <td>{{mileage.date}}</td>
            <td>{{mileage.vehicle.model}}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
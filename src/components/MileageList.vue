<script setup lang="ts">
import {parseAndFormat} from '~/services/date';
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
          <th class="w-25">Kilometers</th>
          <th class="w-50">Voertuig</th>
          <th class="w-25">Datum</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="mileage in mileages" :key="mileage.id">
          <tr role="button">
            <td>
              <span>{{mileage.mileage}}</span>
              <small>km</small>
            </td>
            <td>
              <img :src="mileage.vehicle.photoUrl" style="height: 24px; width: 24px;" class="rounded">
              {{mileage.vehicle.model}}
            </td>
            <td>
              {{parseAndFormat(mileage.date)}}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<template>
  <Centered>
    <div class="row">
      <div class="w-100 my-3"></div>

      <div class="col">
        <h1>Voertuigen</h1>
        <p>Een overzicht van al jouw voertuigen.</p>
      </div>

      <div class="w-100 my-3"></div>

      <div class="col">
        <pre>{{vehicles}}</pre>
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

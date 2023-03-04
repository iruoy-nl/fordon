<template>
  <Centered>
    <div class="row">
      <div class="w-100 my-3" />

      <div class="col">
        <div class="row justify-content-between">
          <div class="col">
            <h1>Onderhoud</h1>
            <p>Op deze pagina kun je onderhoudslijsten van jouw motoren beheren.</p>
          </div>

          <div class="col-auto my-auto">
            <button
              class="btn btn-primary"
            >
              <i class="bi bi-plus" />
              Nieuw
            </button>
          </div>
        </div>
      </div>

      <div class="w-100 my-3" />

      <div class="col">
        <ServiceList :services="services" />
      </div>
    </div>
  </Centered>
</template>

<script setup lang="ts">
import Centered from '~/layouts/Centered.vue';
import * as TE from 'fp-ts/lib/TaskEither';
import ServiceList from '~/components/ServiceList.vue';
import {services, getAllServices} from '~/state/service';
import {onMounted} from 'vue';
import {constVoid, pipe} from 'fp-ts/lib/function';

onMounted(async () => {
  await pipe(
    getAllServices(),
    TE.match(
      (e) => {
        console.error(e);
      },
      constVoid
    )
  )(
  );
});
</script>
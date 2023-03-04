<template>
  <Centered>
    <div class="row">
      <div class="w-100 my-3" />

      <div class="col">
        <div class="row justify-content-between">
          <div class="col">
            <h1>Historie</h1>
            <p>Hier kun je inzien welk onderhoud je hebt uitgevoerd in het verleden.</p>
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
        <!--  -->
      </div>
    </div>
  </Centered>
</template>

<script setup lang="ts">
import Centered from '~/layouts/Centered.vue';
</script>
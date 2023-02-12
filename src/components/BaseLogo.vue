<template>
  <h5 class="text-primary">
    <i class="bi bi-circle-fill align-middle" style="font-size: 0.5rem"></i>
    {{name}}
  </h5>
</template>

<script setup lang="ts">
import {ref} from "vue";

/**
 * The name of the application.
 */
const name = ref("Fordon");
</script>
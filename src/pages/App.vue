<script setup lang="ts">
import { user } from "~/state/user";
</script>

<template>
  <div class="container py-4">
    <div class="row">
      <div class="col">
        <pre>{{ user }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

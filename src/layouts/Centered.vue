<script setup lang="ts">
withDefaults(
  defineProps<{
    columns?: number;
  }>(),
  {
    columns: () => 8
  }
);
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div :class="`col col-${columns}`">
        <slot />
      </div>
    </div>
  </div>
</template>

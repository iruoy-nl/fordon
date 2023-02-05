<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div :class="`col col-${columns}`">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /**
   * The width of the content in bootstrap columns.
   */
  columns?: number;
}

withDefaults(
  defineProps<Props>(),
  {columns: () => 8},
);
</script>

<script setup lang="ts">
defineEmits<{
  /**
   * Indicate that the modal should be closed.
   */
  (event: 'close', value: never): void;
}>();
</script>

<template>
  <div class="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>

  <div class="modal-backdrop show" @click="$emit('close')"></div>
</template>

<style scoped lang="scss">
.modal {
  display: block;
  pointer-events: none;
}
</style>
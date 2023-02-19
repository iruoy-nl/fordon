<script setup lang="ts">
defineEmits<{
  (event: 'close', value: never): void;
}>();
</script>

<template>
  <div class="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-4">
        <slot />
      </div>
    </div>
  </div>

  <div
    class="modal-backdrop show"
    @click="$emit('close')"
  />
</template>

<style scoped lang="scss">
.modal {
  display: block;
  pointer-events: none;
}
</style>
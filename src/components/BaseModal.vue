<script setup lang="ts">
defineProps<{
  /**
   * Whether the model is visible.
   */
  modelValue: boolean;
}>();

defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
  <template v-if="modelValue">
    <div class="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </template>

  <template v-if="modelValue">
    <div class="modal-backdrop show" @click="$emit('update:modelValue', false)"></div>
  </template>
</template>

<style scoped lang="scss">
.modal {
  display: block;
  pointer-events: none;
}
</style>
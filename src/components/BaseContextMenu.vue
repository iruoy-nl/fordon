<script setup lang="ts">
import {ContextMenuPosition} from '~/types';
import {computed, ref} from 'vue';
import {onClickOutside} from '@vueuse/core';

const props = defineProps<{
  position: ContextMenuPosition;
}>();

const emits = defineEmits<{
  (event: 'close'): void;
}>();

const contextMenuRef = ref(null);

onClickOutside(contextMenuRef, () => {
  emits('close');
});

const style = computed(() => {
  return {
    top: `${props.position.y}px`,
    left: `${props.position.x}px`
  };
});
</script>

<template>
  <div
    ref="contextMenuRef"
    class="context-menu position-absolute rounded bg-white shadow-sm p-1 border"
    :style="style"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.context-menu {
  z-index: 16;
  max-width: 12rem;
}
</style>

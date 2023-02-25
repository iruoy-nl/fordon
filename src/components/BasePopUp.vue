<script setup lang="ts">
import {onClickOutside} from '@vueuse/core';
import {computed, ref} from 'vue';
import {PopUp} from '~/types';

const props = defineProps<{
  popUp: PopUp;
}>();

const emits = defineEmits<{
  (event: 'close', value: null): void;
}>();

const popUpRef = ref(null);

onClickOutside(popUpRef, () => emits('close', null));

const style = computed(() => {
  if (props.popUp._tag !== 'menu') return {};

  return {
    top: `${props.popUp.position.y}px`,
    left: `${props.popUp.position.x}px`
  };
});
</script>

<template>
  <template v-if="popUp._tag === 'menu'">
    <div
      id="menu"
      ref="popUpRef"
      class="rounded bg-white shadow-sm p-1 border"
      :style="style"
    >
      <slot />
    </div>
  </template>

  <template v-if="popUp._tag === 'modal'">
    <div
      id="modal"
      class="modal"
    >
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
</template>

<style scoped lang="scss">
#menu {
  position: absolute;
  z-index: 16;
  
  max-width: 12rem;
}

#modal {
  display: block;
  pointer-events: none;
}
</style>
<script setup lang="ts">
export type BasePopUpMenuOption = {
  label: string;
  icon: string;
  onClick: () => void;
};

defineProps<{
  options: BasePopUpMenuOption[];
}>();

defineEmits<{
  (event: 'close', value: never): void;
}>();
</script>

<template>
  <div
    class="row g-0"
    @click="$emit('close')"
  >
    <template
      v-for="(option, i) in options"
      :key="i"
    >
      <div class="col">
        <button
          class="btn text-start"
          @click="option.onClick"
        >
          <i :class="`bi bi-${option.icon}`" />
          {{ option.label }}
        </button>
      </div>

      <div class="w-100" />
    </template>
  </div>
</template>
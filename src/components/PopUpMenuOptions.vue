<template>
  <div
    class="row g-0"
    @click="$emit('close')"
  >
    <div class="col">
      <button
        class="btn text-start"
        @click="onEdit"
      >
        <i class="bi bi-pen" />
        Wijzigen
      </button>
    </div>

    <div class="w-100" />

    <div class="col">
      <button
        class="btn text-start text-danger"
        @click="onDelete"
      >
        <i class="bi bi-trash" />
        Verwijderen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  onEdit: () => void,
  onDelete: () => void,
}>();

defineEmits<{
  (event: 'close', value: never): void;
}>();
</script>

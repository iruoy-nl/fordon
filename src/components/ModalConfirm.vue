<script setup lang="ts">
defineProps<{
  /**
   * The title of the modal.
   */
  title: string;
  /**
   * The body of the modal.
   */
  body: string;
}>();

defineEmits<{
  /**
   * Indicate that the user has confirmed.
   */
  (event: 'confirm', data: never): void;
  /**
   * Indicate that the user has canceled.
   */
  (event: 'cancel', data: never): void;
}>();
</script>

<template>
  <div class="row">
    <div class="col mb-3">
      <h1>{{title}}</h1>
    </div>

    <div class="w-100"></div>

    <div class="col mb-3">
      <p>{{body}}</p>
    </div>

    <div class="w-100 my-2"></div>

    <div class="col">
      <div class="row justify-content-end">
        <div class="col-auto">
          <button class="btn" @click="$emit('cancel')">Annuleren</button>
        </div>
        <div class="col-auto">
          <button class="btn btn-danger" @click="$emit('confirm')">Bevestigen</button>
        </div>
      </div>
    </div>
  </div>
</template>
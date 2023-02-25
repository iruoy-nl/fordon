<template>
  <BaseForm
    @save="a => $emit('save', a)"
    @cancel="$emit('cancel')"
  >
    <div class="row">
      <div class="col mb-3">
        <h1>
          {{ defaultValue ? `Motor wijzigen` : 'Nieuwe motor' }}
        </h1>
      </div>

      <div class="w-100" />

      <div class="col mb-3">
        <BaseFormInput
          type="text"
          name="model"
          :default-value="defaultValue?.model"
          :validator="parseModel"
          placeholder="Suziki Gs500e"
        >
          Model*
        </BaseFormInput>
      </div>

      <div class="w-100" />

      <div class="col mb-3">
        <BaseFormInput
          type="file"
          name="photo"
          :validator="parsePhoto"
        >
          Foto*
        </BaseFormInput>
      </div>

      <div class="w-100" />

      <div class="col mb-3">
        <BaseFormInput
          type="text"
          name="licensePlate"
          :default-value="defaultValue?.licensePlate"
          placeholder="MR-25-ZB"
        >
          Kenteken
        </BaseFormInput>
      </div>

      <div class="w-100 my-2" />

      <div class="col">
        <div class="row justify-content-end">
          <div class="col-auto">
            <button
              class="btn"
              type="reset"
            >
              Annuleren
            </button>
          </div>

          <div class="col-auto">
            <button
              class="btn btn-primary"
              type="submit"
            >
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </div>
  </BaseForm>
</template>

<script setup lang="ts">
import {string} from 'zod';
import type {Vehicle} from '~/types';
import BaseForm from './BaseForm.vue';
import BaseFormInput from './BaseFormInput.vue';

defineProps<{
  defaultValue?: Vehicle;
}>();

defineEmits<{
  (event: 'save', value: FormData): void;
  (event: 'cancel', value: never): void;
}>();

const parseModel = string({required_error: 'Het model is verplicht'})
  .min(1, {message: 'Het model is verplicht'});

const parsePhoto = string({required_error: 'De foto is verplicht'})
  .min(1, {message: 'De foto is verplicht'});
</script>

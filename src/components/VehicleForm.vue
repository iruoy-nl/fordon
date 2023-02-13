<script setup lang="ts">
import {makeString} from '~/services/form';
import type {Vehicle} from '~/types';
import BaseForm from './BaseForm.vue';
import BaseFormInput from './BaseFormInput.vue';

defineProps<{
  vehicle?: Vehicle;
}>();

defineEmits<{
  (event: 'save', value: FormData): void;
  (event: 'cancel', value: never): void;
}>();

const model = makeString('Het model is verplicht.');
const photo = makeString('De foto is verplicht.');
</script>

<template>
  <BaseForm @save="a => $emit('save', a)" @cancel="$emit('cancel')">
    <div class="row">
      <div class="col mb-3">
        <h1>
          {{vehicle? 'Wijzig': 'Nieuw'}} voertuig
        </h1>
      </div>

      <div class="w-100"></div>

      <div class="col mb-3">
        <BaseFormInput type="text" name="model" :value="vehicle?.model" :validator="model" placeholder="Suzuki Gs500e">
          Model
        </BaseFormInput>
      </div>

      <div class="w-100"></div>

      <div class="col mb-3">
        <BaseFormInput type="file" name="photo" :value="null" :validator="photo">
          Foto
        </BaseFormInput>
      </div>

      <div class="w-100 my-2"></div>

      <div class="col">
        <div class="row justify-content-end">
          <div class="col-auto">
            <button class="btn" type="reset">
              Annuleren
            </button>
          </div>

          <div class="col-auto">
            <button class="btn btn-primary" type="submit">
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </div>
  </BaseForm>
</template>
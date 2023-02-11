<script setup lang="ts">
import BaseForm from '~/components/BaseForm.vue';
import BaseFormInput from '~/components/BaseFormInput.vue';
import Centered from '~/layouts/Centered.vue';
import {Error} from '~/types';

function validateModel(
  value: unknown,
): Error | null {
  if (typeof value !== 'string' || value.length === 0) {
    return {message: 'Het model is verplicht.'};
  }

  return null;
}

function validatePhoto(
  value: unknown,
): Error | null {
  if (typeof value !== 'string' || value.length === 0) {
    return {message: 'De foto is verplicht.'};
  }

  return null;
}

function submit(data: FormData): void {
  console.clear();
  data.forEach(console.log);
}
</script>

<template>
  <Centered :columns="4">
    <BaseForm @submit="submit">
      <div class="row pt-5">
        <div class="col mb-3">
          <h1>Nieuw voertuig</h1>
        </div>

        <div class="w-100"></div>

        <div class="col mb-3">
          <BaseFormInput name="model" value="" :validator="validateModel">
            Model
          </BaseFormInput>
        </div>

        <div class="w-100"></div>

        <div class="col mb-3">
          <BaseFormInput type="file" name="photo" value="" :validator="validatePhoto">
            Model
          </BaseFormInput>
        </div>

        <div class="w-100 my-2"></div>

        <div class="col mb-3">
          <div class="row justify-content-end">
            <div class="col-auto">
              <router-link class="btn" :to="{name: 'vehicle-list'}">
                Annuleren
              </router-link>
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
  </Centered>
</template>
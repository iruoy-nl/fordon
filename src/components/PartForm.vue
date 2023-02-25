<template>
  <BaseForm
    @save="$emit('save', $event)"
    @cancel="$emit('cancel')"
  >
    <div class="row">
      <div class="col mb-3">
        <h1>
          {{ defaultValue ? 'Wijzig' : 'Nieuwe' }} onderdeel
        </h1>
      </div>

      <div class="w-100" />

      <div class="col mb-3">
        <BaseFormInput
          type="text"
          name="title"
          :default-value="defaultValue?.title"
          :validator="titleInput"
        >
          Onderdeel
        </BaseFormInput>
      </div>

      <div class="w-100" />

      <div class="col mb-3">
        <BaseFormInput
          type="url"
          name="url"
          :default-value="defaultValue?.url"
          :validator="urlInput"
        >
          Link naar de website
        </BaseFormInput>
      </div>

      <div class="w-100" />

      <div class="col mb-3">
        <BaseFormSelect
          name="vehicle"
          :default-value="defaultValue?.vehicle.id"
          :validator="vehicleInput"
          :options="vehicles"
          :label="(a) => vehicles.find((b) => a.id === b.id)?.model"
        >
          Voertuig
        </BaseFormSelect>
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
import {pipe} from 'fp-ts/lib/function';
import {onMounted} from 'vue';
import {string} from 'zod';
import {getAllVehicles, vehicles} from '~/state/vehicle';
import {Part} from '~/types';
import BaseForm from './BaseForm.vue';
import BaseFormInput from './BaseFormInput.vue';
import BaseFormSelect from './BaseFormSelect.vue';

defineProps<{
  defaultValue?: Part;
}>();

defineEmits<{
  (event: 'save', value: FormData): void;
  (event: 'cancel', value: never): void;
}>();

onMounted(async () => {
  await pipe(
    getAllVehicles()
  )();
});

const titleInput = string({required_error: 'Het onderdeel is verplicht'})
  .min(1, {message: 'Het onderdeel is verplicht.'});

const urlInput = string({required_error: 'De url is verplicht'})
  .min(1, {message: 'De url is verplicht'})
  .url({message: 'Het moet een geldige url zijn.'});

const vehicleInput = string({required_error: 'Het voertuig is verplicht.'})
  .min(1, {message: 'Het voertuig is verplicht.'});
</script>

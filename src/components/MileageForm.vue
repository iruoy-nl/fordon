<template>
  <BaseForm
    @save="$emit('save', $event)"
    @cancel="$emit('cancel')"
  >
    <div class="row">
      <div class="col mb-3">
        <h1>
          {{ defaultValue ? 'Registratie wijzigen' : 'Nieuwe registratie' }} 
        </h1>
      </div>

      <div class="w-100" />

      <div class="col mb-3">
        <BaseFormInput
          type="number"
          name="mileage"
          :default-value="defaultValue?.mileage"
          :validator="mileageInput"
          placeholder="32000"
        >
          Kilometerstand*
        </BaseFormInput>
      </div>

      <div class="w-100" />

      <div class="col mb-3">
        <BaseFormInput
          type="date"
          name="date"
          :default-value="defaultValue?.date"
          :validator="dateInput"
        >
          Datum*
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
          Motor*
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
import {number, string} from 'zod';
import {getAllVehicles, vehicles} from '~/state/vehicle';
import type {Mileage} from '~/types';
import BaseForm from './BaseForm.vue';
import BaseFormInput from './BaseFormInput.vue';
import BaseFormSelect from './BaseFormSelect.vue';

defineProps<{
  defaultValue?: Mileage;
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

const mileageInput = number({required_error: 'De kilometerstand is verplicht'})
  .min(0, {message: 'De kilometerstand moet gelijk of hoger zijn dan 0.'});

const dateInput = string({required_error: 'De datum is verplicht'})
  .min(1, {message: 'De datum is verplicht.'});

const vehicleInput = string({required_error: 'De motor is verplicht.'})
  .min(1, {message: 'De motor is verplicht.'});
</script>

<script setup lang="ts">
import * as A from 'fp-ts/lib/Array';
import {pipe} from 'fp-ts/lib/function';
import {computed, onMounted} from 'vue';
import {makeDate, makeNumber, makeString} from '~/services/form';
import {getAll, vehicles} from '~/state/vehicle';
import type {Mileage} from '~/types';
import BaseForm from './BaseForm.vue';
import BaseFormInput from './BaseFormInput.vue';
import BaseFormSelect from './BaseFormSelect.vue';

defineProps<{
  /**
   * The default value for the form.
   */
  mileage?: Mileage;
}>();

defineEmits<{
  (event: 'save', value: FormData): void;
  (event: 'cancel', value: never): void;
}>();

onMounted(async () => {
  await pipe(
    getAll(),
  )();
});

const value = makeNumber('De kilometerstand moet hoger zijn dan 0.');
const date = makeDate('De datum is verplicht.');
const vehicle = makeString('Het voertuig is verplicht.');

const options = computed(() => pipe(
  vehicles.value,
  A.map((a) => {
    return {label: a.model, value: a.id};
  })
));
</script>

<template>
  <BaseForm @save="a => $emit('save', a)" @cancel="$emit('cancel')">
    <div class="row">
      <div class="col mb-3">
        <h1>
          {{mileage? 'Wijzig': 'Nieuwe'}} registratie
        </h1>
      </div>

      <div class="w-100"></div>

      <div class="col mb-3">
        <BaseFormInput type="number" name="mileage" :value="mileage?.mileage" :validator="value" placeholder="30000">
          Kilometerstand
        </BaseFormInput>
      </div>

      <div class="w-100"></div>

      <div class="col mb-3">
        <BaseFormInput type="date" name="date" :value="mileage?.date" :validator="date">
          Datum
        </BaseFormInput>
      </div>

      <div class="w-100"></div>

      <div class="col mb-3">
        <BaseFormSelect name="vehicle" :value="mileage?.vehicle.id" :validator="vehicle" :options="options">
          Voertuig
        </BaseFormSelect>
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
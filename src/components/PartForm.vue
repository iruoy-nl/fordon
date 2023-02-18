<script setup lang="ts">
import * as A from 'fp-ts/lib/Array';
import {pipe} from 'fp-ts/lib/function';
import {computed, onMounted} from 'vue';
import {makeString} from '~/services/form';
import {getAllVehicles, vehicles} from '~/state/vehicle';
import {Part} from '~/types';
import BaseForm from './BaseForm.vue';
import BaseFormInput from './BaseFormInput.vue';
import BaseFormSelect from './BaseFormSelect.vue';

defineProps<{
  defaultValue?: Part;
}>();

onMounted(async () => {
  await pipe(
    getAllVehicles()
  )();
});

const titleInput = makeString('De titel is verplicht.');
const urlInput = makeString('De url is verplicht.');
const vehicleInput = makeString('het voertuig is verplicht.');
const vehicleInputOptions = computed(() => {
  return pipe(
    vehicles.value,
    A.map((a) => {
      return {label: a.model, value: a.id};
    })
  );
});
</script>

<template>
  <BaseForm @save="$emit('save', $event)" @cancel="$emit('cancel')">
    <div class="row">
      <div class="col mb-3">
        <h1>
          {{ defaultValue ? 'Wijzig' : 'Nieuwe' }} onderdeel
        </h1>
      </div>

      <div class="w-100"></div>

      <div class="col mb-3">
        <BaseFormInput type="text" name="title" :default-value="defaultValue?.title" :validator="titleInput">
          Onderdeel
        </BaseFormInput>
      </div>

      <div class="w-100"></div>

      <div class="col mb-3">
        <BaseFormInput type="url" name="url" :default-value="defaultValue?.url" :validator="urlInput">
          Link naar de website
        </BaseFormInput>
      </div>

      <div class="w-100"></div>

      <div class="col mb-3">
        <BaseFormSelect name="vehicle" :default-value="defaultValue?.vehicle.id" :validator="vehicleInput"
          :options="vehicleInputOptions">
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
<template>
  <label
    :for="`${name}-input`"
    class="form-label"
  >
    <slot />
  </label>

  <div class="input-group has-validation">
    <input
      :id="`${name}-input`"
      v-model="current"
      :type="type"
      :name="name"
      :class="{'form-control': true, 'is-invalid': error, 'is-valid': touched && !error}"
      step="any"
      :placeholder="placeholder"
      @focusout="touch"
    >

    <div
      v-if="error"
      class="invalid-feedback"
    >
      {{ error.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {ZodType} from 'zod';
import {useFormField} from '~/services/form';

const props = defineProps<{
  name: string;
  type: 'text' | 'file' | 'number' | 'date' | 'url';
  placeholder?: string;
  defaultValue?: unknown;
  validator?: ZodType;
}>();

const {current, error, touch, touched} = useFormField(
  props.defaultValue,
  props.validator
);
</script>

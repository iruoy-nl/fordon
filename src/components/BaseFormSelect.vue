<script setup lang="ts">
import {useFormField} from '~/services/form';
import {FormInputValidator} from '~/types';

const props = defineProps<{
  name: string;
  defaultValue?: unknown;
  options: {
    label: string,
    value: unknown
  }[];
  validator?: FormInputValidator;
}>();

const {current, error, touch} = useFormField(props.defaultValue, props.validator);
</script>

<template>
  <label :for="`${name}-input`" class="form-label">
    <slot />
  </label>

  <div class="input-group has-validation">
    <select :name="name" :id="`${name}-input`" v-model="current" :class="{'form-select': true, 'is-invalid': error}"
      @focusout="touch">
      <template v-for="option in options">
        <option :value="option.value">{{ option.label }}</option>
      </template>
    </select>

    <div v-if="error" class="invalid-feedback">
      {{ error.message }}
    </div>
  </div>
</template>

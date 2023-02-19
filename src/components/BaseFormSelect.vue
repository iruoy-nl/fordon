<script setup lang="ts" generic="T">
import {ZodType} from 'zod';
import {useFormField} from '~/services/form';
import {Item} from '~/types';

const props = defineProps<{
  name: string;
  defaultValue?: unknown;
  options: Item<unknown>[];
  label: (value: Item<unknown>) => string | undefined;
  validator?: ZodType;
}>();

const {current, error, touch} = useFormField(props.defaultValue, props.validator);
</script>

<template>
  <label
    :for="`${name}-input`"
    class="form-label"
  >
    <slot />
  </label>

  <div class="input-group has-validation">
    <select
      :id="`${name}-input`"
      v-model="current"
      :name="name"
      :class="{'form-select': true, 'is-invalid': error}"
      @focusout="touch"
    >
      <template
        v-for="option in options"
        :key="option.value"
      >
        <option :value="option.id">
          {{ label(option) || option.id }}
        </option>
      </template>
    </select>

    <div
      v-if="error"
      class="invalid-feedback"
    >
      {{ error.message }}
    </div>
  </div>
</template>

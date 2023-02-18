<script setup lang="ts">
import {useFormField} from '~/services/form';
import {FormInputValidator} from '~/types';

const props = defineProps<{
  name: string;
  type: 'text' | 'file' | 'number' | 'date';
  defaultValue?: unknown;
  validator?: FormInputValidator;
}>();

const {current, error, touch} = useFormField(props.defaultValue, props.validator);
</script>

<template>
  <label :for="`${name}-input`" class="form-label">
    <slot />
  </label>

  <div class="input-group has-validation">
    <input :type="type" :name="name" :id="`${name}-input`" v-model="current"
      :class="{'form-control': true, 'is-invalid': error}" @focusout="touch">

    <div v-if="error" class="invalid-feedback">
      {{ error.message }}
    </div>
  </div>
</template>

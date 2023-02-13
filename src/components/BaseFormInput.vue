<script setup lang="ts" generic="T">
import * as E from 'fp-ts/lib/Either';
import {constVoid} from 'fp-ts/lib/function';
import {computed, inject, onMounted, ref} from 'vue';
import {FormInputValidator, formKey} from '~/types';

const props = defineProps<{
  /**
   * The name of the field as it should appear in the form data.
   */
  name: string;
  /**
   * The type of input
   */
  type: 'text' | 'file' | 'number' | 'date';
  /**
   * The value to initiate the input with.
   */
  value: unknown;
  /**
   * Placeholder for the input.
   */
  placeholder?: string;
  /**
   * Validate the current value and display any errors.
   */
  validator: FormInputValidator;
}>();

/**
 * Whether the input has been touched by the user.
 */
const touched = ref<boolean>(false);

/**
 * Used to automatically compute the error.
 */
const currentValue = ref<unknown>(props.value);

/**
 * Validate the current value using the given validator.
 */
const error = computed(() => {
  return props.validator(currentValue.value);
});

/**
 * Register this form input with a parent form.
 */
onMounted(() => {
  const {register} = inject(formKey, {register: constVoid});

  register({
    touched: () => touched.value,
    isValid: () => E.isRight(error.value),
    touch: () => touched.value = true,
  });
});
</script>

<template>
  <label :for="`${name}-input`" class="form-label">
    <slot />
  </label>

  <div class="input-group has-validation">
    <input :type="type" :name="name" :id="`${name}-input`" v-model="currentValue"
      :class="{'form-control': true, 'is-invalid': touched === true && E.isLeft(error)}" @focusout="touched = true"
      :placeholder="placeholder">

    <div v-if="touched === true && E.isLeft(error)" class="invalid-feedback">
      {{error.left.message}}
    </div>
  </div>
</template>

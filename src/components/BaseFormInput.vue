<script setup lang="ts">
import {constVoid} from 'fp-ts/lib/function';
import {computed, inject, onMounted, ref} from 'vue';
import {baseFormKey, Error} from '~/types';

const props = withDefaults(
  defineProps<{
    /**
     * The name of the field as it should appear in the form data.
     */
    name: string;
    /**
     * The type of input
     */
    type?: 'text' | 'file';
    /**
     * The value to initiate the input with.
     */
    value: unknown;
    /**
     * Validate the current value and display any errors.
     */
    validator?: (value: unknown) => Error | null;
  }>(),
  {
    type: () => 'text',
    validator: () => () => null,
  },
);

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
  const {register} = inject(baseFormKey, {register: constVoid});

  register({
    touched: () => touched.value,
    isValid: () => error.value === null,
    error: () => error.value,
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
      :class="{'form-control': true, 'is-invalid': touched === true && error !== null}" @focusout="touched = true">

    <div v-if="touched === true && error !== null" class="invalid-feedback">
      {{error.message}}
    </div>
  </div>
</template>

<script setup lang="ts">
import * as A from 'fp-ts/lib/Array';
import {pipe} from 'fp-ts/lib/function';
import {computed, provide, ref} from 'vue';
import {FormInput, formKey} from '~/types';

const emits = defineEmits<{
  (event: 'save', value: FormData): void;
  (event: 'cancel', value: never): void;
}>();

/**
 * Collection of registerd inputs.
 */
const inputs = ref<FormInput[]>([]);

/**
 * Reference to the form.
 */
const formRef = ref<HTMLFormElement | null>(null);

/**
 * We provide this `register` function which is used by the `BaseFormInput`
 * components to automatically register themselves.
 */
provide(formKey, {register});

/**
 * Register an input with this form.
 */
function register(input: FormInput): void {
  inputs.value = [...inputs.value, input];
}

/**
 * Whether the form is valid.
 */
const isValid = computed(() => {
  return pipe(
    inputs.value,
    A.map((a) => a.isValid()),
    A.every((b) => b),
  );
});

/**
 * Handle the submit event of the form.
 */
function submit(): void {
  if (formRef.value === null) return;

  pipe(
    inputs.value,
    A.map((a) => a.touch()),
  );

  // Only emit when every input is valid.
  if (!isValid.value) return;

  const data = new FormData(formRef.value);
  emits('save', data);
}
</script>

<template>
  <form method="post" @submit.prevent="submit" @reset.prevent="$emit('cancel')" ref="formRef">
    <slot />
  </form>
</template>
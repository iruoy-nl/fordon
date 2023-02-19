<script setup lang="ts">
import {ref} from 'vue';
import {useForm} from '~/services/form';

const emits = defineEmits<{
  (event: 'save', value: FormData): void;
  (event: 'cancel', value: never): void;
}>();

const formRef = ref<HTMLFormElement | undefined>();

const {isValid, submit} = useForm(formRef);

function onSubmit(): void {
  const data = submit();

  if (isValid.value) {
    emits('save', data);
  }
}
</script>

<template>
  <form
    ref="formRef"
    method="post"
    @submit.prevent="onSubmit"
    @reset.prevent="$emit('cancel')"
  >
    <slot />
  </form>
</template>

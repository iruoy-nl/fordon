<script setup lang="ts">
import {closeModal, modals} from '~/services/modal';
import BaseModal from './BaseModal.vue';
</script>

<template>
  <BaseModal
    v-for="(modal, index) in modals"
    :key="index"
    @close="closeModal(index)"
  >
    <component
      :is="modal.slot"
      v-bind="modal.bind"
      v-on="modal.on"
    />
  </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from '~/components/BaseModal.vue';
import {closeModal, modals} from '~/services/modal';
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
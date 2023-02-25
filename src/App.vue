<script setup lang="ts">
import BaseContextMenuContainer from './components/BaseContextMenuContainer.vue';
import BaseModalContainer from './components/BaseModalContainer.vue';
</script>

<template>
  <BaseContextMenuContainer />
  <BaseModalContainer />
  <router-view />
</template>
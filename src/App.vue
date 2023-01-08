<script setup lang="ts">
import { user$ } from "~/store/user";
</script>

<template>
  {{ user$ }}

  <router-view></router-view>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import TheNavigation from "~/components/TheNavigation.vue";
</script>

<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-2">
        <TheNavigation></TheNavigation>
      </div>

      <div class="col-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

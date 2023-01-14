<script setup lang="ts">
import { useRouter } from "vue-router";
import AppLogo from "~/components/AppLogo.vue";

const { push } = useRouter();
</script>

<template>
  <div class="center">
    <div class="row text-center justify-content-center g-3">
      <div class="col">
        <AppLogo />
      </div>

      <div class="w-100"></div>

      <div class="col-4">Dé app voor het onderhouden van jouw motor.</div>

      <div class="w-100"></div>

      <div class="col-auto">
        <button class="btn border" @click="push('/app')">Openen</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.center {
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>

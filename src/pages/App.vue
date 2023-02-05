<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-2">
        <TheSidebar />
      </div>

      <div class="col-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheSidebar from '~/components/TheSidebar.vue';
</script>
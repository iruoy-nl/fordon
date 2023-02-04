<script setup lang="ts">
import {notifications} from "~/state/notifications";
</script>

<template>
  <div class="box">
    <div class="row p-4">
      <template v-for="{type, message} in notifications">
        <div class="col">
          <div :class="`alert alert-${type}`">
            <template v-if="type === 'danger'">
              <i class="bi bi-fire"></i>
            </template>

            <template v-if="type === 'info'">
              <i class="bi bi-info-circle-fill"></i>
            </template>

            <template v-if="type === 'success'">
              <i class="bi bi-check-circle-fill"></i>
            </template>

            <template v-if="type === 'warning'">
              <i class="bi bi-exclamation-triangle-fill"></i>
            </template>

            <span class="ms-2">
              {{message}}
            </span>
          </div>
        </div>

        <div class="w-100"></div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  // Position in the bottom right corner.
  position: absolute;
  right: 0;
  bottom: 0;

  // Ensure that it is always visible.
  z-index: 10;

  width: 32vw;
}
</style>

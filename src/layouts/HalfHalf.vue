<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-6 p-0">
        <slot name="left" />
      </div>

      <div class="col-6 p-0">
        <slot name="right">
          <div class="image" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.image {
  height: 100%;

  background-image: url("https://images.unsplash.com/photo-1619677122678-b8e28f74cf42?w=700&h=900");
  background-size: cover;

  background-color: $light;
}
</style>

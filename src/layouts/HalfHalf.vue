<template>
  <div class="container-fluid">
    <div class="row vh-100">
      <div class="col-6 p-0">
        <slot name="left"></slot>
      </div>

      <div class="col-6 p-0">
        <slot name="right">
          <!-- Default to an image of a motorcycle -->
          <div class="image"></div>
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

  // Fallback
  background-color: $light;
}
</style>

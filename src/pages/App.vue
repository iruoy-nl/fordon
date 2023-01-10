<script setup lang="ts">
import { user } from "~/state/user";
import * as O from "fp-ts/lib/Option";
</script>

<template>
  <div class="container py-4">
    <div class="row">
      <div class="col text-center">
        <template v-if="O.isSome(user)">
          Welkom {{ user.value.name }}!
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

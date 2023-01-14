<script setup lang="ts">
import * as O from "fp-ts/lib/Option";
import { ref } from "vue";
import { user } from "~/state/user";

/**
 * The pages the navigation should display.
 */
const pages = ref([
  { icon: "speedometer", title: "Overzicht", name: "app" },
  { icon: "signpost", title: "Kilometers", name: "app" },
  { icon: "tools", title: "Onderhoud", name: "app" },
  { icon: "card-heading", title: "Garage", name: "app" },
  { icon: "gear", title: "Instellingen", name: "app" },
]);
</script>

<template>
  <div class="row h-100 justify-content-between border-end p-4">
    <div class="col">
      <h3 class="text-primary">
        <i class="bi bi-circle-fill align-middle" style="font-size: 0.5rem"></i>
        Fordon
      </h3>
    </div>

    <div class="w-100"></div>

    <div class="col">
      <ul class="list-group">
        <template v-for="{ icon, title, name } in pages" :key="name">
          <router-link
            class="list-group-item rounded border-0 p-3"
            :to="{ name }"
          >
            <i :class="`bi bi-${icon} me-2`"></i>
            {{ title }}
          </router-link>
        </template>
      </ul>
    </div>

    <div class="w-100"></div>

    <div class="col text-center mt-auto">
      <template v-if="O.isSome(user)">
        <img
          class="rounded-circle"
          :src="user.value.avatarUrl"
          alt="avatar"
          style="width: 64px; height: 64px"
        />

        <div class="w-100 my-2"></div>

        <h4 class="text-primary">
          {{ user.value.name }}
        </h4>
        <small class="text-muted">
          {{ user.value.email }}
        </small>

        <div class="w-100 my-2"></div>

        <button class="btn border">
          <i class="bi bi-door-closed me-2" />
          Uitloggen
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

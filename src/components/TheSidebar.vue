<script setup lang="ts">
import * as O from "fp-ts/lib/Option";
import {ref} from "vue";
import {useRouter} from "vue-router";
import BaseLogo from "~/components/BaseLogo.vue";
import {clear} from "~/state/oauth";
import {user} from "~/state/user";

const {push} = useRouter();

const pages = ref([
  // {icon: "speedometer", title: "Overzicht", name: "dashboard"},
  {icon: "signpost", title: "Kilometers", name: "mileages"},
  // {icon: "tools", title: "Onderhoud", name: "maintenance"},
  {icon: "card-heading", title: "Garage", name: "garage"},
  // {icon: "gear", title: "Instellingen", name: "settings"},
]);

const logout = () => {
  clear();
  push({name: "oauth"});
};
</script>

<template>
  <div class="row h-100 justify-content-between border-end p-4">
    <div class="col">
      <BaseLogo />
    </div>

    <div class="w-100"></div>

    <div class="col">
      <ul class="list-group">
        <template v-for="{icon, title, name} in pages" :key="name">
          <router-link class="list-group-item rounded border-0 p-3" :to="{name}">
            <i :class="`bi bi-${icon} me-2`"></i>
            {{ title }}
          </router-link>
        </template>
      </ul>
    </div>

    <div class="w-100"></div>

    <div class="col text-center mt-auto">
      <template v-if="O.isSome(user)">
        <img class="rounded-circle" :src="user.value.avatarUrl" alt="avatar" style="width: 64px; height: 64px" />

        <div class="w-100 my-2"></div>

        <h6 class="text-primary">
          {{ user.value.name }}
        </h6>
        <small class="text-muted">
          {{ user.value.email }}
        </small>

        <div class="w-100 my-2"></div>

        <button class="btn border" @click="logout">
          <i class="bi bi-door-closed me-2" />
          Uitloggen
        </button>
      </template>
    </div>
  </div>
</template>
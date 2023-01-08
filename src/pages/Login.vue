<script setup lang="ts">
import { isLeft } from "fp-ts/lib/Either";
import { AuthProviderInfo } from "pocketbase";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { challenge, listProviders, user$, verify } from "~/store/user";

const { currentRoute, push } = useRouter();

const providers = ref<AuthProviderInfo[]>([]);

onMounted(async () => {
  //
  const { state, code } = currentRoute.value.query;
  if (state && code) {
    const one = await verify(state as string, code as string);

    if (isLeft(one)) {
      return console.error(one.left);
    }

    push("/");
  } //
  else {
    // Retrieve providers.
    const two = await listProviders();
    if (isLeft(two)) {
      return console.error(two.left);
    }

    providers.value = two.right;
  }
});
</script>

<template>
  <div class="container py-5">
    <div class="row mt-3">
      <div class="col" v-for="provider in providers">
        <button class="btn btn-primary" @click="challenge(provider)">
          {{ provider.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

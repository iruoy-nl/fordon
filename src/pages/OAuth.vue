<script setup lang="ts">
import * as E from "fp-ts/lib/Either";
import { onMounted, ref } from "vue";
import HalfHalf from "~/layouts/HalfHalf.vue";
import { challenge, getAll, verify } from "~/state/oauth";
import { Provider } from "~/types";
import { useRouter } from "vue-router";

const { currentRoute, push } = useRouter();

/**
 * The available providers.
 */
const providers = ref<Provider[]>([]);

onMounted(async () => {
  const { code, state } = currentRoute.value.query;

  if (code && state) {
    // The user has already initiated the authentication process.
    const one = await verify(`${code}`, `${state}`);

    if (E.isLeft(one)) {
      return console.error(one.left);
    }

    push("/app");
  } //
  else {
    // First time loading the Oauth page.
    const two = await getAll();

    if (E.isLeft(two)) {
      // Todo: display error to the user.
      return console.error(two.left);
    }

    providers.value = two.right;
  }
});
</script>

<template>
  <HalfHalf>
    <template #left>
      <div class="row h-100 p-4">
        <div class="col">
          <h3 class="text-primary">
            <i
              class="bi bi-circle-fill align-middle"
              style="font-size: 0.5rem"
            ></i>
            Fordon
          </h3>
        </div>

        <div class="w-100"></div>

        <div class="col">
          <div class="row justify-content-center">
            <div class="col-6">
              <h2>Welkom bij Fordon!</h2>
              <p class="text-muted">
                Gebruik één van de onderstaande accounts on door te gaan naar
                Fordon.
              </p>
            </div>

            <div class="w-100 my-3"></div>

            <template v-for="provider of providers">
              <div class="col-6">
                <button class="btn btn-primary" @click="challenge(provider)">
                  Login met
                  <span class="text-capitalize">
                    {{ provider.name }}
                  </span>
                </button>
              </div>

              <div class="w-100 my-2"></div>
            </template>
          </div>
        </div>

        <div class="w-100"></div>

        <div class="col"></div>
      </div>
    </template>
  </HalfHalf>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import * as E from "fp-ts/lib/Either";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import AppLogo from "~/components/AppLogo.vue";
import HalfHalf from "~/layouts/HalfHalf.vue";
import { addNotification } from "~/state/notifications";
import { challenge, getAll, verify } from "~/state/oauth";
import { Provider } from "~/types";

const { currentRoute, push } = useRouter();

/**
 * The available providers.
 */
const providers = ref<Provider[]>([]);

onMounted(onLoad);
watch(currentRoute, onLoad);

/**
 * Determines which step the user is currently in.
 */
async function onLoad() {
  const { code, state } = currentRoute.value.query;

  if (code && state) {
    await handleRedirect(code as string, state as string);
  } else {
    await listProviders();
  }
}

/**
 * Loads the available providers.
 */
async function listProviders() {
  const task = await getAll();

  if (E.isLeft(task)) {
    addNotification({
      type: "danger",
      message: task.left.message,
    });

    return;
  }

  providers.value = task.right;
}

/**
 * Verifies the provided details.
 *
 * @param code The incoming code,
 * @param state The incoming state.
 */
async function handleRedirect(code: string, state: string) {
  const task = await verify(code, state);

  if (E.isLeft(task)) {
    addNotification({
      type: "danger",
      message: task.left.message,
    });

    push({ name: "oauth" });

    return;
  }

  push({ name: "app" });
}
</script>

<template>
  <HalfHalf>
    <template #left>
      <div class="row h-100 p-4">
        <div class="col">
          <AppLogo />
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
                  <!-- Show provider-specific icons -->
                  <template v-if="provider.name === 'google'">
                    <i class="bi bi-google me-2"></i>
                  </template>

                  Login met
                  <span class="text-capitalize">
                    {{ provider.name }}
                  </span>
                </button>
              </div>

              <div class="w-100 my-2"></div>
            </template>

            <template v-if="providers.length === 0">
              <div class="spinner-border text-primary" role="status"></div>
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

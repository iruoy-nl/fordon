<template>
  <HalfHalf>
    <template #left>
      <div class="row h-100 p-4">
        <div class="col">
          <BaseLogo />
        </div>

        <div class="w-100" />

        <div class="col">
          <div class="row justify-content-center">
            <div class="col-6">
              <h2>Welkom bij Fordon!</h2>
              <p class="text-muted">
                Gebruik één van de onderstaande accounts on door te gaan naar
                Fordon.
              </p>
            </div>

            <div class="w-100 my-3" />

            <template
              v-for="provider of providers"
              :key="provider.name"
            >
              <div class="col-6">
                <button
                  class="btn btn-primary"
                  @click="challenge(provider)"
                >
                  <!-- Show provider-specific icons -->
                  <template v-if="provider.name === 'google'">
                    <i class="bi bi-google me-2" />
                  </template>

                  Login met
                  <span class="text-capitalize">
                    {{ provider.name }}
                  </span>
                </button>
              </div>

              <div class="w-100 my-2" />
            </template>

            <template v-if="providers.length === 0">
              <div
                class="spinner-border text-primary"
                role="status"
              />
            </template>
          </div>
        </div>

        <div class="w-100" />

        <div class="col" />
      </div>
    </template>
  </HalfHalf>
</template>

<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {onMounted, watch} from 'vue';
import {useRouter} from 'vue-router';
import BaseLogo from '~/components/BaseLogo.vue';
import HalfHalf from '~/layouts/HalfHalf.vue';
import {challenge, getAllProviders, providers, verify} from '~/state/oauth';

const {currentRoute, push} = useRouter();

onMounted(onLoad);
watch(currentRoute, onLoad);

async function onLoad() {
  const {code, state} = currentRoute.value.query;

  if (code && state) {
    await handleRedirect(code as string, state as string);
  } else {
    await pipe(
      getAllProviders()
    )();
  }
}

async function handleRedirect(code: string, state: string) {
  await pipe(
    verify(code, state),
    TE.match(
      () => {
        push({name: 'oauth'});
      },
      () => {
        push({name: 'app'});
      }
    )
  )();
}
</script>

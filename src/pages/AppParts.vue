<template>
  <Centered>
    <div class="row">
      <div class="w-100 my-3" />

      <div class="col">
        <div class="row justify-content-between">
          <div class="col">
            <h1>Onderdelen</h1>
            <p>Alle onderdelen die jij nodig bent tijdens het doen van onderhoud.</p>
          </div>

          <div class="col-auto my-auto">
            <button
              class="btn btn-primary"
              @click="addPart"
            >
              <i class="bi bi-plus" />
              Nieuw
            </button>
          </div>
        </div>
      </div>

      <div class="w-100 my-3" />

      <div class="col">
        <PartList :parts="parts" />
      </div>
    </div>
  </Centered>
</template>

<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import {defineAsyncComponent, onMounted} from 'vue';
import PartList from '~/components/PartList.vue';
import Centered from '~/layouts/Centered.vue';
import * as TE from 'fp-ts/lib/TaskEither';
import {closePopUp, openModal} from '~/services/pop-up';
import {getAllParts, insertOnePart, parts} from '~/state/part';

onMounted(async () => {
  await pipe(
    getAllParts()
  )();
});

function addPart(): void {
  openModal({
    slot: defineAsyncComponent(() => import('~/components/PartForm.vue')),
    emits: {
      cancel: () => {
        closePopUp();
      },
      save: async (data: FormData): Promise<void> => {
        await pipe(
          insertOnePart(data),
          TE.matchW(
            (e) => {
              console.error(e);
            },
            () => {
              closePopUp();
            }
          )
        )();
      }
    }
  });
}
</script>

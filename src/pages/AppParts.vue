<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import {onMounted} from 'vue';
import PartList from '~/components/PartList.vue';
import Centered from '~/layouts/Centered.vue';
import * as TE from 'fp-ts/lib/TaskEither';
import {closeModal, openModal} from '~/services/modal';
import {getAllParts, insertOnePart, parts} from '~/state/part';

onMounted(async () => {
  await pipe(
    getAllParts()
  )();
});

function addPart(): void {
  openModal(
    () => import('~/components/PartForm.vue'),
    {},
    {
      cancel: () => closeModal(),
      save: async (data: FormData): Promise<void> => {
        await pipe(
          insertOnePart(data),
          TE.matchW(
            (e) => {
              // todo: display error to the user.
              console.error(e);
            },
            () => closeModal()
          )
        )();
      }
    }
  );
}
</script>

<template>
  <Centered>
    <div class="row">
      <div class="w-100 my-3" />

      <div class="col">
        <div class="row justify-content-between">
          <div class="col">
            <h1>Onderdelen</h1>
            <p>...</p>
          </div>

          <div class="col-auto my-auto">
            <button
              class="btn btn-primary"
              @click="addPart"
            >
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
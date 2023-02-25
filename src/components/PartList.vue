<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>
            Onderdeel
          </th>
          <th>
            Kosten
          </th>
          <th>
            Motor
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="part in parts"
          :key="part.id"
        >
          <tr @contextmenu.prevent="openOptionsMenu(part, $event)">
            <td>
              <a
                :href="part.url"
                target="_blank"
                class="text-primary"
              >
                {{ part.title }}
              </a>
            </td>
            <td>
              {{ formatCurrency(part.cost) }}
            </td>
            <td>
              <img
                :src="part.vehicle.photoUrl"
                style="height: 24px; width: 24px;"
                class="rounded"
              >
              {{ part.vehicle.model }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {defineAsyncComponent} from 'vue';
import {closePopUp, openMenu, openModal} from '~/services/pop-up';
import {deletePartById, updatePartById} from '~/state/part';
import {Part} from '~/types';
import {formatCurrency} from '~/services/format';

defineProps<{
  parts: Part[];
}>();

function openOptionsMenu(
  part: Part,
  event: MouseEvent
): void {
  openMenu({
    slot: defineAsyncComponent(() => import('~/components/BasePopUpMenu.vue')),
    position: {x: event.clientX, y: event.clientY},
    props: {
      options: [
        {icon: 'pen', label: 'Wijzigen', onClick: () => editPart(part)},
        {icon: 'trash', label: 'Verwijderen', onClick: () => deletePart(part)}
      ]
    }
  });
}

function editPart(
  part: Part
): void {
  openModal({
    slot: defineAsyncComponent(() => import('~/components/PartForm.vue')),
    props: {
      defaultValue: part
    },
    emits: {
      cancel: (): void => {
        closePopUp();
      },
      save: async (data: FormData): Promise<void> => {
        await pipe(
          updatePartById(part.id, data),
          TE.match(
            (e) => {
              console.error(e);
            },
            () => {
              closePopUp();
            }
          )
        )();
      }
    }});
}

function deletePart(
  part: Part
): void {
  openModal({
    slot: defineAsyncComponent(() => import('~/components/PopUpModalConfirm.vue')),
    props: {
      title: 'Let op!',
      body: 'Dit onderdeel kan niet worden teruggehaald.'
    },
    emits: {
      cancel: (): void => {
        closePopUp();
      },
      confirm: async (): Promise<void> => {
        await pipe(
          deletePartById(part.id),
          TE.match(
            (e) => {
              console.error(e);
            },
            () => {
              closePopUp();
            }
          )
        )();
      }
    }}
  );
}
</script>

<style scoped lang="scss">
th {
  width: 33%;
}
</style>
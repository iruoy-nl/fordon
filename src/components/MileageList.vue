<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th class="w-25">
            Kilometers
          </th>
          <th class="w-50">
            Voertuig
          </th>
          <th class="w-25">
            Datum
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="mileage in mileages"
          :key="mileage.id"
        >
          <tr @contextmenu.prevent="openOptionsMenu(mileage, $event)">
            <td>
              <span>{{ mileage.mileage }}</span>
              <small>km</small>
            </td>
            <td>
              <img
                :src="mileage.vehicle.photoUrl"
                style="height: 24px; width: 24px;"
                class="rounded"
              >
              {{ mileage.vehicle.model }}
            </td>
            <td>
              {{ parseAndFormat(mileage.date) }}
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
import {useRouter} from 'vue-router';
import {parseAndFormat} from '~/services/date';
import {closePopUp, openMenu, openModal} from '~/services/pop-up';
import {deleteMileageById, updateMileageById} from '~/state/mileage';
import type {Mileage} from '~/types';

defineProps<{
  mileages: Mileage[],
}>();

const {push} = useRouter();

function openOptionsMenu(
  mileage: Mileage,
  event: MouseEvent
): void {
  openMenu({
    slot: defineAsyncComponent(() => import('~/components/BasePopUpMenu.vue')),
    position: {x: event.clientX, y: event.clientY},
    props: {
      options: [
        {icon: 'pen', label: 'Wijzigen', onClick: () => editMileage(mileage)},
        {icon: 'trash', label: 'Verwijderen', onClick: () => deleteMileage(mileage)}
      ]
    }
  });
}

function editMileage(
  mileage: Mileage
): void {
  openModal({
    slot: defineAsyncComponent(() => import('~/components/MileageForm.vue')),
    props: {
      defaultValue: mileage
    },
    emits: {
      cancel: (): void => closePopUp(),
      save: async (data: FormData): Promise<void> => {
        await pipe(
          updateMileageById(mileage.id, data),
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

function deleteMileage(
  mileage: Mileage
): void {
  openModal({
    slot: defineAsyncComponent(() => import('~/components/PopUpModalConfirm.vue')),
    props: {
      title: 'Weet je het zeker?',
      body: 'Deze actie kan niet ongedaan worden gemaakt.'
    },
    emits: {
      cancel: (): void => {
        closePopUp();
      },
      confirm: async (): Promise<void> => {
        await pipe(
          deleteMileageById(mileage.id),
          TE.match(
            (e) => {
              console.error(e);
            },
            () => {
              closePopUp();
              push({name: 'mileages'});
            }
          )
        )();
      }
    }}
  );
}
</script>

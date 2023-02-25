<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import {parseAndFormat} from '~/services/date';
import {closeModal, openModal} from '~/services/modal';
import type {Mileage} from '~/types';
import * as TE from 'fp-ts/lib/TaskEither';
import {updateMileageById, deleteMileageById} from '~/state/mileage';
import {useRouter} from 'vue-router';
import {openContextMenu} from '~/services/context-menu';
import {defineAsyncComponent} from 'vue';

defineProps<{
  mileages: Mileage[],
}>();

const {push} = useRouter();

function openOptions(
  mileage: Mileage
): void {
  openContextMenu(
    defineAsyncComponent(() => import('~/components/ContextMenuOptions.vue')),
    {
      onEdit: (): void => editMileage(mileage),
      onDelete: (): void => deleteMileage(mileage)
    }
  );
}

function editMileage(
  mileage: Mileage
): void {
  openModal(
    () => import('~/components/MileageForm.vue'),
    {
      defaultValue: mileage
    },
    {
      cancel: (): void => closeModal(),
      save: async (data: unknown): Promise<void> => {
        await pipe(
          updateMileageById(mileage.id, data as FormData),
          TE.match(
            (e) => {
              // todo: display the error to the user
              console.error(e);
            },
            () => {
              closeModal();
            }
          )
        )();
      }
    });
}

function deleteMileage(
  mileage: Mileage
): void {
  openModal(
    () => import('~/components/ModalConfirm.vue'),
    {
      title: 'Weet je het zeker?',
      body: 'Deze actie kan niet ongedaan worden gemaakt.'
    },
    {
      cancel: (): void => closeModal(),
      confirm: async (): Promise<void> => {
        await pipe(
          deleteMileageById(mileage.id),
          TE.match(
            (e) => {
              console.error(e);
            },
            () => {
              closeModal();
              push({name: 'mileages'});
            }
          )
        )();
      }
    }
  );
}
</script>

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
          <tr @contextmenu.prevent="openOptions(mileage)">
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
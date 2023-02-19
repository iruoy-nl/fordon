<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import {parseAndFormat} from '~/services/date';
import {closeModal, openModal} from '~/services/modal';
import type {Mileage} from '~/types';
import * as TE from 'fp-ts/lib/TaskEither';
import {updateMileageById, deleteMileageById} from '~/state/mileage';
import {useRouter} from 'vue-router';

defineProps<{
  mileages: Mileage[],
}>();

const {push} = useRouter();

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
      save: async (data: FormData): Promise<void> => {
        await pipe(
          updateMileageById(mileage.id, data),
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
          <th class="w-25" />
        </tr>
      </thead>
      <tbody>
        <template
          v-for="mileage in mileages"
          :key="mileage.id"
        >
          <tr>
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
            <td>
              <div class="row g-1 flex-nowrap">
                <div class="col-auto">
                  <button
                    class="btn btn-sm btn-primary"
                    @click="editMileage(mileage)"
                  >
                    <i class="bi bi-pen" />
                  </button>
                </div>
                <div class="col-auto">
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteMileage(mileage)"
                  >
                    <i class="bi bi-trash" />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
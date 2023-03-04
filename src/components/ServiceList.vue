<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Titel</th>
          <th colspan="2">
            Elke ...
          </th>
          <th>Actie</th>
          <th>Voertuig</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="service in services"
          :key="service.id"
        >
          <tr>
            <td>
              {{ service.title }}
            </td>
            <td>
              <template v-if="service.mileage">
                <span>{{ service.mileage }}</span>
                <small> km</small>
              </template>
              <template v-else>
                -
              </template>
            </td>
            <td>
              <template v-if="service.months">
                <span>{{ service.months }}</span>
                <small> maanden</small>
              </template>
              <template v-else>
                -
              </template>
            </td>
            <td>
              <ServiceAction :service="service" />
            </td>
            <td>
              <img
                :src="service.vehicle.photoUrl"
                style="height: 24px; width: 24px;"
                class="rounded me-2"
              >
              <router-link
                :to="{name: 'garage-show', params: {id: service.vehicle.id}}"
                class="text-primary"
              >
                {{ service.vehicle.model }}
              </router-link>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import ServiceAction from '~/components/ServiceAction.vue';
import {Service} from '~/types';

defineProps<{
  services: Service[];
}>();

// function openOptionsMenu(
//   part: Part,
//   event: MouseEvent
// ): void {
//   openMenu({
//     slot: defineAsyncComponent(() => import('~/components/BasePopUpMenu.vue')),
//     position: {x: event.clientX, y: event.clientY},
//     props: {
//       options: [
//         {icon: 'pen', label: 'Wijzigen', onClick: () => editPart(part)},
//         {icon: 'trash', label: 'Verwijderen', onClick: () => deletePart(part)}
//       ]
//     }
//   });
// }

// function editPart(
//   part: Part
// ): void {
//   openModal({
//     slot: defineAsyncComponent(() => import('~/components/PartForm.vue')),
//     props: {
//       defaultValue: part
//     },
//     emits: {
//       cancel: (): void => {
//         closePopUp();
//       },
//       save: async (data: FormData): Promise<void> => {
//         await pipe(
//           updatePartById(part.id, data),
//           TE.match(
//             (e) => {
//               console.error(e);
//             },
//             () => {
//               closePopUp();
//             }
//           )
//         )();
//       }
//     }});
// }

// function deletePart(
//   part: Part
// ): void {
//   openModal({
//     slot: defineAsyncComponent(() => import('~/components/PopUpModalConfirm.vue')),
//     props: {
//       title: 'Let op!',
//       body: 'Dit onderdeel kan niet worden teruggehaald.'
//     },
//     emits: {
//       cancel: (): void => {
//         closePopUp();
//       },
//       confirm: async (): Promise<void> => {
//         await pipe(
//           deletePartById(part.id),
//           TE.match(
//             (e) => {
//               console.error(e);
//             },
//             () => {
//               closePopUp();
//             }
//           )
//         )();
//       }
//     }}
//   );
// }
</script>
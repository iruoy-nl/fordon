<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import {computed, onMounted} from 'vue';
import * as TE from 'fp-ts/lib/TaskEither';
import {useRouter} from 'vue-router';
import VehicleForm from '~/components/VehicleForm.vue';
import Centered from '~/layouts/Centered.vue';
import {editById, getById, selected} from '~/state/vehicle';

const {currentRoute, push} = useRouter();

const id = computed(() => pipe(currentRoute.value.params.id, String))

onMounted(async () => {
  await pipe(
    getById(id.value)
  )();
});

async function onSave(
  data: FormData,
): Promise<void> {
  await pipe(
    editById(id.value, data),
    TE.match(
      (e) => {
        // todo: display error to the user.
        console.error(e);
      },
      () => {
        // The vehicle was added sucessfully.
        push({name: 'vehicle-list'});
      },
    ),
  )();
}
</script>

<template>
  <Centered :columns="4">
    <template v-if="O.isNone(selected)">
      ...
    </template>

    <template v-else>
      <div class="row mt-5">
        <div class="col">
          <h1>Wijzig voertuig</h1>
        </div>

        <div class="w-100 my-2"></div>

        <div class="col">
          <VehicleForm @save="onSave" @cancel="push({name: 'vehicle-show', params: {id: id}})"
            :vehicle="selected.value" />
        </div>
      </div>
    </template>
  </Centered>
</template>
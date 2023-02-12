<script setup lang="ts">
import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';
import Centered from '~/layouts/Centered.vue';
import {getById, selected} from '~/state/vehicle';

const {currentRoute} = useRouter();

onMounted(async () => {
  const id = String(currentRoute.value.params.id);

  await pipe(
    getById(id)
  )();
});
</script>

<template>
  <Centered :columns="4">
    <template v-if="O.isNone(selected)">
      ...
    </template>

    <template v-else>
      <div class="row pt-5">
        <div class="col">
          <h1>{{selected.value.model}}</h1>
        </div>

        <div class="w-100 my-2"></div>

        <div class="col">
          <img :src="selected.value.photoUrl" class="w-100 rounded">
        </div>

        <div class="w-100 my-2"></div>

        <div class="col-auto">
          <router-link class="btn btn-primary" :to="{name: 'vehicle-edit', params: {id: selected.value.id}}">
            Wijzigen
          </router-link>
        </div>
      </div>
    </template>
  </Centered>
</template>
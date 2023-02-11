<script setup lang="ts">
import * as E from 'fp-ts/lib/Either';
import {pipe} from 'fp-ts/lib/function';
import {useRouter} from 'vue-router';
import BaseForm from '~/components/BaseForm.vue';
import BaseFormInput from '~/components/BaseFormInput.vue';
import Centered from '~/layouts/Centered.vue';
import {makeDecodeString} from '~/services/form';
import {addOne} from '~/state/vehicle';

const {push} = useRouter();

const model = makeDecodeString('Het model is verplicht.');
const photo = makeDecodeString('De foto is verplicht.');

async function submit(
  data: FormData,
): Promise<void> {
  const one = await pipe(
    addOne(data),
  )();

  if (E.isRight(one)) {
    push({name: 'vehicle-list'});
  }
}
</script>

<template>
  <Centered :columns="4">
    <BaseForm @submit="submit">
      <div class="row pt-5">
        <div class="col mb-3">
          <h1>Nieuw voertuig</h1>
        </div>

        <div class="w-100"></div>

        <div class="col mb-3">
          <BaseFormInput type="text" name="model" value="" :validator="model">
            Model
          </BaseFormInput>
        </div>

        <div class="w-100"></div>

        <div class="col mb-3">
          <BaseFormInput type="file" name="photo" value="" :validator="photo">
            Foto
          </BaseFormInput>
        </div>

        <div class="w-100 my-2"></div>

        <div class="col mb-3">
          <div class="row justify-content-end">
            <div class="col-auto">
              <router-link class="btn" :to="{name: 'vehicle-list'}">
                Annuleren
              </router-link>
            </div>

            <div class="col-auto">
              <button class="btn btn-primary" type="submit">
                Opslaan
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseForm>
  </Centered>
</template>
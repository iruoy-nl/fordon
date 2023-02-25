<script setup lang="ts">
import BasePopUp from '~/components/BasePopUp.vue';
import {closePopUp, popUps} from '~/services/pop-up';
</script>

<template>
  <template
    v-for="(popUp, index) in popUps"
    :key="index"
  >
    <BasePopUp
      :pop-up="popUp"
      @close="closePopUp(index)"
    >
      <component 
        :is="popUp.slot"
        v-bind="popUp.props || {}"
        v-on="popUp.emits || {}"
      />
    </BasePopUp>
  </template>
</template>
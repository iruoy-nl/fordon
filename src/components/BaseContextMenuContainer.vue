<script setup lang="ts">
import BaseContextMenu from '~/components/BaseContextMenu.vue';
import {closeContextMenu, contextMenu} from '~/services/context-menu';
</script>

<template>
  <BaseContextMenu
    v-if="contextMenu"
    :position="contextMenu.position"
    @close="closeContextMenu"
  >
    <component
      :is="contextMenu.slot"
      v-bind="contextMenu.props"
      v-on="contextMenu?.emits"
      @close="closeContextMenu"
    />
  </BaseContextMenu>
</template>

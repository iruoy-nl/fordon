import {useMouse} from '@vueuse/core';
import {Component, markRaw, ref} from 'vue';
import {ContextMenu, ContextMenuPosition} from '~/types';

const {x, y} = useMouse()

export const contextMenu = ref<ContextMenu | null>(null);

export function openContextMenu(
  slot: Component,
  props: Record<string, unknown> = {},
  emits: Record<string, unknown> = {}
): void {

  const position: ContextMenuPosition = {
    x: x.value,
    y: y.value
  };

  contextMenu.value = {slot: markRaw(slot), position, props, emits};
}

export function closeContextMenu(): void {
  contextMenu.value = null;
}
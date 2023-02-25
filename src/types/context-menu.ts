import {Component} from 'vue';

export type ContextMenuPosition = {
  x: number;
  y: number;
};

export type ContextMenu = {
  slot: Component;
  props: Record<string, unknown>;
  emits: Record<string, unknown>;
  position: ContextMenuPosition;
};

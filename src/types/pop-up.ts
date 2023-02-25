import {Component} from 'vue';

export type PopUpBase = {
  slot: Component;
  props?: Record<string, unknown>;
  emits?: Record<string, unknown>;
};

export type PopUpModal = PopUpBase & {
  _tag: 'modal';
}

export type PopUpMenuPosition = {
  x: number;
  y: number;
};

export type PopUpMenu = PopUpBase & {
  _tag: 'menu';
  position: PopUpMenuPosition;
}

export type PopUp = PopUpModal | PopUpMenu;

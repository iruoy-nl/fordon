import type {Component} from "vue";

export type Modal = {
  slot: Component;
  props: Record<string, unknown>;
};

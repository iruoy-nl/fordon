import {Component} from "vue";

export type Modal = {
  slot: Component;
  bind: Record<string, unknown>;
  on: Record<string, (data: any) => void>;
};

import * as A from 'fp-ts/lib/Array';
import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import {Component, markRaw, ref} from "vue";
import type {Modal} from "~/types";

export const modals = ref<Modal[]>([]);

export function openModal(
  slot: Component,
  props: Record<string, unknown>,
): void {
  modals.value = pipe(
    modals.value,
    A.append({
      slot: markRaw(slot),
      props
    }),
  );
}

export function closeModal(
  index: number,
): void {
  modals.value = pipe(
    modals.value,
    A.deleteAt(index),
    O.getOrElse(() => modals.value)
  );
}
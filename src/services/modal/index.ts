import * as A from 'fp-ts/lib/Array';
import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import {AsyncComponentLoader, defineAsyncComponent, markRaw, ref} from "vue";
import type {Modal} from "~/types";

export const modals = ref<Modal[]>([]);

export function openModal(
  loader: AsyncComponentLoader,
  bind: Record<string, unknown> = {},
  on: Record<string, (data: any) => Promise<void> | void> = {},
): void {
  const slot = defineAsyncComponent(loader);

  modals.value = pipe(
    modals.value,
    A.append({
      slot: markRaw(slot),
      bind,
      on,
    }),
  );
}

export function closeModal(
  index: number = 0,
): void {
  modals.value = pipe(
    modals.value,
    A.deleteAt(index),
    O.getOrElse(() => modals.value)
  );
}
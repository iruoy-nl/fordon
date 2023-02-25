import * as A from 'fp-ts/lib/Array';
import {pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import {markRaw, ref} from 'vue';
import {PopUp, PopUpMenu, PopUpModal} from '~/types';

export const popUps = ref<PopUp[]>([]);

export function openMenu(menu: Omit<PopUpMenu, '_tag'>): void {
  return openPopUp({_tag: 'menu', ...menu});
}

export function openModal(modal: Omit<PopUpModal, '_tag'>): void {
  return openPopUp({_tag: 'modal', ...modal});
}

function openPopUp(popUp: PopUp): void {
  pipe(
    popUps.value,
    A.mapWithIndex((i, m) => {
      if (m._tag === 'menu') {
        closePopUp(i);
      }
    })
  );

  popUp.slot = markRaw(popUp.slot);

  popUps.value = pipe(
    popUps.value,
    A.append(popUp)
  );
}

export function closePopUp(
  index = 0
): void {
  popUps.value = pipe(
    popUps.value,
    A.deleteAt(index),
    O.getOrElse(() => popUps.value)
  );
}
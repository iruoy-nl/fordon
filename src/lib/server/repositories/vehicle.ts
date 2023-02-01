import {firestore} from '$lib/server/firebase/admin';
import {handleFirestoreError} from '$lib/server/utilities/firebase';
import type {AddVehicle, EditVehicle, ListVehicles, RemoveVehicle, Vehicle} from "$lib/types";
import * as A from 'fp-ts/lib/Array';
import {constVoid, pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

export const listVehicles = ((config) => {
  const query = firestore
    .collection('vehicles')
    .where('user', '==', config.userId);

  return pipe(
    TE.tryCatch(
      () => query.get(),
      handleFirestoreError,
    ),
    TE.map((a) => {
      return pipe(
        a.docs,
        A.map((b) => {
          const id = b.id;
          const data = b.data();

          return {id, ...data} as Vehicle;
        }),
      );
    }),
  );
}) satisfies ListVehicles;

export const addVehicle = ((data, config) => {
  const query = firestore
    .collection('vehicles');

  return pipe(
    TE.tryCatch(
      () => query.add({...data, user: config.userId}),
      handleFirestoreError,
    ),
    TE.map(constVoid),
  );
}) satisfies AddVehicle;

export const editVehicle = ((id, data, config) => {
  const query = firestore
    .collection('vehicles')
    .doc(id);

  return pipe(
    TE.tryCatch(
      () => query.update({...data, user: config.userId}),
      handleFirestoreError,
    ),
    TE.map(constVoid),
  );
}) satisfies EditVehicle;

export const removeVehicle = ((id) => {
  const query = firestore
    .collection('vehicles')
    .doc(id);

  return pipe(
    TE.tryCatch(
      () => query.delete(),
      handleFirestoreError,
    ),
    TE.map(constVoid),
  );
}) satisfies RemoveVehicle;
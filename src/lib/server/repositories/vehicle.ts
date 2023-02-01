import {firestore} from '$lib/server/firebase/admin';
import {handleFirestoreError} from '$lib/server/utilities/firebase';
import type {Vehicle, VehicleForm} from "$lib/types";
import type {DocumentReference, FirestoreDataConverter, QueryDocumentSnapshot} from 'firebase-admin/firestore';
import * as A from 'fp-ts/lib/Array';
import {constVoid, pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

const converter = ({
  fromFirestore: (snapshot: QueryDocumentSnapshot): Vehicle => {
    const data = snapshot.data();
    const userRef = (data.user as DocumentReference);

    return {
      id: snapshot.id,
      model: data.model,
      userId: userRef.id,
    };
  },
  toFirestore: (object: Vehicle): Record<string, unknown> => {
    const userRef = firestore
      .collection('users')
      .doc(object.userId);

    return {
      model: object.model,
      user: userRef,
    };
  },
}) satisfies FirestoreDataConverter<Vehicle>;

export function listVehicles(
  userId: string,
): TE.TaskEither<App.Error, Vehicle[]> {
  const user = firestore
    .collection('users')
    .doc(userId);

  const query = firestore
    .collection('vehicles')
    .where('user', '==', user)
    .withConverter(converter);

  return pipe(
    TE.tryCatch(
      () => query.get(),
      handleFirestoreError,
    ),
    TE.map((snapshot) => {
      return pipe(
        snapshot.docs,
        A.map((document) => document.data() as Vehicle),
      );
    }),
  );
}

export function addVehicle(
  data: VehicleForm,
): TE.TaskEither<App.Error, void> {
  const query = firestore
    .collection('vehicles')
    .withConverter(converter);

  return pipe(
    TE.tryCatch(
      () => query.add({id: '', ...data}),
      handleFirestoreError,
    ),
    TE.map(constVoid),
  );
}

export function editVehicle(
  vehicleId: string,
  data: VehicleForm,
): TE.TaskEither<App.Error, void> {
  const query = firestore
    .collection('vehicles')
    .doc(vehicleId);

  return pipe(
    TE.tryCatch(
      () => query.update({id: vehicleId, ...data}),
      handleFirestoreError,
    ),
    TE.map(constVoid),
  );
}

export function removeVehicle(
  vehicleId: string,
): TE.TaskEither<App.Error, void> {
  const query = firestore
    .collection('vehicles')
    .doc(vehicleId);

  return pipe(
    TE.tryCatch(
      () => query.delete(),
      handleFirestoreError,
    ),
    TE.map(constVoid),
  );
}
import { firestore } from '$lib/server/firebase/admin';
import { handleFirestoreError } from '$lib/server/utilities/firebase';
import type { Vehicle } from "$lib/types";
import type { FirestoreDataConverter } from 'firebase-admin/firestore';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';

const converter = ({
    fromFirestore: (snapshot) => {
        const data = snapshot.data();

        return {
            uid: snapshot.id,
            model: data.model,
        }
    },
    toFirestore: (vehicle) => {
        return {
            model: vehicle.model,
        };
    },
}) satisfies FirestoreDataConverter<Vehicle>;

export const listVehicles = (
    uid: string,
): TE.TaskEither<App.Error, Vehicle[]> => {
    const query = firestore
        .collection('users')
        .doc(uid)
        .collection('vehicles')
        .withConverter(converter);

    return pipe(
        TE.tryCatch(
            () => query.get(),
            handleFirestoreError,
        ),
        TE.map((snapshot) => {
            return pipe(
                snapshot.docs,
                A.map((document) => document.data()),
            );
        }),
    );
};
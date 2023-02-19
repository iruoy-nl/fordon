import * as A from 'fp-ts/lib/Array';
import {constVoid, pipe} from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import {ClientResponseError, Record} from 'pocketbase';
import {ref} from 'vue';
import {pb} from '~/di';
import {getFileUrl} from '~/services/url';
import {user} from '~/state/user';
import {Vehicle} from '~/types';

const collection = 'vehicles';

export const vehicles = ref<Vehicle[]>([]);

export function toVehicle(
  record: Record
): Vehicle {
  const vehicle = record.export() as Vehicle;

  vehicle.photoUrl = getFileUrl(
    collection,
    vehicle.id,
    vehicle.photo
  );

  return vehicle;
}

export function getAllVehicles(): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).getFullList(),
      (a) => a as ClientResponseError
    ),
    TE.map((b) => {
      return b.map(toVehicle);
    }),
    TE.map((c) => {
      vehicles.value = c;
    })
  );
}

export function getVehicleById(
  vehicleId: string
): TE.TaskEither<Error, void> {
  const exists = pipe(
    vehicles.value,
    A.exists((a) => a.id === vehicleId)
  );

  if (exists) {
    return TE.of(constVoid());
  }

  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).getOne(vehicleId),
      (a) => a as ClientResponseError
    ),
    TE.map((b) => {
      return toVehicle(b);
    }),
    TE.map((c) => {
      vehicles.value = pipe(
        vehicles.value,
        A.append(c)
      );
    })
  );
}

export function insertOneVehicle(
  data: FormData
): TE.TaskEither<Error, void> {
  // Associates this vehicle with the correct user.
  pipe(
    user.value,
    O.map((a) => data.append('user', a.id))
  );

  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).create(data),
      (a) => a as ClientResponseError
    ),
    TE.map((b) => {
      return toVehicle(b);
    }),
    TE.map((c) => {
      vehicles.value = pipe(
        vehicles.value,
        A.append(c)
      );
    })
  );
}

export function updateVehicleById(
  vehicleId: string,
  data: FormData
): TE.TaskEither<Error, void> {
  // Associates this vehicle with the correct user.
  pipe(
    user.value,
    O.map((a) => data.append('user', a.id))
  );

  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).update(vehicleId, data),
      (a) => a as ClientResponseError
    ),
    TE.map((b) => {
      return toVehicle(b);
    }),
    TE.map((c) => {
      vehicles.value = pipe(
        vehicles.value,
        A.map((d) => c.id === d.id ? c : d)
      );
    })
  );
}

export function deleteVehicleById(
  vehicleId: string
): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).delete(vehicleId),
      (a) => a as ClientResponseError
    ),
    TE.map(() => {
      vehicles.value = pipe(
        vehicles.value,
        A.filter((a) => a.id !== vehicleId)
      );
    })
  );
}
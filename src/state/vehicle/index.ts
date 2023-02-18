import * as A from 'fp-ts/lib/Array';
import {constVoid, pipe} from "fp-ts/lib/function";
import * as O from 'fp-ts/lib/Option';
import * as TE from "fp-ts/lib/TaskEither";
import {ClientResponseError, Record} from "pocketbase";
import {ref} from "vue";
import {pb} from "~/di";
import {getFileUrl} from "~/services/url";
import {user} from '~/state/user';
import {Vehicle} from "~/types";

const collection = "vehicles";

export const vehicles = ref<Vehicle[]>([]);

export const selected = ref<O.Option<Vehicle>>(O.none);

/**
 * Convert a Pocketbase record to a Vehicle object.
 * 
 * @param record The record from Pocketbase.
 */
export function toVehicle(
  record: Record,
): Vehicle {
  const vehicle = record.export() as Vehicle;

  // Correctly associate the url of the photo.
  vehicle.photoUrl = getFileUrl(
    collection,
    vehicle.id,
    vehicle.photo,
  );

  return vehicle;
}

/**
 * Get all vehicles.
 */
export function getAllVehicles(): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).getFullList(),
      (a) => a as ClientResponseError,
    ),
    TE.map((b) => {
      return b.map(toVehicle);
    }),
    TE.map((c) => {
      // Set the state.
      vehicles.value = c;
    }),
  );
};

/**
 * Get one vehicle.
 */
export function getVehicleById(
  id: string,
): TE.TaskEither<Error, void> {
  // Quick exit when the vehicle has already been loaded.
  const exists = pipe(
    vehicles.value,
    A.exists((a) => a.id === id),
  );

  if (exists) {
    return TE.of(constVoid());
  };

  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).getOne(id),
      (a) => a as ClientResponseError,
    ),
    TE.map((b) => {
      return toVehicle(b);
    }),
    TE.map((c) => {
      // Set the state.

      vehicles.value = pipe(
        vehicles.value,
        A.append(c),
      );
    }),
  );
}

/**
 * Add one vehicle.
 */
export function addOneVehicle(
  data: FormData,
): TE.TaskEither<Error, void> {
  // Associates this vehicle with the correct user.
  pipe(
    user.value,
    O.map((a) => data.append('user', a.id)),
  );

  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).create(data),
      (a) => a as ClientResponseError,
    ),
    TE.map((b) => {
      return toVehicle(b);
    }),
    TE.map((c) => {
      // Set the state.
      vehicles.value = pipe(
        vehicles.value,
        A.append(c),
      );
    }),
  );
}

/**
 * Edit a vehicle.
 */
export function editVehicleById(
  id: string,
  data: FormData,
): TE.TaskEither<Error, void> {
  // Associates this vehicle with the correct user.
  pipe(
    user.value,
    O.map((a) => data.append('user', a.id)),
  );

  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).update(id, data),
      (a) => a as ClientResponseError,
    ),
    TE.map((b) => {
      return toVehicle(b);
    }),
    TE.map((c) => {
      // Set the state.
      vehicles.value = pipe(
        vehicles.value,
        A.map((d) => c.id === d.id ? c : d),
      );
    }),
  );
}

/**
 * Remove a vehicle.
 */
export function removeVehicleById(
  id: string,
): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).delete(id),
      (a) => a as ClientResponseError,
    ),
    TE.map(() => {
      // Set the state.
      vehicles.value = pipe(
        vehicles.value,
        A.filter((a) => a.id !== id)
      );
    })
  );
}
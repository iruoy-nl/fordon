import {pipe} from "fp-ts/lib/function";
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
  if (vehicle.photo !== null) {
    vehicle.photoUrl = getFileUrl(
      collection,
      vehicle.id,
      vehicle.photo,
    );
  }

  return vehicle;
}

/**
 * Get all vehicles.
 */
export function getAll(): TE.TaskEither<Error, void> {
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
export function getOne(
  id: string,
): TE.TaskEither<Error, void> {
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
      selected.value = O.some(c);
    }),
  );
}

/**
 * Add one vehicle.
 */
export function addOne(
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
      vehicles.value = [...vehicles.value, c];
    }),
  );
}
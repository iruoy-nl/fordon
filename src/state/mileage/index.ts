import * as A from 'fp-ts/lib/Array';
import {pipe} from "fp-ts/lib/function";
import * as TE from 'fp-ts/lib/TaskEither';
import {ClientResponseError, Record} from "pocketbase";
import {ref} from "vue";
import {pb} from "~/di";
import {Mileage} from "~/types";
import {toVehicle} from "../vehicle";

const collection = 'mileages';

export const mileages = ref<Mileage[]>([]);

/**
 * Convert a Pocketbase record to a Mileage object.
 * 
 * @param record The record from Pocketbase.
 */
export function toMileage(
  record: Record,
): Mileage {
  const mileage = record.export() as Mileage;

  if ('vehicle' in record.expand) {
    mileage.vehicle = toVehicle(record.expand.vehicle as Record);
  }

  return mileage;
}

/**
 * Get all mileages.
 */
export function getAllMileages(): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => {
        return pb
          .collection(collection)
          .getFullList(undefined, {
            expand: 'vehicle',
            sort: '-date'
          });
      },
      (a) => a as ClientResponseError,
    ),
    TE.map((b) => {
      return b.map(toMileage);
    }),
    TE.map((c) => {
      // Set the state.
      mileages.value = c;
    }),
  );
};

/**
 * Add one mileage.
 */
export function addOneMileage(
  data: FormData,
  vehicleId: string,
): TE.TaskEither<Error, void> {
  // Associates this mileage with the correct vehicle.
  data.append('vehicle', vehicleId);

  return pipe(
    TE.tryCatch(
      () => {
        return pb
          .collection(collection)
          .create(data, {
            expand: 'vehicle'
          });
      },
      (a) => a as ClientResponseError,
    ),
    TE.map((b) => {
      return toMileage(b);
    }),
    TE.map((c) => {
      // Set the state.
      mileages.value = pipe(
        mileages.value,
        A.prepend(c)
      );
    }),
  );
}
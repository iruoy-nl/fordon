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

export function toMileage(
  record: Record,
): Mileage {
  const mileage = record.export() as Mileage;

  if ('vehicle' in record.expand) {
    mileage.vehicle = toVehicle(record.expand.vehicle as Record);
  }

  return mileage;
}

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
      mileages.value = c;
    }),
  );
};

export function insertOneMileage(
  data: FormData,
): TE.TaskEither<Error, void> {
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
      mileages.value = pipe(
        mileages.value,
        A.prepend(c)
      );
    }),
  );
}

export function updateMileageById(
  mileageId: string,
  data: FormData,
): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => {
        return pb
          .collection(collection)
          .update(mileageId, data, {
            expand: 'vehicle'
          });
      },
      (a) => a as ClientResponseError,
    ),
    TE.map((b) => {
      return toMileage(b);
    }),
    TE.map((c) => {
      mileages.value = pipe(
        mileages.value,
        A.map((d) => c.id === d.id ? c : d),
      );
    }),
  );
}

export function deleteMileageById(
  mileageId: string,
): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).delete(mileageId),
      (a) => a as ClientResponseError,
    ),
    TE.map(() => {
      mileages.value = pipe(
        mileages.value,
        A.filter((a) => a.id !== mileageId)
      );
    })
  );
}
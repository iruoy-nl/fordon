import * as A from 'fp-ts/lib/Array';
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {ClientResponseError, Record} from 'pocketbase';
import {ref} from 'vue';
import {pb} from '~/di';
import {toVehicle} from '~/state/vehicle';
import {Part} from '~/types';

const collection = 'parts';

export const parts = ref<Part[]>([]);

export function toPart(
  record: Record
): Part {
  const part = record.export() as Part;

  if ('vehicle' in record.expand) {
    part.vehicle = toVehicle(record.expand.vehicle as Record);
  }

  return part;
}

export function getAllParts(): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => {
        return pb
          .collection(collection)
          .getFullList(undefined, {
            expand: 'vehicle',
            sort: 'title'
          });
      },
      (a) => a as ClientResponseError
    ),
    TE.map((b) => {
      return b.map(toPart);
    }),
    TE.map((c) => {
      parts.value = c;
    })
  );
}

export function insertOnePart(
  data: FormData
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
      (a) => a as ClientResponseError
    ),
    TE.map((b) => {
      return toPart(b);
    }),
    TE.map((c) => {
      parts.value = pipe(
        parts.value,
        A.prepend(c)
      );
    })
  );
}

export function updatePartById(
  partId: string,
  data: FormData
): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => {
        return pb
          .collection(collection)
          .update(partId, data, {
            expand: 'vehicle'
          });
      },
      (a) => a as ClientResponseError
    ),
    TE.map((b) => {
      return toPart(b);
    }),
    TE.map((c) => {
      parts.value = pipe(
        parts.value,
        A.map((d) => c.id === d.id ? c : d)
      );
    })
  );
}

export function deletePartById(
  partId: string
): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).delete(partId),
      (a) => a as ClientResponseError
    ),
    TE.map(() => {
      parts.value = pipe(
        parts.value,
        A.filter((a) => a.id !== partId)
      );
    })
  );
}
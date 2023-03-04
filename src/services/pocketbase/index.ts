import * as A from 'fp-ts/lib/Array';
import {constVoid, pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {ClientResponseError, Record, RecordListQueryParams} from 'pocketbase';
import {pb} from '~/di';

export type Converter<T> = (record: Record) => T;

export function getAll<T>(
  collection: string,
  converter: Converter<T>,
  queryParams: RecordListQueryParams = {}
): TE.TaskEither<Error, T[]> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).getFullList(undefined, queryParams),
      (a) => a as ClientResponseError
    ),
    TE.map((b) => {
      return pipe(
        b,
        A.map(converter)
      );
    })
  );
}

export function getById<T>(
  collection: string,
  converter: Converter<T>,
  id: string
): TE.TaskEither<Error, T> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).getOne(id),
      (a) => a as ClientResponseError
    ),
    TE.map(converter)
  );
}

export function insert<T>(
  collection: string,
  converter: Converter<T>,
  data: FormData,
  queryParams: RecordListQueryParams = {}
): TE.TaskEither<Error, T> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).create(data, queryParams),
      (a) => a as ClientResponseError
    ),
    TE.map(converter)
  );
}

export function updateById<T>(
  collection: string,
  converter: Converter<T>,
  id: string,
  data: FormData
): TE.TaskEither<Error, T> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).update(id, data),
      (a) => a as ClientResponseError
    ),
    TE.map(converter)
  );
}

export function deleteById(
  collection: string,
  id: string
): TE.TaskEither<Error, void> {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).delete(id),
      (a) => a as ClientResponseError
    ),
    TE.map(constVoid)
  );
}
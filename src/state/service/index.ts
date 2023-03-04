import * as A from 'fp-ts/lib/Array';
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import {Record} from 'pocketbase';
import {ref} from 'vue';
import {deleteById, getAll, insert, updateById} from '~/services/pocketbase';
import {toVehicle} from '~/state/vehicle';
import type {Service} from '~/types';

const collection = 'services';

export const services = ref<Service[]>([]);

function converter(
  record: Record
): Service {
  const service = record.export() as Service;

  if ('vehicle' in record.expand) {
    service.vehicle = toVehicle(record.expand.vehicle as Record);
  }

  return service;
}

export function getAllServices(): TE.TaskEither<Error, void> {
  return pipe(
    getAll(collection, converter, {expand: 'vehicle'}),
    TE.map((a) => {
      services.value = a;
    })
  );
}

export function insertService(
  data: FormData
): TE.TaskEither<Error, void> {
  return pipe(
    insert(collection, converter, data, {expand: 'vehicle'}),
    TE.map((a) => {
      services.value = pipe(
        services.value,
        A.append(a)
      );
    })
  );
}

export function updateServiceById(
  serviceId: string,
  data: FormData
): TE.TaskEither<Error, void> {
  return pipe(
    updateById(collection, converter, serviceId, data),
    TE.map((a) => {
      services.value = pipe(
        services.value,
        A.map((b) => a.id === b.id ? a : b)
      );
    })
  );
}

export function deleteServiceById(
  serviceId: string
): TE.TaskEither<Error, void> {
  return pipe(
    deleteById(collection, serviceId),
    TE.map(() => {
      services.value = pipe(
        services.value,
        A.filter((a) => a.id !== serviceId)
      );
    })
  );
}
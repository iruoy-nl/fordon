export * from '~/types/form';
export * from '~/types/mileage';
export * from '~/types/part';
export * from '~/types/pop-up';
export * from '~/types/provider';
export * from '~/types/service';
export * from '~/types/user';
export * from '~/types/vehicle';

export type Item<T> = T & {
  id: string;
}
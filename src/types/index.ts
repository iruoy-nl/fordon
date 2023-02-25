export * from '~/types/context-menu';
export * from '~/types/form';
export * from '~/types/mileage';
export * from '~/types/modal';
export * from '~/types/part';
export * from '~/types/provider';
export * from '~/types/user';
export * from '~/types/vehicle';

export type Item<T> = T & {
  id: string;
}
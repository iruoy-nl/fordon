import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';

export interface User {
  id: string;
  email: O.Option<string>;
}

export interface Page {
  icon: string;
  title: string;
  href: string;
}

export interface Vehicle {
  id: string;
  model: string;
  user: string;
}

export type VehicleForm = Omit<Vehicle, 'id' | 'user'>;

export type ListVehicles = (
  config: {userId: string},
) => TE.TaskEither<App.Error, Vehicle[]>;

export type AddVehicle = (
  data: VehicleForm,
  config: {userId: string},
) => TE.TaskEither<App.Error, void>;

export type EditVehicle = (
  id: string,
  data: VehicleForm,
  config: {userId: string},
) => TE.TaskEither<App.Error, void>;

export type RemoveVehicle = (
  id: string,
  config: {userId: string},
) => TE.TaskEither<App.Error, void>;
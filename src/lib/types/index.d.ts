import * as O from 'fp-ts/lib/Option';

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
  userId: string;
}

export type VehicleForm = Omit<Vehicle, 'id'>;
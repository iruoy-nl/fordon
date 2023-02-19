import {Vehicle} from '~/types';

export type Mileage = {
  id: string;
  mileage: number;
  date: string;
  vehicle: Vehicle;
};
import {Vehicle} from '~/types/vehicle';

export type Part = {
  id: string;
  title: string;
  url: string;
  vehicle: Vehicle;
};
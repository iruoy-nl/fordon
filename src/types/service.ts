import {Vehicle} from '~/types';

export type Service = {
  id: string;
  title: string;
  mileage?: number;
  months?: number;
  action: 'tighten' | 'inspect' | 'replace' | 'clean';
  vehicle: Vehicle;
};
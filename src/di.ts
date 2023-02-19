import {pipe} from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import Pocketbase from 'pocketbase';
import {getEnv} from '~/services/env';

export const pbUrl = pipe(
  getEnv('VITE_POCKETBASE_URL'),
  O.getOrElse(() => 'http://localhost:8090')
);

export const redirectUrl = pipe(
  getEnv('VITE_REDIRECT_URL'),
  O.getOrElse(() => 'http://localhost:5173/oauth')
);

export const pb = new Pocketbase(pbUrl);

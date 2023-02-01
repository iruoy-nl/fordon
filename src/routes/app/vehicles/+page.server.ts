import {listVehicles} from '$lib/server/repositories/vehicle';
import {getUser} from '$lib/server/utilities/sveltekit';
import {error} from '@sveltejs/kit';
import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/lib/TaskEither';
import type {PageServerLoad} from './$types';

export const load = (async ({locals}) => {
  const user = getUser(locals);

  const vehicles = pipe(
    listVehicles(user.id),
    TE.match(
      (e) => {
        throw error(422, e);
      },
      (a) => a,
    ),
  );

  return {
    vehicles: vehicles(),
  };
}) satisfies PageServerLoad;
import {addVehicle, editVehicle, listVehicles} from '$lib/server/repositories/vehicle';
import {getData} from '$lib/server/utilities/form';
import {getUser} from '$lib/server/utilities/sveltekit';
import {error, fail, type Actions} from '@sveltejs/kit';
import {pipe} from 'fp-ts/lib/function';
import * as T from 'fp-ts/lib/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import type {PageServerLoad} from './$types';

export const load = (async ({locals}) => {
  const user = getUser(locals);

  const vehicles = pipe(
    listVehicles({userId: user.id}),
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

export const actions = ({
  /**
   * Add a vehicle.
   */
  add: async ({request, locals}) => {
    const user = getUser(locals);

    return pipe(
      getData(request),
      T.chain((data) => {
        const model = String(data.model);

        return addVehicle({model}, {userId: user.id});
      }),
      TE.matchW(
        (error) => {
          return fail(400, {ok: false, error});
        },
        () => {
          // The vehicle was added sucessfully.
          return {ok: true, error: null};
        },
      ),
    )();
  },
  /**
   * Edit a vehicle.
   */
  edit: async ({request, locals}) => {
    const user = getUser(locals);

    return pipe(
      getData(request),
      T.chain((data) => {
        console.log(data);
        const id = String(data.id);
        const model = String(data.model);

        return editVehicle(id, {model}, {userId: user.id});
      }),
      TE.matchW(
        (error) => {
          return fail(400, {ok: false, error});
        },
        () => {
          // The vehicle was edited successfully.
          return {ok: true, error: null};
        },
      ),
    )();
  },
}) satisfies Actions;
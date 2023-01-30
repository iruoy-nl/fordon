import {listVehicles} from "$lib/server/repositories/vehicle";
import {error, redirect, type ServerLoad} from "@sveltejs/kit";
import {pipe} from "fp-ts/lib/function";
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';

export const load = (async ({locals}) => {
  const user = locals.user;

  if (O.isNone(user)) {
    throw redirect(302, '/oauth');
  }

  const vehicles = pipe(
    listVehicles(user.value.id),
    TE.match(
      (e) => {
        throw error(422, e);
      },
      (vehicles) => vehicles,
    ),
  )();

  return {
    vehicles,
  };
}) satisfies ServerLoad;
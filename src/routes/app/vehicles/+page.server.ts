import { listVehicles } from "$lib/server/repositories/vehicle";
import { redirect, type ServerLoad } from "@sveltejs/kit";
import { pipe } from "fp-ts/lib/function";
import * as O from 'fp-ts/lib/Option';

export const load = (async ({ locals }) => {
    const user = locals.user;

    if (O.isNone(user)) {
        throw redirect(302, '/oauth');
    }

    const vehicles = pipe(
        user.value.uid,
        listVehicles
    )();

    return {
        vehicles,
    };
}) satisfies ServerLoad;
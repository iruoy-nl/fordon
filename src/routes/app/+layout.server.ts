import { redirect } from '@sveltejs/kit';
import * as O from 'fp-ts/lib/Option';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (O.isNone(locals.user)) {
        throw redirect(302, '/oauth');
    }

    return {
        user: locals.user.value,
    };
}) satisfies LayoutServerLoad;
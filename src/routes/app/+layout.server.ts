import { redirect } from '@sveltejs/kit';
import * as O from 'fp-ts/lib/Option';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const user = locals.user;

    if (O.isNone(user)) {
        throw redirect(302, '/oauth');
    }

    return {
        user: user.value,
    };
}) satisfies LayoutServerLoad;
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url }) => {
    if (url.pathname === '/oauth') {
        throw redirect(302, '/oauth/challenge');
    }
}) satisfies LayoutServerLoad;
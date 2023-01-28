import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url }) => {
    if (url.pathname === '/') {
        throw redirect(302, '/app');
    }
}) satisfies LayoutServerLoad;
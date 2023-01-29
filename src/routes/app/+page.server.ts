import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load = (async ({ locals, url }) => {
    if (url.pathname === '/app') {
        throw redirect(302, '/app/dashboard');
    }

    return {
        user: locals.user,
    };
}) satisfies ServerLoad;
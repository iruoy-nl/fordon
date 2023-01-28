import type { ServerLoad } from "@sveltejs/kit";

export const load = (async ({ locals }) => {
    //
    return {
        user: locals.user,
    };
}) satisfies ServerLoad;
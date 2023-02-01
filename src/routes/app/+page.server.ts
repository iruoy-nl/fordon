import {redirect, type ServerLoad} from "@sveltejs/kit";

export const load = (async ({url}) => {
  if (url.pathname === '/app') {
    throw redirect(302, '/app/dashboard');
  }
}) satisfies ServerLoad;
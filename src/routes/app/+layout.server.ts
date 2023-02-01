import {getUser} from '$lib/server/utilities/sveltekit';
import type {LayoutServerLoad} from './$types';

export const load = (async ({locals}) => {
  const user = getUser(locals);

  return {
    user,
  };
}) satisfies LayoutServerLoad;
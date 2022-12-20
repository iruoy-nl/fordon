import { redirect, type Actions, type ServerLoad } from "@sveltejs/kit";
import { isNone } from "fp-ts/Option";

export const load: ServerLoad = ({ locals }) => {
  //
  if (isNone(locals.user)) {
    throw redirect(301, "/login");
  }
};

export const actions: Actions = {
  /**
   * Handle logout.
   */
  logout: async ({ locals }) => {
    //
    locals.pocketbase.authStore.clear();

    throw redirect(301, "/login");
  },
};
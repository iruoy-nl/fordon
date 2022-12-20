import type { ServerLoad } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export const load: ServerLoad = ({ locals }) => {
  // Redirect to login when invalid.
  if (!locals.pocketbase.authStore.isValid) {
    throw redirect(301, "/login");
  }

  return {
    user: JSON.parse(JSON.stringify(locals.user)),
  };
};

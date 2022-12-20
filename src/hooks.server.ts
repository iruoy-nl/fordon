import { pocketbase } from "$lib/server/pocketbase";
import type { Handle } from "@sveltejs/kit";

/**
 * Handles an incoming request.
 *
 * @param input The incoming request.
 */
export const handle: Handle = async ({ event, resolve }): Promise<Response> => {
  // Make Pocketbase available locally.
  event.locals.pocketbase = pocketbase;

  // Load the user via the cookie.
  const cookie = event.request.headers.get("cookie") || "";
  pocketbase.authStore.loadFromCookie(cookie);

  try {
    await pocketbase.collection("users").authRefresh();
  } catch (_) {
    // The cookie is invalid.
    pocketbase.authStore.clear();
  }

  if (pocketbase.authStore.isValid) {
    // Update the local user record.
    event.locals.user = pocketbase.authStore.model;
  }

  const response = await resolve(event);

  // Set the new cookie.
  response.headers.set("set-cookie", pocketbase.authStore.exportToCookie());

  return response;
};

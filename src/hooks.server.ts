import { pocketbase } from "$lib/server/pocketbase";
import type { User } from "$lib/types";
import type { Handle } from "@sveltejs/kit";
import { none, some } from "fp-ts/Option";

export const handle: Handle = async ({ event, resolve }) => {
  // Attempt to load the user's data via the cookie.
  const cookie = event.request.headers.get("cookie");
  pocketbase.authStore.loadFromCookie(cookie || "");

  // Validate the cookie.
  try {
    await pocketbase //
      .collection("users")
      .authRefresh();
  } catch (_) {
    pocketbase.authStore //
      .clear();
  }

  // Update the locals.
  event.locals.user = pocketbase.authStore.isValid //
    ? some(pocketbase.authStore.model as User)
    : none;

  const response = await resolve(event);

  // Ensure the cookie is set.
  response.headers.set("set-cookie", pocketbase.authStore.exportToCookie());

  return response;
};

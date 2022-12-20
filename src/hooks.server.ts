import { pocketbase } from "$lib/server/pocketbase";
import type { User } from "$lib/types";
import type { Handle } from "@sveltejs/kit";
import { none, some } from "fp-ts/Option";

export const handle: Handle = async ({ event, resolve }) => {
  //
  event.locals.pocketbase = pocketbase;

  // Attempt to load the user's data via the cookie.
  const cookie = event.request.headers.get("cookie");
  event.locals.pocketbase.authStore.loadFromCookie(cookie || "");

  // Validate the cookie.
  try {
    await event.locals.pocketbase
      .collection("users")
      .authRefresh();
  } catch (_) {
    event.locals.pocketbase.authStore.clear();
  }

  // Update the locals.
  event.locals.user = event.locals.pocketbase.authStore.isValid //
    ? some(event.locals.pocketbase.authStore.model as User)
    : none;

  const response = await resolve(event);

  // Ensure the cookie is set.
  response.headers.set(
    "set-cookie",
    event.locals.pocketbase.authStore.exportToCookie(),
  );

  return response;
};

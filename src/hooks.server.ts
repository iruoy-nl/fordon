import { POCKETBASE_URL } from "$env/static/private";
import type { User } from "$lib/types";
import type { Handle } from "@sveltejs/kit";
import * as E from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import PocketBase from "pocketbase";

export const handle: Handle = async ({ event, resolve }) => {
  //
  const { locals, request } = event;

  // Initialise the locals.
  locals.pocketbase = new PocketBase(POCKETBASE_URL);
  locals.user = O.none;

  // Load the cookie.
  const { headers } = request;
  const cookie = O.fromNullable(headers.get("cookie"));

  if (O.isSome(cookie)) {
    locals.pocketbase.authStore.loadFromCookie(cookie.value);
  }

  // Validate the cookie.
  const one = await TE.tryCatch(
    () => {
      return locals.pocketbase //
        .collection("users")
        .authRefresh();
    },
    () => null
  )();

  if (E.isLeft(one)) {
    locals.pocketbase.authStore.clear();
  }

  // Set the current user.
  const { authStore } = locals.pocketbase;

  if (authStore.isValid) {
    locals.user = O.some(authStore.model?.export() as User);
  }

  const response = await resolve(event);

  // Set the cookie.
  headers.set("set-cookie", authStore.exportToCookie());

  return response;
};

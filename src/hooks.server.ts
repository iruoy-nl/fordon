import type { User } from "$lib/types";
import { pb } from "$server/domain";
import type { Handle } from "@sveltejs/kit";
import * as E from "fp-ts/Either";
import { fromNullable, isSome, some } from "fp-ts/Option";
import { tryCatch } from "fp-ts/TaskEither";

export const handle: Handle = async ({ event, resolve }) => {
  //
  const { locals, request } = event;

  // Load the cookie.
  const cookie = fromNullable(request.headers.get("cookie"));

  if (isSome(cookie)) {
    pb.authStore.loadFromCookie(cookie.value);
  }

  // Validate the cookie.
  const one = await tryCatch(
    () => pb.collection("users").authRefresh(),
    () => null
  )();

  if (E.isLeft(one)) {
    pb.authStore.clear();
  }

  // Set the current user.
  if (pb.authStore.isValid) {
    const user = pb.authStore.model?.export() as User;

    locals.user = some(user);
  }

  const response = await resolve(event);

  // Set the cookie.
  response.headers.set("set-cookie", pb.authStore.exportToCookie());

  return response;
};

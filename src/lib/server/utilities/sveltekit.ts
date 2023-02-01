import type {User} from "$lib/types";
import {redirect} from "@sveltejs/kit";
import * as O from 'fp-ts/lib/Option';

/**
 * Gets the user, or when not available, throws a redirect to '/oauth'.
 * 
 * @param locals The current locals.
 */
export function getUser(
  locals: App.Locals,
): User {
  const user = locals.user;

  if (O.isNone(user)) {
    throw redirect(302, '/oauth');
  }

  return user.value;
}
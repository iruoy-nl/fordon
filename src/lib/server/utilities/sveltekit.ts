import type {User} from "$lib/types";
import {redirect} from "@sveltejs/kit";
import {pipe} from "fp-ts/lib/function";
import * as O from 'fp-ts/lib/Option';

/**
 * Gets the user, or when not available, throws a redirect to '/oauth'.
 * 
 * @param locals The current locals.
 */
export function getUser(
  locals: App.Locals,
): User {
  return pipe(
    locals.user,
    O.match(
      () => {
        throw redirect(302, '/oauth');
      },
      (a) => a,
    ),
  );
}
import {constVoid, pipe} from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import type {NavigationGuard} from "vue-router";
import {user} from "~/state/user";

/**
 * Returns `{name: 'oauth'}` when the user is not authenticated.
 */
export const isAuthenticated = (() => {
  return pipe(
    user.value,
    O.matchW(
      () => {
        return {name: "oauth"};
      },
      constVoid,
    )
  );
}) satisfies NavigationGuard;

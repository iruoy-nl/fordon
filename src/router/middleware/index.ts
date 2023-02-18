import {pipe} from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import type {NavigationGuard} from "vue-router";
import {user} from "~/state/user";

export const isAuthenticated = ((_to, _from, next) => {
  return pipe(
    user.value,
    O.matchW(
      () => {
        return {name: "oauth"};
      },
      () => {
        next();
      },
    )
  );
}) satisfies NavigationGuard;

import { constVoid, pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import type { NavigationGuard } from "vue-router";
import { putTitle } from "~/services/title";
import { user } from "~/state/user";
import { PageMeta } from "~/types";

/**
 * Returns `{name: 'oauth'}` when the user is not authenticated.
 */
export const isAuthenticated = (() => {
  return pipe(
    user.value,
    O.fold(
      () => {
        return { name: "oauth" };
      },
      () => constVoid
    )
  );
}) satisfies NavigationGuard;

/**
 * Set the document's title when a meta.title is provided.
 */
export const syncTitle = ((to) => {
  pipe(
    to.meta,
    PageMeta.decode,
    O.fromEither,
    O.map(({ title }) => putTitle(title))
  );
}) satisfies NavigationGuard;

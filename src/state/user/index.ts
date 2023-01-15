import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { ref } from "vue";
import { pb } from "~/di";
import { User } from "~/types";

/**
 * The current user.
 */
export const user = ref<O.Option<User>>(O.none);

/**
 * Watch for updates on the user's authentication status.
 */
pb.authStore.onChange((_, model) => {
  user.value = pipe(
    //
    model,
    (m) => m?.export() as User | null,
    O.fromNullable
  );
}, true);

import { fileUrl } from "$lib/services/url";
import { redirect, type ServerLoad } from "@sveltejs/kit";
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";

export const load: ServerLoad = ({ locals }) => {
  //
  if (O.isNone(locals.user)) {
    throw redirect(302, "/sign-in");
  }

  const user = locals.user.value;

  return {
    user: {
      ...user,
      name: pipe(
        user.name ? O.some(user.name) : O.none,
        O.getOrElse(() => "Anoniem")
      ),
      avatar: pipe(
        user.avatar ? O.some(user.avatar) : O.none,
        O.fold(
          () => `https://avatars.dicebear.com/api/adventurer/${user.id}.svg`,
          (filename) => fileUrl("users", user.id, filename)
        )
      ),
    },
  };
};

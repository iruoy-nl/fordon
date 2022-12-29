import { fileUrl } from "$lib/services/url";
import { redirect, type ServerLoad } from "@sveltejs/kit";
import { pipe } from "fp-ts/function";
import { fold, fromNullable, getOrElse, isNone } from "fp-ts/Option";

export const load: ServerLoad = ({ locals }) => {
  //
  if (isNone(locals.user)) {
    throw redirect(302, "/sign-in");
  }

  const user = locals.user.value;

  return {
    user: {
      ...user,
      name: pipe(
        fromNullable(user.name),
        getOrElse(() => "Anoniem")
      ),
      avatar: pipe(
        fromNullable(user.avatar),
        fold(
          () => null,
          (filename) => fileUrl("users", user.id, filename)
        )
      ),
    },
  };
};

import { fileUrl } from "$lib/services/url";
import { redirect, type ServerLoad } from "@sveltejs/kit";
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
      name: user.name //
        ? user.name
        : "Anoniem",
      avatar: user.avatar //
        ? fileUrl("users", user.id, user.avatar)
        : null,
    },
  };
};

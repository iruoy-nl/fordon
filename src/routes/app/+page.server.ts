import { signOut } from "$server/repositories/user";
import { fail, redirect, type Actions, type ServerLoad } from "@sveltejs/kit";
import { isLeft } from "fp-ts/lib/Either";
import { isNone } from "fp-ts/Option";

export const load: ServerLoad = ({ locals, url }) => {
  //
  if (isNone(locals.user)) {
    throw redirect(302, "/sign-in");
  }

  if (url.pathname === "/app") {
    throw redirect(302, "/app/dashboard");
  }
};

export const actions: Actions = {
  //
  logout: async () => {
    const one = await signOut();

    if (isLeft(one)) {
      return fail(400, {
        message: one.left.message,
      });
    }

    throw redirect(302, "/sign-in");
  },
};

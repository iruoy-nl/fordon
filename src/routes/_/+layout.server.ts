import { redirect, type ServerLoad } from "@sveltejs/kit";
import { isNone } from "fp-ts/Option";

export const load: ServerLoad = ({ locals }) => {
  //
  if (isNone(locals.user)) {
    throw redirect(301, "/login");
  }

  const { id, email } = locals.user.value;

  return {
    user: { id, email },
  };
};

import { listVehicles } from "$server/repositories/vehicle";
import { redirect, type ServerLoad } from "@sveltejs/kit";
import { isNone } from "fp-ts/Option";

export const load: ServerLoad = async ({ locals }) => {
  //
  if (isNone(locals.user)) {
    throw redirect(302, "/sign-in");
  }

  const { id } = locals.user.value;

  return {
    vehicles: listVehicles(id),
  };
};

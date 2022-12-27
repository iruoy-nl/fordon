import type { Vehicle } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import * as O from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import type { ClientResponseError } from "pocketbase";
import type { PageServerLoad } from "../$types";

export const load = (async ({ locals }) => {
  //
  if (O.isNone(locals.user)) {
    throw redirect(301, "/login");
  }

  const vehicles = TE.tryCatch(
    async () => {
      // Retrieve the vehicles using Pocketbase.
      const result = await locals.pocketbase
        .collection("vehicles")
        .getList(1, 10);

      return result.items.map((item) => {
        const { avatar, ...rest } = item.export() as Vehicle;

        return {
          ...rest,
          avatar:
            avatar !== undefined
              ? locals.pocketbase.getFileUrl(item, avatar)
              : undefined,
        };
      });
    },
    (e) => (e as ClientResponseError).message
  );

  return {
    vehicles: vehicles(),
  };
}) satisfies PageServerLoad;

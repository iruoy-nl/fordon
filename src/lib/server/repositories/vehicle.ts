import { fileUrl } from "$lib/services/url";
import type { Failure, Vehicle } from "$lib/types";
import { pb } from "$server/domain";
import { map } from "fp-ts/Array";
import type { Either } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { tryCatch } from "fp-ts/TaskEither";

/**
 * List the user's vehicles.
 * @param userId The id of the current user.
 * @param options Object of possible request options.
 */
export const listVehicles = async (
  userId: string,
  options?: {
    page: 1;
    perPage: 32;
  }
): Promise<Either<Failure, Vehicle[]>> => {
  return tryCatch(
    async () => {
      const result = await pb //
        .collection("vehicles")
        .getList(options?.page, options?.perPage, {
          filter: `user.id = '${userId}'`,
        });

      return pipe(
        result.items,
        map((record) => {
          const vehicle = record.export() as Vehicle;

          // Set the avatar to an absolute url.
          if (vehicle.avatar) {
            vehicle.avatar = fileUrl("vehicles", vehicle.id, vehicle.avatar);
          }

          return vehicle;
        })
      );
    },
    () => ({
      message: `
        Er is een onbekende fout opgetreden. Probeer het op een later moment nog
        een keer.
      `,
    })
  )();
};

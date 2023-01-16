import * as A from "fp-ts/lib/Array";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import { ClientResponseError } from "pocketbase";
import { ref } from "vue";
import { pb } from "~/di";
import { getFileUrl } from "~/services/url";
import { Failure, Vehicle } from "~/types";

/**
 * The name of the collection.
 */
const collection = "vehicles";

/**
 * The user's vehicles.
 */
export const vehicles = ref<Vehicle[]>([]);

/**
 * Gets the user's vehicles.
 */
export const getVehicles = async (): Promise<E.Either<Failure, void>> => {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).getFullList(),
      (e) => {
        const error = e as ClientResponseError;

        return { message: error.message };
      }
    ),
    TE.map((values) => {
      pipe(
        values,
        A.map((v) => {
          const vehicle = v.export() as Vehicle;

          // Correctly associate the url of the photo.
          if (vehicle.photo !== null) {
            vehicle.photoUrl = getFileUrl(
              collection,
              vehicle.id,
              vehicle.photo
            );
          }

          return vehicle;
        }),
        (v) => (vehicles.value = v)
      );
    })
  )();
};

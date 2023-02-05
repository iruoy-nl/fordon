import * as A from "fp-ts/lib/Array";
import {pipe} from "fp-ts/lib/function";
import * as TE from "fp-ts/lib/TaskEither";
import {ClientResponseError} from "pocketbase";
import {ref} from "vue";
import {pb} from "~/di";
import {getFileUrl} from "~/services/url";
import {Failure, Vehicle} from "~/types";

const collection = "vehicles";

/**
 * The state.
 */
export const vehicles = ref<Vehicle[]>([]);

/**
 * List vehicles.
 */
export const listVehicles = (): TE.TaskEither<Failure, void> => {
  return pipe(
    TE.tryCatch(
      () => pb.collection(collection).getFullList(),
      (a) => {
        const error = a as ClientResponseError;

        return {message: error.message};
      }
    ),
    TE.map((b) => {
      return pipe(
        b,
        A.map((c) => {
          const vehicle = c.export() as Vehicle;

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
      );
    }),
    TE.map((d) => {
      // Set the state.
      vehicles.value = d;
    }),
  );
};

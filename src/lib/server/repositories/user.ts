import type { Failure } from "$lib/types";
import { pb } from "$server/domain";
import type { Either } from "fp-ts/Either";
import { tryCatch } from "fp-ts/TaskEither";
import type { ClientResponseError } from "pocketbase";

/**
 * Signs in the user.
 *
 * @param email The user's email address.
 * @param password The user's password.
 */
export const signIn = (
  email: string,
  password: string
): Promise<Either<Failure, void>> => {
  return tryCatch(
    async () => {
      // Attempt to authenticate with Pocketbase.
      await pb //
        .collection("users")
        .authWithPassword(email, password);
    },
    () => ({ message: "Het e-mailadres en/of wachtwoord is incorrect." })
  )();
};

/**
 * Signs up the user.
 *
 * @param email The user's email address.
 * @param password The user's password.
 * @param passwordConfirm The confirmation password.
 */
export const signUp = (
  email: string,
  password: string,
  passwordConfirm: string
): Promise<Either<Failure, void>> => {
  return tryCatch(
    async () => {
      await pb //
        .collection("users")
        .create({ email, password, passwordConfirm });
    },
    (e) => {
      const error = e as ClientResponseError;
      const { email, passwordConfirm } = error.data.data;

      if (email) {
        return { message: "Het e-mailadres is al in gebruik." };
      }

      if (passwordConfirm) {
        return { message: "De wachtwoorden komen niet overeen." };
      }

      return { message: "Er is een onbekende fout opgetreden." };
    }
  )();
};

/**
 * Signs out the user.
 */
export const signOut = (): Promise<Either<Failure, void>> => {
  return tryCatch(
    async () => {
      pb.authStore.clear();
    },
    () => ({ message: "Er is een onbekende fout opgetreden." })
  )();
};

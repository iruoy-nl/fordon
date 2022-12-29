import { pb } from "$lib/server/domain";
import type { Either } from "fp-ts/Either";
import { tryCatch } from "fp-ts/TaskEither";

/**
 * Signs in the user.
 *
 * @param email The user's email address.
 * @param password The user's password.
 */
export const signIn = (
  email: string,
  password: string
): Promise<Either<Error, void>> => {
  return tryCatch(
    async () => {
      // Attempt to authenticate with Pocketbase.
      await pb //
        .collection("users")
        .authWithPassword(email, password);
    },
    () => new Error("Het e-mailadres en/of wachtwoord is incorrect.")
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
): Promise<Either<Error, void>> => {
  return tryCatch(
    async () => {
      await pb //
        .collection("users")
        .create({ email, password, passwordConfirm });
    },
    () => new Error("Er is een onbekende fout opgetreden.")
  )();
};

/**
 * Signs out the user.
 */
export const signOut = (): Promise<Either<Error, void>> => {
  return tryCatch(
    async () => {
      pb.authStore.clear();
    },
    () => new Error("Er is een onbekende fout opgetreden.")
  )();
};

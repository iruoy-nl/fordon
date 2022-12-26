import { getData } from "$lib/helpers";
import { LoginForm, type ZodError } from "$lib/types";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import * as Either from "fp-ts/Either";
import * as TaskEither from "fp-ts/TaskEither";
import type { ClientResponseError } from "pocketbase";

export const actions: Actions = {
  //
  login: async ({ request, locals }) => {
    const data = await getData(request);

    // Parse and validate form.
    const one = Either.tryCatch(
      () => LoginForm.parse(data),
      (e) => (e as ZodError).flatten()
    );

    if (Either.isLeft(one)) {
      return fail(400, {
        data: { email: data.email },
        errors: one.left,
      });
    }

    const { email, password } = one.right;

    // Attempt to authenticate with Pocketbase.
    const two = await TaskEither.tryCatch(
      () => {
        return locals.pocketbase //
          .collection("users")
          .authWithPassword(email, password);
      },
      (e) => (e as ClientResponseError).message
    )();

    if (Either.isLeft(two)) {
      return fail(400, {
        data: { email: data.email },
        errors: {
          formErrors: [
            "Het ingevoerde e-mailadres en/of wachtwoord is incorrect.",
          ],
          fieldErrors: {},
        },
      });
    }

    throw redirect(301, "/app");
  },
};

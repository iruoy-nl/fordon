import { getData } from "$lib/helpers";
import { LoginForm, type ZodError } from "$lib/types";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import type { ClientResponseError } from "pocketbase";

export const actions: Actions = {
  //
  login: async ({ request, locals }) => {
    const data = await getData(request);

    // Parse and validate form.
    const one = E.tryCatch(
      () => LoginForm.parse(data),
      (e) => (e as ZodError).flatten()
    );

    if (E.isLeft(one)) {
      return fail(400, {
        data: { email: data.email },
        errors: one.left,
      });
    }

    // Attempt to authenticate with Pocketbase.
    const two = await TE.tryCatch(
      () => {
        const { email, password } = one.right;

        return locals.pocketbase //
          .collection("users")
          .authWithPassword(email, password);
      },
      (e) => (e as ClientResponseError).message
    )();

    if (E.isLeft(two)) {
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

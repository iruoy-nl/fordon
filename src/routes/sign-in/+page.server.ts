import { SignInForm, type ZodError } from "$lib/types";
import { signIn } from "$server/repositories/user";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { isLeft, tryCatch } from "fp-ts/Either";

export const actions: Actions = {
  //
  signIn: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);

    // Validate incoming data with Zod.
    const one = tryCatch(
      () => SignInForm.parse(data),
      (e) => (e as ZodError).flatten()
    );

    if (isLeft(one)) {
      // Validation failed.
      return fail(400, {
        data: {
          ...data,
          password: "",
        } as Partial<SignInForm>,
        errors: one.left,
      });
    }

    // Authenticate with Pocketbase.
    const { email, password } = one.right;
    const two = await signIn(email, password);

    if (isLeft(two)) {
      // Authentication failed.
      return fail(400, {
        data: {
          ...data,
          password: "",
        } as Partial<SignInForm>,
        errors: {
          formErrors: [two.left.message],
          fieldErrors: {},
        },
      });
    }

    throw redirect(302, "/app");
  },
};

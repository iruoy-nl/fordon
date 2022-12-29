import { SignUpForm, type ZodError } from "$lib/types";
import { signUp } from "$server/repositories/user";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { isLeft, tryCatch } from "fp-ts/Either";

export const actions: Actions = {
  //
  signUp: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);

    // Validate incoming data with Zod.
    const one = tryCatch(
      () => SignUpForm.parse(data),
      (e) => (e as ZodError).flatten()
    );

    if (isLeft(one)) {
      // Validation failed.
      return fail(400, {
        data: {
          ...data,
          password: "",
          passwordConfirm: "",
        } as Partial<SignUpForm>,
        errors: one.left,
      });
    }

    // Authenticate with Pocketbase.
    const { email, password, passwordConfirm } = one.right;
    const two = await signUp(email, password, passwordConfirm);

    if (isLeft(two)) {
      // Authentication failed.
      return fail(400, {
        data: {
          ...data,
          password: "",
        } as Partial<SignUpForm>,
        errors: {
          formErrors: [two.left.message],
          fieldErrors: {},
        },
      });
    }

    throw redirect(302, "/app");
  },
};

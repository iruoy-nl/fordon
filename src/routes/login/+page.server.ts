import { LoginForm } from "$lib/types";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { ZodError } from "zod";

export const actions: Actions = {
  /**
   * Handle login.
   */
  login: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = Object.fromEntries([...formData]);

    try {
      // Parse the received input, and login when valid.
      const { email, password } = LoginForm.parse(data);

      await locals.pocketbase
        .collection("users")
        .authWithPassword(email, password);
    } catch (e) {
      // Respond with the validation errors.
      const errors = (e as ZodError).flatten().fieldErrors;

      return fail(400, {
        ...{ ...data, password: "" },
        errors,
      });
    }

    throw redirect(301, "_");
  },
};

import { LoginForm } from "$lib/types";
import { fail } from "@sveltejs/kit";
import type { ZodError } from "zod";
import type { Actions } from "./$types";

export const actions: Actions = {
  /**
   * Handle the login action.
   */
  login: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    try {
      const output = LoginForm.parse(data);

      // TODO: Make the database call.
    } catch (e) {
      const errors = (e as ZodError).flatten().fieldErrors;

      return fail(400, {
        ...{ ...data, password: "" },
        errors,
      });
    }
  },
};

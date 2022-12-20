import { LoginForm } from "$lib/types";
import { fail, redirect } from "@sveltejs/kit";
import { ZodError } from "zod";
import type { Actions } from "./$types";

export const actions: Actions = {
  /**
   * Handle the login action.
   */
  login: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    try {
      const { email, password } = LoginForm.parse(data);

      await locals.pocketbase //
        .collection("users")
        .authWithPassword(email, password);
    } catch (e) {
      if (e instanceof ZodError) {
        const errors = e.flatten().fieldErrors;

        return fail(400, {
          ...{ ...data, password: "" },
          errors,
        });
      } else {
        console.error(e);
      }
    }

    throw redirect(303, "/");
  },
};

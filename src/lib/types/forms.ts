import { z } from "zod";

export type ZodError = z.ZodError;

export const SignInForm = z.object({
  email: z //
    .string()
    .min(1, { message: "Het e-mailadres is verplicht." })
    .email({ message: "Het e-mailadres is ongeldig." }),
  password: z //
    .string()
    .min(1, { message: "Het wachtwoord is verplicht." }),
});

export type SignInForm = z.infer<typeof SignInForm>;

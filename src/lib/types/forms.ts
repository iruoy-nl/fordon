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

export const SignUpForm = z.object({
  email: z //
    .string()
    .min(1, { message: "Het e-mailadres is verplicht." })
    .email({ message: "Het e-mailadres is ongeldig." }),
  password: z //
    .string()
    .min(1, { message: "Het wachtwoord is verplicht." }),
  passwordConfirm: z //
    .string()
    .min(1, { message: "Het is veplicht om het wachtwoord te herhalen." }),
});

export type SignUpForm = z.infer<typeof SignUpForm>;

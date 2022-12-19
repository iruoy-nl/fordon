import { z } from "zod";

export const LoginForm = z.object({
  email: z //
    .string()
    .min(1, { message: "Het e-mailadres is verplicht." })
    .email({ message: "Het ingevoerde e-mailadres is ongeldig." }),
  password: z //
    .string()
    .min(1, { message: "Het wachtwoord is verplicht." }),
});

export type LoginForm = z.infer<typeof LoginForm>;

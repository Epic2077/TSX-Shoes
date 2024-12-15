import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Please enter an email address."),
  password: z
    .string()
    .regex(/[0-9]/, "It must contain at least 1 number!")
    .regex(
      /[!@#$]/,
      "It's must contain at least one of the following sign's [!, @, #, $]!"
    )
    .min(8, "Password must be at least 8 characters!")
    .max(16, "Password too long!"),
});

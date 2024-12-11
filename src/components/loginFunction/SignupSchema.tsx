import { z } from "zod";

export const SignupSchema = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_.]*$/,
      "Username can only contain letters, numbers, underscores (_), and dots (.)."
    )
    .nonempty("Username is required."),
  email: z
    .string()
    .email("Email is not correct!")
    .nonempty("Email is required."),
  name: z
    .string()
    .regex(/^[a-zA-Z]+$/, "First name can only contain letters.")
    .nonempty("First name is required."),
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, "Last name can only contain letters.")
    .nonempty("Last name is required."),
  password: z
    .string()
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[!@#$]/,
      "Password must contain at least one of these signs (!@#$)."
    )
    .min(8, "Password is too short.")
    .max(16, "Password is too long.")
    .nonempty("Password is required."),
  phone: z
    .string()
    .regex(/^\d{11}$/, "Phone number must be exactly 11 digits.")
    .nonempty("Phone number is required."),
  gender: z.enum(["Male", "Female", "Other", "Rather not say"]),
});

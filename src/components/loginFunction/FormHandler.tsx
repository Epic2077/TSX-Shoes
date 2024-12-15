import React from "react";
import { LoginSchema } from "./LoginSchema";

// Define the form data structure
type FormData = {
  email: string;
  password: string;
};

// Define the error structure
type ErrorType = {
  email?: string;
  password?: string;
};

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setError: React.Dispatch<React.SetStateAction<ErrorType>>,
  setIsButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { name, value } = e.target;

  setFormData((prev) => ({ ...prev, [name]: value }));

  setError((prev) => ({ ...prev, [name]: "" }));

  setIsButtonEnabled(value.length > 0);
};

// Handle form submission
export const handleSubmit = (
  e: React.FormEvent,
  formData: FormData,
  setError: React.Dispatch<React.SetStateAction<ErrorType>>
) => {
  e.preventDefault();

  // Validate the form data using Zod schema
  const validResult = LoginSchema.safeParse(formData);
  if (!validResult.success) {
    const fieldError: { [key: string]: string } = {};
    validResult.error.errors.forEach((error) => {
      if (error.path[0]) {
        fieldError[error.path[0]] = error.message;
      }
    });

    // Update the error state
    setError(fieldError);
    return;
  }
  // Perform login action (e.g., API call or state update)
  console.log("Login successful", formData);
};

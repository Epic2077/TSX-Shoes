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


// import React from "react";
// import { LoginSchema } from "./LoginSchema";

// // Define the form data structure
// type FormData = {
//   email: string;
//   password: string;
// };

// // Define the error structure
// type ErrorType = {
//   email?: string;
//   password?: string;
// };

// // Handle input changes
// export const handleChange = (
//   e: React.ChangeEvent<HTMLInputElement>,
//   setFormData: React.Dispatch<React.SetStateAction<FormData>>,
//   setError: React.Dispatch<React.SetStateAction<ErrorType>>,
//   setIsButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>
// ) => {
//   const { name, value } = e.target;

//   setFormData((prev) => ({ ...prev, [name]: value }));
//   setError((prev) => ({ ...prev, [name]: "" }));
//   setIsButtonEnabled(value.length > 0);
// };

// // Handle form submission
// export const handleSubmit = (
//   e: React.FormEvent,
//   formData: FormData,
//   setError: React.Dispatch<React.SetStateAction<ErrorType>>
// ) => {
//   e.preventDefault();

//   // Retrieve lock time and failed attempts from localStorage
//   const lockTimeFromStorage = localStorage.getItem("lockTime");
//   const failedAttemptsFromStorage = parseInt(localStorage.getItem("failedAttempts") || "0");

//   // If the account is locked
//   if (lockTimeFromStorage) {
//     const lockTimestamp = parseInt(lockTimeFromStorage);
//     const currentTime = Date.now();
//     if (currentTime - lockTimestamp < 5 * 60 * 1000) {
//       alert("Your account is locked. Please try again after 5 minutes.");
//       return;
//     } else {
//       // Reset lock after 5 minutes
//       localStorage.removeItem("lockTime");
//       localStorage.removeItem("failedAttempts");
//     }
//   }

//   // Validate the form data using Zod schema
//   const validResult = LoginSchema.safeParse(formData);
//   if (!validResult.success) {
//     const fieldError: { [key: string]: string } = {};
//     validResult.error.errors.forEach((error) => {
//       if (error.path[0]) {
//         fieldError[error.path[0]] = error.message;
//       }
//     });

//     // Update the error state
//     setError(fieldError);

//     // Increment failed attempts and set lock time if necessary
//     const newFailedAttempts = failedAttemptsFromStorage + 1;
//     localStorage.setItem("failedAttempts", newFailedAttempts.toString());

//     if (newFailedAttempts >= 5) {
//       const currentTime = Date.now();
//       localStorage.setItem("lockTime", currentTime.toString());
//       alert("Too many failed attempts. Your account is locked for 5 minutes.");
//     }
//     return;
//   }

//   // Successful login
//   console.log("Login successful", formData);
//   localStorage.removeItem("lockTime");
//   localStorage.removeItem("failedAttempts");
// };

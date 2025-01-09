import axios from "axios";
import { BASE_URL } from "./Base";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      throw new Error("Invalid credentials"); // Explicitly throw error for 401
    }
    throw err; // Rethrow other errors
  }
};

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export type UserRegisterData = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
};
export const userSignup = async (data: UserRegisterData) => {
  console.log(data)
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, data);
    return response.data;
  } catch (err: any) {
    if (err.response?.data?.errors) {
      const errorMessages: Record<string, string> = {};
      err.response.data.errors.forEach((error: any) => {
        errorMessages[error.path] = error.msg;
      });
      throw { fieldErrors: errorMessages };
    }
    if (err.response && err.response.status === 400) {
      throw new Error("Email already Exists.");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const userForgot = async (email: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      email,
    });
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      throw new Error("User not found.");
    }
    throw err;
  }
};

export const userChange = async (newPassword: string, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
      newPassword,
      token,
    });
    return response.data;
  } catch (err: any) {
    if (err.response?.data?.errors) {
      const errorMessages: Record<string, string> = {};
      err.response.data.errors.forEach((error: any) => {
        errorMessages[error.path] = error.msg;
      });
      throw { fieldErrors: errorMessages };
    }
    throw new Error(
      err.response?.data?.message || "An unexpected error occurred"
    );
  }
};

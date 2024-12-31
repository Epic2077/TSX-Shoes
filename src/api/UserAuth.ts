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

export const userSignup = async (
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  phone: string
) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      username,
      email,
      firstName,
      lastName,
      password,
      phone,
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
    throw new Error("An unexpected error occurred");
  }
};

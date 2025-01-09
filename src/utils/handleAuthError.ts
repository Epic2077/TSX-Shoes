import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { logout } from "../store/slices/AuthSlice";

type ApiError = {
  response?: {
    status: number;
  };
  message?: string;
};

export const handleAuthError = (
  error: unknown,
  navigate: NavigateFunction,
  dispatch: Dispatch
) => {
  const err = error as ApiError;
  if (
    err?.response?.status === 401 ||
    err?.message === "Invalid or expired access token."
  ) {
    dispatch(logout());
    navigate("/auth/login", {
      state: {
        message: "Your session has expired. Please login again.",
      },
    });
  }
};

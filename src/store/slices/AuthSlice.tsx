import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  username: string | null;
}

export type { AuthState };

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.username;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.token;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
  },
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; username: string }>
    ) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { name: string; email: string } | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.user = { name: "Пользователь", email: action.payload.email };
    },
    registerUser: (state, action: PayloadAction<{ name: string; email: string; password: string }>) => {
      state.user = { name: action.payload.name, email: action.payload.email };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, registerUser, logout } = authSlice.actions;
export default authSlice.reducer;

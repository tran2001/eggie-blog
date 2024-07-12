import { createSlice } from "@reduxjs/toolkit";

export interface IIsSignedIn {
  value: boolean;
}

const initialState: IIsSignedIn = {
  value: !!localStorage.getItem("accessToken"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

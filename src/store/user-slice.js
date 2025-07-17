import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginStatus: false,
    isSigningIn: false,
    isCreatingAccount: false,
  },
  reducers: {
    startSignIn(state) {
      state.isSigningIn = true;
    },
    stopSignIn(state) {
      state.isSigningIn = false;
    },
    signInUser(state) {
      state.isSigningIn = false;
      state.loginStatus = true;
    },
    signOutUser(state) {
      state.loginStatus = false;
    },
    startCreatingAccount(state) {
      state.isCreatingAccount = true;
    },
    stopCreatingAccount(state) {
      state.isCreatingAccount = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

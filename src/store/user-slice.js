import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginStatus: false,
    isSigningIn: false,
    isCreatingAccount: false,
    username: "",
    statusMessage: "",
    pfpURL: null,
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
      state.isSigningIn = false;
      state.isCreatingAccount = false;
      state.username = "";
      state.statusMessage = "";
      state.pfpURL = null;
    },
    startCreatingAccount(state) {
      state.isCreatingAccount = true;
    },
    stopCreatingAccount(state) {
      state.isCreatingAccount = false;
    },
    updateUsername(state, action) {
      state.username = action.payload;
    },
    updateStatusMessage(state, action) {
      state.statusMessage = action.payload;
    },
    updatePfpURL(state, action) {
      state.pfpURL = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

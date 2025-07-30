import { createSlice } from "@reduxjs/toolkit";

const toastsSlice = createSlice({
  name: "toasts",
  initialState: {
    toasts: [],
  },
  reducers: {
    addToast(state, action) {
      state.toasts.push(action.payload);
    },
    removeToast(state, action) {
      state.toasts.splice(action.payload, 1);
    },
    incToastCounter(state, action) {
      state.toasts[action.payload].counter += 1;
    },
  },
});

export const toastsActions = toastsSlice.actions;

export default toastsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: {},
    numberOfCharacters: 0,
    changed: false,
  },
  reducers: {
    loadCharacters(state, action) {
      state.characters = action.payload.characters;
      state.numberOfCharacters = action.payload.numberOfCharacters;
    },
  },
});

export const charactersActions = charactersSlice.actions;

export default charactersSlice.reducer;

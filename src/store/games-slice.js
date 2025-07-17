import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: {},
    numberOfGames: 0,
    changed: false,
  },
  reducers: {
    loadGames(state, action) {
      state.games = action.payload.games;
      state.numberOfGames = action.payload.numberOfGames;
    },
  },
});

export const gamesActions = gamesSlice.actions;

export default gamesSlice.reducer;

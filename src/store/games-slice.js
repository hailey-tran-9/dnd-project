import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: {},
    joinedGames: {},
    numberOfGames: 0,
    changed: false,
  },
  reducers: {
    loadGames(state, action) {
      state.games = action.payload.games;
      state.numberOfGames = action.payload.numberOfGames;
    },
    loadAJoinedGame(state, action) {
      state.joinedGames[action.payload.gameID] = action.payload;
    },
  },
});

export const gamesActions = gamesSlice.actions;

export default gamesSlice.reducer;

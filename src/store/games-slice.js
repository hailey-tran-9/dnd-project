import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [],
    numberOfGames: 0,
    changed: false,
  },
  reducers: {
    loadGames(state, action) {
      state.games = action.payload.games;
      state.numberOfGames = action.payload.numberOfGames;
    },
    createGame(state, action) {
      // userID
      // gameID
      // name
      // charactersInGame
      // mapsInGame
      // sessions

      // TODO: get the logged in userID
      // TODO: generate a unique gameID

      state.games.push({
        userID: "testUserID",
        gameID: "testGameID",
        ...action.payload,
      });
      state.numberOfGames++;
      state.changed = true;
    },
    deleteGame(state, action) {
      // TODO: remove this game from the players' inGame array

      state.games = state.games.filter(
        (game) => game.gameID !== action.payload
      );
      state.numberOfGames--;
      state.changed = true;
    },
    changeName(state, action) {
      let { gameID, newName } = action.payload;
      let game = state.games.find(
        (game) => game.gameID === gameID
      );

      if (!game) {
        console.log(
          "Tried to change the name of a game that doesn't exist."
        );
        return;
      }

      game.name = newName;
      state.changed = true;
    },
  },
});

export const gamesActions = gamesSlice.actions;

export default gamesSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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

      state.games.push({
        gameID: uuidv4(),
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
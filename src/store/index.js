import { configureStore } from "@reduxjs/toolkit";

import charactersReducer from "./characters-slice.js";
import gamesReducer from "./games-slice.js";

const store = configureStore({
  reducer: { characters: charactersReducer, games: gamesReducer },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import charactersReducer from "./characters-slice.js";
import gamesReducer from "./games-slice.js";
import characterCreationReducer from "./character-creation-slice.js";

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    games: gamesReducer,
    characterCreation: characterCreationReducer,
  },
});

export default store;

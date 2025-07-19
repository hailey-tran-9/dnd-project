import { configureStore } from "@reduxjs/toolkit";

import charactersReducer from "./characters-slice.js";
import gamesReducer from "./games-slice.js";
import mapsReducer from "./maps-slice.js";
import characterCreationReducer from "./character-creation-slice.js";
import userReducer from "./user-slice.js";

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    games: gamesReducer,
    maps: mapsReducer,
    characterCreation: characterCreationReducer,
    user: userReducer,
  },
});

export default store;

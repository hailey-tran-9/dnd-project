import { configureStore } from "@reduxjs/toolkit";

import charactersReducer from "./characters-slice.js";
import gamesReducer from "./games-slice.js";
import mapsReducer from "./maps-slice.js";
import characterCreationReducer from "./character-creation-slice.js";
import userReducer from "./user-slice.js";
import toastsReducer from "./toasts-slice.js";

const store = configureStore({
  reducer: {
    characterCreation: characterCreationReducer,
    characters: charactersReducer,
    games: gamesReducer,
    maps: mapsReducer,
    toasts: toastsReducer,
    user: userReducer,
  },
});

export default store;

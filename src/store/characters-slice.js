import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    numberOfCharacters: 0,
    changed: false,
  },
  reducers: {
    loadCharacters(state, action) {
      state.characters = action.payload.characters;
      state.numberOfCharacters = action.payload.numberOfCharacters;
    },
    createCharacter(state, action) {
      // TODO: get the logged in userID
      state.characters.push({
        inGames: [],
        characterID: uuidv4(),
        ...action.payload,
      });
      state.numberOfCharacters++;
      state.changed = true;
    },
    deleteCharacter(state, action) {
      // TODO: remove this character from any associated games
      state.characters = state.characters.filter(
        (character) => character.characterID !== action.payload
      );
      state.numberOfCharacters--;
      state.changed = true;
    },
    changeName(state, action) {
      let { characterID, newName } = action.payload;
      let character = state.characters.find(
        (character) => character.characterID === characterID
      );

      if (!character) {
        console.log(
          "Tried to change the name of a character that doesn't exist."
        );
        return;
      }

      character.name = newName;
      state.changed = true;
    },
  },
});

export const charactersActions = charactersSlice.actions;

export default charactersSlice.reducer;

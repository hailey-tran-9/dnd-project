import { createSlice } from "@reduxjs/toolkit";

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
      //   let {
      //     name,
      //     race,
      //     characterClass,
      //     lvl,
      //     abilitiesAndSkills,
      //     armorClass,
      //     proficiencies,
      //     proficiencyBonus,
      //     moveSpeed,
      //     features,
      //     inventory,
      //     notes,
      //   } = action.payload;

      // TODO: get the logged in userID
      // TODO: generate a unique characterID
      state.characters.push({ userID: "testUserID", inGames: [], characterID: "testCharacterID", ...action.payload });
      state.numberOfCharacters++;
      state.changed = true;
    },
    deleteCharacter(state, action) {
        // TODO: remove this character from any associated games
        state.characters = state.characters.filter((character) => character.characterID !== action.payload);
        state.numberOfCharacters--;
        state.changed = true;
    },
    changeName(state, action) {
        let {characterID, newName} = action.payload;
        let character = state.characters.find((character) => character.characterID === characterID);

        if (!character) {
            console.log("Tried to change the name of a character that doesn't exist.");
            return;
        }

        character.name = newName;
        state.changed = true;
    }
  },
});

export const charactersActions = charactersSlice.actions;

export default charactersSlice.reducer;

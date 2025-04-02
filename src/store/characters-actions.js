import { charactersActions } from "./characters-slice.js";

export const fetchCharactersData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      console.log("Loading the user's pre-existing characters.");

      const response = await fetch(
        "https://dnd-project-c6151-default-rtdb.firebaseio.com/characters.json"
      );
      if (!response.ok) {
        throw new Error("Fetching character data failed.");
      }

      const responseData = await response.json();

      return responseData;
    };

    try {
      const characterData = await fetchData();
      if (characterData !== null) {
        dispatch(
          charactersActions.loadCharacters({
            characters: characterData.characters || [],
            numberOfCharacters: characterData.numberOfCharacters,
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const sendCharactersData = (characterData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      console.log("This user's characters have been updated.");

      const response = await fetch(
        "https://dnd-project-c6151-default-rtdb.firebaseio.com/characters.json",
        {
          method: "PUT",
          body: JSON.stringify({
            characters: characterData.characters,
            numberOfCharacters: characterData.numberOfCharacters,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending character data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error.message);
    }
  };
};

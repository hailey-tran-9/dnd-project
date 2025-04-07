import { gamesActions } from "./games-slice.js";

export const fetchGamesData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      console.log("Loading the user's pre-existing games.");

      const response = await fetch(
        "https://dnd-project-c6151-default-rtdb.firebaseio.com/games.json"
      );
      if (!response.ok) {
        throw new Error("Fetching game data failed.");
      }

      const responseData = await response.json();

      return responseData;
    };

    try {
      const gamesData = await fetchData();
      if (gamesData !== null) {
        dispatch(
          gamesActions.loadGames({
            games: gamesData.games || [],
            numberOfGames: gamesData.numberOfGames,
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const sendGamesData = (gamesData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      console.log("This user's games have been updated.");

      const response = await fetch(
        "https://dnd-project-c6151-default-rtdb.firebaseio.com/games.json",
        {
          method: "PUT",
          body: JSON.stringify({
            games: gamesData.games,
            numberOfGames: gamesData.numberOfGames,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending game data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error.message);
    }
  };
};

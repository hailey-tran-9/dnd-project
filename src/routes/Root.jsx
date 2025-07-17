import { useEffect } from "react";
import { Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

import Navbar from "../components/Navbar.jsx";

import {
  sendCharactersData,
  fetchCharactersData,
} from "../store/characters-actions.js";
import { sendGamesData, fetchGamesData } from "../store/games-actions.js";
import { gamesActions } from "../store/games-slice.js";
import { charactersActions } from "../store/characters-slice.js";

let isInitial = true;

export default function RootLayout() {
  const dispatch = useDispatch();
  const charactersData = useSelector((state) => state.characters);
  const gamesData = useSelector((state) => state.games);

  const db = getDatabase();
  const gamesRef = ref(db, "games");
  const charactersRef = ref(db, "characters");

  useEffect(() => {
    // Get the user's pre-existing characters, games
    onValue(charactersRef, (snapshot) => {
      const charactersData = snapshot.val();
      // console.log(charactersData);
      if (charactersData !== null) {
        dispatch(
          charactersActions.loadCharacters({
            characters: charactersData.characters || [],
            numberOfCharacters: charactersData.numberOfCharacters,
          })
        );
      }
    });

    onValue(gamesRef, (snapshot) => {
      const gamesData = snapshot.val();
      // console.log(gamesData);
      if (gamesData !== null) {
        dispatch(
          gamesActions.loadGames({
            games: gamesData.games || [],
            numberOfGames: gamesData.numberOfGames,
          })
        );
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    // Update the database's character, game data
    if (charactersData.changed) {
      dispatch(sendCharactersData(charactersData));
    }
    // if (gamesData.changed) {
    //   dispatch(sendGamesData(gamesData));
    // }
  }, [charactersData, gamesData, dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export async function clientLoader() {
  return {
    title: "Root Layout",
  };
}

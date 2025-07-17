import { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";

import Navbar from "../components/Navbar.jsx";

import { gamesActions } from "../store/games-slice.js";
import { charactersActions } from "../store/characters-slice.js";

export default function RootLayout() {
  const dispatch = useDispatch();

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

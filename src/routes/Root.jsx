import { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from "../components/Navbar.jsx";

import { gamesActions } from "../store/games-slice.js";
import { charactersActions } from "../store/characters-slice.js";

export default function RootLayout() {
  const dispatch = useDispatch();

  const db = getDatabase();
  const gamesRef = ref(db, "games");
  const charactersRef = ref(db, "characters");

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userID = user.uid;

      onValue(gamesRef, (snapshot) => {
        const gamesData = snapshot.val();
        // console.log(gamesData);

        if (gamesData && gamesData.games) {
          let test = Object.fromEntries(
            Object.entries(gamesData.games).filter(
              ([gameID, game]) => game.userID === userID
            )
          );

          if (test !== null) {
            dispatch(
              gamesActions.loadGames({
                games: test || {},
                numberOfGames: Object.keys(test).length || 0,
              })
            );
          }
        } else {
          dispatch(
            gamesActions.loadGames({
              games: {},
              numberOfGames: 0,
            })
          );
        }
      });
    } else {
      dispatch(
        gamesActions.loadGames({
          games: {},
          numberOfGames: 0,
        })
      );
    }
  });

  useEffect(() => {
    // Get the user's pre-existing characters, games
    onValue(charactersRef, (snapshot) => {
      const charactersData = snapshot.val();
      // console.log(charactersData);
      if (charactersData !== null) {
        dispatch(
          charactersActions.loadCharacters({
            characters: charactersData.characters || {},
            numberOfCharacters: charactersData.numberOfCharacters || 0,
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

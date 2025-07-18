import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from "../components/Navbar.jsx";

import { gamesActions } from "../store/games-slice.js";
import { charactersActions } from "../store/characters-slice.js";

export default function RootLayout() {
  const dispatch = useDispatch();
  const db = getDatabase();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userID = user.uid;

      // Get the user's pre-existing characters, games
      const charactersQuery = query(
        ref(db, "characters/characters"),
        orderByChild("userID"),
        equalTo(userID)
      );
      onValue(charactersQuery, (charactersSnapshot) => {
        const charactersData = charactersSnapshot.val();
        // console.log("charactersData:", charactersData);
        if (charactersData) {
          dispatch(
            charactersActions.loadCharacters({
              characters: charactersData || {},
              numberOfCharacters: Object.keys(charactersData).length || 0,
            })
          );
        } else {
          dispatch(
            charactersActions.loadCharacters({
              characters: {},
              numberOfCharacters: 0,
            })
          );
        }
      });

      const gamesQuery = query(
        ref(db, "games/games"),
        orderByChild("userID"),
        equalTo(userID)
      );
      onValue(gamesQuery, (gamesSnapshot) => {
        const gamesData = gamesSnapshot.val();
        // console.log("gamesData:", gamesData);
        if (gamesData) {
          dispatch(
            gamesActions.loadGames({
              games: gamesData || {},
              numberOfGames: Object.keys(gamesData).length || 0,
            })
          );
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
      dispatch(
        charactersActions.loadCharacters({
          characters: {},
          numberOfCharacters: 0,
        })
      );
    }
  });

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

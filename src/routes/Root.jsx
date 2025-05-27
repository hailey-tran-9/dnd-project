import { useEffect } from "react";
import { Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";

// import ClassContextProvider from "../components/contexts/ClassContext";
// import RaceContextProvider from "../components/contexts/RaceContext";
// import SkillContextProvider from "../components/contexts/SkillContext";
// import AbilityScoreContextProvider from "../components/contexts/AbilityScoreContext.jsx";
import Navbar from "../components/Navbar.jsx";

import {
  sendCharactersData,
  fetchCharactersData,
} from "../store/characters-actions.js";
import { sendGamesData, fetchGamesData } from "../store/games-actions.js";

let isInitial = true;

export default function RootLayout() {
  const dispatch = useDispatch();
  const charactersData = useSelector((state) => state.characters);
  const gamesData = useSelector((state) => state.games);

  useEffect(() => {
    // Get the user's pre-existing characters
    dispatch(fetchCharactersData());

    dispatch(fetchGamesData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (charactersData.changed) {
      // Update the database's character data
      dispatch(sendCharactersData(charactersData));
    }

    if (gamesData.changed) {
      dispatch(sendGamesData(gamesData));
    }
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

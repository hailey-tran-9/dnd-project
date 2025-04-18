import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  sendCharactersData,
  fetchCharactersData,
} from "./store/characters-actions.js";
import { sendGamesData, fetchGamesData } from "./store/games-actions.js";

import { loader as inviteLoader } from "./pages/Invite.jsx";

import "./App.css";

import RootLayout from "./pages/Root.jsx";
import HomePage from "./pages/Home.jsx";

import MainMenu from "./components/mainMenu/MainMenu.jsx";
import Game from "./components/Game.jsx";
import InvitePage from "./pages/Invite.jsx";
import Games from "./pages/Games.jsx";

let isInitial = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // { path: ":user", element: <MainMenu /> },
      // { index: true, element: <MainMenu /> },

      {
        path: "games",
        children: [
          { index: true, element: <Games /> },
          // { path: ":gameID", element: <Game /> },
          {
            path: "invite/:gameID",
            element: <InvitePage />,
            loader: inviteLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
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

  return <RouterProvider router={router} />;
}

export default App;

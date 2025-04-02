import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  sendCharactersData,
  fetchCharactersData,
} from "./store/characters-actions.js";

import "./App.css";

// import AbilityScoreContextProvider from "./components/contexts/AbilityScoreContext.jsx";
import SkillContextProvider from "./components/contexts/SkillContext.jsx";
// import CharacterContextProvider from "./components/contexts/CharacterContext.jsx";
import ClassContextProvider from "./components/contexts/ClassContext.jsx";
import RaceContextProvider from "./components/contexts/RaceContext.jsx";
// import ChatContextProvider from "./components/contexts/ChatContext.jsx";
// import CharacterInfo from "./components/character/CharacterInfo.jsx";
// import Chat from "./components/Chat.jsx";
// import Toolbar from "./components/Toolbar.jsx";

import Login from "./components/Login.jsx";
import MainMenu from "./components/mainMenu/MainMenu.jsx";
import Game from "./components/Game.jsx";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const charactersData = useSelector((state) => state.characters);

  useEffect(() => {
    // Get the user's pre-existing characters
    dispatch(fetchCharactersData());
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
  }, [charactersData, dispatch]);

  return (
    <ClassContextProvider>
      <RaceContextProvider>
        <SkillContextProvider>
          {/* <Login /> */}
          <MainMenu />
          {/* <Game /> */}
        </SkillContextProvider>
      </RaceContextProvider>
    </ClassContextProvider>
  );
}

export default App;

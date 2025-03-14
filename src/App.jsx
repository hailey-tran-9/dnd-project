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

function App() {
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

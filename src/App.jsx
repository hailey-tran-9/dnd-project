import "./App.css";
import AbilityScoreContextProvider from "./components/contexts/AbilityScoreContext.jsx";
import SkillContextProvider from "./components/contexts/SkillContext.jsx";
import CharacterContextProvider from "./components/contexts/CharacterContext.jsx";
import ChatContextProvider from "./components/contexts/ChatContext.jsx";
import CharacterInfo from "./components/character/CharacterInfo.jsx";
import Chat from "./components/Chat.jsx";
import Toolbar from "./components/Toolbar.jsx";

function App() {
  return (
    <AbilityScoreContextProvider>
      <SkillContextProvider>
        <CharacterContextProvider>
          <ChatContextProvider>
            <div className="flex flex-row">
              <CharacterInfo />
              <div className="h-dvh flex flex-col justify-between grow">
                <Chat />
                <Toolbar />
              </div>
            </div>
          </ChatContextProvider>
        </CharacterContextProvider>
      </SkillContextProvider>
    </AbilityScoreContextProvider>
  );
}

export default App;

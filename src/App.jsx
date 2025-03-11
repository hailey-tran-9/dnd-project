import "./App.css";
import AbilityScoreContextProvider from "./components/contexts/AbilityScoreContext.jsx";
import SkillContextProvider from "./components/contexts/SkillContext.jsx";
import CharacterContextProvider from "./components/contexts/CharacterContext.jsx";
import ClassContextProvider from "./components/contexts/ClassContext.jsx";
import ChatContextProvider from "./components/contexts/ChatContext.jsx";
import CharacterInfo from "./components/character/CharacterInfo.jsx";
import Chat from "./components/Chat.jsx";
import Toolbar from "./components/Toolbar.jsx";

function App() {
  return (
    <AbilityScoreContextProvider>
      <SkillContextProvider>
        <CharacterContextProvider>
          <ClassContextProvider>
            <ChatContextProvider>
              <div className="flex flex-row">
                <CharacterInfo />
                <div className="h-dvh flex flex-col justify-between grow">
                  <Chat />
                  <Toolbar />
                </div>
              </div>
            </ChatContextProvider>
          </ClassContextProvider>
        </CharacterContextProvider>
      </SkillContextProvider>
    </AbilityScoreContextProvider>
  );
}

export default App;

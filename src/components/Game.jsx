import AbilityScoreContextProvider from "./contexts/AbilityScoreContext.jsx";
import SkillContextProvider from "./contexts/SkillContext.jsx";
import CharacterContextProvider from "./contexts/CharacterContext.jsx";
import ChatContextProvider from "./contexts/ChatContext.jsx";

import CharacterInfo from "./character/CharacterInfo.jsx";
import Chat from "./Chat.jsx";
import Toolbar from "./Toolbar.jsx";

export default function Game() {
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
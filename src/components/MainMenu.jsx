import { useState } from "react";

import Selection from "./Selection.jsx";
import MainMenuInfo from "./MainMenuInfo.jsx";

export default function MainMenu() {
  const [games, setGames] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [maps, setMaps] = useState([]);

  const [selectedTab, setSelectedTab] = useState("Games");

  return (
    <div className="h-dvh flex flex-row p-16 gap-10">
      <Selection selectedTab={selectedTab} updateSelectedTab={setSelectedTab} />
      <MainMenuInfo selectedTab={selectedTab} />
    </div>
  );
}

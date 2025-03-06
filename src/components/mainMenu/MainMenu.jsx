import { useState } from "react";

import Selection from "./Selection.jsx";
import MainMenuInfo from "./MainMenuInfo.jsx";

export default function MainMenu() {
  const [games, setGames] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [maps, setMaps] = useState([]);

  const [selectedTab, setSelectedTab] = useState("Games");
  const [selectedItem, setSelectedItem] = useState({
    game: null,
    character: null,
    map: null,
  });

  const selectionProps = {
    selectedTab,
    updateSelectedTab: setSelectedTab,
    games,
    updateGames: setGames,
    characters,
    updateCharacters: setCharacters,
    maps,
    updateMaps: setMaps,
    updateSelectedItem: setSelectedItem,
  };

  return (
    <div className="h-dvh flex flex-row p-16 gap-10">
      <Selection props={selectionProps} />
      <MainMenuInfo selectedTab={selectedTab} selectedItem={selectedItem} />
    </div>
  );
}

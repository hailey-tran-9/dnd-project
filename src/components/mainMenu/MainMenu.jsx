import { useState } from "react";

import Selection from "./Selection.jsx";
import MainMenuInfo from "./MainMenuInfo.jsx";

export default function MainMenu() {
  const [isCreating, setIsCreating] = useState(false);

  const [games, setGames] = useState({
    gameNames: [],
    gameObjects: [],
  });
  const [characters, setCharacters] = useState({
    characterNames: [],
    characterObjects: [],
  });
  const [maps, setMaps] = useState([]);

  const [selectedTab, setSelectedTab] = useState("Games");
  const [selectedItem, setSelectedItem] = useState({
    game: null,
    character: null,
    map: null,
  });

  const props = {
    isCreating,
    updateIsCreating: setIsCreating,
    selectedTab,
    updateSelectedTab: setSelectedTab,
    games,
    updateGames: setGames,
    characters,
    updateCharacters: setCharacters,
    maps,
    updateMaps: setMaps,
    selectedItem,
    updateSelectedItem: setSelectedItem,
  };

  return (
    <div className="h-dvh flex flex-row p-16 gap-10">
      <Selection props={props} />
      <MainMenuInfo props={props}/>
    </div>
  );
}

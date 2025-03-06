import GameInfo from "./GameInfo.jsx";
import CharacterInfo from "./CharacterInfo.jsx";

export default function MainMenuInfo({ selectedTab, selectedItem }) {
  let infoContent;
  if (selectedTab === "Games") {
    infoContent = <GameInfo selectedGame={selectedItem.game} />;
  } else if (selectedTab === "Characters") {
    infoContent = <CharacterInfo selectedCharacter={selectedItem.character} />;
  } else if (selectedTab === "Maps") {
    infoContent = (
      <>
        <h1>Map Name</h1>
        <h2>Game the map is in</h2>
        <p>Preview of the map</p>
      </>
    );
  }

  return (
    <div className="flex flex-col bg-amber-200 grow rounded-md p-10">
      {infoContent}
    </div>
  );
}

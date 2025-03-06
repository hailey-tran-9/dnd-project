import SelectionButton from "./SelectionButton.jsx";

export default function Selection({ props }) {
  const {
    selectedTab,
    updateSelectedTab,
    games,
    updateGames,
    characters,
    updateCharacters,
    maps,
    updateMaps,
    updateSelectedItem,
  } = props;

  let listContent;
  let roundedClass;
  if (selectedTab === "Games") {
    listContent = games.map((game) => (
      <SelectionButton name={game.name} key={game.name} />
    ));
    roundedClass = "rounded-tr-md";
  } else if (selectedTab === "Characters") {
    listContent = characters.map((character) => (
      <SelectionButton name={character.name} key={character.name} />
    ));
    roundedClass = "rounded-t-md";
  } else if (selectedTab === "Maps") {
    listContent = maps.map((map) => (
      <SelectionButton name={map.name} key={map.name} />
    ));
    roundedClass = "rounded-tl-md";
  }

  function handleGamesTabClick() {
    updateSelectedTab("Games");
  }

  function handleCharactersTabClick() {
    updateSelectedTab("Characters");
  }

  function handleMapsTabClick() {
    updateSelectedTab("Maps");
  }

  const padding = "p-2";
  const activeClasses = "bg-indigo-300 rounded-t-md " + padding;
  const inactiveClasses = "bg-white rounded-t-md " + padding;
  const dynamicRoundedClasses = [
    "flex flex-col bg-indigo-300 rounded-b-md pt-5 grow",
    padding,
    roundedClass,
  ].join(" ");

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        <button
          type="button"
          className={selectedTab === "Games" ? activeClasses : inactiveClasses}
          onClick={handleGamesTabClick}
        >
          Games
        </button>
        <button
          type="button"
          className={
            selectedTab === "Characters" ? activeClasses : inactiveClasses
          }
          onClick={handleCharactersTabClick}
        >
          Characters
        </button>
        <button
          type="button"
          className={selectedTab === "Maps" ? activeClasses : inactiveClasses}
          onClick={handleMapsTabClick}
        >
          Maps
        </button>
      </div>
      <div className={dynamicRoundedClasses}>
        <button
          type="button"
          className="w-2/3 self-center bg-blue-50 hover:bg-blue-300 hover:text-white p-1 rounded-md"
        >
          + Create {selectedTab.slice(0, -1)}
        </button>
        <ul className={"bg-indigo-300 rounded-t-md " + padding}>
          {listContent}
        </ul>
      </div>
    </div>
  );
}

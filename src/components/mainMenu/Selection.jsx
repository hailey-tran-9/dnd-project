import SelectionButton from "./SelectionButton.jsx";

export default function Selection({ props }) {
  const {
    isCreating,
    updateIsCreating,
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
    listContent = games.gameObjects.map((game, index) => (
      <SelectionButton
        name={game.name}
        key={game.name}
        onClick={() =>
          updateSelectedItem((prevSelectedItem) => ({
            ...prevSelectedItem,
            game: games.gameObjects[index],
          }))
        }
      />
    ));
    roundedClass = "rounded-tr-md";
  } else if (selectedTab === "Characters") {
    listContent = characters.characterObjects.map((character, index) => (
      <SelectionButton
        name={character.name}
        key={character.name}
        onClick={() =>
          updateSelectedItem((prevSelectedItem) => ({
            ...prevSelectedItem,
            character: characters.characterObjects[index],
          }))
        }
      />
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

  function handleCreateClick() {
    updateIsCreating(true);
  }

  const padding = "p-2";
  const activeClasses = "bg-indigo-300 rounded-t-md " + padding;
  const inactiveClasses = "bg-white rounded-t-md " + padding;
  const dynamicRoundedClasses = [
    "flex-1 flex-col bg-indigo-300 rounded-b-md pt-5",
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
      <div
        className={
          dynamicRoundedClasses + " justify-items-center overflow-y-auto"
        }
      >
        <button
          type="button"
          className="w-fit bg-blue-50 hover:bg-blue-300 hover:text-white p-1 px-3 rounded-md"
          onClick={handleCreateClick}
        >
          + Create {selectedTab.slice(0, -1)}
        </button>
        <div
          className={
            "w-full flex flex-col bg-indigo-300 rounded-t-md gap-1 mt-3 pb-10 " +
            padding
          }
        >
          {listContent}
        </div>
      </div>
    </div>
  );
}

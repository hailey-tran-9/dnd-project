import { useState } from "react";

export default function Selection({ selectedTab, updateSelectedTab }) {
  let listContent;
  let ulRoundedClass;
  if (selectedTab === "Games") {
    listContent = <li>Game 1</li>;
    ulRoundedClass = "rounded-tr-md";
  } else if (selectedTab === "Characters") {
    listContent = <li>Character 1</li>;
    ulRoundedClass = "rounded-t-md";
  } else if (selectedTab === "Maps") {
    listContent = <li>Map 1</li>;
    ulRoundedClass = "rounded-tl-md";
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
  const ulClasses = [
    "bg-indigo-300 rounded-b-md grow",
    padding,
    ulRoundedClass,
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
      <ul className={ulClasses}>{listContent}</ul>
    </div>
  );
}

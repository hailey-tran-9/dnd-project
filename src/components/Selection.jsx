import { useState } from "react";

export default function Selection() {
  const [selectedTab, setSelectedTab] = useState("Games");

  let listContent;
  if (selectedTab === "Games") {
    listContent = <li>Game 1</li>;
  } else {
    listContent = <li>Character 1</li>;
  }

  function handleGameTabClick() {
    setSelectedTab("Games");
  }

  function handleCharactersTabClick() {
    setSelectedTab("Characters");
  }

  const padding = "p-2";
  const activeClasses = "bg-indigo-300 rounded-t-md " + padding;
  const inactiveClasses = "bg-white rounded-t-md " + padding;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        <button
          type="button"
          className={selectedTab === "Games" ? activeClasses : inactiveClasses}
          onClick={handleGameTabClick}
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
      </div>
      <ul className={"bg-indigo-300 rounded-b-md grow " + padding}>
        {listContent}
      </ul>
    </div>
  );
}

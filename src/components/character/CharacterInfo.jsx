import { useEffect, useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext.jsx";
import CharacterAbilityScores from "./CharacterAbilityScores.jsx";
import CharacterSkills from "./CharacterSkills.jsx";
import CharacterFeatures from "./CharacterFeatures.jsx";
import CharacterInventory from "./CharacterInventory.jsx";

import { CharacterContext } from "../contexts/CharacterContext.jsx";

export default function CharacterInfo() {
  const charCtx = useContext(CharacterContext);

  return (
    <section
      id="characterInfo"
      className="w-fit h-dvh flex flex-col bg-blue-300 p-5 gap-5 overflow-hidden overflow-y-scroll"
    >
      <button
        type="button"
        className="bg-white hover:bg-cyan-900 hover:text-white"
        onClick={handleToggleEditing}
      >
        {!isEditing ? "Edit" : "Finish Editing"}
      </button>
      <header>
        <h1 className="text-center text-wrap">{charCtx.name}</h1>
        <h2 className="text-center text-wrap">{charCtx.class} | {charCtx.lvl}</h2>
      </header>
      <CharacterAbilityScores />
      <CharacterSkills />
      <CharacterFeatures />
      <CharacterInventory />
    </section>
  );
}

import { useState, useContext } from "react";

import CharacterAbilityScores from "./CharacterAbilityScores.jsx";
import CharacterSkills from "./CharacterSkills.jsx";
import CharacterFeatures from "./CharacterFeatures.jsx";
import CharacterInventory from "./CharacterInventory.jsx";

import { CharacterContext } from "../contexts/CharacterContext.jsx";

export default function CharacterInfo() {
  const { charData, updateChar } = useContext(CharacterContext);
  const [isEditing, setIsEditing] = useState(false);
  const [enteredName, setEnteredName] = useState(charData.name);

  function handleToggleEditing() {
    if (isEditing) {
      if (charData.name !== enteredName) {
        updateChar((prevCharData) => ({
          ...prevCharData,
          ["name"]: enteredName,
        }));
      }
    }

    setIsEditing(!isEditing);
  }

  function handleNameOnChange(event) {
    setEnteredName(event.target.value);
  }

  let characterName = <h1 className="text-center text-wrap">{charData.name}</h1>;
  if (isEditing) {
    characterName = (
      <input value={enteredName} onChange={handleNameOnChange}></input>
    );
  }

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
        {characterName}
        <h2 className="text-center text-wrap">CLASS | LVL</h2>
      </header>
      <CharacterAbilityScores />
      <CharacterSkills />
      <CharacterFeatures />
      <CharacterInventory />
    </section>
  );
}

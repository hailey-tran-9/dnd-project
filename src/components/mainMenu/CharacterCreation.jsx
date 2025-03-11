import { useState, useContext } from "react";
import { capitalize } from "../../util.js";

import { classIndexes } from "../contexts/ClassContext.jsx";

export default function CharacterCreation({
  updateIsCreating,
  characters,
  updateCharacters,
}) {
  const [enteredName, setEnteredName] = useState("");
  const [enteredLvl, setEnteredLvl] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    // Check for validity
    if (!characters.characterNames.includes(enteredName)) {
      updateCharacters((prevCharacters) => ({
        ...prevCharacters,
        ["characterNames"]: [...prevCharacters.characterNames, enteredName],
        ["characterObjects"]: [
          ...prevCharacters.characterObjects,
          {
            name: enteredName,
            class: data.get("classes"),
            lvl: enteredLvl,
            abilities: {
              str: { abilityScore: 1, modifier: 0, proficicent: false },
              dex: { abilityScore: 1, modifier: 0, proficicent: false },
              con: { abilityScore: 1, modifier: 0, proficicent: false },
              int: { abilityScore: 1, modifier: 0, proficicent: false },
              wis: { abilityScore: 1, modifier: 0, proficicent: false },
              cha: { abilityScore: 1, modifier: 0, proficicent: false },
            },
            armorClass: 1,
            proficiencyBonus: 0,
            features: [],
            inventory: [],
            notes: [],
          },
        ],
      }));
    } else {
      console.log(
        "A character with the same name already exists. Use unique names."
      );
    }

    updateIsCreating(false);
    setEnteredName("");
    setEnteredLvl(1);
  }

  function handleNameChange(event) {
    setEnteredName(event.target.value);
  }

  function handleLvlChange(event) {
    setEnteredLvl(event.target.value);
  }

  return (
    <div className="self-center my-auto flex flex-col bg-white p-10 rounded-md">
      <h1 className="mb-3">Character Creation</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label>Character Name</label>
          <input
            className="bg-amber-300 rounded-md ml-3"
            onChange={handleNameChange}
            required
          ></input>
        </div>

        <fieldset>
          <legend>Available Classes</legend>
          {classIndexes.map((className, index) => {
            let capitalizedName = capitalize(className);

            return (
              <div key={capitalizedName + "Radio"}>
                <input
                  type="radio"
                  id={capitalizedName}
                  name="classes"
                  value={capitalizedName}
                ></input>
                <label htmlFor={capitalizedName} className="ml-2">
                  {capitalizedName}
                </label>
              </div>
            );
          })}
        </fieldset>

        <div>
          <label>Level</label>
          <input
            type="number"
            className="bg-amber-300 rounded-md ml-3"
            onChange={handleLvlChange}
            required
          ></input>
        </div>

        <div className="flex flex-row justify-end mt-10 gap-2">
          <button
            type="button"
            className="bg-cyan-800 text-white rounded-md p-1"
            onClick={() => updateIsCreating(false)}
          >
            Cancel
          </button>
          <button className="bg-cyan-800 text-white rounded-md p-1">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

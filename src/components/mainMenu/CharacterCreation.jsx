import { useState, useEffect, useContext } from "react";
import { capitalize } from "../../util.js";

import { classIndexes, ClassContext } from "../contexts/ClassContext.jsx";
import { raceIndexes, RaceContext } from "../contexts/RaceContext.jsx";

export default function CharacterCreation({
  updateIsCreating,
  characters,
  updateCharacters,
}) {
  const [enteredName, setEnteredName] = useState("");
  const [enteredLvl, setEnteredLvl] = useState(1);
  const { isFetching, classData } = useContext(ClassContext);
  const [content, setContent] = useState();
  const [enteredClass, setEnteredClass] = useState(classIndexes[0]);
  const [enteredRace, setEnteredRace] = useState(raceIndexes[0]);

  useEffect(() => {
    if (!isFetching) {
      if (enteredClass) {
        console.log(classData[enteredClass]);
        let profChoices = classData[enteredClass]["proficiency_choices"];
        let equipOptions =
          classData[enteredClass]["starting_equipment_options"];
        setContent(
          <div className="flex flex-col">
            <h2>Proficiency Choices</h2>
            {profChoices.map((profChoice, index) => (
              <div key={"profChoice" + index}>
                <label htmlFor={"profChoice" + index}>{profChoice.desc}:</label>
                <select
                  name={"profChoice" + index}
                  id={"profChoice" + index}
                  className="bg-amber-300 rounded-md ml-1"
                >
                  {profChoice.from.options.map((option, index2) => (
                    <option
                      key={"profChoice" + index + "Option" + index2}
                      value={option.item.index}
                    >
                      {getOptionLabel(option.item.name)}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <h2 className="mt-2">Equipment Options</h2>
            {equipOptions.map((equipOption, index) => (
              <div key={"equipOption" + index}>
                <label htmlFor={"equipOption" + index}>
                  {equipOption.desc}:
                </label>
                <select
                  name={"equipOption" + index}
                  id={"equipOption" + index}
                  className="bg-amber-300 rounded-md ml-1"
                >
                  {equipOption.from.options.map((option, index2) => {
                    if (option["of"]) {
                      return (
                        <option
                          key={"equipOption" + index + "Option" + index2}
                          value={option["of"].index}
                        >
                          {getOptionLabel(option["of"].name)}
                        </option>
                      );
                    } else {
                      return;
                    }
                  })}
                </select>
              </div>
            ))}
          </div>
        );
      }
    }
  }, [enteredClass]);

  function handleSubmit(event) {
    event.preventDefault();

    // Check for validity
    if (!characters.characterNames.includes(enteredName)) {
      updateCharacters((prevCharacters) => ({
        ...prevCharacters,
        ["characterNames"]: [...prevCharacters.characterNames, enteredName],
        ["characterObjects"]: [
          ...prevCharacters.characterObjects,
          {
            name: enteredName,
            race: enteredRace,
            class: enteredClass,
            lvl: enteredLvl,
            abilities: {
              str: { abilityScore: 1, modifier: 0, proficient: checkProficiency("str") },
              dex: { abilityScore: 1, modifier: 0, proficient: checkProficiency("dex") },
              con: { abilityScore: 1, modifier: 0, proficient: checkProficiency("con") },
              int: { abilityScore: 1, modifier: 0, proficient: checkProficiency("int") },
              wis: { abilityScore: 1, modifier: 0, proficient: checkProficiency("wis") },
              cha: { abilityScore: 1, modifier: 0, proficient: checkProficiency("cha") },
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

  function handleClassChange(event) {
    // console.log(event.target.value);
    let currClass = event.target.value;
    if (currClass !== enteredClass) {
      setEnteredClass(currClass);
    }
  }

  function handleRaceChange(event) {
    console.log(event.target.value);
    let currRace = event.target.value;
    if (currRace !== enteredRace) {
      setEnteredRace(currRace);
    }
  }

  function getOptionLabel(item) {
    if (item.includes(": ")) {
      return item.split(" ")[1];
    } else {
      return item;
    }
  }

  function checkProficiency(ability) {
    let isProficient = false;
    classData[enteredClass]["saving_throws"].forEach(st => {
      if (st.index === ability) {
        isProficient = true;
      }
    });
    return isProficient;
  }

  return (
    <div className="self-center my-auto flex flex-col bg-white p-10 rounded-md">
      <h1 className="mb-3">Character Creation</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label>Character Name</label>
          <input
            className="bg-amber-300 rounded-md ml-1"
            onChange={handleNameChange}
            required
          ></input>
        </div>

        <div>
          <label>Level</label>
          <input
            type="number"
            className="bg-amber-300 rounded-md ml-1"
            onChange={handleLvlChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor={"classSelection"} className="mr-1">
            Available Classes:
          </label>
          <select
            name={"classSelection"}
            id={"classSelection"}
            onChange={handleClassChange}
            className="bg-amber-300 rounded-md"
            required
          >
            {classIndexes.map((className, index) => (
              <option key={className + "Option"} value={className}>
                {capitalize(className)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={"raceSelection"} className="mr-1">
            Available Races:
          </label>
          <select
            name={"raceSelection"}
            id={"raceSelection"}
            onChange={handleRaceChange}
            className="bg-amber-300 rounded-md"
            required
          >
            {raceIndexes.map((raceName, index) => (
              <option key={raceName + "Option"} value={raceName}>
                {capitalize(raceName)}
              </option>
            ))}
          </select>
        </div>

        {content && content}

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

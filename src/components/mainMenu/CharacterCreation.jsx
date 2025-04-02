import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { capitalize, calculateAbilityModifier } from "../../util.js";

import { classIndexes, ClassContext } from "../contexts/ClassContext.jsx";
import { raceIndexes, RaceContext } from "../contexts/RaceContext.jsx";
import { abilityScoreIndexes } from "../contexts/AbilityScoreContext.jsx";
import { skillIndexes } from "../contexts/SkillContext.jsx";

import { charactersActions } from "../../store/characters-slice.js";

import ProficiencyOptions from "./ProficiencyOptions.jsx";
import EquipmentChoices from "./EquipmentChoices.jsx";
import PointBuySystem from "./PointBuySystem.jsx";
import { SkillContext } from "../contexts/SkillContext.jsx";
import ProficiencyBox from "../ProficiencyBox.jsx";

export default function CharacterCreation({ updateIsCreating }) {
  const dispatch = useDispatch();

  const { isFetching: isFetchingClasses, classData } = useContext(ClassContext);
  const { isFetching: isFetchingRaces, raceData } = useContext(RaceContext);
  const { isFetching: isFetchingSkills, skillData } = useContext(SkillContext);

  const [abilityScores, setAbilityScores] = useState(
    Object.fromEntries(
      abilityScoreIndexes.map((ability) => [
        ability,
        { score: 8, modifier: -2, proficient: false },
      ])
    )
  );
  const [proficiencies, setProficiencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [moveSpeed, setMoveSpeed] = useState(0);
  const [traits, setTraits] = useState([]);

  const [abilitySkillOptions, setAbilitySkillOptions] = useState(<p>Loading class data...</p>);
  const [skills, setSkills] = useState(<p>Loading skills data...</p>);

  const [enteredName, setEnteredName] = useState("");
  const [enteredLvl, setEnteredLvl] = useState(1);
  const [enteredClass, setEnteredClass] = useState(classIndexes[0]);
  const [enteredRace, setEnteredRace] = useState(raceIndexes[0]);

  useEffect(() => {
    if (!isFetchingClasses) {
      if (enteredClass) {
        // console.log("classData");
        // console.log(classData[enteredClass]);

        let newProficiencies = [];
        classData[enteredClass]["saving_throws"].map((st) => {
          newProficiencies.push(st.index);
        });
        setProficiencies(newProficiencies);

        setAbilitySkillOptions(
          <>
            <ProficiencyOptions
              enteredClass={enteredClass}
              enteredRace={enteredRace}
              updateProficiencies={updateProficiencyStatus}
            />
            <EquipmentChoices enteredClass={enteredClass} />
          </>
        );
      }
    }
  }, [enteredClass, enteredRace]);

  useEffect(() => {
    if (!isFetchingSkills) {
      setSkills(() => (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 justify-evenly mb-5">
          {skillIndexes.map((skillIndex) => {
            let skillObj = skillData[skillIndex];
            let ability = skillObj["ability_score"]["index"];
            let label = skillObj["name"];
            // console.log(label + ": " + ability);

            return (
              <div
                className="h-fit flex flex-row gap-1 text-nowrap"
                key={label}
              >
                <ProficiencyBox
                  isProficient={
                    proficiencies.includes(ability) ||
                    proficiencies.includes(skillIndex)
                  }
                />
                <p className="w-fit text-center">
                  (
                  {abilityScores[ability]["modifier"] > 0
                    ? "+" + abilityScores[ability]["modifier"]
                    : abilityScores[ability]["modifier"]}
                  ) {label}
                </p>
                <p className="text-sm text-center self-center">{`(${ability.toUpperCase()})`}</p>
              </div>
            );
          })}
        </div>
      ));
    }
  }, [proficiencies, abilityScores]);

  useEffect(() => {
    if (!isFetchingRaces) {
      const currRace = raceData[enteredRace];

      setLanguages(currRace["languages"].map((language) => language["name"]));
      setMoveSpeed(currRace["speed"]);
      setTraits(currRace["traits"].map((trait) => trait["name"]));
    }
  }, [enteredRace]);

  function handleSubmit(event) {
    event.preventDefault();

    proficiencies.map((prof) => {
      if (abilityScoreIndexes.includes(prof)) {
        abilityScores[prof]["proficient"] = true;
      }
    });

    const currRace = raceData[enteredRace];
    currRace["ability_bonuses"].map((ab) => {
      let abIndex = ab["ability_score"]["index"];
      // console.log("add " + ab["bonus"] + " to " + abIndex);
      let newScore = abilityScores[abIndex]["score"] + ab["bonus"];
      abilityScores[abIndex]["score"] = newScore;
      abilityScores[abIndex]["modifier"] = calculateAbilityModifier(newScore);
    });

    setAbilityScores((prevAbilityScores) => ({
      ...prevAbilityScores,
    }));

    dispatch(
      charactersActions.createCharacter({
        name: enteredName,
        race: enteredRace,
        characterClass: enteredClass,
        lvl: enteredLvl,
        abilitiesAndSkills: abilityScores,
        armorClass: 10 + abilityScores["dex"]["modifier"],
        proficiencies,
        proficiencyBonus: 0,
        moveSpeed,
        features: { languages, traits },
        inventory: [],
        notes: [],
      })
    );

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
    // console.log(event.target.value);
    let currRace = event.target.value;
    if (currRace !== enteredRace) {
      setEnteredRace(currRace);
    }
  }

  function updateProficiencyStatus(abilityOrSkill) {
    // console.log("ab or skill: " + abilityOrSkill);
    setProficiencies((prevProficiencies) => {
      if (prevProficiencies) {
        let index = prevProficiencies.indexOf(abilityOrSkill);
        // console.log(index);

        if (index > -1) {
          // console.log("alr proficient, should remove proficiency");
          return prevProficiencies.toSpliced(index, 1);
        } else {
          return [...prevProficiencies, abilityOrSkill];
        }
      }
    });
  }

  return (
    <div className="grow flex flex-col bg-white p-16 rounded-md">
      <h1>Character Creation</h1>
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

        <div className="mb-5">
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

        <PointBuySystem
          proficiencies={proficiencies}
          updateAbilityScores={setAbilityScores}
        />
        {skills}
        {abilitySkillOptions}

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

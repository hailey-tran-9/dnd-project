import { useContext, useState, useEffect } from "react";
import { Form } from "react-router";

import { capitalize } from "../../../../util/util";
import { raceIndexes } from "../../../contexts/RaceContext";
import { classIndexes } from "../../../contexts/ClassContext";
import { abilityScoreIndexes } from "../../../contexts/AbilityScoreContext";
import { SkillContext, skillIndexes } from "../../../contexts/SkillContext";

import Button from "../../../Button";
import Input from "../../../Input";
import RaceSelection from "./RaceSelection";
import ClassSelection from "./ClassSelection";
import PointBuySystem from "./PointBuySystem";

let initialLoad = true;

export default function CharacterCreation({ cancelFn, submitFn }) {
  const { isFetching: isFetchingSkills, skillData } = useContext(SkillContext);

  const [enteredRace, setEnteredRace] = useState(raceIndexes[0]);
  const [enteredClass, setEnteredClass] = useState(classIndexes[0]);

  const [abilityScores, setAbilityScores] = useState(
    Object.fromEntries(
      abilityScoreIndexes.map((ability) => [
        ability,
        { score: 8, modifier: -1, proficient: false, bonus: 0 },
      ])
    )
  );
  const [skills, setSkills] = useState(
    Object.fromEntries(
      skillIndexes.map((skill) => [
        skill,
        {
          name: "",
          ability: "",
          modifier: 0,
          proficient: false,
        },
      ])
    )
  );

  const [abilityProficiencies, setAbilityProficiencies] = useState([]);
  const [skillProficiencies, setSkillProficiencies] = useState([]);

  useEffect(() => {
    if (initialLoad) {
      if (!isFetchingSkills) {
        let updatedSkills = { ...skills };
        skillIndexes.map((skill) => {
          let ability = skillData[skill]["ability_score"]["index"];
          updatedSkills[skill].name = skillData[skill]["name"];
          updatedSkills[skill].ability = ability;
        });
        setSkills(updatedSkills);
      }
      initialLoad = false;
    }
  }, []);

  useEffect(() => {
    let updatedAbilityScores = { ...abilityScores };
    abilityScoreIndexes.map((ability) => {
      if (abilityProficiencies.includes(ability)) {
        updatedAbilityScores[ability].proficient = true;
      } else {
        updatedAbilityScores[ability].proficient = false;
      }
    });
    setAbilityScores(updatedAbilityScores);

    let updatedSkills = { ...skills };
    skillIndexes.map((skill) => {
      if (
        abilityScores[skillData[skill]["ability_score"]["index"]].proficient ||
        skillProficiencies.includes(skill)
      ) {
        updatedSkills[skill].proficient = true;
      } else {
        updatedSkills[skill].proficient = false;
      }
      updatedSkills[skill].modifier =
        abilityScores[skillData[skill]["ability_score"]["index"]].modifier;
    });
    setSkills(updatedSkills);
  }, [abilityProficiencies, skillProficiencies]);

  useEffect(() => {
    let updatedSkills = { ...skills };
    skillIndexes.map((skill) => {
      updatedSkills[skill].modifier =
        abilityScores[skillData[skill]["ability_score"]["index"]].modifier;
    });
    setSkills(updatedSkills);
  }, [abilityScores]);

  function handleRaceChange(event) {
    // console.log(event.target.value);
    let currRace = event.target.value;
    if (currRace !== enteredRace) {
      setEnteredRace(currRace);
    }
  }

  function handleClassChange(event) {
    // console.log(event.target.value);
    let currClass = event.target.value;
    if (currClass !== enteredClass) {
      setEnteredClass(currClass);
    }
  }

  return (
    <Form onSubmit={submitFn}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-between">
          <h1>Character Creation</h1>
          <Button type="button" onClick={cancelFn}>
            Cancel
          </Button>
        </div>
        <div>
          <label
            htmlFor="character-name"
            className="text-black text-[2.5rem] font-[500] mr-10"
          >
            Character name
          </label>
          <Input
            id="character-name"
            name="character-name"
            type="text"
            className="text-[2rem]"
            required
          />
        </div>
        <div className="flex flex-row gap-[25%]">
          <div>
            <label
              htmlFor="character-race"
              className="text-black text-[2.5rem] font-[500] mr-10"
            >
              Race
            </label>
            <select
              name={"character-race"}
              id={"character-race"}
              onChange={handleRaceChange}
              className="bg-white rounded-md text-[2rem] pl-3 pr-15"
              defaultValue={enteredRace}
              required
            >
              {raceIndexes.map((raceName) => (
                <option key={raceName + "Option"} value={raceName}>
                  {capitalize(raceName)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="character-class"
              className="text-black text-[2.5rem] font-[500] mr-10"
            >
              Class
            </label>
            <select
              name={"character-class"}
              id={"character-class"}
              onChange={handleClassChange}
              className="bg-white rounded-md text-[2rem] pl-3 pr-15"
              defaultValue={enteredClass}
              required
            >
              {classIndexes.map((className) => (
                <option key={className + "Option"} value={className}>
                  {capitalize(className)}
                </option>
              ))}
            </select>
          </div>

          <RaceSelection
            enteredRace={enteredRace}
            abilityScores={abilityScores}
            updateAbilityScores={setAbilityScores}
            updateProficiencies={setSkillProficiencies}
          />
          <ClassSelection
            enteredClass={enteredClass}
            abilityScores={abilityScores}
            updateAbilityScores={setAbilityScores}
            updateProficiencies={setAbilityProficiencies}
          />
        </div>
        <PointBuySystem
          abilityScores={abilityScores}
          updateAbilityScores={setAbilityScores}
          skills={skills}
        />
        
        <div>
          <h2>Proficiency Options</h2>
          <div
            id="class-proficiency-choices"
            className="flex flex-col gap-10"
          ></div>
          <div
            id="race-proficiency-choices"
            className="flex flex-col gap-10"
          ></div>
        </div>
        <div>
          <h2>Equipment Options</h2>
        </div>
        <div>
          <h2>Notes</h2>
        </div>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}

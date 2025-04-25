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

export default function CharacterCreation({ cancelFn, submitFn }) {
  const { isFetching: isFetchingSkills, skillData } = useContext(SkillContext);

  const [enteredRace, setEnteredRace] = useState(raceIndexes[0]);
  const [enteredClass, setEnteredClass] = useState(classIndexes[0]);

  const [abilityScores, setAbilityScores] = useState(
    Object.fromEntries(
      abilityScoreIndexes.map((ability) => [
        ability,
        { score: 8, modifier: -2, proficient: false, bonus: 0 },
      ])
    )
  );
  const [skills, setSkills] = useState(
    Object.fromEntries(
      skillIndexes.map((skill) => [
        skill,
        {
          ability: "",
          proficient: false,
        },
      ])
    )
  );

  const [proficiencies, setProficiencies] = useState([]);

  useEffect(() => {
    if (!isFetchingSkills) {
      let updatedSkills = Object.fromEntries(
        skillIndexes.map((skill) => {
          let ability = skillData[skill]["ability_score"]["index"];
          return [
            skill,
            {
              ability: ability,
              proficient: skills[skill].proficient || abilityScores[ability].proficient,
            },
          ];
        })
      );
      setSkills(updatedSkills);
    }
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
            skills={skills}
            updateSkills={setSkills}
          />
          <ClassSelection
            enteredClass={enteredClass}
            abilityScores={abilityScores}
            updateAbilityScores={setAbilityScores}
          />
        </div>
        <PointBuySystem
          abilityScores={abilityScores}
          updateAbilityScores={setAbilityScores}
        />
        <div className="flex flex-col">
          <h3>Skills</h3>
          <div
            id="character-skills"
            className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10"
          >
            {skillIndexes.map((skill) => (
              <div key={skill} className="flex flex-row gap-3 items-center">
                <div
                  className={
                    skills[skill].proficient
                      ? "w-3 h-3 bg-black rounded-2xl"
                      : "w-3 h-3 bg-white rounded-2xl"
                  }
                />
                <p>{skillData[skill].name}</p>
                {/* <p>({modifier > 0 ? "+" + modifier : modifier})</p> */}
              </div>
            ))}
          </div>
        </div>
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

import { useState } from "react";
import { Form } from "react-router";

import { raceIndexes } from "../../../contexts/RaceContext";
import { classIndexes } from "../../../contexts/ClassContext";
import { abilityScoreIndexes } from "../../../contexts/AbilityScoreContext";

import Button from "../../../Button";
import Input from "../../../Input";
import RaceSelection from "./RaceSelection";
import ClassSelection from "./ClassSelection";
import PointBuySystem from "./PointBuySystem";

export default function CharacterCreation({ cancelFn, submitFn }) {
  const [enteredRace, setEnteredRace] = useState(raceIndexes[0]);
  const [enteredClass, setEnteredClass] = useState(classIndexes[0]);

  const [abilityScores, setAbilityScores] = useState(
    Object.fromEntries(
      abilityScoreIndexes.map((ability) => [
        ability,
        { score: 8, modifier: -2, proficient: false },
      ])
    )
  );
  const [proficiencies, setProficiencies] = useState([]);

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
          <RaceSelection
            enteredRace={enteredRace}
            handleRaceChange={handleRaceChange}
          />
          <ClassSelection
            enteredClass={enteredClass}
            handleClassChange={handleClassChange}
            abilityScores={abilityScores}
            updateAbilityScores={setAbilityScores}
            updateProficiencies={setProficiencies}
          />
        </div>
        <PointBuySystem
          abilityScores={abilityScores}
          updateAbilityScores={setAbilityScores}
        />
        <div>
          <h2>Proficiency Options</h2>
          <div id="class-proficiency-choices" className="flex flex-col gap-10"></div>
          <div id="race-proficiency-choices" className="flex flex-col gap-10"></div>
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

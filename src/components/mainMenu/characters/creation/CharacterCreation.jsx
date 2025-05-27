import { useState } from "react";
import { Form } from "react-router";
import { useDispatch } from "react-redux";

import { characterCreationActions } from "../../../../store/character-creation-slice";
import { capitalize } from "../../../../util/util";
import { raceIndexes } from "../../../contexts/RaceContext";
import { classIndexes } from "../../../contexts/ClassContext";

import Button from "../../../Button";
import Input from "../../../Input";
import RaceSelection from "./RaceSelection";
import ClassSelection from "./ClassSelection";
import PointBuySystem from "./PointBuySystem";
import ProficiencyOptions from "./ProficiencyOptions";
import EquipmentOptions from "./EquipmentOptions";
import LanguageOptions from "./LanguageOptions";
import SpellOptions from "./SpellOptions";

export default function CharacterCreation({ cancelFn, submitFn }) {
  const dispatch = useDispatch();

  const [enteredRace, setEnteredRace] = useState(raceIndexes[0]);
  const [enteredClass, setEnteredClass] = useState(classIndexes[0]);

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
      <div className="flex flex-col gap-25">
        <div className="flex flex-row justify-between">
          <h1>Character Creation</h1>
          <Button type="button" onClick={cancelFn}>
            Cancel
          </Button>
        </div>

        <div className="flex flex-col gap-5">
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
          </div>

          <RaceSelection enteredRace={enteredRace} />
          <ClassSelection enteredClass={enteredClass} />
        </div>
        <PointBuySystem />
        <ProficiencyOptions
          enteredClass={enteredClass}
          enteredRace={enteredRace}
        />
        <EquipmentOptions
          enteredClass={enteredClass}
          enteredRace={enteredRace}
        />
        <SpellOptions enteredClass={enteredClass} />
        <LanguageOptions enteredRace={enteredRace} />
        <div>
          <h2>Notes</h2>
          <textarea
            id="character-notes"
            name="character-notes"
            className="bg-white rounded-md text-[1.5rem] w-full h-50 p-1"
          />
        </div>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}

import { useState } from "react";
import { Form } from "react-router";

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
import Features from "./Features";
import CustomFeatures from "./CustomFeatures";

export default function CustomCharacter({ cancelFn, submitFn }) {
  const [enteredRace, setEnteredRace] = useState(raceIndexes[0]);
  const [enteredClass, setEnteredClass] = useState(classIndexes[0]);
  const [enteredLvl, setEnteredLvl] = useState(1);

  function handleLvlChange(event) {
    let currLvl = event.target.value;
    if (currLvl !== enteredLvl) {
      setEnteredLvl(parseInt(currLvl));
    }
  }

  return (
    <>
      <Form onSubmit={submitFn}>
        <div className="flex flex-col gap-25">
          <div className="flex flex-row justify-between items-center flex-wrap gap-y-3">
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
            <div className="flex flex-row flex-wrap justify-between gap-x-12 gap-y-3">
              <div>
                <label
                  htmlFor="character-race"
                  className="text-black text-[2.5rem] font-[500] mr-10"
                >
                  Race
                </label>
                <Input
                  id="character-race"
                  name="character-race"
                  type="text"
                  className="text-[2rem]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="character-class"
                  className="text-black text-[2.5rem] font-[500] mr-10"
                >
                  Class
                </label>
                <Input
                  id="character-class"
                  name="character-class"
                  type="text"
                  className="text-[2rem]"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lvl-character"
                  className="text-black text-[2.5rem] font-[500] mr-10"
                >
                  Level
                </label>
                <select
                  name={"lvl-character"}
                  id={"lvl-character"}
                  onChange={handleLvlChange}
                  className="bg-white rounded-md text-[2rem] pl-3 pr-15"
                  defaultValue={enteredLvl}
                  required
                >
                  {[...Array(20).keys()]
                    .map((n) => n + 1)
                    .map((lvl) => (
                      <option key={`character-${lvl}-option`} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <CustomFeatures />
      {/* <PointBuySystem />
      <ProficiencyOptions
        enteredClass={enteredClass}
        enteredRace={enteredRace}
      />
      <SpellOptions enteredClass={enteredClass} enteredLvl={enteredLvl} />
      <EquipmentOptions enteredClass={enteredClass} />
      <LanguageOptions enteredRace={enteredRace} />
      <div>
        <h2>Notes</h2>
        <textarea
          id="notes-character"
          name="notes-character"
          className="bg-white rounded-md text-[1.5rem] w-full h-50 p-1"
        />
      </div>
      <Button type="submit" className="self-end xl:ml-auto">
        Submit
      </Button> */}
    </>
  );
}

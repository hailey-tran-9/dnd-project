import { useEffect, useContext, useState } from "react";

import { ClassContext } from "../contexts/ClassContext.jsx";
import { RaceContext } from "../contexts/RaceContext.jsx";
import Checkboxes from "../Checkboxes.jsx";

export default function ClassChoices({
  enteredClass,
  enteredRace,
  updateProficiencies,
}) {
  const { isFetching: isFetchingClasses, classData } = useContext(ClassContext);
  const { isFetching: isFetchingRaces, raceData } = useContext(RaceContext);

  const [classProfChoices, setClassProfChoices] = useState(
    <p>Class choices are still being loaded...</p>
  );
  const [raceProfChoices, setRaceProfChoices] = useState(<></>);

  useEffect(() => {
    if (!isFetchingClasses) {
      if (enteredClass) {
        // console.log(classData[enteredClass]);
        let profChoices = classData[enteredClass]["proficiency_choices"];
        setClassProfChoices(
          <div className="flex flex-col mb-2">
            {profChoices.map((profChoice, index) =>
              getProficiencySelection(profChoice, index)
            )}
          </div>
        );
      }
    }
  }, [enteredClass]);

  useEffect(() => {
    if (!isFetchingRaces) {
      if (enteredRace) {
        console.log("ENTERED RACE: " + enteredRace);
        console.log(raceData[enteredRace]);
        let profChoices = raceData[enteredRace]["starting_proficiency_options"];
        if (profChoices) {
          console.log(profChoices);
          setRaceProfChoices(
            <div className="flex flex-col">
              <p>Choose {profChoices.choose} proficiencies:</p>
              {getProficiencySelection(profChoices)}
            </div>
          );
        }
      }
    }
  }, [enteredRace]);

  function getProficiencySelection(profOption, index=0) {
    if (profOption.from.options) {
      // console.log(profOption.from.options);
      let identifier = enteredClass + "ProfChoice" + index;

      if (profOption.from.options[0]["choice"]) {
        // console.log("PROF CHOICE");
        return (
          <div key={identifier}>
            <label htmlFor={"profOption" + index}>{profOption.desc}:</label>
            <select
              name={"profOption" + index}
              id={"profOption" + index}
              className="bg-amber-300 rounded-md ml-1"
            >
              {profOption.from.options.map((outerOption, index2) => {
                return outerOption.choice.from.options.map((option, index3) => {
                  return (
                    <option
                      key={"profOption" + index2 + "Option" + index3}
                      value={option["item"].index}
                    >
                      {getOptionLabel(option["item"].name)}
                    </option>
                  );
                });
              })}
            </select>
          </div>
        );
      } else {
        return (
          <div key={identifier}>
            <p>{profOption.desc}</p>
            <Checkboxes
              nameForInputs={identifier}
              inputProps={["item", "index"]}
              listOfInputs={profOption.from.options}
              maxNumInputs={profOption.choose}
              updateProficiencies={updateProficiencies}
            />
          </div>
        );
      }
    }
  }

  return (
    <div className="mb-5">
      <h2>Proficiency Choices</h2>
      {classProfChoices}
      {raceProfChoices}
    </div>
  );
}

function getOptionLabel(item) {
  if (item.includes(": ")) {
    return item.split(": ")[1];
  } else {
    return item;
  }
}

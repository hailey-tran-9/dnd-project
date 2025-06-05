import { useState } from "react";
import { useSelector } from "react-redux";

import Checkboxes from "../../../Checkboxes";
import { numToWord, emboldenNum } from "../../../../util/util";

export default function ProficiencyOptions({ enteredClass, enteredRace }) {
  const characterCreation = useSelector((state) => state.characterCreation);
  const [proficiencyChoiceArrays, setProficiencyChoiceArrays] = useState({});
  const [raceProficiencyChoiceArrays, setRaceProficiencyChoiceArrays] =
    useState({});

  function handleOnSelect(index1, index2, classOrRace) {
    // console.log("select");
    // console.log(index1);
    // console.log(index2);
    if (classOrRace === "class") {
      let choice =
        characterCreation.classProficiencyChoices[index1].from.options[index2]
          .item;
      setProficiencyChoiceArrays({
        ...proficiencyChoiceArrays,
        [index1]: choice,
      });
    } else {
      let choice =
        characterCreation.raceProficiencyChoices[index1].from.options[index2]
          .item;
      setRaceProficiencyChoiceArrays({
        ...raceProficiencyChoiceArrays,
        [index1]: choice,
      });
    }
  }

  let classProficiencyChoices;
  classProficiencyChoices = characterCreation.classProficiencyChoices.map(
    (choice, index1) => {
      // Check for nested choice arrays
      let nestedSelect;
      let identifier = enteredClass + "ProficiencyChoiceArray" + index1;
      if (choice.from.options) {
        let optionType = choice.from.options[0]["option_type"];
        if (optionType === "choice") {
          let sharedId = identifier + index1;
          let identifier2 = enteredClass + "ProficiencyChoice" + index1;
          let stateInitialized = false;
          nestedSelect = (
            <div key={identifier}>
              <h4>{emboldenNum(choice.desc, identifier)}</h4>
              <select
                name={identifier + "Select"}
                id={sharedId}
                className="bg-white rounded-md p-1 mb-3"
                defaultValue={proficiencyChoiceArrays[index1]}
                onChange={(e) =>
                  handleOnSelect(index1, e.target.value, "class")
                }
              >
                {choice.from.options.map((choiceArray, index2) => {
                  console.log("choice array:", choiceArray);
                  if (
                    !(index1 in proficiencyChoiceArrays) &&
                    !stateInitialized
                  ) {
                    setProficiencyChoiceArrays({
                      ...proficiencyChoiceArrays,
                      [index1]: choiceArray.item,
                    });
                    stateInitialized = true;
                  }

                  return (
                    <option
                      key={identifier + "-" + choiceArray.item.desc}
                      value={index2}
                    >
                      {choiceArray.item.desc}
                    </option>
                  );
                })}
              </select>
              {proficiencyChoiceArrays[index1] && (
                <Checkboxes
                  nameForInputs={identifier2}
                  listOfInputs={proficiencyChoiceArrays[index1].from.options}
                  maxNumInputs={proficiencyChoiceArrays[index1].choose}
                  purpose="classProficiency"
                  key={identifier2 + "Fieldset"}
                />
              )}
            </div>
          );

          return nestedSelect;
        }
      }

      identifier = enteredClass + "ProficiencyChoice" + index1;
      return (
        <div key={identifier}>
          <h4>
            {emboldenNum(choice.desc, identifier) || (
              <p>
                Choose <b>{numToWord(choice.choose)}</b> from below
              </p>
            )}
          </h4>
          <Checkboxes
            nameForInputs={identifier}
            listOfInputs={choice.from.options}
            maxNumInputs={choice.choose}
            purpose="classProficiency"
            key={identifier + "Fieldset"}
          />
        </div>
      );
    }
  );

  let raceProficiencyChoices;
  raceProficiencyChoices = characterCreation.raceProficiencyChoices.map(
    (choice, index1) => {
      // Check for nested choice arrays
      let nestedSelect;
      let identifier = enteredRace + "ProficiencyChoiceArray" + index1;
      if (choice.from.options) {
        let optionType = choice.from.options[0]["option_type"];
        if (optionType === "choice") {
          let sharedId = identifier + index1;
          let identifier2 = enteredRace + "ProficiencyChoice" + index1;
          let stateInitialized = false;
          nestedSelect = (
            <div key={identifier}>
              <h4>{emboldenNum(choice.desc, identifier)}</h4>
              <select
                name={identifier + "Select"}
                id={sharedId}
                className="bg-white rounded-md p-1 mb-3"
                defaultValue={raceProficiencyChoiceArrays[index1]}
                onChange={(e) => handleOnSelect(index1, e.target.value, "race")}
              >
                {choice.from.options.map((choiceArray, index2) => {
                  if (
                    !(index1 in raceProficiencyChoiceArrays) &&
                    !stateInitialized
                  ) {
                    setRaceProficiencyChoiceArrays({
                      ...raceProficiencyChoiceArrays,
                      [index1]: choiceArray.item,
                    });
                    stateInitialized = true;
                  }

                  return (
                    <option
                      key={identifier + "-" + choiceArray.choice.desc}
                      value={index2}
                    >
                      {choiceArray.choice.desc}
                    </option>
                  );
                })}
              </select>
              {raceProficiencyChoiceArrays[index1] && (
                <Checkboxes
                  nameForInputs={identifier2}
                  listOfInputs={
                    raceProficiencyChoiceArrays[index1].from.options
                  }
                  maxNumInputs={raceProficiencyChoiceArrays[index1].choose}
                  purpose="raceProficiency"
                  key={identifier2 + "Fieldset"}
                />
              )}
            </div>
          );

          return nestedSelect;
        }
      }

      identifier = enteredRace + "ProficiencyChoice" + index1;
      return (
        <div key={identifier}>
          <h4>
            {choice.desc || (
              <p>
                Choose <b>{numToWord(choice.choose)}</b> from below
              </p>
            )}
          </h4>
          <Checkboxes
            nameForInputs={identifier}
            listOfInputs={choice.from.options}
            maxNumInputs={choice.choose}
            purpose="raceProficiency"
            key={identifier + "Fieldset"}
          />
        </div>
      );
    }
  );

  return (
    <div>
      <h2>Proficiency Options</h2>
      <div id="character-proficiency-choices" className="flex flex-col gap-10">
        {classProficiencyChoices}
        {raceProficiencyChoices}
      </div>
    </div>
  );
}

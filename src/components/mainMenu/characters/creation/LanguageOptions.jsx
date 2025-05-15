import { useSelector } from "react-redux";

import Checkboxes from "../../../Checkboxes";
import RadioGroup from "../../../RadioGroup";

export default function LanguageOptions({ enteredRace }) {
  const characterCreation = useSelector((state) => state.characterCreation);
  const languageChoices = characterCreation.languageChoices;

  let numToChoose;
  if (languageChoices !== null) {
    numToChoose = languageChoices.choose;
  }

  return (
    languageChoices &&
    numToChoose && (
      <div>
        <h2>Language Options</h2>
        {numToChoose === 1 ? (
          <RadioGroup
            nameForInputs={enteredRace + "LanguagesRadioGroup"}
            listOfInputs={languageChoices.from.options}
            purpose="languages"
            keyAdder={enteredRace + "LanguagesRadioGroupKey"}
          />
        ) : (
          <Checkboxes
            nameForInputs={enteredRace + "LanguagesCheckboxGroup"}
            listOfInputs={languageChoices.from.options}
            maxNumInputs={numToChoose}
            purpose="languages"
            keyAdder={enteredRace + "LanguagesCheckboxGroupKey"}
          />
        )}
      </div>
    )
  );
}

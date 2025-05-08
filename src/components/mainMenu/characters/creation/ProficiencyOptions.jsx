import { useSelector } from "react-redux";

import Checkboxes from "../../../Checkboxes";

export default function ProficiencyOptions({ enteredClass }) {
  const characterCreation = useSelector((state) => state.characterCreation);
  let classProficiencyChoices;
  classProficiencyChoices = characterCreation.classProficiencyChoices.map(
    (choice, index1) => {
      let identifier = enteredClass + "ProficiencyChoice" + index1;
      return (
        <div key={identifier}>
          <h4>{choice.desc}</h4>
          <Checkboxes
            nameForInputs={identifier}
            listOfInputs={choice.from.options}
            maxNumInputs={choice.choose}
            key={identifier + "Fieldset"}
          />
        </div>
      );
    }
  );

  return (
    <div>
      <h2>Proficiency Options</h2>
      <div id="class-proficiency-choices" className="flex flex-col gap-10">
        {classProficiencyChoices}
      </div>
      <div id="race-proficiency-choices" className="flex flex-col gap-10"></div>
    </div>
  );
}

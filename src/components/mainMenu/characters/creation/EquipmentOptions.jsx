import { useSelector } from "react-redux";

import EquipmentSelect from "./EquipmentSelect";
import RadioGroup from "../../../RadioGroup";

export default function EquipmentOptions({ enteredClass }) {
  const characterCreation = useSelector((state) => state.characterCreation);

  let classEquipmentChoices;
  classEquipmentChoices = characterCreation.classStartingEquipmentChoices.map(
    (choice, index1) => {
      if (choice.from.options) {
        return (
          <EquipmentSelect
            identifier={`${enteredClass}-select-${index1}-equipment`}
            keyAdder={enteredClass + "EquipmentChoice" + index1}
            caption={choice.desc}
            options={choice.from.options}
            key={enteredClass + "EquipmentChoiceSelectKey" + index1}
          />
        );
      } else if (choice.from["equipment_category"]) {
        return (
          <div key={enteredClass + "EquipmentChoiceRadioKey" + index1}>
            <h4>{choice.from["equipment_category"].name}</h4>
            <RadioGroup
              nameForInputs={`${enteredClass}-radio-${index1}-equipment`}
              listOfInputs={choice.from["equipment_category"].equipment}
              purpose="equipment"
              keyAdder={choice.from["equipment_category"].index + "RadioGroup"}
            />
          </div>
        );
      }
    }
  );

  return (
    <div>
      <h2>Equipment Options</h2>
      <div id="class-equipment-choices" className="flex flex-col gap-10">
        {classEquipmentChoices}
      </div>
    </div>
  );
}

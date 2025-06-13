import { useSelector } from "react-redux";

import EquipmentSelect from "./EquipmentSelect";
import RadioGroup from "../../../RadioGroup";

export default function EquipmentOptions({ enteredClass }) {
  const characterCreation = useSelector((state) => state.characterCreation);

  return (
    <div>
      <h2>Equipment Options</h2>
      <div id="class-equipment-choices" className="flex flex-col gap-10">
        {characterCreation &&
          characterCreation.classStartingEquipmentChoices &&
          characterCreation.classStartingEquipmentChoices.map(
            (choice, index1) => {
              // console.log("equipment choice:", choice);
              if (choice.from["option_set_type"] === "options_array") {
                return (
                  <EquipmentSelect
                    identifier={`${enteredClass}-select-${index1}-equipment`}
                    keyAdder={enteredClass + "EquipmentChoice" + index1}
                    caption={choice.desc}
                    options={choice.from.options}
                    optionIndex={index1}
                    key={enteredClass + "EquipmentChoiceSelectKey" + index1}
                  />
                );
              } else if (
                choice.from["option_set_type"] === "equipment_category"
              ) {
                return (
                  <div key={enteredClass + "EquipmentChoiceRadioKey" + index1}>
                    <h4>{choice.from["equipment_category"].name}</h4>
                    <RadioGroup
                      nameForInputs={`${enteredClass}-radio-${index1}-equipment`}
                      listOfInputs={choice.from["equipment_category"].equipment}
                      purpose="dispatch:addToInventory"
                      optionIndex={index1}
                      keyAdder={
                        choice.from["equipment_category"].index + "RadioGroup"
                      }
                    />
                  </div>
                );
              }
            }
          )}
      </div>
    </div>
  );
}

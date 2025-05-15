import { useSelector } from "react-redux";

import EquipmentSelect from "./EquipmentSelect";

export default function EquipmentOptions({ enteredClass, enteredRace }) {
  const characterCreation = useSelector((state) => state.characterCreation);

  let classEquipmentChoices;
  classEquipmentChoices = characterCreation.classStartingEquipmentChoices.map(
    (choice, index1) => (
      <EquipmentSelect
        identifier={enteredClass + "EquipmentChoiceSelect" + index1}
        keyAdder={enteredClass + "EquipmentChoice" + index1}
        caption={choice.desc}
        options={choice.from.options}
        key={enteredClass + "EquipmentChoiceSelectKey" + index1}
      />
    )
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

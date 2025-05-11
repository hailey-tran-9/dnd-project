import { useSelector } from "react-redux";

export default function EquipmentOptions({ enteredClass, enteredRace }) {
  const characterCreation = useSelector((state) => state.characterCreation);

  let classEquipmentChoices;
  classEquipmentChoices = characterCreation.classStartingEquipmentChoices.map(
    (choice, index1) => (
      <p key={enteredClass + "EquipmentChoice" + index1}>{choice.desc}</p>
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

import { useQuery } from "@apollo/client";
import { GET_EQUIPMENT_INFO } from "../../../util/graphql";

export default function InventoryItem({ item, ...props }) {
  const { loading, error, data } = useQuery(GET_EQUIPMENT_INFO, {
    variables: { index: item.index },
  });
  let content;
  if (data) {
    const equipmentData = data.equipment;
    console.log("inventory item equipment data:", equipmentData);

    if (equipmentData["equipment_category"].index === "armor") {
      content = (
        <div className="flex flex-col text-[1rem]">
          <p>{equipmentData.desc}</p>
          <p>Armor Category: {equipmentData["armor_category"]}</p>
          <p>AC: {equipmentData["armor_class"].base}</p>
          <p>
            DEX Bonus:{" "}
            {equipmentData["armor_class"]["dex_bonus"] ? "True" : "False"}
          </p>
          <p>Max Bonus: {equipmentData["armor_class"]["max_bonus"]}</p>
          <p>
            Stealth Disadvantage:{" "}
            {equipmentData["stealth_disadvantage"] ? "True" : "False"}
          </p>
        </div>
      );
    } else if (equipmentData["equipment_category"].index === "weapon") {
      content = (
        <div className="flex flex-col text-[1rem]">
          <p>{equipmentData.desc}</p>
          <p>Weapon Category: {equipmentData["weapon_category"]}</p>
          <p>
            Weapon Range: {equipmentData["weapon_range"]}{" "}
            {equipmentData.range.normal}
          </p>
        </div>
      );
    } else if (equipmentData["equipment_category"].index === "tool") {
    } else if (equipmentData["equipment_category"].index === "gear") {
    } else if (equipmentData["equipment_category"].index === "pack") {
    } else if (equipmentData["equipment_category"].index === "ammunition") {
    } else if (equipmentData["equipment_category"].index === "vehicle") {
    }

    // content = (
    //   <div className="flex flex-col text-[1rem]">
    //     <p>{equipmentData.desc}</p>
    //   </div>
    // );
  }

  return (
    <div className="flex flex-col" {...props}>
      <div className="flex flex-row justify-between">
        <p>{item.name}</p>
        <div className="flex flex-row gap-5">
          <p className="mr-10">x{item.quantity}</p>
        </div>
      </div>
      {content}
      <div className="h-[2px] bg-[#4a4a4aad] mt-8" />
    </div>
  );
}

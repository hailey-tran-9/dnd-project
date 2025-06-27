import { useQuery } from "@apollo/client";
import { GET_EQUIPMENT_INFO } from "../../../util/graphql";

export default function InventoryItem({ item, ...props }) {
  const { loading, error, data } = useQuery(GET_EQUIPMENT_INFO, {
    variables: { index: item.index },
  });
  let content;
  let isPack = false;
  if (data) {
    const equipmentData = data.equipment;
    // console.log("inventory item equipment data:", equipmentData);

    if (
      equipmentData["gear_category"] &&
      equipmentData.index.includes("-pack")
    ) {
      isPack = true;
      content = (
        <div className="max-h-[25vh] overflow-y-auto flex flex-col text-[1rem] gap-y-3 mt-2">
          {equipmentData.contents.map((packItem, packItemIndex) => (
            <InventoryItem
              item={{ ...packItem.item, quantity: packItem.quantity }}
              key={props.key + "-packItem-" + packItemIndex}
            />
          ))}
        </div>
      );
    } else {
      if (equipmentData["equipment_category"].index === "armor") {
        content = (
          <div className="flex flex-col text-[1rem]">
            <p>{equipmentData.desc}</p>
            <p>{equipmentData["armor_category"]}</p>
            <p>{`AC ${equipmentData["armor_class"].base}, ${
              equipmentData["armor_class"]["dex_bonus"] && "DEX Bonus"
            }, ${
              equipmentData["armor_class"]["max_bonus"] > 0 &&
              `Max Bonus ${equipmentData["armor_class"]["max_bonus"]}`
            }`}</p>
            {equipmentData["stealth_disadvantage"] && (
              <p>Stealth Disadvantage</p>
            )}
          </div>
        );
      } else if (equipmentData["equipment_category"].index === "weapon") {
        content = (
          <div className="flex flex-col text-[1rem]">
            <p>{equipmentData.desc}</p>
            <p>
              {`${equipmentData["category_range"]}, ${equipmentData.range.normal}ft`}
            </p>
            <p>{`${equipmentData.damage["damage_dice"]} ${equipmentData.damage["damage_type"].name}`}</p>
            {equipmentData["two_handed_damage"] && (
              <p>{`Two-handed Damage: `}</p>
            )}
          </div>
        );
      } else if (equipmentData["equipment_category"].index === "tool") {
      } else if (equipmentData["equipment_category"].index === "gear") {
      } else if (equipmentData["equipment_category"].index === "pack") {
      } else if (equipmentData["equipment_category"].index === "ammunition") {
      } else if (equipmentData["equipment_category"].index === "vehicle") {
      }
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
      {!isPack && <div className="h-[2px] bg-[#4a4a4aad] mt-8" />}
    </div>
  );
}

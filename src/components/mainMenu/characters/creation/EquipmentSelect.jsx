import { useState } from "react";
import EquipmentItem from "./EquipmentItem";

export default function EquipmentSelect({
  identifier,
  keyAdder,
  caption,
  options,
  optionIndex,
  ...props
}) {
  const [selected, setSelected] = useState([]);

  let initSelected = false;

  function handleOnChange(optionTypeAndIndex) {
    // console.log("optionTypeAndIndex", optionTypeAndIndex);
    const args = optionTypeAndIndex.split(":");
    let optionType = args[1];
    let index = args[4];
    // console.log("handleOnChange", optionType, index);
    setSelected([index, optionType]);
  }

  return (
    <div className="flex flex-col gap-3" {...props}>
      <div className="flex flex-row gap-x-5 flex-wrap">
        <h4>{caption}</h4>
        <select
          name={identifier}
          id={identifier}
          onChange={(e) => handleOnChange(e.target.value)}
          className="bg-white rounded-md p-1"
        >
          {options.map((option, mapIndex) => {
            let label;
            let value;
            let equipmentCategory;
            let quantity = 1;
            if (option["option_type"] === "counted_reference") {
              label = option.of.name;
              value = option.of.index;
              quantity = option.count;
              equipmentCategory = option.of["equipment_category"].index;
            } else if (option["option_type"] === "choice") {
              label = option.choice.from["equipment_category"].name;
              value = option.choice.from["equipment_category"].index;
              equipmentCategory = option.choice.from["equipment_category"].index;
            } else if (option["option_type"] === "multiple") {
              // console.log("multiple options:", option.items);
              if (option.items[0]["option_type"] === "counted_reference") {
                label = option.items[0].of.name;
                value = option.items[0].of.index;
                equipmentCategory = option.items[0].of["equipment_category"].index;
              } else if (option.items[0]["option_type"] === "choice") {
                let equipmentCategoryInfo =
                  option.items[0].choice.from["equipment_category"];
                label = equipmentCategoryInfo.name;
                value = equipmentCategoryInfo.index;
                equipmentCategory = equipmentCategoryInfo.index;
              }
            }

            if (selected === "" && !initSelected) {
              // console.log("init selected item:", option);
              setSelected([value, option["option_type"]]);
              initSelected = true;
            }

            return (
              <option
                key={keyAdder + caption + mapIndex}
                value={[
                  "editInventory",
                  option["option_type"],
                  optionIndex,
                  equipmentCategory,
                  value,
                  label,
                  quantity,
                ].join(":")}
              >
                {label}
              </option>
            );
          })}
        </select>
      </div>
      {selected.length == 2 && (
        <EquipmentItem index={selected[0]} optionType={selected[1]} />
      )}
    </div>
  );
}

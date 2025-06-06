import { useState } from "react";
import EquipmentItem from "./EquipmentItem";

export default function EquipmentSelect({
  identifier,
  keyAdder,
  caption,
  options,
  ...props
}) {
  const [selected, setSelected] = useState("");
  const [content, setContent] = useState(<p>content</p>);

  let initSelected = false;

  function handleOnChange(optionTypeAndIndex) {
    const [optionType, index] = optionTypeAndIndex.split(":");
    // console.log(optionType, index);
    setSelected(index);
    setContent(<EquipmentItem index={index} optionType={optionType} />);
  }

  return (
    <div className="flex flex-col gap-3" {...props}>
      <div className="flex flex-row gap-x-5 flex-wrap">
        <h4>{caption}</h4>
        <select
          name={identifier}
          id={identifier}
          defaultValue={selected}
          onChange={(e) => handleOnChange(e.target.value)}
          className="bg-white rounded-md p-1"
        >
          {options.map((option, index) => {
            let label = "TESTLABEL";
            let value = "TESTVALUE";
            if (option["option_type"] === "counted_reference") {
              label = option.of.name;
              value = option.of.index;
            } else if (option["option_type"] === "choice") {
              label = option.choice.from["equipment_category"].name;
              value = option.choice.from["equipment_category"].index;
            } else if (option["option_type"] === "multiple") {
              // console.log(option.items);
              if (option.items[0]["option_type"] === "counted_reference") {
                label = option.items[0].of.name;
                value = option.items[0].of.index;
              } else if (option.items[0]["option_type"] === "choice") {
                let equipmentCategoryInfo =
                  option.items[0].choice.from["equipment_category"];
                label = equipmentCategoryInfo.name;
                value = equipmentCategoryInfo.index;
              }
            }

            if (selected === "" && !initSelected) {
              setSelected(value);
              setContent(
                <EquipmentItem
                  index={value}
                  optionType={option["option_type"]}
                />
              );
              initSelected = true;
            }

            return (
              <option
                key={keyAdder + caption + index}
                value={value}
              >
                {label}
              </option>
            );
          })}
        </select>
      </div>
      {content}
    </div>
  );
}

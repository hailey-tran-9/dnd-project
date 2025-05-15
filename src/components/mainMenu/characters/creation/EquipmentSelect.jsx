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

  let selectionOptions = [];

  options.map((option, index) => {
    let label = "TEST";
    let value = "";
    if (option["option_type"] === "counted_reference") {
      label = option.of.name;
      value = option.of.index;
    } else {
      label = option.choice.from["equipment_category"].name;
      value = option.choice.from["equipment_category"].index;
    }

    if (selected === "" && !initSelected) {
      setSelected(value);
      setContent(
        <EquipmentItem index={value} optionType={option["option_type"]} />
      );
      initSelected = true;
    }

    selectionOptions.push(
      <option
        key={keyAdder + caption + index}
        value={option["option_type"] + ":" + value}
      >
        {label}
      </option>
    );
  });

  function handleOnChange(optionTypeAndIndex) {
    const [optionType, index] = optionTypeAndIndex.split(":");
    console.log(optionType, index);
    setSelected(index);
    setContent(<EquipmentItem index={index} optionType={optionType} />);
  }

  return (
    <div className="flex flex-col" {...props}>
      <div className="flex flex-row gap-x-5 flex-wrap">
        <h4>{caption}</h4>
        <select
          name={identifier}
          id={identifier}
          defaultValue={selected}
          onChange={(e) => handleOnChange(e.target.value)}
          className="bg-white rounded-md p-1"
        >
          {selectionOptions}
        </select>
      </div>
      {content}
    </div>
  );
}

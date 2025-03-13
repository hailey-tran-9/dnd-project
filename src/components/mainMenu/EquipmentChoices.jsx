import { useEffect, useContext, useState } from "react";

import { ClassContext } from "../contexts/ClassContext.jsx";
import Checkboxes from "../Checkboxes.jsx";

export default function EquipmentChoices({ enteredClass }) {
  const { isFetching, classData } = useContext(ClassContext);
  const [content, setContent] = useState();

  function getEquipmentOption(equipOption, index) {
    if (equipOption.from.options) {
      return equipOption.from.options.map((option, index2) => {
        // console.log(equipOption.desc);
        // console.log("option type: " + option["option_type"]);
        let optionType = option["option_type"];

        if (optionType === "counted_reference") {
          if (option["of"]) {
            return (
              <option
                key={"equipOption" + index + "Option" + index2}
                value={option["of"].index}
              >
                {getOptionLabel(option["of"].name)}
              </option>
            );
          }
        } else if (optionType === "choice") {
          if (option["choice"]) {
            let equipCategory = option["choice"].from["equipment_category"];
            return (
              <option
                key={"equipOption" + index + "Option" + index2}
                value={equipCategory.index}
              >
                {equipCategory.name}
              </option>
            );
          }
        } else if (optionType === "multiple") {
          if (option["items"]) {
            let values = [];
            let labels = [];

            option["items"].forEach((item) => {
              if (item["of"]) {
                values.push(item["of"].index);
                labels.push(item["of"].name);
              }
            });

            return (
              <option
                key={"equipOption" + index + "Option" + index2}
                value={values.join("-")}
              >
                {labels.join(" and ")}
              </option>
            );
          }
        }
      });
    } else {
      let equipCategory = equipOption.from["equipment_category"];
      return (
        <option
          key={"equipOption" + index + "Category"}
          value={equipCategory.index}
        >
          {equipCategory.name}
        </option>
      );
    }
  }

  useEffect(() => {
    if (!isFetching) {
      if (enteredClass) {
        // console.log(classData[enteredClass]);
        let equipOptions =
          classData[enteredClass]["starting_equipment_options"];
        setContent(
          <div>
            <h2>Equipment Options</h2>
            <div className="flex flex-col gap-2">
              {equipOptions.map((equipOption, index) => (
                <div key={"equipOption" + index}>
                  <label htmlFor={"equipOption" + index}>
                    {equipOption.desc}:
                  </label>
                  <select
                    name={"equipOption" + index}
                    id={"equipOption" + index}
                    className="bg-amber-300 rounded-md ml-1"
                  >
                    {getEquipmentOption(equipOption, index)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
  }, [enteredClass]);

  return content ? content : <p>Class data is still being loaded...</p>;
}

function getOptionLabel(item) {
  if (item.includes(": ")) {
    return item.split(" ")[1];
  } else {
    return item;
  }
}

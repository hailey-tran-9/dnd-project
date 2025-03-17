import { useEffect, useContext, useState } from "react";

import { ClassContext } from "../contexts/ClassContext.jsx";
import Checkboxes from "../Checkboxes.jsx";

export default function ClassChoices({ enteredClass, updateProficiencies }) {
  const { isFetching, classData } = useContext(ClassContext);
  const [content, setContent] = useState();

  function getProficiencySelection(profOption, index) {
    if (profOption.from.options) {
      // console.log(profOption.from.options);
      let identifier = enteredClass + "ProfChoice" + index;

      if (profOption.from.options[0]["choice"]) {
        // console.log("PROF CHOICE");
        return (
          <div key={identifier}>
            <label htmlFor={"profOption" + index}>{profOption.desc}:</label>
            <select
              name={"profOption" + index}
              id={"profOption" + index}
              className="bg-amber-300 rounded-md ml-1"
            >
              {profOption.from.options.map((outerOption, index2) => {
                return outerOption.choice.from.options.map((option, index3) => {
                  return (
                    <option
                      key={"profOption" + index2 + "Option" + index3}
                      value={option["item"].index}
                    >
                      {getOptionLabel(option["item"].name)}
                    </option>
                  );
                });
              })}
            </select>
          </div>
        );
      } else {
        return (
          <div key={identifier}>
            <p>{profOption.desc}</p>
            <Checkboxes
              nameForInputs={identifier}
              inputProps={["item", "index"]}
              listOfInputs={profOption.from.options}
              maxNumInputs={profOption.choose}
              updateProficiencies={updateProficiencies}
            />
          </div>
        );
      }
    }
  }

  useEffect(() => {
    if (!isFetching) {
      if (enteredClass) {
        // console.log(classData[enteredClass]);
        let profChoices = classData[enteredClass]["proficiency_choices"];
        setContent(
          <div className="mb-5">
            <h2>Proficiency Choices</h2>
            <div className="flex flex-col gap-2">
              {profChoices.map((profChoice, index) =>
                getProficiencySelection(profChoice, index)
              )}
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

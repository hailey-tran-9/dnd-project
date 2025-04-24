import { useState } from "react";

export default function Checkboxes({
  nameForInputs,
  inputProps,
  listOfInputs,
  maxNumInputs,
  updateProficiencies,
}) {
  const [checkedState, setCheckedState] = useState(Array(listOfInputs.length).fill(false));

  function handleOnChange(index, event) {
    if (
      checkedState.filter((i) => i).length >= maxNumInputs &&
      event.target.checked
    )
      return;
    const updatedCheckedState = checkedState.map((check, index2) =>
      index === index2 ? !check : check
    );
    setCheckedState(updatedCheckedState);
    // console.log(getOptionIndex(event.target.value));
    updateProficiencies(getOptionIndex(event.target.value));
  }

  return (
    <fieldset className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10">
      {listOfInputs.map((element, index) => {
        let identifier = element;
        for (let i = 0; i < inputProps.length; i++) {
          identifier = identifier[inputProps[i]];
        }

        // console.log("identifier: " + identifier);

        return (
          <div key={getOptionIndex(element.item.name)}>
            <input
              type="checkbox"
              id={identifier + "-" + nameForInputs}
              name={nameForInputs}
              value={identifier}
              checked={checkedState[index]}
              className="w-[1rem] h-[1rem] mr-2"
              onChange={() => handleOnChange(index, event)}
              onLoad={() => {
                checkedState.push(false);
                setCheckedState([...checkedState]);
              }}
            />
            <label htmlFor={identifier + "-" + nameForInputs}>
              {getOptionIndex(element.item.name)}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

function getOptionIndex(item) {
  if (item.includes(": ")) {
    return item.split(": ")[1];
  } else if (item.includes("-")) {
    let strs = item.split("-").toSpliced(0, 1);
    return strs.join("-");
  } else {
    return item;
  }
}

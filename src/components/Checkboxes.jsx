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
    console.log(getOptionIndex(event.target.value));
    updateProficiencies(getOptionIndex(event.target.value));
  }

  return (
    <fieldset className="grid grid-cols-4">
      {listOfInputs.map((element, index) => {
        let identifier = element;
        for (let i = 0; i < inputProps.length; i++) {
          identifier = identifier[inputProps[i]];
        }

        return (
          <div key={getOptionLabel(element.item.name)}>
            <input
              type="checkbox"
              id={identifier}
              name={nameForInputs}
              value={identifier}
              checked={checkedState[index]}
              className="mr-1"
              onChange={() => handleOnChange(index, event)}
              onLoad={() => {
                checkedState.push(false);
                setCheckedState([...checkedState]);
              }}
            />
            <label htmlFor={identifier}>
              {getOptionLabel(element.item.name)}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}

function getOptionLabel(item) {
  if (item.includes(": ")) {
    return item.split(" ")[1];
  } else {
    return item;
  }
}

function getOptionIndex(item) {
  if (item.includes(": ")) {
    return item.split(" ")[1];
  } else if (item.includes("-")) {
    return item.split("-")[1];
  } else {
    return item;
  }
}

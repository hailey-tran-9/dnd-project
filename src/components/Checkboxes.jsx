import { useEffect } from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { characterCreationActions } from "../store/character-creation-slice";

export default function Checkboxes({
  nameForInputs,
  listOfInputs,
  maxNumInputs,
  ...props
}) {
  const dispatch = useDispatch();
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    setCheckedState(Array(listOfInputs.length).fill(false));
  }, [listOfInputs]);

  function handleOnChange(index1, event) {
    if (
      checkedState.filter((i) => i).length >= maxNumInputs &&
      event.target.checked
    )
      return;
    const updatedCheckedState = checkedState.map((check, index2) => {
      // console.log(event.target.value);
      if (index1 === index2) {
        let skill = event.target.value;
        dispatch(
          characterCreationActions.updateSkillProficiency({
            skill,
            checked: !check,
          })
        );
        return !check;
      }
      return check;
    });
    setCheckedState(updatedCheckedState);
    // console.log(getOptionIndex(event.target.value));
  }

  return (
    <fieldset
      className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10"
      {...props}
    >
      {listOfInputs.map((element, index) => {
        let inputName = getOptionIndex(element.item.name);
        let inputValue = getOptionIndex(element.item.index);

        return (
          <div key={inputName}>
            <input
              type="checkbox"
              id={inputName + "-" + nameForInputs}
              name={nameForInputs}
              value={inputValue}
              checked={checkedState[index] || false}
              className="w-[1rem] h-[1rem] mr-2"
              onChange={() => handleOnChange(index, event)}
            />
            <label htmlFor={inputName + "-" + nameForInputs}>{inputName}</label>
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

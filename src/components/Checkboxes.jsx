import { useEffect } from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { characterCreationActions } from "../store/character-creation-slice";

export default function Checkboxes({
  nameForInputs,
  listOfInputs,
  maxNumInputs,
  proficiencySource,
  ...props
}) {
  const dispatch = useDispatch();
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    setCheckedState(Array(listOfInputs.length).fill(false));
  }, [listOfInputs]);

  function handleOnChange(index1, type, event) {
    if (
      checkedState.filter((i) => i).length >= maxNumInputs &&
      event.target.checked
    )
      return;
    const updatedCheckedState = checkedState.map((check, index2) => {
      // console.log(event.target.value);
      if (index1 === index2) {
        if (type === "SKILLS") {
          let skill = event.target.value;
          dispatch(
            characterCreationActions.updateSkillProficiency({
              skill,
              checked: !check,
            })
          );
        } else {
          if (proficiencySource === "class") {
            dispatch(
              characterCreationActions.updateClassProficiency({
                index: event.target.value,
                operation: !check,
              })
            );
          } else {
            dispatch(
              characterCreationActions.updateRaceProficiency({
                index: event.target.value,
                operation: !check,
              })
            );
          }
        }
        return !check;
      }
      return check;
    });
    setCheckedState(updatedCheckedState);
  }

  return (
    <fieldset
      className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10"
      {...props}
    >
      {listOfInputs.map((element, index) => {
        let inputName = element.item.name;
        let inputValue = element.item.index;
        // console.log(element.item);

        if (element.item.type === "SKILLS") {
          inputName = getOptionIndex(element.item.name);
          inputValue = getOptionIndex(element.item.index);
        }

        return (
          <div key={inputName}>
            <input
              type="checkbox"
              id={inputName + "-" + nameForInputs}
              name={nameForInputs}
              value={inputValue}
              checked={checkedState[index] || false}
              className="w-[1rem] h-[1rem] mr-2"
              onChange={() => handleOnChange(index, element.item.type, event)}
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

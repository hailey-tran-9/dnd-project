import { useQuery } from "@apollo/client";

import { GET_EQUIPMENT_INFO } from "../util/graphql";

export default function Option({
  index,
  element,
  nameForInputs,
  handleOnChange,
  checkedState,
  updateCheckedState,
}) {
  const { loading, error, data } = useQuery(GET_EQUIPMENT_INFO, {
    variables: index,
  });

  let identifier = element;
  for (let i = 0; i < inputProps.length; i++) {
    identifier = identifier[inputProps[i]];
  }

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
          updateCheckedState([...checkedState]);
        }}
      />
      <label htmlFor={identifier + "-" + nameForInputs}>
        {getOptionIndex(element.item.name)}
      </label>
    </div>
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

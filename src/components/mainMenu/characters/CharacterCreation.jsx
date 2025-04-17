import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_CLASSES, GET_CLASS } from "../../../util/graphql";
import { capitalize } from "../../../util/util";

import LoadingIndicator from "../../LoadingIndicator";
import ErrorIndicator from "../../ErrorIndicator";

import { classIndexes } from "../../contexts/ClassContext";

export default function CharacterCreation({ updateIsCreating }) {
  const [enteredClass, setEnteredClass] = useState(classIndexes[0]);

  let content;

  const { loading, error, data } = useQuery(GET_CLASS, {
    variables: { index: enteredClass },
  });
  let dataToPrint;
  if (loading) {
    dataToPrint = "still loading";
    content = <LoadingIndicator />;
  }
  if (error) {
    dataToPrint = "an error occurred";
    content = <ErrorIndicator />;
  }
  if (data) {
    dataToPrint = data;
    content = (
      <div>
        <label htmlFor={"classSelection"} className="mr-1">
          Available Classes:
        </label>
        <select
          name={"classSelection"}
          id={"classSelection"}
          onChange={handleClassChange}
          className="bg-amber-300 rounded-md"
          required
        >
          {classIndexes.map((className) => (
            <option key={className + "Option"} value={className}>
              {capitalize(className)}
            </option>
          ))}
        </select>
      </div>
    );
  }
  console.log(dataToPrint);

  function handleClassChange(event) {
    // console.log(event.target.value);
    let currClass = event.target.value;
    if (currClass !== enteredClass) {
      setEnteredClass(currClass);
    }
  }

  return (
    <div className="grow flex flex-col bg-white p-16 rounded-md">
      <h1>Character Creation</h1>
      {content}
    </div>
  );
}

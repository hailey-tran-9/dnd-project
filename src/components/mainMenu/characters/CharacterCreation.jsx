import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Form } from "react-router";

import { GET_CLASSES, GET_CLASS } from "../../../util/graphql";
import { capitalize } from "../../../util/util";

import LoadingIndicator from "../../LoadingIndicator";
import ErrorIndicator from "../../ErrorIndicator";
import Button from "../../Button";
import Input from "../../Input";

import { classIndexes } from "../../contexts/ClassContext";

export default function CharacterCreation({ cancelFn, submitFn }) {
  const [enteredClass, setEnteredClass] = useState(classIndexes[0]);

  let content;
  let classContent;

  const { loading, error, data } = useQuery(GET_CLASS, {
    variables: { index: enteredClass },
  });

  function handleClassChange(event) {
    // console.log(event.target.value);
    let currClass = event.target.value;
    if (currClass !== enteredClass) {
      setEnteredClass(currClass);
    }
  }

  let dataToPrint;
  if (loading) {
    dataToPrint = "still loading";
    classContent = <LoadingIndicator />;
  }
  if (error) {
    dataToPrint = "an error occurred";
    classContent = <ErrorIndicator />;
  }
  if (data) {
    dataToPrint = data.class;
    classContent = (
      <div>
        <label
          htmlFor="character-class"
          className="text-black text-[2.5rem] font-[500] mr-10"
        >
          Class
        </label>
        <select
          name={"character-class"}
          id={"character-class"}
          onChange={handleClassChange}
          className="bg-white rounded-md"
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

  return (
    <Form onSubmit={submitFn}>
      <div className="flex flex-row justify-between mb-10">
        <h1>Character Creation</h1>
        <Button type="button" onClick={cancelFn}>
          Cancel
        </Button>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <label
            htmlFor="character-name"
            className="text-black text-[2.5rem] font-[500] mr-10"
          >
            Character name
          </label>
          <Input
            id="character-name"
            name="character-name"
            type="text"
            className="text-[2rem]"
            required
          />
        </div>
        <div>
          <label
            htmlFor="character-race"
            className="text-black text-[2.5rem] font-[500] mr-10"
          >
            Race
          </label>
          <Input
            id="character-race"
            name="character-race"
            type="text"
            className="text-[2rem]"
            required
          />
        </div>
        {classContent}
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  );
}

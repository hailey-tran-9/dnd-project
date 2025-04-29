import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@apollo/client";
import { GET_CLASS } from "../../../../util/graphql";
import { useDispatch } from "react-redux";

import LoadingIndicator from "../../../LoadingIndicator";
import ErrorIndicator from "../../../ErrorIndicator";
import Checkboxes from "../../../Checkboxes";

import { characterCreationActions } from "../../../../store/character-creation-slice";

export default function ClassSelection({
  enteredClass,
}) {
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_CLASS, {
    variables: { index: enteredClass },
  });

  useEffect(() => {
    if (data && data.class) {
      dispatch(
        characterCreationActions.setClassAndLvl({
          class: data.class.index,
          lvl: 1,
          classData: data.class,
        })
      );
    }
  }, [data]);

  function getProficiencySelection(proficiencyChoice, classOrRace, index = 0) {
    if (proficiencyChoice.from.options) {
      // console.log(proficiencyChoice.from.options);
      let identifier;
      if (classOrRace === "class") {
        identifier = enteredClass + "ProfChoice" + index;
      } else {
        identifier = enteredRace + "ProfChoice" + index;
      }

      if (proficiencyChoice.from.options[0]["choice"]) {
        // console.log("PROF CHOICE");
        return (
          <div key={identifier}>
            <label
              htmlFor={"proficiencyChoice" + index}
              className="text-[#4a4a4a] text-[1.75rem] font-[500]"
            >
              {proficiencyChoice.desc}:
            </label>
            <select
              name={"proficiencyChoice" + index}
              id={"proficiencyChoice" + index}
            >
              {proficiencyChoice.from.options.map((option, index2) => {
                return (
                  <option
                    key={"proficiencyChoice" + index2 + "Option"}
                    value={option["item"].index}
                  >
                    {getOptionLabel(option["item"].name)}
                  </option>
                );
              })}
            </select>
          </div>
        );
      } else {
        return (
          <div key={identifier}>
            <h4>{proficiencyChoice.desc}</h4>
            <Checkboxes
              nameForInputs={identifier}
              inputProps={["item", "index"]}
              listOfInputs={proficiencyChoice.from.options}
              maxNumInputs={proficiencyChoice.choose}
            />
          </div>
        );
      }
    }
  }

  let classContent;
  let portalContent;
  let dataToPrint;
  if (loading) {
    dataToPrint = "still loading class data";
    portalContent = <LoadingIndicator />;
  }
  if (error) {
    dataToPrint = "an error occurred when trying to fetch class data";
    portalContent = <ErrorIndicator />;
  }
  if (data) {
    dataToPrint = data.class;
    console.log(dataToPrint);

    if (data.class["proficiency_choices"]) {
      portalContent = (
        <>
          {data.class["proficiency_choices"].map((profChoice, index) =>
            getProficiencySelection(profChoice, "class", index)
          )}
        </>
      );
    }
  }

  return (
    <>
      {document.getElementById("class-proficiency-choices") &&
        createPortal(
          portalContent,
          document.getElementById("class-proficiency-choices")
        )}
    </>
  );
}

function getOptionLabel(item) {
  if (item.includes(": ")) {
    return item.split(": ")[1];
  } else {
    return item;
  }
}

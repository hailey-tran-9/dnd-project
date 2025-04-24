import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@apollo/client";
import { GET_CLASS } from "../../../../util/graphql";

import LoadingIndicator from "../../../LoadingIndicator";
import ErrorIndicator from "../../../ErrorIndicator";
import Checkboxes from "../../../Checkboxes";

import { capitalize } from "../../../../util/util";
import { classIndexes } from "../../../contexts/ClassContext";

export default function ClassSelection({
  enteredClass,
  handleClassChange,
  abilityScores,
  updateAbilityScores,
  updateProficiencies,
}) {
  const { loading, error, data } = useQuery(GET_CLASS, {
    variables: { index: enteredClass },
  });

  useEffect(() => {
    if (data && data.class) {
      if (data.class.proficiencies) {
        data.class.proficiencies.map((profificiency) => {
          if (profificiency.type === "SAVING_THROWS") {
            let ability = profificiency.index.split("-")[2];
            if (!abilityScores[ability].proficient) {
              updateAbilityScores((prevAbilityScores) => ({
                ...prevAbilityScores,
                [ability]: {
                  score: prevAbilityScores[ability].score,
                  modifier: prevAbilityScores[ability].modifier,
                  proficient: true,
                },
              }));
            }
          }
        });
      }
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
            <label htmlFor={"proficiencyChoice" + index} className="text-[#4a4a4a] text-[1.75rem] font-[500]">
              {proficiencyChoice.desc}:
            </label>
            <select
              name={"proficiencyChoice" + index}
              id={"proficiencyChoice" + index}
              className="bg-amber-300 rounded-md ml-1"
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
              updateProficiencies={updateProficiencies}
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
    classContent = <LoadingIndicator />;
  }
  if (error) {
    dataToPrint = "an error occurred when trying to fetch class data";
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
          className="bg-white rounded-md text-[2rem] pl-3 pr-15"
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
  // console.log(dataToPrint);

  return (
    <>
      {classContent}{" "}
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

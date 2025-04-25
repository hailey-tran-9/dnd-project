import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { createPortal } from "react-dom";
import { GET_RACE } from "../../../../util/graphql";

import LoadingIndicator from "../../../LoadingIndicator";
import ErrorIndicator from "../../../ErrorIndicator";

import { capitalize } from "../../../../util/util";
import { raceIndexes } from "../../../contexts/RaceContext";
import { abilityScoreIndexes } from "../../../contexts/AbilityScoreContext";
import { skillIndexes } from "../../../contexts/SkillContext";

export default function RaceSelection({
  enteredRace,
  abilityScores,
  updateAbilityScores,
  skills,
  updateSkills,
}) {
  let raceContent;
  let portalContent;

  const { loading, error, data } = useQuery(GET_RACE, {
    variables: { index: enteredRace },
  });

  useEffect(() => {
    if (data && data.race) {
      if (data.race["ability_bonuses"]) {
        let updatedAbilityScores = { ...abilityScores };
        let raceBonuses = {};

        // Find the selected race's inherent ability bonuses
        data.race["ability_bonuses"].map((abilityBonus) => {
          raceBonuses[abilityBonus["ability_score"].index] = abilityBonus.bonus;
        });

        // Update the abilityScores state to reflect this
        abilityScoreIndexes.map((ability) => {
          if (Object.keys(raceBonuses).includes(ability)) {
            updatedAbilityScores[ability].bonus = raceBonuses[ability];
          } else {
            updatedAbilityScores[ability].bonus = 0;
          }
        });

        updateAbilityScores(updatedAbilityScores);
      }
      
      if (data.race["starting_proficiencies"]) {
        let updatedSkills = { ...skills };
        let raceProficiencies = [];

        // Find the selected class's inherent skill proficiencies
        data.race["starting_proficiencies"].map((profificiency) => {
          if (profificiency.type === "SKILLS") {
            let skill = profificiency.index.split("skill-")[1];
            raceProficiencies.push(skill);
          }
        });

        // Update the skills state to reflect this
        skillIndexes.map((skill) => {
          if (raceProficiencies.includes(skill)) {
            updatedSkills[skill].proficient = true;
          } else {
            updatedSkills[skill].proficient = false;
          }
        })

        updateSkills(updatedSkills);
      }
    }
  }, [data]);

  let dataToPrint;
  if (loading) {
    dataToPrint = "still loading race data";
    portalContent = <LoadingIndicator />;
  }
  if (error) {
    dataToPrint = "an error occurred when trying to fetch race data";
    portalContent = <ErrorIndicator />;
  }
  if (data) {
    dataToPrint = data.race;
    console.log(dataToPrint);

    if (data.race["starting_proficiencies"]) {
      portalContent = (
        <>
          {data.race["starting_proficiencies"].map((startProf, index) => {
            if (startProf.type === "SKILLS") {
              let skillIndex = startProf.index.split("skill-")[1];
              return <p key={"character" + { skillIndex }}>{skillIndex}</p>;
            }
          })}
        </>
      );
    }
  }

  return (
    <>
      {/* {document.getElementById("character-skills") &&
        createPortal(
          portalContent,
          document.getElementById("character-skills")
        )} */}
    </>
  );
}

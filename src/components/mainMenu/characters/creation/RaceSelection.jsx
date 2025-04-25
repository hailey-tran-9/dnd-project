import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { createPortal } from "react-dom";
import { GET_RACE } from "../../../../util/graphql";

import LoadingIndicator from "../../../LoadingIndicator";
import ErrorIndicator from "../../../ErrorIndicator";

import { calculateAbilityModifier, capitalize } from "../../../../util/util";
import { raceIndexes } from "../../../contexts/RaceContext";
import { abilityScoreIndexes } from "../../../contexts/AbilityScoreContext";
import { skillIndexes } from "../../../contexts/SkillContext";

export default function RaceSelection({
  enteredRace,
  abilityScores,
  updateAbilityScores,
  updateProficiencies,
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
          let newBonus = raceBonuses[ability] || 0;
          updatedAbilityScores[ability].bonus = newBonus;
          updatedAbilityScores[ability].score = 8 + newBonus;
          updatedAbilityScores[ability].modifier = calculateAbilityModifier(
            8 + newBonus
          );
        });
        updateAbilityScores(updatedAbilityScores);
      }

      if (data.race["starting_proficiencies"]) {
        let updatedProficiencies = [];
        // Find the selected race's inherent skill proficiencies
        data.race["starting_proficiencies"].map((proficiency) => {
          if (proficiency.type === "SKILLS") {
            let skill = proficiency.index.split("skill-")[1];
            if (!updatedProficiencies.includes(skill)) {
              updatedProficiencies.push(skill);
            }
          }
        });
        updateProficiencies(updatedProficiencies);
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
  }

  return;
}

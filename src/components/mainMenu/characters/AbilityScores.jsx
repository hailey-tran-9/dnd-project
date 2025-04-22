import { abilityScoreIndexes } from "../../contexts/AbilityScoreContext";
import AbilityScoreBox from "../../mainMenu/characters/AbilityScoreBox";

export default function AbilityScores({ selectedCharacter }) {
  return (
    <div className="flex flex-col my-5">
      <h2>Ability Scores</h2>
      <div className="flex flex-row gap-3 md:gap-5 mt-3">
        {abilityScoreIndexes.map((ability) => {
          let abilityStats = selectedCharacter.abilitiesAndSkills[ability];
          return (
            <AbilityScoreBox
              ability={ability}
              score={abilityStats.score}
              modifier={abilityStats.modifier}
              proficient={abilityStats.proficient}
              key={selectedCharacter.characterID + "-" + ability}
            />
          );
        })}
      </div>
    </div>
  );
}

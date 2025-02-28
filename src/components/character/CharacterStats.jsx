import { useContext } from "react";

import { CharacterContext } from "../contexts/CharacterContext.jsx";
import {
  AbilityScoreContext,
  abilityScoreIndexes,
} from "../contexts/AbilityScoreContext.jsx";

import CharacterInfoBox from "./CharacterInfoBox.jsx";
import StatItem from "../StatItem.jsx";

export default function CharacterStats() {
  const charCtx = useContext(CharacterContext);
  const abilityScoreCtx = useContext(AbilityScoreContext);

  return (
    <CharacterInfoBox id="characterStats" title="Stats">
      <div className="flex flex-col gap-2">
        {abilityScoreIndexes.map((index) => {
          let fullName = abilityScoreCtx[index].full_name;
          let abilityScore = charCtx.abilities[index].abilityScore;
          let modifier = charCtx.abilities[index].modifier;
          let proficiencyBonus = charCtx.proficiencyBonus;

          return (
            <StatItem
              key={`${index}Item`}
              ability={index}
              fullName={fullName}
              abilityScore={abilityScore}
              modifier={modifier}
              proficiencyBonus={proficiencyBonus}
            ></StatItem>
          );
        })}
      </div>
    </CharacterInfoBox>
  );
}

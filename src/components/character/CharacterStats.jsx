import { useContext, useEffect, useState } from "react";

import { CharacterContext } from "../contexts/CharacterContext.jsx";
import {
  AbilityScoreContext,
  abilityScoreIndexes,
} from "../contexts/AbilityScoreContext.jsx";

import CharacterInfoBox from "./CharacterInfoBox.jsx";
import StatItem from "../StatItem.jsx";

export default function CharacterStats() {
  const charCtx = useContext(CharacterContext);
  const {isFetching, abilityScoreData} = useContext(AbilityScoreContext);
  const [content, setContent] = useState();

  useEffect(() => {
    if (!isFetching) {
      setContent(
        <div className="flex flex-col gap-2">
          {abilityScoreIndexes.map((index) => {
            let fullName = abilityScoreData[index].full_name;
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
      );
    }
  }, [abilityScoreData]);

  return (
    <CharacterInfoBox id="characterStats" title="Stats">
      {content && content}
      {!content && <p>Fetching ability data...</p>}
    </CharacterInfoBox>
  );
}

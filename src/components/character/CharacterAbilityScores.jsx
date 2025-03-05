import { useContext, useEffect, useState } from "react";

import { CharacterContext } from "../contexts/CharacterContext.jsx";
import {
  AbilityScoreContext,
  abilityScoreIndexes,
} from "../contexts/AbilityScoreContext.jsx";

import CharacterInfoBox from "./CharacterInfoBox.jsx";
import AbilityScoreItem from "../AbilityScoreItem.jsx";

export default function CharacterAbilityScores() {
  const { charData } = useContext(CharacterContext);
  const abilities = charData.abilities;
  const {isFetching, abilityScoreData} = useContext(AbilityScoreContext);
  const [content, setContent] = useState();

  useEffect(() => {
    if (!isFetching) {
      setContent(
        <div className="flex flex-col gap-2">
          {abilityScoreIndexes.map((index) => {
            let fullName = abilityScoreData[index].full_name;
            let abilityScore = abilities[index].abilityScore;
            let modifier = abilities[index].modifier;
            let proficiencyBonus = charData.proficiencyBonus;

            return (
              <AbilityScoreItem
                key={`${index}Item`}
                ability={index}
                fullName={fullName}
                abilityScore={abilityScore}
                modifier={modifier}
                proficiencyBonus={proficiencyBonus}
              ></AbilityScoreItem>
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

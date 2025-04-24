import { useState } from "react";

import { calculateAbilityModifier } from "../../../../util/util.js";
import { abilityScoreIndexes } from "../../../contexts/AbilityScoreContext.jsx";

import PointBuyBox from "./PointBuyBox.jsx";

const pointMapping = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

export default function PointBuySystem({ abilityScores, updateAbilityScores }) {
  const [points, setPoints] = useState(27);
  const [pointSystem, setPointSystem] = useState(
    abilityScoreIndexes.reduce((o, key) => ({ ...o, [key]: 8 }), {})
  );

  function incScore(ability) {
    let currScore = pointSystem[ability];
    if (currScore < 15) {
      let cost = pointMapping[currScore + 1] - pointMapping[currScore];
      if (points >= cost) {
        let newScore = currScore + 1;
        setPoints((prevPoints) => prevPoints - cost);
        setPointSystem((prevPointSystem) => ({
          ...prevPointSystem,
          [ability]: newScore,
        }));
        updateAbilityScores((prevAbilityScores) => ({
          ...prevAbilityScores,
          [ability]: {
            ...prevAbilityScores[ability],
            score: newScore,
            modifier: calculateAbilityModifier(newScore),
          },
        }));
      }
    }
  }

  function decScore(ability) {
    let currScore = pointSystem[ability];
    if (currScore > 8) {
      let cost = pointMapping[currScore] - pointMapping[currScore - 1];
      setPoints((prevPoints) => prevPoints + cost);
      setPointSystem((prevPointSystem) => ({
        ...prevPointSystem,
        [ability]: currScore - 1,
      }));
    }
  }

  return (
    <div className="flex flex-col">
      <h2>Point-Buy System</h2>
      <h3>Points left to use: {points}</h3>
      <div className="flex flex-row justify-start xl:justify-center gap-[1vw] mt-3">
        {abilityScoreIndexes.map((ability) => (
          <PointBuyBox
            key={ability + "PointBuyBox"}
            ability={ability}
            score={pointSystem[ability]}
            proficient={abilityScores[ability].proficient}
            incScore={() => incScore(ability)}
            decScore={() => decScore(ability)}
          />
        ))}
      </div>
    </div>
  );
}

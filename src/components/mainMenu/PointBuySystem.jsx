import { useState } from "react";

import { abilityScoreIndexes } from "../contexts/AbilityScoreContext.jsx";
import PointBuyBox from "./PointBuyBox.jsx";

// TODO: notif the user when an attempted dec/inc in score isn't valid

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

export default function PointBuySystem({ proficiencies }) {
  const [points, setPoints] = useState(27);
  const [pointSystem, setPointSystem] = useState(
    abilityScoreIndexes.reduce((o, key) => ({ ...o, [key]: 8 }), {})
  );

  function incScore(ability) {
    let currScore = pointSystem[ability];
    if (currScore < 15) {
      let cost = pointMapping[currScore + 1] - pointMapping[currScore];
      if (points >= cost) {
        setPoints((prevPoints) => prevPoints - cost);
        setPointSystem((prevPointSystem) => ({
          ...prevPointSystem,
          [ability]: currScore + 1,
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
    <div className="flex flex-col gap-1">
      <h2>Point-Buy System</h2>
      <p>Points Left to Spend: {points}</p>
      <div className="flex flex-row justify-around">
        {abilityScoreIndexes.map((ability) => (
          <PointBuyBox
            key={ability + "PointBuyBox"}
            ability={ability}
            score={pointSystem[ability]}
            proficient={proficiencies.includes(ability)}
            incScore={() => incScore(ability)}
            decScore={() => decScore(ability)}
          />
        ))}
      </div>
    </div>
  );
}

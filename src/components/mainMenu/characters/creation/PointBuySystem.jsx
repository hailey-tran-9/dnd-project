import { useState, useEffect } from "react";

import { calculateAbilityModifier } from "../../../../util/util.js";
import { abilityScoreIndexes } from "../../../contexts/AbilityScoreContext.jsx";
import { skillIndexes } from "../../../contexts/SkillContext.jsx";

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

export default function PointBuySystem({ abilityScores, updateAbilityScores, skills }) {
  const [points, setPoints] = useState(27);
  const [pointSystem, setPointSystem] = useState(
    abilityScoreIndexes.reduce(
      (o, key) => ({
        ...o,
        [key]: abilityScores[key].score,
      }),
      {}
    )
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
            score: newScore + prevAbilityScores[ability].bonus,
            modifier: calculateAbilityModifier(
              newScore + prevAbilityScores[ability].bonus
            ),
          },
        }));
      }
    }
  }

  function decScore(ability) {
    let currScore = pointSystem[ability];
    if (currScore > 8) {
      let newScore = currScore - 1;
      let cost = pointMapping[currScore] - pointMapping[currScore - 1];
      setPoints((prevPoints) => prevPoints + cost);
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

  return (
    <>
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
              bonus={abilityScores[ability].bonus}
              incScore={() => incScore(ability)}
              decScore={() => decScore(ability)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3>Skills</h3>
        <div
          id="character-skills"
          className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10"
        >
          {skillIndexes.map((skill) => {
            let modifier = skills[skill].modifier;
            return (
              <div key={skill} className="flex flex-row gap-3 items-center">
                <div
                  className={
                    skills[skill].proficient
                      ? "w-3 h-3 bg-black rounded-2xl"
                      : "w-3 h-3 bg-white rounded-2xl"
                  }
                />
                <p>{skills[skill].name}</p>
                <p>{`(${modifier > 0 ? "+" + modifier : modifier})`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

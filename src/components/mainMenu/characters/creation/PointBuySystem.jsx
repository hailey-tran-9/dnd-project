import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";

import { GET_SKILLS } from "../../../../util/graphql.jsx";
import { abilityScoreIndexes } from "../../../contexts/AbilityScoreContext.jsx";
import { skillIndexes } from "../../../contexts/SkillContext.jsx";

import PointBuyBox from "./PointBuyBox.jsx";
import LoadingIndicator from "../../../LoadingIndicator.jsx";
import ErrorIndicator from "../../../ErrorIndicator.jsx";
import { characterCreationActions } from "../../../../store/character-creation-slice.js";

export default function PointBuySystem() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_SKILLS);
  const characterCreation = useSelector((state) => state.characterCreation);

  useEffect(() => {
    let skillsContent;
    if (loading) {
      skillsContent = <LoadingIndicator />;
    }
    if (error) {
      skillsContent = <ErrorIndicator />;
    }
    if (data) {
      data.skills.map((skill) => {
        dispatch(
          characterCreationActions.updateSkillName({
            skill: skill.index,
            name: skill.name,
          })
        );
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col">
      <h2>Point-Buy System</h2>
      <h3>Points left to use: {characterCreation.points}</h3>
      <div className="flex flex-row justify-start xl:justify-center gap-[1vw] mt-3">
        {abilityScoreIndexes.map((ability) => (
          <PointBuyBox key={ability + "PointBuyBox"} ability={ability} />
        ))}
      </div>

      <div className="mt-5">
        <h3>Skills</h3>
        <div
          id="character-skills"
          className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10"
        >
          {skillIndexes.map((skill) => {
            let modifier = characterCreation.skills[skill].modifier;
            return (
              <div key={skill} className="flex flex-row gap-3 items-center">
                <div
                  className={
                    characterCreation.skills[skill].proficient
                      ? "w-3 h-3 bg-black rounded-2xl"
                      : "w-3 h-3 bg-white rounded-2xl"
                  }
                />
                <p>{characterCreation.skills[skill].name}</p>
                <p>{`(${modifier > 0 ? "+" + modifier : modifier})`}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

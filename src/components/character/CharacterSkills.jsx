import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "../contexts/CharacterContext.jsx";
import { SkillContext, skillIndexes } from "../contexts/SkillContext.jsx";
import CharacterInfoBox from "./CharacterInfoBox.jsx";
import SkillItem from "../SkillItem.jsx";

export default function CharacterSkills() {
  const { abilities } = useContext(CharacterContext);
  const {isFetching, skillData} = useContext(SkillContext);
  const [content, setContent] = useState();

  useEffect(() => {
    if (!isFetching && skillData["perception"].name) {
      setContent(
        <div className="flex flex-col gap-2 overflow-x-hidden">
          {skillIndexes.map((skill) => {
            let skillObj = skillData[skill];
            let ability = skillObj["ability_score"].index;
            let modifier = abilities[skillObj["ability_score"].index].modifier;

            return (
              <SkillItem
                key={`${skill}Item`}
                skill={skillObj.name}
                ability={ability}
                modifier={modifier}
              ></SkillItem>
            );
          })}
        </div>
      );
    }
  }, [skillData]);

  return (
    <CharacterInfoBox id="characterSkills" title="Skills">
      {content && content}
      {!content && <p>Fetching skill data...</p>}
    </CharacterInfoBox>
  );
}

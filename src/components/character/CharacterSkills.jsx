import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext.jsx";
import { SkillContext, skillIndexes } from "../contexts/SkillContext.jsx";
import CharacterInfoBox from "./CharacterInfoBox.jsx";
import SkillItem from "../SkillItem.jsx";

export default function CharacterSkills() {
  const { abilities } = useContext(CharacterContext);
  const skillCtx = useContext(SkillContext);

  console.log(skillCtx);

  return (
    <CharacterInfoBox id="characterSkills" title="Skills">
      {/* <div className="flex flex-col gap-2">
        {skillIndexes.map((skill) => {
          let skillObj = skillCtx[skill];
          console.log(skillObj);
          let ability = skillObj["ability_score"].index;
          console.log(ability);
          let modifier = abilities[skillObj["ability_score"].index].modifier;

          return (
            <SkillItem
              skill={skillObj.name}
              ability={ability}
              modifier={modifier}
            ></SkillItem>
          );
        })}
      </div> */}
    </CharacterInfoBox>
  );
}

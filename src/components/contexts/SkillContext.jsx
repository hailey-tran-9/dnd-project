import { createContext, useEffect, useState } from "react";
import { getAllSkills } from "../../util/api.js";

export const skillIndexes = [
  "acrobatics",
  "animal-handling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleight-of-hand",
  "stealth",
  "survival",
];

export const skillToAbility = {
  acrobatics: "dex",
  "animal-handling": "wis",
  arcana: "int",
  athletics: "str",
  deception: "cha",
  history: "int",
  insight: "wis",
  intimidation: "cha",
  investigation: "int",
  medicine: "wis",
  nature: "int",
  perception: "wis",
  performance: "cha",
  persuasion: "cha",
  religion: "int",
  "sleight-of-hand": "dex",
  stealth: "dex",
  survival: "wis",
};

const skillsObj = {};
skillIndexes.map((index) => {
  skillsObj[index] = { ability_score: {}, desc: [], name: "" };
});
export const SkillContext = createContext({
  isFetching: true,
  skillData: skillsObj,
});

export default function SkillContextProvider({ children }) {
  const [isFetching, setIsFetching] = useState(true);
  const [skills, setSkills] = useState(skillsObj);

  useEffect(() => {
    async function fetchSkills() {
      const skillsData = await getAllSkills();
      // console.log(skillsData);

      skillsData.map((skill) => {
        let { ability_score, desc, index, name } = skill;
        skills[index] = { ability_score, desc, name };
      });
      setSkills({ ...skills });
    }

    fetchSkills();

    return () => {
      setIsFetching(false);
    };
  }, []);

  const ctxVal = { isFetching, skillData: skills };

  return <SkillContext value={ctxVal}>{children}</SkillContext>;
}

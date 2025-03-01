import { createContext, useEffect, useState } from "react";
import { getAllSkills } from "../../api.js";

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

import { createContext, useEffect, useState } from "react";
import { getAllAbilityScores } from "../../api.js";

export const abilityScoreIndexes = ["str", "dex", "con", "int", "wis", "cha"];

const abilityScoresObj = {};
abilityScoreIndexes.map((index) => {
  abilityScoresObj[index] = { desc: [], full_name: "", name: "", skills: [] };
});
export const AbilityScoreContext = createContext({
  isFetching: true,
  abilityScoreData: abilityScoresObj,
});

export default function AbilityScoreContextProvider({ children }) {
  const [isFetching, setIsFetching] = useState(true);
  const [abilityScores, setAbilityScores] = useState(abilityScoresObj);

  useEffect(() => {
    async function fetchAbilityScores() {
      const abilityScoresData = await getAllAbilityScores();
      // console.log(abilityScoresData);

      abilityScoresData.map((absc) => {
        let { desc, full_name, index, name, skills } = absc;
        abilityScores[index] = { desc, full_name, name, skills };
      });
      setAbilityScores({ ...abilityScores });
    }

    fetchAbilityScores();

    return () => {
      setIsFetching(false);
    };
  }, []);

  const ctxVal = { isFetching, abilityScoreData: abilityScores };

  return <AbilityScoreContext value={ctxVal}>{children}</AbilityScoreContext>;
}

import { createContext, useEffect, useState } from "react";
import { getAllRaces } from "../../api.js";

export const raceIndexes = [
  "dragonborn",
  "dwarf",
  "elf",
  "gnome",
  "half-elf",
  "half-orc",
  "halfling",
  "human",
  "tiefling",
];

const racesObj = {};
raceIndexes.map((index) => {
  racesObj[index] = {};
});
export const RaceContext = createContext({
  isFetching: true,
  raceData: racesObj,
});

export default function RaceContextProvider({ children }) {
  const [isFetching, setIsFetching] = useState(true);
  const [races, setRaces] = useState(racesObj);

  useEffect(() => {
    async function fetchRaces() {
      const racesData = await getAllRaces();
      console.log(racesData);

      racesData.map((race) => {
        let {} = race;
        races[index] = {};
      });
      setRaces({ ...races });
    }

    fetchRaces();

    return () => {
      setIsFetching(false);
    };
  }, []);

  const ctxVal = { isFetching, raceData: races };

  return <RaceContext value={ctxVal}>{children}</RaceContext>;
}

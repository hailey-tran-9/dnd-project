import { createContext, useEffect, useState } from "react";
import { getAllClasses } from "../../api.js";

export const classIndexes = [
  "barbarian",
  "bard",
  "cleric",
  "druid",
  "fighter",
  "monk",
  "paladin",
  "ranger",
  "rogue",
  "sorcerer",
  "warlock",
  "wizard",
];

const classesObj = {};
classIndexes.map((index) => {
  classesObj[index] = {
    hitDie: 1,
    name: "",
    proficiencies: [],
    proficiencyChoices: [],
    savingThrows: [],
    startingEquipment: [],
    startingEquipmentOptions: [],
  };
});
export const ClassContext = createContext({
  isFetching: true,
  classData: classesObj,
});

export default function ClassContextProvider({ children }) {
  const [isFetching, setIsFetching] = useState(true);
  const [classes, setClasses] = useState(classesObj);

  useEffect(() => {
    async function fetchClasses() {
      const classesData = await getAllClasses();
      // console.log(classesData);

      classesData.map((classs) => {
        let {
          index,
          hit_die,
          name,
          proficiencies,
          proficiency_choices,
          saving_throws,
          starting_equipment,
          starting_equipment_options,
        } = classs;
        classes[index] = {
          hit_die,
          name,
          proficiencies,
          proficiency_choices,
          saving_throws,
          starting_equipment,
          starting_equipment_options,
        };
      });
      setClasses({ ...classes });
    }

    fetchClasses();

    return () => {
      setIsFetching(false);
    };
  }, []);

  const ctxVal = { isFetching, classData: classes };

  return <ClassContext value={ctxVal}>{children}</ClassContext>;
}

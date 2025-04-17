import { createContext, useState } from "react";
import { calculateAbilityModifier } from "../../util/util.js";

export const CharacterContext = createContext({
  charData: {
    name: "",
    class: "",
    lvl: 1,
    abilities: {
      str: { abilityScore: 1, modifier: 0, proficicent: false },
      dex: { abilityScore: 1, modifier: 0, proficicent: false },
      con: { abilityScore: 1, modifier: 0, proficicent: false },
      int: { abilityScore: 1, modifier: 0, proficicent: false },
      wis: { abilityScore: 1, modifier: 0, proficicent: false },
      cha: { abilityScore: 1, modifier: 0, proficicent: false },
    },
    armorClass: 1,
    proficiencyBonus: 0,
  },
  updateChar: () => {},
});

export default function CharacterContextProvider({ children }) {
  const [charStates, setCharStates] = useState({
    name: "Name",
    class: "Class",
    lvl: 1,
    abilities: {
      str: { abilityScore: 1, modifier: 0, proficicent: false },
      dex: { abilityScore: 1, modifier: 0, proficicent: false },
      con: { abilityScore: 1, modifier: 0, proficicent: false },
      int: { abilityScore: 1, modifier: 0, proficicent: false },
      wis: { abilityScore: 1, modifier: 0, proficicent: false },
      cha: { abilityScore: 1, modifier: 0, proficicent: false },
    },
    armorClass: 1,
    proficiencyBonus: 0,
  });

  const ctxVal = { charData: charStates, updateChar: setCharStates };

  return <CharacterContext value={ctxVal}>{children}</CharacterContext>;
}

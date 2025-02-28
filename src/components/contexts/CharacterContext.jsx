import { createContext, useState } from "react";
import { calculateAbilityModifier } from "../../util.js";

export const CharacterContext = createContext({
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
});

export default function CharacterContextProvider({ children }) {
  const [charStates, setCharStates] = useState({
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
  });

  return <CharacterContext value={charStates}>{children}</CharacterContext>;
}

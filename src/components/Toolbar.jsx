import { useEffect, useState, useContext } from "react";
import { getAllSpells } from "../util/api.js";
import { CharacterContext } from "./contexts/CharacterContext.jsx";

export default function Toolbar() {
  const charCtx = useContext(CharacterContext);
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    async function loadSpells() {
      // const allSpells = await getAllSpells();
      // console.log(allSpells);

      // const availableSpells = allSpells.filter((spell) => {spell.level > charCtx.lvl && !spell.classes.includes(charCtx.class)});
      // console.log(availableSpells);
    }
    
    loadSpells();
  }, []);

  return (
    <section
      id="toolbar"
      className="w-fit flex flex-row self-center justify-around bg-gray-300 p-6 gap-12"
    >
      <div id="mainActions">Main Actions</div>
      <div id="bonusActions">Bonus Actions</div>
      <div id="cantrips">Cantrips</div>
    </section>
  );
}

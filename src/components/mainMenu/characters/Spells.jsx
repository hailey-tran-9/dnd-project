import { useState } from "react";
import SpellTab from "./SpellTab";
import Button from "../../Button";

export default function Spells({ characterID, spellsLearned }) {
  const [spellLvl, setSpellLvl] = useState("0");
  const spellLevels = spellsLearned.length;
  let content = spellsLearned[parseInt(spellLvl)].map((spell, index) => (
    <SpellTab
      spellData={spell}
      key={characterID + "-lvl-" + spell.level + "-spell-" + index}
    />
  ));

  function handleSpellLvlClick(event, lvl) {
    event.preventDefault();
    setSpellLvl(lvl);
  }

  return (
    <div>
      <h2>Spells</h2>
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex flex-row mb-5">
          {Object.keys(spellsLearned).map((lvl) => {
            let rounded;
            if (lvl.toString() === "0") {
              rounded = "rounded-tl-xl rounded-bl-xl";
            } else if (lvl === (spellLevels - 1).toString()) {
              rounded = "rounded-tr-xl rounded-br-xl";
            } else {
              rounded = "";
            }
            if (lvl.toString() === spellLvl) {
              return (
                <Button
                  key={"spellButtonLvl" + lvl}
                  type="button"
                  onClick={(event) => handleSpellLvlClick(event, lvl)}
                  selected={true}
                  bgColor="bg-[#B91C1C]"
                  selectedColor="[#B91C1C]"
                  rounded={rounded}
                >
                  {lvl}
                </Button>
              );
            } else {
              return (
                <Button
                  key={"spellButtonLvl" + lvl}
                  type="button"
                  onClick={(event) => handleSpellLvlClick(event, lvl)}
                  selected={false}
                  selectedColor={"[#B91C1C]"}
                  rounded={rounded}
                >
                  {lvl}
                </Button>
              );
            }
          })}
        </div>
        <div className="h-auto max-h-[25vh] bg-gray-50 flex flex-col gap-1 overflow-y-scroll rounded-md">
          {content}
        </div>
      </div>
    </div>
  );
}

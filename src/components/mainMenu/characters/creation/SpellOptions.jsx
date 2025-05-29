import { useSelector } from "react-redux";
import { useState } from "react";

import Button from "../../../Button";
import SpellTab from "./SpellTab";

export default function SpellOptions({ enteredClass, enteredLvl }) {
  const characterCreation = useSelector((state) => state.characterCreation);
  const [spellLvl, setSpellLvl] = useState("0");

  let content = <></>;
  let canCastSpells =
    characterCreation.spellcasting["spellcastingAbility"] !== null;
  let spellSlotInfo;
  let lvlLimit;
  let maxSpells = 0;
  if (canCastSpells) {
    spellSlotInfo = characterCreation.spellcasting["spellSlots"].filter(
      (info) => info.level === parseInt(enteredLvl)
    )[0].spellcasting;
    // console.log("spellSlotInfo:", spellSlotInfo);

    for (const [key, value] of Object.entries(spellSlotInfo)) {
      if (key !== "spells_known" && key !== "__typename") {
        maxSpells += parseInt(value);
      }
    }

    lvlLimit =
      spellLvl === "0"
        ? spellSlotInfo["cantrips_known"]
        : spellSlotInfo["spell_slots_level_" + spellLvl];

    content = characterCreation.spellList[spellLvl].map((spell, index) => (
      <SpellTab
        spellData={spell}
        limit={lvlLimit}
        key={enteredClass + "lvl" + spell.level + "Spell" + index}
      />
    ));
  }

  function handleSpellLvlClick(event, lvl) {
    event.preventDefault();
    setSpellLvl(lvl);
  }

  return (
    canCastSpells && (
      <div>
        <h2>Spells</h2>
        <p>{`Spells Learned: ${characterCreation.numSpellsLearned}`}</p>
        {spellSlotInfo && (
          <p>{`Max Spells: ${maxSpells}`}</p>
        )}

        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-row mb-5">
            {Object.keys(characterCreation.spellList).map((lvl) => {
              let rounded;
              if (lvl.toString() === "0") {
                rounded = "rounded-tl-xl rounded-bl-xl";
              } else if (lvl.toString() === "9") {
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
          <div className="flex flex-row gap-2 justify-around">
            <p>Learned: {characterCreation.spellsLearned[spellLvl].length}</p>
            {spellSlotInfo && <p>{`Limit: ${lvlLimit}`}</p>}
          </div>
          <div className="h-[25vh] bg-gray-50 flex flex-col gap-1 overflow-y-scroll rounded-md">
            {content}
          </div>
        </div>
      </div>
    )
  );
}

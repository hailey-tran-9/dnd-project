import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Button";
import { characterCreationActions } from "../../../../store/character-creation-slice";

export default function SpellTab({ spellData, limit, ...props }) {
  const dispatch = useDispatch();
  const spellsLearned = useSelector(
    (state) => state.characterCreation.spellsLearned
  );
  const [showInfo, setShowInfo] = useState(false);
  const [learned, setLearned] = useState(
    spellsLearned[spellData.level].some(
      (spell) => spell.index === spellData.index
    )
  );

  let tabClassname;
  let infoClassname;
  if (showInfo) {
    tabClassname =
      "w-full flex flex-row items-center justify-between bg-white text-black px-5 py-3 rounded-t-md";
    infoClassname = "bg-gray-50 text-[1rem] px-5 py-5 rounded-b-md";
  } else {
    tabClassname =
      "w-full flex flex-row items-center justify-between bg-white text-black px-5 py-3 rounded-md";
    infoClassname = "bg-gray-50 text-[1rem] px-5 py-5 rounded-b-md hidden";
  }

  function handleTabClick(event) {
    if (event.target.localName === "button") return;
    setShowInfo((prevState) => !prevState);
  }

  function handleLearnSpellClick() {
    if (!learned) {
      if (spellsLearned[spellData.level].length >= limit) {
        console.log(
          "cannot learn this spell. you already know the max amount!"
        );
        return;
      }
    }

    dispatch(
      characterCreationActions.learnSpell({
        spell: spellData,
        operation: !learned,
      })
    );
    setLearned((prevState) => !prevState);
  }

  let name = spellData.name;
  let addAnotherLineBreak =
    spellData["area_of_effect"] ||
    spellData["attack_type"] ||
    spellData["damage"] ||
    spellData["dc"] ||
    spellData["heal_at_slot_level"] ||
    spellData["higher_level"];

  return (
    <div {...props}>
      <div className={tabClassname} onClick={(event) => handleTabClick(event)}>
        <p>{name}</p>
        <Button
          type="button"
          onClick={handleLearnSpellClick}
          disabled={spellsLearned[spellData.level].length === limit && !learned}
          className={"disabled:bg-[#8d8d8dc0]"}
        >
          {!learned ? "Add" : "Remove"}
        </Button>
      </div>
      <div className={infoClassname}>
        <p>{`Casting Time: ${spellData["casting_time"]}`}</p>
        <p>{`Duration: ${spellData["duration"]}`}</p>
        <p>{`Range: ${spellData["range"]}`}</p>
        <p>{`Concentration: ${spellData["concentration"]}`}</p>
        <p>{`Ritual: ${spellData["ritual"]}`}</p>
        <br></br>
        {spellData["area_of_effect"] && (
          <p>{`AOE: ${spellData["area_of_effect"]}`}</p>
        )}
        {spellData["attack_type"] && (
          <p>{`Attack type: ${spellData["attack_type"]}`}</p>
        )}
        {spellData["dc"] && <p>{`DC: ${spellData["dc"]["dc_type"].name}`}</p>}
        {spellData["heal_at_slot_level"] && (
          <p>{`Heal at slot level: ${spellData["heal_at_slot_level"]}`}</p>
        )}
        {spellData["higher_level"] && (
          <p>{`Higher level: ${spellData["higher_level"]}`}</p>
        )}
        {spellData["damage"] && (
          <>
            <p>{`Damage at Levels`}</p>
            {spellData["damage"]["damage_at_character_level"] &&
              spellData["damage"]["damage_at_character_level"].map((lvlDmg) => (
                <p
                  key={spellData.name + "Lvl" + lvlDmg.level + "Dmg"}
                >{`${lvlDmg.level}: ${lvlDmg.damage}`}</p>
              ))}
          </>
        )}
        {addAnotherLineBreak && <br></br>}
        <p>{spellData.desc.join(" ")}</p>
      </div>
    </div>
  );
}

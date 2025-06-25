import { useState } from "react";

export default function SpellTab({ spellData, ...props }) {
  const [showInfo, setShowInfo] = useState(false);

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
    setShowInfo((prevState) => !prevState);
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

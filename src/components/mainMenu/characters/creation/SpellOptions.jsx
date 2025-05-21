import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import { GET_SPELLCASTING_ABILITY } from "../../../../util/graphql";
import Button from "../../../Button";
import SpellTab from "./SpellTab";

export default function SpellOptions({ enteredClass }) {
  const characterCreation = useSelector((state) => state.characterCreation);

  const { loading, error, data } = useQuery(GET_SPELLCASTING_ABILITY, {
    variables: { level: 0, class: enteredClass },
  });

  let content;
  let canCastSpells = false;
  let spellSlotInfo;
  if (loading) {
    // console.log("Loading...");
  } else if (error) {
    content = <p>Error</p>;
  } else {
    console.log(data);
    if (data.spells.length > 0) {
      canCastSpells = true;
      content = data.spells.map((spell, index) => (
        <SpellTab spellData={spell} key={enteredClass + "lvl0Spell" + index} />
      ));

      // TODO: dynamic level filter
      spellSlotInfo = characterCreation.spellcasting.filter(
        (lvlInfo) => lvlInfo.level === 1
      )[0].spellcasting;
    }
    console.log("can cast spells:", canCastSpells);
  }

  return (
    canCastSpells && (
      <div>
        <h2>Spells</h2>
        <p>{`Spells Learned: ${characterCreation.spellsLearned.length}`}</p>
        {spellSlotInfo && (
          <p>{`Max Spells: ${spellSlotInfo["spells_known"]}`}</p>
        )}

        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-row gap-2">
            <Button>0</Button>
          </div>
          <div className="flex flex-row gap-2 justify-around">
            <p>Learned: 0</p>
            <p>{`Limit: ${spellSlotInfo["cantrips_known"]}`}</p>
          </div>
          <div className="h-[25vh] bg-gray-50 flex flex-col gap-1 overflow-y-scroll rounded-md">
            {content}
          </div>
        </div>
      </div>
    )
  );
}

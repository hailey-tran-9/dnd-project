import { capitalize } from "../../util/util.js";

import AbilityScoreBox from "./AbilityScoreBox.jsx";
import { abilityScoreIndexes } from "../contexts/AbilityScoreContext.jsx";

export default function CharacterInfo({ selectedCharacter }) {
  if (selectedCharacter === null) {
    return (
      <div className="text-center my-auto">
        <h1>A character hasn't been selected.</h1>
        <p>Select a character or create a new one!</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1>{selectedCharacter.name}</h1>
          <h2>
            {capitalize(selectedCharacter.race)} |{" "}
            {capitalize(selectedCharacter.characterClass)} | {selectedCharacter.lvl}
          </h2>
        </div>
        <div className="flex flex-col self-center">
          <p>Move Speed: {selectedCharacter["moveSpeed"]}</p>
        </div>
      </div>

      <div className="flex flex-row justify-around py-5">
        {abilityScoreIndexes.map((ability) => (
          <AbilityScoreBox
            key={ability + "ScoreBox"}
            ability={ability}
            score={selectedCharacter.abilitiesAndSkills[ability]["score"]}
            modifier={selectedCharacter.abilitiesAndSkills[ability]["modifier"]}
            proficient={selectedCharacter.abilitiesAndSkills[ability]["proficient"]}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-5 grow">
        <div className="flex flex-col bg-white rounded-lg p-5">
          <h3 className="font-semibold">Class & Race Features</h3>
          {Object.entries(selectedCharacter["features"]).map((item) => {
            let key = item[0];
            let val = item[1];
            return (
              <div key={key}>
                <p className="underline underline-offset-2">
                  {capitalize(key)}
                </p>
                {val.map((innerItem, index) => (
                  <p key={innerItem.toString() + index}>{innerItem}</p>
                ))}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col bg-white rounded-lg p-5">
          <h3 className="font-semibold">Inventory</h3>
        </div>
        <div className="flex flex-col bg-white rounded-lg p-5">
          <h3 className="font-semibold">Notes</h3>
        </div>
      </div>
    </>
  );
}

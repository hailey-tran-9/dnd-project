import { capitalize } from "../../util.js";

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
      <h1>{selectedCharacter.name}</h1>
      <h2>
        {capitalize(selectedCharacter.race)} | {capitalize(selectedCharacter.class)} | {selectedCharacter.lvl}
      </h2>
      <div className="flex flex-row justify-around py-5">
        {abilityScoreIndexes.map((ability) => (
          <AbilityScoreBox
            key={ability + "ScoreBox"}
            ability={ability}
            proficient={selectedCharacter.abilities[ability].proficient}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-5 grow">
        <div className="flex flex-col bg-white rounded-lg p-5">
          <h3 className="text-center">Class & Race Features</h3>
        </div>
        <div className="flex flex-col bg-white rounded-lg p-5">
          <h3 className="text-center">Inventory</h3>
        </div>
        <div className="flex flex-col bg-white rounded-lg p-5">
          <h3 className="text-center">Notes</h3>
        </div>
      </div>
    </>
  );
}

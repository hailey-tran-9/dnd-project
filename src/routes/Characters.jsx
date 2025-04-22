import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { gamesActions } from "../store/games-slice";

import Button from "../components/Button";
import Info from "../components/Info";
import Selection from "../components/Selection";
import CharacterCreation from "../components/mainMenu/characters/CharacterCreation";

import { abilityScoreIndexes } from "../components/contexts/AbilityScoreContext";
import AbilityScoreBox from "../components/mainMenu/characters/AbilityScoreBox";

export default function Characters() {
  const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState();

  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  //   console.log(characters);

  function handleStartCreatingCharacter() {
    if (!isCreatingCharacter) {
      setIsCreatingCharacter(true);
    }
  }

  function handleStopCreatingCharacter() {
    setIsCreatingCharacter(false);
  }

  function handleSelectCharacter(character) {
    if (selectedCharacter !== character) {
      setSelectedCharacter(character);
    }
  }

  function handleDeleteCharacter(characterID) {
    setSelectedCharacter(undefined);
    // TODO: dispatch delete character
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    // const characterData = {
    //   name: data["character-name"],
    //   race: data["character-race"],
    //   characterClass: data["character-class"],
    //   lvl: data["character-lvl"],
    //   ablitiesAndSkills: data["abilities-and-skills"],
    //   armorClass: data["armor-class"],
    //   proficiencies: data["proficiencies"],
    //   proficiencyBonus: data["proficiency-bonus"],
    //   moveSpeed: data["move-speed"],
    //   features: data["features"],
    //   inventory: data["inventory"],
    //   notes: data["notes"],
    // };
    // console.log(characterData);

    // TODO: dispatch create character

    handleStopCreatingCharacter();
  }

  let content;

  if (isCreatingCharacter) {
    content = (
      <CharacterCreation
        cancelFn={handleStopCreatingCharacter}
        submitFn={handleSubmit}
      />
    );
  } else if (selectedCharacter == undefined) {
    content = (
      <div className="h-[75vh] text-center content-center">
        <h2>A character hasn't been selected yet.</h2>
        <p>Select a character or create a new one!</p>
      </div>
    );
  } else {
    console.log(selectedCharacter);
    content = (
      <>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-10 items-center">
            <div className="w-30 h-30 bg-white rounded-2xl"></div>
            <div className="flex flex-col">
              <h1>{selectedCharacter.name}</h1>
              <div className="flex flex-row gap-24">
                <h3>{selectedCharacter.race}</h3>
                <h3>{`${selectedCharacter.characterClass} ${selectedCharacter.lvl}`}</h3>
              </div>
            </div>
          </div>

          <div>
            <Button className="mr-5">Edit</Button>
            <Button
              onClick={() =>
                handleDeleteCharacter(selectedCharacter.characterID)
              }
            >
              Delete
            </Button>
          </div>
        </div>
        <div className="flex flex-col my-5">
          <h2>Ability Scores</h2>
          <div className="flex flex-row gap-10 self-center">
            {abilityScoreIndexes.map((ability) => {
              let abilityStats = selectedCharacter.abilitiesAndSkills[ability];
              return (
                <AbilityScoreBox
                  ability={ability}
                  score={abilityStats.score}
                  modifier={abilityStats.modifier}
                  proficient={abilityStats.proficient}
                  key={selectedCharacter.characterID + "-" + ability}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Class & Race Features</h2>
          <div className="flex flex-row gap-[40%]">
            <div className="flex flex-col">
              <h3>Languages</h3>
              <ul>
                {selectedCharacter.features.languages &&
                  selectedCharacter.features.languages.map((language) => (
                    <li key={language}>{language}</li>
                  ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <h3>Traits</h3>
              <ul>
                {selectedCharacter.features.traits &&
                  selectedCharacter.features.traits.map((trait) => (
                    <li key={trait}>{trait}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2>Inventory</h2>
        </div>
        <div className="flex flex-col">
          <h2>Notes</h2>
        </div>
      </>
    );
  }

  return (
    <section id="user-characters" className="flex flex-row grow">
      <Selection>
        <Button onClick={handleStartCreatingCharacter}>
          + Create Character
        </Button>
        <ul className="flex flex-col mt-10">
          {characters.map((character) => (
            <Button
              key={character.name}
              onClick={() => handleSelectCharacter(character)}
            >
              {character.name}
            </Button>
          ))}
        </ul>
      </Selection>
      <Info>{content}</Info>
    </section>
  );
}

export async function clientLoader() {
  return {
    title: "Games",
  };
}

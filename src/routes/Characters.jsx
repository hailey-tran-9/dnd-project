import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";

import { gamesActions } from "../store/games-slice";
import { charactersActions } from "../store/characters-slice";
import { characterCreationActions } from "../store/character-creation-slice";
import { GET_EQUIPMENT_INFO } from "../util/graphql";

import Button from "../components/Button";
import Info from "../components/Info";
import Selection from "../components/Selection";
import CharacterCreation from "../components/mainMenu/characters/creation/CharacterCreation";

import Inventory from "../components/mainMenu/characters/Inventory";
import Header from "../components/mainMenu/characters/Header";
import AbilityScores from "../components/mainMenu/characters/AbilityScores";
import Features from "../components/mainMenu/characters/Features";
import Stats from "../components/mainMenu/characters/Stats";

export default function Characters() {
  const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState();

  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const characterCreation = useSelector((state) => state.characterCreation);
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
    dispatch(charactersActions.deleteCharacter(characterID));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("submitted data:", data);

    let characterName;

    for (const [key, value] of Object.entries(data)) {
      if (key === "name-character") {
        dispatch(characterCreationActions.setName(value));
        characterName = value;
        continue;
      }

      const splitValues = value.split(":");
      if (splitValues[0] === "dispatch") {
        if (splitValues[1] === "addToInventory") {
          if (splitValues[2] === "counted_reference") {
            dispatch(
              characterCreationActions.editInventory({
                index: splitValues[5],
                name: splitValues[6],
                category: splitValues[4],
              })
            );
          }
        }
      }
    }

    console.log("character inventory:", characterCreation.inventory);

    // abilityScores: Object.fromEntries(
    //   abilityScoreIndexes.map((ability) => [
    //     ability,
    //     { score: 8, modifier: -1, proficient: false, bonus: 0 },
    //   ])
    // ),
    // changed: false,
    // classAndLvl: {},
    // classProficiencies: [],
    // classProficiencyChoices: [],
    // classStartingEquipment: [],
    // classStartingEquipmentChoices: [],
    // features: [],
    // inventory: {},
    // languages: [],
    // languageChoices: [],
    // moveSpeed: 0,
    // name: "",
    // numSpellsLearned: 0,
    // points: 27,
    // race: "",
    // raceProficiencies: [],
    // raceProficiencyChoices: [],
    // size: "",
    // skills: Object.fromEntries(
    //   skillIndexes.map((skill) => [
    //     skill,
    //     {
    //       name: "",
    //       ability: skillToAbility[skill],
    //       modifier: 0,
    //       proficient: false,
    //       staticProficiency: false,
    //     },
    //   ])
    // ),
    // spellcasting: structuredClone(defaultSpellcasting),
    // spellList: structuredClone(defaultSpellList),
    // spellsLearned: structuredClone(defaultSpellList),

    dispatch(
      charactersActions.createCharacter({
        abilitiesAndSkills: characterCreation.abilityScores,
        armorClass: 10 + characterCreation.abilityScores.dex.modifier,
        characterClass: Object.keys(characterCreation.classAndLvl)[0],
        features: characterCreation.features,
        inventory: characterCreation.inventory,
        lvl: Object.values(characterCreation.classAndLvl)[0],
        moveSpeed: characterCreation.moveSpeed,
        name: characterName,
        notes: characterCreation.notes,
        proficiencies: characterCreation.classProficiencies.concat(
          characterCreation.raceProficiencies
        ),
        proficiencyBonus:
          Math.ceil(Object.values(characterCreation.classAndLvl)[0] / 4) + 1,
        race: characterCreation.race,
        size: characterCreation.size,
      })
    );

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
    console.log("selectedCharacter:", selectedCharacter);
    content = (
      <>
        <div className="flex flex-row justify-between items-center">
          <Header selectedCharacter={selectedCharacter} />
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
        <Stats selectedCharacter={selectedCharacter} />
        <AbilityScores selectedCharacter={selectedCharacter} />
        <Features selectedCharacter={selectedCharacter} />
        <Inventory />
        <div className="flex flex-col">
          <h2>Notes</h2>
          <div className="h-[15vh] bg-white rounded-xl mt-3"></div>
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
      <Info gap="gap-15">{content}</Info>
    </section>
  );
}

export async function clientLoader() {
  return {
    title: "Games",
  };
}

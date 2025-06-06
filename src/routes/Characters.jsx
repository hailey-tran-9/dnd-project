import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { gamesActions } from "../store/games-slice";

import Button from "../components/Button";
import Info from "../components/Info";
import Selection from "../components/Selection";
import CharacterCreation from "../components/mainMenu/characters/creation/CharacterCreation";

import Inventory from "../components/mainMenu/characters/Inventory";
import Header from "../components/mainMenu/characters/Header";
import AbilityScores from "../components/mainMenu/characters/AbilityScores";
import Features from "../components/mainMenu/characters/Features";

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
    console.log("submitted data:", data);

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
    // console.log(selectedCharacter);
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

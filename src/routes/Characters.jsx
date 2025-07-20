import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  update,
  increment,
} from "firebase/database";

import { characterCreationActions } from "../store/character-creation-slice";
import { v4 as uuidv4 } from "uuid";

import Button from "../components/Button";
import Info from "../components/Info";
import Selection from "../components/Selection";
import CharacterCreation from "../components/mainMenu/characters/creation/CharacterCreation";

import Inventory from "../components/mainMenu/characters/Inventory";
import Header from "../components/mainMenu/characters/Header";
import AbilityScores from "../components/mainMenu/characters/AbilityScores";
import Features from "../components/mainMenu/characters/Features";
import Stats from "../components/mainMenu/characters/Stats";
import Spells from "../components/mainMenu/characters/Spells";

export default function Characters() {
  const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState();

  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const characterCreation = useSelector((state) => state.characterCreation);
  //   console.log(characters);
  const db = getDatabase();

  const auth = getAuth();
  const user = auth.currentUser;
  let userID = null;
  if (user) {
    userID = user.uid;
  }

  function handleStartCreatingCharacter() {
    if (!isCreatingCharacter) {
      setIsCreatingCharacter(true);
    }
  }

  function handleStopCreatingCharacter() {
    setIsCreatingCharacter(false);
    setSelectedCharacter(undefined);
  }

  function handleSelectCharacter(character) {
    if (isCreatingCharacter) {
      handleStopCreatingCharacter();
    }
    if (selectedCharacter !== character) {
      setSelectedCharacter(character);
    }
  }

  function handleSelectionClick(event) {
    if (event.target.localName === "button") return;
    if (isCreatingCharacter) {
      handleStopCreatingCharacter();
    }
    setSelectedCharacter(undefined);
  }

  function handleDeleteCharacter(characterID) {
    setSelectedCharacter(undefined);
    const userPath = "users/users/" + userID + "/private";

    update(ref(db), {
      ["characters/characters/" + characterID]: null,
      "characters/numberOfCharacters": increment(-1),
      [userPath + "/characters/characterIDs/" + characterID]: null,
      [userPath + "/characters/numberOfCharacters"]: increment(-1),
    })
      .then(() => {
        // console.log("character deleted successfully");
      })
      .catch((error) => {
        console.log("error deleting the character from the db");
        console.log(error.message);
      });
  }

  function createCharacterThunk(characterName, numItemsInInventory) {
    return (dispatch, getState) => {
      const state = getState();
      let reduxInventoryNum = 0;
      for (const inventoryCategory of Object.values(
        state.characterCreation.inventory
      )) {
        reduxInventoryNum += inventoryCategory.length;
      }

      if (reduxInventoryNum == numItemsInInventory) {
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

        const characterData = {
          abilitiesAndSkills: characterCreation.abilityScores,
          armorClass: 10 + characterCreation.abilityScores.dex.modifier,
          characterClass: Object.keys(characterCreation.classAndLvl)[0],
          characterID: uuidv4(),
          features: characterCreation.features,
          inGames: [],
          inventory: structuredClone(state.characterCreation.inventory),
          languages: structuredClone(state.characterCreation.languages),
          lvl: Object.values(characterCreation.classAndLvl)[0],
          moveSpeed: characterCreation.moveSpeed,
          name: characterName,
          notes: characterCreation.notes || null,
          proficiencies: characterCreation.classProficiencies.concat(
            characterCreation.raceProficiencies
          ),
          proficiencyBonus:
            Math.ceil(Object.values(characterCreation.classAndLvl)[0] / 4) + 1,
          race: characterCreation.race,
          size: characterCreation.size,
          spellcasting: structuredClone(characterCreation.spellcasting),
          spellsLearned: structuredClone(characterCreation.spellsLearned),
          userID,
        };

        const userPath = "users/users/" + userID + "/private";
        update(ref(db), {
          ["characters/characters/" + characterData.characterID]: characterData,
          "characters/numberOfCharacters": increment(1),
          [userPath + "/characters/characterIDs/" + characterData.characterID]:
            characterData.name,
          [userPath + "/characters/numberOfCharacters"]: increment(1),
        })
          .then(() => {
            // console.log("character created successfully");
          })
          .catch((error) => {
            console.log("error writing the new character into the db");
            console.log(error.message);
          });
      }
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log("submitted data:", data);

    let characterName;
    let numItemsInInventory = 0;

    for (const [key, value] of Object.entries(data)) {
      if (key === "name-character") {
        dispatch(characterCreationActions.setName(value));
        characterName = value;
        continue;
      }

      const splitValues = value.split(":");
      if (splitValues[0] === "editInventory") {
        if (splitValues[1] === "counted_reference") {
          numItemsInInventory++;
          dispatch(
            characterCreationActions.editInventory({
              index: splitValues[4],
              name: splitValues[5],
              category: splitValues[3],
              quantity: splitValues[6],
            })
          );
        }
      } else if (splitValues[0] === "learnLanguage") {
        dispatch(
          characterCreationActions.learnLanguage({
            index: splitValues[4],
            name: splitValues[5],
          })
        );
      }
    }

    dispatch(createCharacterThunk(characterName, numItemsInInventory));
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
    // console.log("selectedCharacter:", selectedCharacter);
    content = (
      <>
        <div className="flex flex-row justify-between items-center">
          <Header selectedCharacter={selectedCharacter} />
          <div>
            {/* TODO: implement Edit functionality */}
            <Button className={"mr-5 disabled:bg-[#8d8d8dc0]"} disabled>
              Edit
            </Button>
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
        {selectedCharacter.spellcasting && (
          <Spells
            characterID={selectedCharacter.characterID}
            spellsLearned={selectedCharacter.spellsLearned}
          />
        )}
        <Inventory
          characterID={selectedCharacter.characterID}
          inventory={selectedCharacter.inventory}
        />
        <div className="flex flex-col">
          <h2>Notes</h2>
          <div className="h-[15vh] bg-white rounded-xl mt-3"></div>
        </div>
      </>
    );
  }

  return (
    <section id="user-characters" className="flex flex-row grow">
      <Selection onClick={(event) => handleSelectionClick(event)}>
        <Button onClick={handleStartCreatingCharacter}>
          + Create Character
        </Button>
        <ul className="flex flex-col mt-10">
          {Object.entries(characters).map(([characterID, character]) => (
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
    title: "Characters",
  };
}

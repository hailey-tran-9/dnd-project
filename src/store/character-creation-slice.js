import { createSlice } from "@reduxjs/toolkit";

import { abilityScoreIndexes } from "../components/contexts/AbilityScoreContext";
import {
  skillIndexes,
  skillToAbility,
} from "../components/contexts/SkillContext";
import { calculateAbilityModifier } from "../util/util";

const pointMapping = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

const defaultSpellList = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
};

const defaultSpellcasting = { spellcastingAbility: null, spellSlots: null };

const characterCreationSlice = createSlice({
  name: "characterCreation",
  initialState: {
    name: "",
    race: "",
    classAndLvl: {},
    abilityScores: Object.fromEntries(
      abilityScoreIndexes.map((ability) => [
        ability,
        { score: 8, modifier: -1, proficient: false, bonus: 0 },
      ])
    ),
    skills: Object.fromEntries(
      skillIndexes.map((skill) => [
        skill,
        {
          name: "",
          ability: skillToAbility[skill],
          modifier: 0,
          proficient: false,
          staticProficiency: false,
        },
      ])
    ),
    points: 27,
    raceProficiencies: [],
    raceProficiencyChoices: [],
    classProficiencies: [],
    classProficiencyChoices: [],
    classStartingEquipment: [],
    classStartingEquipmentChoices: [],
    inventory: {
      weapons: [],
      equipment: [],
      tools: [],
      misc: [],
    },
    languages: [],
    languageChoices: [],
    spellcasting: structuredClone(defaultSpellcasting),
    spellList: structuredClone(defaultSpellList),
    numSpellsLearned: 0,
    spellsLearned: structuredClone(defaultSpellList),
    features: [],
    changed: false,
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setRace(state, action) {
      // payload = {race, raceData}
      state.race = action.payload.race;

      // Find the selected race's inherent ability bonuses
      let raceBonuses = {};
      action.payload.raceData["ability_bonuses"].map((abilityBonus) => {
        raceBonuses[abilityBonus["ability_score"].index] = abilityBonus.bonus;
      });

      // Update the abilityScores state to reflect this
      abilityScoreIndexes.map((ability) => {
        let newBonus = raceBonuses[ability] || 0;
        state.abilityScores[ability].bonus = newBonus;
        state.abilityScores[ability].score = 8 + newBonus;
        state.abilityScores[ability].modifier = calculateAbilityModifier(
          8 + newBonus
        );
      });

      // Update skills
      skillIndexes.map((skill) => {
        state.skills[skill].modifier =
          state.abilityScores[state.skills[skill].ability].modifier;
        state.skills[skill].proficient = false;
        state.skills[skill].staticProficiency = false;
      });

      // Find the selected race's inherent proficiencies
      let updatedProficiencies = [];
      action.payload.raceData["starting_proficiencies"].map((proficiency) => {
        if (proficiency.type === "SKILLS") {
          let skill = proficiency.index.split("skill-")[1];
          updatedProficiencies.push(skill);
          state.skills[skill].proficient = true;
          state.skills[skill].staticProficiency = true;
        } else {
          updatedProficiencies.push(proficiency.index);
        }
      });
      state.raceProficiencies = updatedProficiencies;

      // Update race proficiency choices
      let updatedChoices = [];
      if (action.payload.raceData["starting_proficiency_options"]) {
        updatedChoices.push(
          structuredClone(
            action.payload.raceData["starting_proficiency_options"]
          )
        );
      }
      state.raceProficiencyChoices = updatedChoices;

      // Update race's known language and language choices
      state.languages = action.payload.raceData["languages"];
      state.languageChoices = action.payload.raceData["language_options"];
    },
    setClassAndLvl(state, action) {
      // payload = {class, lvl, classData}
      state.classAndLvl = {};
      state.classAndLvl[action.payload.class] = action.payload.lvl;

      // Reset the abilityScores proficienct state to false
      abilityScoreIndexes.map((ability) => {
        state.abilityScores[ability].proficient = false;
        let bonus = state.abilityScores[ability].bonus;
        state.abilityScores[ability].score = 8 + bonus;
        state.abilityScores[ability].modifier = calculateAbilityModifier(
          8 + bonus
        );
      });
      state.points = 27;

      // Find the selected class's inherent ability proficiencies
      let updatedProficiencies = [];
      action.payload.classData.proficiencies.map((proficiency) => {
        if (proficiency.type === "Saving Throws") {
          let ability = proficiency.index.split("saving-throw-")[1];
          if (!updatedProficiencies.includes(proficiency.index)) {
            updatedProficiencies.push(proficiency.index);
            state.abilityScores[ability].proficient = true;
          }
        } else {
          updatedProficiencies.push(proficiency.index);
        }
      });
      state.classProficiencies = updatedProficiencies;

      // Update skills
      skillIndexes.map((skill) => {
        state.skills[skill].proficient =
          state.raceProficiencies.includes(skill);
      });

      // Update class proficiency choices
      state.classProficiencyChoices = structuredClone(
        action.payload.classData["proficiency_choices"]
      );

      // Update class starting equipment related variables
      state.classStartingEquipment = structuredClone(
        action.payload.classData["starting_equipment"]
      );
      state.classStartingEquipmentChoices = structuredClone(
        action.payload.classData["starting_equipment_options"]
      );

      // Update class level info
      let canCastSpells = action.payload.classData.spellcasting;
      state.spellcasting = structuredClone(defaultSpellcasting);
      state.numSpellsLearned = 0;

      state.features = [];

      if (canCastSpells) {
        state.spellcasting["spellcastingAbility"] =
          action.payload.classData.spellcasting["spellcasting_ability"];
        state.spellcasting["spellSlots"] = [];
        state.spellList = structuredClone(defaultSpellList);
        state.spellsLearned = structuredClone(defaultSpellList);

        action.payload.classData["spells"].map((spell) => {
          state.spellList[spell.level].push(spell);
        });
      } else {
        state.spellList = null;
        state.spellsLearned = null;
      }

      action.payload.classData["class_levels"].forEach(function (lvlInfo) {
        // console.log("lvlInfo:", lvlInfo);
        if (canCastSpells && lvlInfo.spellcasting !== null) {
          state.spellcasting["spellSlots"].push({
            level: lvlInfo.level,
            spellcasting: lvlInfo.spellcasting,
          });
        }

        if (
          lvlInfo.features[0] &&
          lvlInfo.features[0].level <= action.payload.lvl
        ) {
          state.features.push(lvlInfo.features[0]);
        }
      });
    },
    incrPoint(state, action) {
      let bonus = parseInt(state.abilityScores[action.payload].bonus);
      let currScore =
        parseInt(state.abilityScores[action.payload].score) - bonus;
      if (currScore < 15) {
        let cost = pointMapping[currScore + 1] - pointMapping[currScore];
        if (state.points >= cost) {
          let newScore = currScore + 1;
          state.points -= cost;
          state.abilityScores[action.payload].score = newScore + bonus;
          let newModifier = calculateAbilityModifier(newScore + bonus);
          state.abilityScores[action.payload].modifier = newModifier;

          // Update the modifiers in skills
          skillIndexes.map((skill) => {
            if (state.skills[skill].ability === action.payload) {
              state.skills[skill].modifier = newModifier;
            }
          });
        }
      }
    },
    decrPoint(state, action) {
      let bonus = parseInt(state.abilityScores[action.payload].bonus);
      let currScore =
        parseInt(state.abilityScores[action.payload].score) - bonus;
      if (currScore > 8) {
        let cost = pointMapping[currScore] - pointMapping[currScore - 1];
        let newScore = currScore - 1;
        state.points += cost;
        state.abilityScores[action.payload].score = newScore + bonus;
        let newModifier = calculateAbilityModifier(newScore + bonus);
        state.abilityScores[action.payload].modifier = newModifier;

        // Update the modifiers in skills
        skillIndexes.map((skill) => {
          if (state.skills[skill].ability === action.payload) {
            state.skills[skill].modifier = newModifier;
          }
        });
      }
    },
    updateSkillName(state, action) {
      // payload = {skill, name}
      state.skills[action.payload.skill].name = action.payload.name;
    },
    updateSkillProficiency(state, action) {
      // payload = {skill, checked}
      if (!state.skills[action.payload.skill].staticProficiency) {
        state.skills[action.payload.skill].proficient = action.payload.checked;
      }
    },
    updateClassProficiency(state, action) {
      // payload = {index, operation: true for "add" or false for "remove"}
      if (state.classProficiencies.includes(action.payload.index)) {
        if (action.payload.operation === false) {
          let filtered = state.classProficiencies.filter(
            (index) => index !== action.payload.index
          );
          state.classProficiencies = filtered;
        }
      } else {
        if (action.payload.operation === true) {
          state.classProficiencies.push(action.payload.index);
        }
      }
    },
    updateRaceProficiency(state, action) {
      // payload = {index, operation: true for "add" or false for "remove"}
      if (state.raceProficiencies.includes(action.payload.index)) {
        if (action.payload.operation === false) {
          let filtered = state.raceProficiencies.filter(
            (index) => index !== action.payload.index
          );
          state.raceProficiencies = filtered;
        }
      } else {
        if (action.payload.operation === true) {
          state.raceProficiencies.push(action.payload.index);
        }
      }
    },
    learnSpell(state, action) {
      // payload = {spell, operation: true for "add" or false for "remove"}
      if (action.payload.operation === false) {
        let filtered = state.spellsLearned[action.payload.spell.level].filter(
          (spell) => spell.index !== action.payload.spell.index
        );
        state.spellsLearned[action.payload.spell.level] = filtered;
        state.numSpellsLearned -= 1;
      } else {
        state.spellsLearned[action.payload.spell.level].push(
          action.payload.spell
        );
        state.numSpellsLearned += 1;
      }
    },
  },
});

export const characterCreationActions = characterCreationSlice.actions;

export default characterCreationSlice.reducer;

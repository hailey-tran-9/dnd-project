const BASE_URL = "https://www.dnd5eapi.co";

export async function getAllAbilityScores() {
  try {
    const abilityScoreIndexes = await fetch(
      BASE_URL + "/api/2014/ability-scores"
    ).then((response) => response.json());
    const abilityScores = Promise.all(
      abilityScoreIndexes.results.map((index) =>
        fetch(BASE_URL + index.url).then((response) => response.json())
      )
    );
    return abilityScores;
  } catch (error) {
    throw new Error("Failed to load ability scores.");
  }
}

export async function getAllSkills() {
  try {
    const skillIndexes = await fetch(BASE_URL + "/api/2014/skills").then(
      (response) => response.json()
    );
    const skills = Promise.all(
      skillIndexes.results.map((index) =>
        fetch(BASE_URL + index.url).then((response) => response.json())
      )
    );
    return skills;
  } catch (error) {
    throw new Error("Failed to load skills.");
  }
}

export async function getAllClasses() {
  try {
    const classIndexes = await fetch(BASE_URL + "/api/2014/classes").then(
      (response) => response.json()
    );
    const classes = Promise.all(
      classIndexes.results.map((index) => 
        fetch(BASE_URL + index.url).then((reponse) => reponse.json())
      )
    );
    return classes;
  } catch (error) {
    throw new Error("Failed to load classes.");
  }
}

export async function getAllRaces() {
  try {
    const raceIndexes = await fetch(BASE_URL + "/api/2014/races").then(
      (response) => response.json()
    );
    const races = Promise.all(
      raceIndexes.results.map((index) => 
        fetch(BASE_URL + index.url).then((reponse) => reponse.json())
      )
    );
    return races;
  } catch (error) {
    throw new Error("Failed to load races.");
  }
}

export async function getAllSpells() {
  try {
    const spellIndexes = await fetch(BASE_URL + "/api/2014/spells").then(
      (response) => response.json()
    );
    return Promise.all(
      spellIndexes.results.map((index) =>
        fetch(BASE_URL + index.url).then((response) => response.json())
      )
    );
  } catch (error) {
    throw new Error("Failed to load spells.");
  }
}
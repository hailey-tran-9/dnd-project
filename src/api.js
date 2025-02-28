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
      const skillIndexes = await fetch(
        BASE_URL + "/api/2014/skills"
      ).then((response) => response.json());
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

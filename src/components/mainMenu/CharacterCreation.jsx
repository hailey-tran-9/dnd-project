import { useState, useContext } from "react";

export default function CharacterCreation({
  updateIsCreating,
  characters,
  updateCharacters,
}) {
  const [enteredName, setEnteredName] = useState("");
  const [enteredClass, setEnteredClass] = useState("");
  const [enteredLvl, setEnteredLvl] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    // Check for validity
    if (!characters.characterNames.includes(enteredName)) {
      updateGames((prevCharacters) => ({
        ...prevCharacters,
        ["characterNames"]: [...prevCharacters.characterNames, enteredName],
        ["characterObjects"]: [
          ...prevCharacters.characterObjects,
          { name: enteredName, class: [], lvl: [] },
        ],
      }));
    } else {
      console.log(
        "A character with the same name already exists. Use unique names."
      );
    }

    updateIsCreating(false);
    setEnteredName("");
    setEnteredClass("");
    setEnteredLvl(1);
  }

  function handleNameChange(event) {
    setEnteredName(event.target.value);
  }

  return (
    <div className="self-center my-auto flex flex-col bg-white p-10 rounded-md">
      <h1 className="mb-3">Game Creation</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Character Name</label>
          <input
            className="bg-amber-300 rounded-md ml-3"
            onChange={handleNameChange}
            required
          ></input>
        </div>
        <fieldset>
          <legend>Available Classes</legend>

          <div>
            <input type="radio"></input>
            <label>Class</label>
          </div>

        </fieldset>
        <div className="mb-2">
          <label>Level</label>
          <input
            className="bg-amber-300 rounded-md ml-3"
            onChange={handleNameChange}
            required
          ></input>
        </div>

        <div className="flex flex-row justify-end mt-10 gap-2">
          <button
            type="button"
            className="bg-cyan-800 text-white rounded-md p-1"
            onClick={() => updateIsCreating(false)}
          >
            Cancel
          </button>
          <button className="bg-cyan-800 text-white rounded-md p-1">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

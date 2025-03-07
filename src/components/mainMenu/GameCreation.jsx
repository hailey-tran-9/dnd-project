import { useState } from "react";

export default function GameCreation({ updateIsCreating, games, updateGames }) {
  const [enteredName, setEnteredName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    // Check for validity
    if (!games.gameNames.includes(enteredName)) {
      updateGames((prevGames) => ({
        ...prevGames,
        ["gameNames"]: [...prevGames.gameNames, enteredName],
        ["gameObjects"]: [
          ...prevGames.gameObjects,
          { name: enteredName, playersInGame: [], gameSessions: [] },
        ],
      }));
    } else {
      console.log(
        "A game with the same name already exists. Use unique names."
      );
    }

    updateIsCreating(false);
    setEnteredName("");
  }

  function handleChange(event) {
    setEnteredName(event.target.value);
  }

  return (
    <div className="self-center my-auto flex flex-col bg-white p-10 rounded-md">
      <h1 className="mb-3">Game Creation</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Game Name</label>
          <input
            className="bg-amber-300 rounded-md ml-3"
            onChange={handleChange}
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

export default function GameCreation({ updateIsCreating }) {
  function handleSubmit(event) {
    event.preventDefault();
    updateIsCreating(false);
  }

  return (
    <div className="self-center my-auto">
      <h1 className="mb-3">Game Creation</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Game Name</label>
          <input className="bg-white rounded-md ml-3"></input>
        </div>

        <div>
          <label>Characters</label>
          <input className="bg-white rounded-md ml-3"></input>
        </div>

        <button
          type="button"
          className="bg-cyan-800 text-white rounded-md p-1 mt-5 mr-2"
          onClick={() => updateIsCreating(false)}
        >
          Cancel
        </button>
        <button className="bg-cyan-800 text-white rounded-md p-1 mt-5">
          Submit
        </button>
      </form>
    </div>
  );
}

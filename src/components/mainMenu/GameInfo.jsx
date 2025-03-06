import GameInfoBox from "./GameInfoBox.jsx";

export default function GameInfo({ selectedGame }) {
  if (selectedGame === null) {
    return (
      <div className="text-center my-auto">
        <h1>A game hasn't been selected.</h1>
        <p>Select a game or create a new one!</p>
      </div>
    );
  }

  return (
    <>
      <h1>Game Title</h1>
      <div className="h-11/12 flex flex-row gap-12">
        <div className="w-1/3 flex flex-col">
          <h2 className="mb-2">Players</h2>
          <ul className="flex flex-col gap-1 overflow-y-auto">
            <GameInfoBox classes="p-3">
              <h3>Player Name</h3>
              <p>Class | Lvl</p>
            </GameInfoBox>
          </ul>
        </div>
        <div className="w-2/3 flex flex-col">
          <h2 className="mb-2">Sessions</h2>
          <div className="flex flex-col gap-1 overflow-y-auto">
            <GameInfoBox classes="p-3">
              <h3>Session #__</h3>
              <p>Date</p>
            </GameInfoBox>
          </div>
        </div>
      </div>
    </>
  );
}

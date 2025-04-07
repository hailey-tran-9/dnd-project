import { Link } from "react-router-dom";

import GameInfoBox from "./GameInfoBox.jsx";
import Button from "../Button.jsx";

export default function GameInfo({ selectedGame }) {
  if (selectedGame === null) {
    return (
      <div className="text-center my-auto">
        <h1>A game hasn't been selected.</h1>
        <p>Select a game or create a new one!</p>
      </div>
    );
  }

  const { charactersInGame } = selectedGame;
  let Characters = <p>This game doesn't have any characters in it yet.</p>;
  if (charactersInGame && charactersInGame.length > 0) {
    // TODO: get the character info and display it in
    // <GameInfoBox classes="p-3">
    //   <h3>Player Name</h3>
    //   <p>Class | Lvl</p>
    // </GameInfoBox>

    Characters = charactersInGame.map((character) => (
      <GameInfoBox classes="p-3" key={character + "Info" + selectedGame.gameID}>
        <h3>{character}</h3>
      </GameInfoBox>
    ));
  }

  function copyInviteLink() {
    let invLink = "http://localhost:5173/games/invite/" + selectedGame.gameID;
    console.log(`The invite link ${invLink} was copied to the clipboard!`);
    navigator.clipboard.writeText(invLink);
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>{selectedGame.name}</h1>
        <Link to={"games/" + selectedGame.gameID}>
          <Button caption="Enter the Game" />
        </Link>
      </div>

      <div className="h-11/12 flex flex-row gap-12">
        <div className="w-1/3 flex flex-col">
          <div className="flex flex-row justify-between">
            <h2 className="mb-2">Players</h2>
            <Button caption="Invite Players" onClick={copyInviteLink} />
          </div>
          <ul className="flex flex-col gap-1 overflow-y-auto">{Characters}</ul>
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

import { useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  remove,
  update,
  increment,
} from "firebase/database";

import { v4 as uuidv4 } from "uuid";

import Button from "../components/Button";
import Info from "../components/Info";
import Selection from "../components/Selection";
import Player from "../components/mainMenu/games/Player";
import Session from "../components/mainMenu/games/Session";
import GameCreation from "../components/mainMenu/games/GameCreation";

// TODO: render players and sessions dynamically from the game data
// TODO: UI for error handling

export default function Games() {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState();

  const games = useSelector((state) => state.games.games);
  // console.log("games", games);
  const db = getDatabase();

  const auth = getAuth();
  const user = auth.currentUser;
  let userID = null;
  if (user) {
    userID = user.uid;
  }

  function handleStartCreatingGame() {
    if (!isCreatingGame) {
      setIsCreatingGame(true);
    }
  }

  function handleStopCreatingGame() {
    setIsCreatingGame(false);
  }

  function handleSelectGame(game) {
    if (selectedGame !== game) {
      setSelectedGame(game);
    }
  }

  function handleDeleteGame(gameID) {
    setSelectedGame(undefined);
    remove(ref(db, "games/games/" + gameID))
      .then(() => {
        console.log("game deleted successfully");
      })
      .catch((error) => {
        console.log("error deleting the game from the db");
        console.log(error.message);
      });
    update(ref(db), { "games/numberOfGames": increment(-1) });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const gameData = {
      charactersInGame: [],
      gameID: uuidv4(),
      mapsInGame: [],
      name: data["game-name"],
      sessions: [],
      userID,
    };
    // console.log(gameData);

    set(ref(db, "games/games/" + gameData.gameID), gameData)
      .then(() => {
        console.log("game created successfully");
      })
      .catch((error) => {
        console.log("error writing the new game into the db");
        console.log(error.message);
      });
    update(ref(db), { "games/numberOfGames": increment(1) });

    handleStopCreatingGame();
  }

  let content;

  if (isCreatingGame) {
    content = (
      <GameCreation cancelFn={handleStopCreatingGame} submitFn={handleSubmit} />
    );
  } else if (selectedGame == undefined) {
    content = (
      <div className="h-[75vh] text-center content-center">
        <h2>A game hasn't been selected yet.</h2>
        <p>Select a game or create a new one!</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex flex-row justify-between">
          <h1>{selectedGame.name}</h1>
          <div>
            <Button className="mr-5">Enter Game</Button>
            <Button onClick={() => handleDeleteGame(selectedGame.gameID)}>
              Delete
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-10">
            <h2>Players</h2>
            <ul className="flex flex-col gap-10">
              <Player />
              <Player />
              <Player />
              <Player />
            </ul>
          </div>
          <div className="col-span-2 flex flex-col gap-10">
            <h2>Sessions</h2>
            <ul className="flex flex-col gap-5">
              <Session />
              <Session />
              <Session />
              <Session />
              <Session />
              <Session />
              <Session />
            </ul>
          </div>
        </div>
      </>
    );
  }

  return (
    <section id="user-games" className="flex flex-row grow">
      <Selection>
        <Button onClick={handleStartCreatingGame}>+ Create Game</Button>
        <ul className="flex flex-col mt-10">
          {Object.entries(games).map(([gameID, game]) => (
            <Button key={game.name} onClick={() => handleSelectGame(game)}>
              {game.name}
            </Button>
          ))}
        </ul>
      </Selection>
      <Info>{content}</Info>
    </section>
  );
}

export async function clientLoader() {
  return {
    title: "Games",
  };
}

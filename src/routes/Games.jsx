import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, update, increment } from "firebase/database";

import { v4 as uuidv4 } from "uuid";

import Button from "../components/Button";
import Info from "../components/Info";
import Selection from "../components/Selection";
import Player from "../components/mainMenu/games/Player";
import Session from "../components/mainMenu/games/Session";
import GameCreation from "../components/mainMenu/games/GameCreation";
import ActiveInvites from "../components/mainMenu/games/ActiveInvites";

// TODO: render players and sessions dynamically from the game data
// TODO: UI for error handling
// TODO: error handling for failure to create a game invite

export default function Games() {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState();
  const [isEditingGame, setIsEditingGame] = useState(false);

  const myGamesRef = useRef(null);
  const [myGamesVisible, setMyGamesVisible] = useState(true);
  const joinedGamesRef = useRef(null);
  const [joinedGamesVisible, setJoinedGamesVisible] = useState(true);
  const activeInvitesRef = useRef(null);
  const [activeInvitesVisible, setActiveInvitesVisible] = useState(false);

  const games = useSelector((state) => state.games.games);
  // console.log("games", games);
  const joinedGames = useSelector((state) => state.games.joinedGames);
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
    if (isCreatingGame) {
      handleStopCreatingGame();
    }
    if (selectedGame !== game) {
      setSelectedGame(game);
    }
  }

  function handleSelectionClick(event) {
    if (event.target.localName === "button") return;
    if (isCreatingGame) {
      handleStopCreatingGame();
    }
    setSelectedGame(undefined);
  }

  function handleToggleMyGames() {
    let prevAriaState = myGamesRef.current.ariaExpanded;
    // console.log("prevAriaState:", prevAriaState);
    if (prevAriaState === "false") {
      myGamesRef.current.style.display = "block";
      myGamesRef.current.ariaExpanded = "true";
      setMyGamesVisible(true);
    } else {
      myGamesRef.current.style.display = "none";
      myGamesRef.current.ariaExpanded = "false";
      setMyGamesVisible(false);
    }
  }

  function handleToggleJoinedGames() {
    let prevAriaState = joinedGamesRef.current.ariaExpanded;
    // console.log("prevAriaState:", prevAriaState);
    if (prevAriaState === "false") {
      joinedGamesRef.current.style.display = "block";
      joinedGamesRef.current.ariaExpanded = "true";
      setJoinedGamesVisible(true);
    } else {
      joinedGamesRef.current.style.display = "none";
      joinedGamesRef.current.ariaExpanded = "false";
      setJoinedGamesVisible(false);
    }
  }

  function handleToggleActiveInvites() {
    if (!activeInvitesVisible) {
      activeInvitesRef.current.style.display = "block";
      setActiveInvitesVisible(true);
    } else {
      activeInvitesRef.current.style.display = "none";
      setActiveInvitesVisible(false);
    }
  }

  function handleToggleEditingGame() {
    if (isEditingGame) {
      setIsEditingGame(false);
    } else {
      setIsEditingGame(true);
    }
  }

  function handleDeleteGame(gameID) {
    setSelectedGame(undefined);
    handleToggleEditingGame();
    const userPath = "users/users/" + userID + "/private";

    update(ref(db), {
      ["games/games/" + gameID]: null,
      "games/numberOfGames": increment(-1),
      [userPath + "/games/gameIDs/" + gameID]: null,
      [userPath + "/games/numberOfGames"]: increment(-1),
    })
      .then(() => {
        // console.log("game successfully deleted");
      })
      .catch((error) => {
        console.log("error deleting game");
        console.log(error.message);
      });
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

    const userPath = "users/users/" + userID + "/private";
    update(ref(db), {
      ["games/games/" + gameData.gameID]: gameData,
      "games/numberOfGames": increment(1),
      [userPath + "/games/gameIDs/" + gameData.gameID]: {
        gameInvites: {},
        numberOfGameInvites: 0,
      },
      [userPath + "/games/numberOfGames"]: increment(1),
    })
      .then(() => {
        // console.log("game created successfully");
      })
      .catch((error) => {
        console.log("error writing the new game into the db");
        console.log(error.message);
      });

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
        <div className="flex flex-row justify-between flex-wrap gap-y-3">
          <h1>{selectedGame.name}</h1>
          <div className="flex flex-row gap-5">
            {selectedGame.userID === userID && (
              <Button onClick={handleToggleEditingGame}>
                {!isEditingGame ? "Edit" : "Stop Editing"}
              </Button>
            )}
            {isEditingGame && (
              <Button onClick={() => handleDeleteGame(selectedGame.gameID)}>
                Delete Game
              </Button>
            )}
            {!isEditingGame && <Button disabled>Enter Game</Button>}
          </div>
        </div>
        <div className="flex flex-row gap-x-[10vw]">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-5 items-center">
                <h2>Players</h2>
                {isEditingGame && (
                  <Button className="mb-2" onClick={handleToggleActiveInvites}>
                    Invites
                  </Button>
                )}
              </div>

              <ActiveInvites
                htmlRef={activeInvitesRef}
                userID={userID}
                gameID={selectedGame.gameID}
              />
            </div>

            <ul className="flex flex-col gap-10">
              {selectedGame.playersInGame ? (
                Object.entries(selectedGame.playersInGame).map(
                  (player, index) => (
                    <Player
                      key={`${selectedGame.gameID}-player-component-${index}`}
                    />
                  )
                )
              ) : (
                <p>There are no players in this game.</p>
              )}
            </ul>
          </div>
          <div className="grow flex flex-col gap-10">
            <h2>Sessions</h2>
            <ul className="flex flex-col gap-5">
              {/* {selectedGame.sessions &&
                selectedGame.sessions.map((session, index) => (
                  <Session
                    key={`${selectedGame.gameID}-session-component-${index}`}
                  />
                ))} */}
              <li>
                <div className="w-full bg-gray-400 p-10 rounded-sm text-gray-50">
                  Under construction
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }

  let userCreatedGames = Object.keys(games).length !== 0;
  let userJoinedGames = Object.keys(joinedGames).length !== 0;

  return (
    <section id="user-games" className="flex flex-row grow">
      <Selection onClick={(event) => handleSelectionClick(event)}>
        <Button onClick={handleStartCreatingGame}>+ Create Game</Button>
        <div className="w-full flex flex-col items-start mt-10">
          <div className="w-full flex flex-row items-center">
            <p className="shrink mr-2">My Games</p>
            <div className="grow border-t border-white"></div>
            {userCreatedGames && (
              <Button
                onClick={handleToggleMyGames}
                padding="p-0 px-2"
                className="border border-white/30"
                aria-expanded="true"
                aria-controls="my-games"
              >
                {myGamesVisible ? "-" : "+"}
              </Button>
            )}
          </div>

          {userCreatedGames ? (
            <menu
              id="my-games"
              ref={myGamesRef}
              className="w-full flex flex-col mt-3"
            >
              {Object.entries(games).map(([gameID, game]) => (
                <li key={game.name}>
                  <Button
                    onClick={() => handleSelectGame(game)}
                    className="w-full text-start text-[1.3rem]"
                  >
                    {game.name}
                  </Button>
                </li>
              ))}
            </menu>
          ) : (
            <p className="text-[1rem] text-gray-200">
              You haven't created any games.
            </p>
          )}
        </div>

        <div className="w-full flex flex-col items-start mt-10">
          <div className="w-full flex flex-row items-center">
            <p className="shrink mr-2">Joined Games</p>
            <div className="grow border-t border-white"></div>
            {userJoinedGames && (
              <Button
                onClick={handleToggleJoinedGames}
                padding="p-0 px-2"
                className="border border-white/30"
                aria-expanded="true"
                aria-controls="joined-games"
              >
                {joinedGamesVisible ? "-" : "+"}
              </Button>
            )}
          </div>

          {userJoinedGames ? (
            <menu
              id="joined-games"
              ref={joinedGamesRef}
              className="w-full flex flex-col mt-3"
            >
              {Object.entries(joinedGames).map(([gameID, game]) => (
                <li key={game.name}>
                  <Button
                    onClick={() => handleSelectGame(game)}
                    className="w-full text-start text-[1.3rem]"
                  >
                    {game.name}
                  </Button>
                </li>
              ))}
            </menu>
          ) : (
            <p className="text-[1rem] text-gray-200">
              You haven't joined any games.
            </p>
          )}
        </div>
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

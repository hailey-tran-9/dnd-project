import { useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  get,
  update,
  increment,
  query,
  orderByValue,
  startAfter,
} from "firebase/database";

import { v4 as uuidv4 } from "uuid";
import { encodeBase64URL, encodeStr, sigToBase64 } from "../util/util";

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

  const cryptoAPI = window.crypto.subtle || window.crypto.webkitSubtle;
  // if (!cryptoAPI) {
  //   console.log("no web crypto api on this browser");
  // } else {
  //   console.log("there's web crypto api YIPPEE");
  // }

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

  function handleDeleteGame(gameID) {
    setSelectedGame(undefined);
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

  function importPrivateKey(jwk) {
    return cryptoAPI.importKey(
      "jwk",
      jwk,
      {
        name: "ECDSA",
        namedCurve: "P-256",
      },
      true,
      ["sign"]
    );
  }

  function handleCreateGameInvite(gameID) {
    // TODO: finish implementation
    console.log("create game inv");

    const exp = Math.floor(Date.now() + 600000); // Expires in 10 min
    const jti = uuidv4();

    const gamePath =
      "users/users/" + userID + "/private/games/gameIDs/" + gameID;
    get(ref(db, gamePath + "/numberOfGameInvites")).then((snapshot) => {
      const numberOfGameInvites = snapshot.val();
      // console.log("numberOfGameInvites:", numberOfGameInvites);
      if (numberOfGameInvites >= 4) {
        const gameInviteQuery = query(
          ref(db, gamePath + "/gameInvites"),
          orderByValue(),
          startAfter(Date.now())
        );
        get(gameInviteQuery).then((gameInviteSnapshot) => {
          const gameInviteData = gameInviteSnapshot.val();
          // console.log("gameInviteSnapshot:", gameInviteData);
          let updatedNumOfGameInvites = 0;
          if (!gameInviteData) {
            update(ref(db), {
              [gamePath + "/gameInvites/" + jti]: exp,
              [gamePath + "/numberOfGameInvites"]: 1,
            });
          } else {
            updatedNumOfGameInvites = Object.keys(gameInviteData).length;
            if (updatedNumOfGameInvites >= 4) {
              // TODO: alert user
              console.log(
                "the max number of concurrent invites (4) has been reached. try again later"
              );
              return;
            } else {
              update(ref(db), {
                [gamePath + "/gameInvites"]: { ...gameInviteData, [jti]: exp },
                [gamePath + "/numberOfGameInvites"]:
                  updatedNumOfGameInvites + 1,
              });
            }
          }
        });
      } else {
        update(ref(db), {
          [gamePath + "/gameInvites/" + jti]: exp,
          [gamePath + "/numberOfGameInvites"]: increment(1),
        });
      }
    });

    const header = {
      alg: "ES256",
      typ: "JWT",
    };
    const payload = {
      sub: "game-invite",
      exp,
      gameID,
      iss: userID,
      jti,
    };
    const encodedHeader = encodeBase64URL(JSON.stringify(header));
    const encodedData = encodeBase64URL(JSON.stringify(payload));
    const unsignedToken = `${encodedHeader}.${encodedData}`;
    // console.log("unsignedToken:", unsignedToken);

    // // Get the user's private key
    // get(ref(db, `users/users/${userID}/private/key`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     importPrivateKey(snapshot.val()).then((privKey) => {
    //       cryptoAPI
    //         .sign(
    //           { name: "ECDSA", hash: "SHA-256" },
    //           privKey,
    //           encodeStr(unsignedToken)
    //         )
    //         .then((signature) => {
    //           const signedToken = encodeBase64URL(sigToBase64(signature));
    //           const jwtToken = `${unsignedToken}.${signedToken}`;
    //           console.log("jwtToken:", jwtToken);
    //         });
    //     });
    //   }
    // });
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
            <Button>Enter Game</Button>
            <Button>Edit</Button>
            <Button onClick={() => handleDeleteGame(selectedGame.gameID)}>
              Delete
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-5 items-center">
              <h2>Players</h2>
              <Button
                className="mb-2"
                padding="px-2.5 py-0.5"
                rounded="rounded-sm"
                onClick={() => handleCreateGameInvite(selectedGame.gameID)}
              >
                +
              </Button>
            </div>
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
      <Selection onClick={(event) => handleSelectionClick(event)}>
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

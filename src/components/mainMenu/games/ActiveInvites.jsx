import { Fragment, useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  startAfter,
  get,
  update,
  increment,
} from "firebase/database";

import { v4 as uuidv4 } from "uuid";
import {
  copyToClipboard,
  encodeBase64URL,
  encodeStr,
  arrayBufferToBase64,
  base64toURL,
} from "../../../util/util.jsx";
import ms from "ms";

const noInvitesP = (
  <p className="col-span-full text-center">There aren't any active invites.</p>
);

export default function ActiveInvites({ htmlRef, userID, gameID }) {
  const db = getDatabase();
  const [noInvites, setNoInvites] = useState(true);
  const [content, setContent] = useState(null);

  const cryptoAPI = window.crypto.subtle || window.crypto.webkitSubtle;
  // if (!cryptoAPI) {
  //   console.log("no web crypto api on this browser");
  // } else {
  //   console.log("there's web crypto api YIPPEE");
  // }

  function queryGameInvites(gameInvitesPath) {
    const gameInviteQuery = query(
      ref(db, gameInvitesPath),
      orderByChild("exp"),
      startAfter(Date.now())
    );
    get(gameInviteQuery).then((gameInviteSnapshot) => {
      const gameInviteData = gameInviteSnapshot.val();
      //   console.log("gameInviteData:", gameInviteData);
      if (!gameInviteData) {
        setNoInvites(true);
      } else {
        const dateFormatOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };

        setNoInvites(false);
        setContent(
          Object.entries(gameInviteData).map(([jti, invData], index) => (
            <Fragment key={jti}>
              <a
                onClick={() => {
                  copyToClipboard(invData.inviteLink);
                }}
                href={invData.inviteLink}
                className="text-sky-300 hover:text-sky-200"
              >
                Invite {index + 1}
              </a>
              <p className="truncate">{ms(invData.exp - Date.now())}</p>
              <p className="truncate">
                {new Date(invData.createdOn).toLocaleDateString(
                  undefined,
                  dateFormatOptions
                )}
              </p>
            </Fragment>
          ))
        );
      }
    });
  }

  useEffect(() => {
    const gameInvitesPath = `users/users/${userID}/private/games/gameIDs/${gameID}/gameInvites`;
    queryGameInvites(gameInvitesPath);
    const interval = setInterval(() => {
      queryGameInvites(gameInvitesPath);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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

  function createURL(jti, exp, gameID) {
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

    // Get the user's private key, create a signature, and send the url
    get(ref(db, `users/users/${userID}/private/key`)).then((snapshot) => {
      if (snapshot.exists()) {
        importPrivateKey(snapshot.val()).then((privKey) => {
          cryptoAPI
            .sign(
              { name: "ECDSA", hash: "SHA-256" },
              privKey,
              encodeStr(unsignedToken)
            )
            .then((signature) => {
              const signedToken = base64toURL(arrayBufferToBase64(signature));
              const jwtToken = `${unsignedToken}.${signedToken}`;
              // console.log("jwtToken:", jwtToken);

              const inviteLink =
                "http://localhost:5173/games/invite/" +
                gameID +
                "?token=" +
                jwtToken;
              copyToClipboard(inviteLink);

              const gameInvitesPath =
                "users/users/" +
                userID +
                "/private/games/gameIDs/" +
                gameID +
                "/gameInvites";
              update(ref(db), {
                [gameInvitesPath + "/" + jti + "/inviteLink"]: inviteLink,
              }).then(() => {
                queryGameInvites(gameInvitesPath);
              });
            });
        });
      }
    });

    return null;
  }

  function handleCreateGameInvite(gameID) {
    // TODO: finish implementation

    const jti = uuidv4();
    // const exp = Math.floor(Date.now() + 60000); // Expires in 1 min
    const exp = Math.floor(Date.now() + 300000); // Expires in 5 min
    // const exp = Math.floor(Date.now() + 600000); // Expires in 10 min

    const gamePath =
      "users/users/" + userID + "/private/games/gameIDs/" + gameID;
    get(ref(db, gamePath + "/numberOfGameInvites")).then((snapshot) => {
      const numberOfGameInvites = snapshot.val();
      // console.log("numberOfGameInvites:", numberOfGameInvites);
      if (numberOfGameInvites >= 4) {
        const gameInviteQuery = query(
          ref(db, gamePath + "/gameInvites"),
          orderByChild("exp"),
          startAfter(Date.now())
        );
        get(gameInviteQuery).then((gameInviteSnapshot) => {
          const gameInviteData = gameInviteSnapshot.val();
          // console.log("games that haven't expired yet:", gameInviteData);
          let updatedNumOfGameInvites = 0;
          if (!gameInviteData) {
            const createdOn = Date.now();
            update(ref(db), {
              [gamePath + "/gameInvites"]: {
                [jti]: { createdOn, exp },
              },
              [gamePath + "/numberOfGameInvites"]: 1,
            }).then(() => {
              createURL(jti, exp, gameID);
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
              const createdOn = Date.now();
              update(ref(db), {
                [gamePath + "/gameInvites"]: {
                  ...gameInviteData,
                  [jti]: { createdOn, exp },
                },
                [gamePath + "/numberOfGameInvites"]:
                  updatedNumOfGameInvites + 1,
              }).then(() => {
                createURL(jti, exp, gameID);
              });
            }
          }
        });
      } else {
        const createdOn = Date.now();
        update(ref(db), {
          [gamePath + "/gameInvites/" + jti]: { createdOn, exp },
          [gamePath + "/numberOfGameInvites"]: increment(1),
        }).then(() => {
          createURL(jti, exp, gameID);
        });
      }
    });
  }

  return (
    <div
      ref={htmlRef}
      className="hidden bg-white p-5 rounded-md overflow-hidden"
    >
      <div className="flex flex-row justify-between items-center">
        <h3 className="align-middle">Active Invites</h3>
        <button
          onClick={() => handleCreateGameInvite(gameID)}
          className="text-[2rem] text-gray-300 hover:text-gray-700 align-middle"
        >
          +
        </button>
      </div>
      <hr className="my-3"></hr>
      <div className="grid grid-cols-3 gap-x-5 gap-y-1 text-[1.25rem] text-start text-clip">
        <p className="text-nowrap text-clip mb-1">Link</p>
        <p className="text-nowrap text-clip mb-1">Expires In</p>
        <p className="text-nowrap text-clip mb-1">Created On</p>
        {noInvites ? noInvitesP : content}
      </div>
    </div>
  );
}

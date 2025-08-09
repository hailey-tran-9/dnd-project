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
  startAt,
} from "firebase/database";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";

import { v4 as uuidv4 } from "uuid";
import {
  copyToClipboard,
  encodeBase64URL,
  encodeStr,
  arrayBufferToBase64,
  base64toURL,
} from "../../../util/util.jsx";
import ms from "ms";
import { toastThunk } from "../../Toasts.jsx";
import ActiveInvite from "./ActiveInvite.jsx";

const noInvitesP = (
  <p className="col-span-full text-center">There aren't any active invites.</p>
);

export default function ActiveInvites({ htmlRef, userID, gameID, gameName }) {
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();

  const [noInvites, setNoInvites] = useState(true);
  const [content, setContent] = useState(null);

  const cryptoAPI = window.crypto.subtle || window.crypto.webkitSubtle;
  // if (!cryptoAPI) {
  //   console.log("no web crypto api on this browser");
  // } else {
  //   console.log("there's web crypto api YIPPEE");
  // }

  useEffect(() => {
    queryGameInvites(`gameInvites/${gameID}/invites`);
  }, []);

  function queryGameInvites(gameInvitesPath) {
    console.log("QUERY GAME INVITES");
    const gameInviteQuery = query(
      ref(db, gameInvitesPath),
      orderByChild("exp"),
      startAt(Date.now())
    );
    get(gameInviteQuery).then((gameInviteSnapshot) => {
      const gameInviteData = gameInviteSnapshot.val();
      // console.log("gameInviteData:", gameInviteData);
      if (!gameInviteData) {
        setNoInvites(true);
      } else {
        setNoInvites(false);
        setContent(
          Object.entries(gameInviteData).map(([jti, invData], index) => (
            <ActiveInvite
              gameID={gameID}
              refreshFn={queryGameInvites}
              invData={invData}
              invIndex={index}
              key={jti}
            />
          ))
        );
      }
    });
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

  function createURL(jti, exp, gameID) {
    const header = {
      alg: "ES256",
      typ: "JWT",
    };
    const payload = {
      sub: "game-invite",
      exp,
      gameID,
      gameName,
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
                import.meta.env.BASE_URL +
                "games/invite/" +
                gameID +
                "?token=" +
                jwtToken;
              copyToClipboard(inviteLink);

              const gameInvitesPath = `gameInvites/${gameID}/invites`;
              update(ref(db), {
                [`${gameInvitesPath}/${jti}/inviteLink`]: inviteLink,
              }).then(() => {
                queryGameInvites(gameInvitesPath);
                dispatch(
                  toastThunk(
                    "Success",
                    "Game invite was created! Invite link copied to clipboard."
                  )
                );
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

    const gameInvitePath = `gameInvites/${gameID}`;
    const gameInviteQuery = query(
      ref(db, gameInvitePath + "/invites"),
      orderByChild("exp"),
      startAfter(Date.now())
    );
    get(gameInviteQuery).then((gameInviteSnapshot) => {
      const gameInviteData = gameInviteSnapshot.val();
      console.log("games that haven't expired yet:", gameInviteData);
      if (!gameInviteData) {
        const createdOn = Date.now();
        update(ref(db), {
          [gameInvitePath + "/invites"]: {
            [jti]: { createdOn, exp },
          },
          [gameInvitePath + "/numberOfGameInvites"]: 1,
        }).then(() => {
          createURL(jti, exp, gameID);
        });
      } else {
        let updatedNumOfGameInvites = Object.keys(gameInviteData).length;
        if (updatedNumOfGameInvites >= 4) {
          dispatch(
            toastThunk("Error", "Invite max has been reached. Try again later.")
          );
        } else {
          const createdOn = Date.now();
          update(ref(db), {
            [gameInvitePath + "/invites"]: {
              ...gameInviteData,
              [jti]: { createdOn, exp },
            },
            [gameInvitePath + "/numberOfGameInvites"]: increment(1),
          }).then(() => {
            createURL(jti, exp, gameID);
          });
        }
      }
    });
  }

  return (
    <div
      ref={htmlRef}
      className="hidden bg-white px-7 py-5 rounded-md overflow-hidden"
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
      <div className="flex-none grid grid-cols-3 gap-x-5 gap-y-1 text-[1.25rem] text-start text-clip">
        <p className="text-nowrap text-clip mb-1">Link</p>
        <p className="text-nowrap text-clip mb-1">Expires In</p>
        <p className="text-nowrap text-clip mb-1">Created On</p>
        {noInvites ? noInvitesP : content}
      </div>
    </div>
  );
}

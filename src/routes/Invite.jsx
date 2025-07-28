import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import { getDatabase, ref, get, set, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { decodeBase64URL, urlToBase64, encodeStr } from "../util/util";

import Button from "../components/Button";

// TODO: continue implementing when you can test with another user

function InvitePage() {
  const db = getDatabase();
  let params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState(<></>);
  const [inviteStatus, setInviteStatus] = useState("");
  const auth = getAuth();

  const cryptoAPI = window.crypto.subtle || window.crypto.webkitSubtle;

  function importPublicKey(jwk) {
    return cryptoAPI.importKey(
      "jwk",
      jwk,
      {
        name: "ECDSA",
        namedCurve: "P-256",
      },
      true,
      ["verify"]
    );
  }

  function addPlayerToGame(payload) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userID = user.uid;
        const gamePath = "games/games/" + payload.gameID;
        get(ref(db, gamePath)).then((snapshot) => {
          const gameData = snapshot.val();
          if (gameData.userID === userID) {
            console.log(
              "you're the owner of this game, cannot be invited to it"
            );
            return;
          } else if (
            gameData.playersInGame &&
            userID in gameData.playersInGame
          ) {
            console.log("you're already in the game, cannot be added again");
            return;
          }

          set(ref(db, gamePath + "/playersInGame/" + userID), "");
          const pushJoined = push(
            ref(db, "users/users/" + userID + "/public/joinedGames")
          );
          set(pushJoined, payload.gameID);
        });
      }
    });
  }

  function checkExpiration(payload) {
    const exp = payload.exp;
    if (exp <= Date.now()) {
      console.log("invite has expired");
      if (inviteStatus !== "expired") {
        setContent(
          <div>
            <h1 className="lg:text-[3rem]">Invite has expired</h1>
            <h3>Please ask the game owner for another link.</h3>
          </div>
        );
        setInviteStatus("expired");
      }
    } else {
      console.log("valid invite");
      if (inviteStatus !== "valid") {
        setContent(
          <>
            <div>
              <h1>Invite to [Game Name]</h1>
              <h3>Would you like to join?</h3>
            </div>
            <div className="flex flex-row justify-around">
              <Button
                onClick={() => addPlayerToGame(payload)}
                className="w-[30%] bg-green-600 hover:bg-green-400"
              >
                Yes
              </Button>
              <Button className="w-[30%]">No</Button>
            </div>
          </>
        );
        setInviteStatus("valid");
      }
    }
  }

  useEffect(() => {
    let interval;
    const jwt = searchParams.get("token");
    if (!jwt) {
      console.log(
        "no invite has been detected. please ask the game owner for another invite link."
      );
      setContent(
        <div>
          <h1>No Invite Detected</h1>
          <h3>Please ask the game owner for another invite link.</h3>
        </div>
      );
    } else {
      const [encodedHeader, encodedPayload, encodedSignature] = jwt.split(".");
      const payloadObj = JSON.parse(decodeBase64URL(encodedPayload));
      const issID = payloadObj.iss;
      const signature = Buffer.from(urlToBase64(encodedSignature), "base64");
      const encodedData = encodeStr(`${encodedHeader}.${encodedPayload}`);

      // console.log("issuerID:", issID);
      // console.log("signature:", signature);
      // console.log("encodedData:", encodedData);

      // Get the issuer's public key
      get(ref(db, `users/users/${issID}/public/key`)).then((snapshot) => {
        if (snapshot.exists()) {
          importPublicKey(snapshot.val()).then((pubKey) => {
            // console.log("pubKey:", pubKey);
            cryptoAPI
              .verify(
                { name: "ECDSA", hash: "SHA-256" },
                pubKey,
                signature,
                encodedData
              )
              .then((result) => {
                if (!result) {
                  console.log("invalid invite");
                  setContent(
                    <div>
                      <h1>Invalid Invite</h1>
                      <h3>Please ask the game owner for another link.</h3>
                    </div>
                  );
                  setInviteStatus("invalid");
                } else {
                  checkExpiration(payloadObj);
                  interval = setInterval(() => {
                    checkExpiration(payloadObj);
                  }, 5000);
                }
              });
          });
        }
      });
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <>
      <div className="flex flex-col grow justify-center items-center text-center">
        <div className="w-[40vw] flex flex-col bg-white rounded-2xl px-15 py-20 gap-10">
          {content}
        </div>
      </div>
    </>
  );
}

export default InvitePage;

export async function clientLoader() {
  return {
    title: "Invite Page",
  };
}

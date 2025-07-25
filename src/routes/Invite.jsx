import { useParams, useSearchParams } from "react-router";
import { getDatabase, ref, get } from "firebase/database";

import {
  decodeBase64URL,
  urlToBase64,
  encodeStr,
} from "../util/util";

import Button from "../components/Button";

function InvitePage() {
  const db = getDatabase();
  let params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log("searchParams:", searchParams.get("token"));
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

  const jwt = searchParams.get("token");
  if (!jwt) {
    console.log(
      "no invite has been detected. please ask the game owner for another invite link."
    );
  } else {
    const [encodedHeader, encodedPayload, encodedSignature] = jwt.split(".");
    const issID = JSON.parse(decodeBase64URL(encodedPayload)).iss;
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
              console.log("signature verified?:", result);
            });
        });
      }
    });
  }

  let inviteTokenValid = true;
  let content;
  if (inviteTokenValid) {
    content = (
      <>
        <div>
          <h1>Invite to [Game Name]</h1>
          <h3>Would you like to join?</h3>
        </div>
        <div className="flex flex-row justify-around">
          <Button className="bg-green-600 hover:bg-green-400">Yes</Button>
          <Button>No</Button>
        </div>
      </>
    );
  } else {
    content = (
      <div>
        <h1>Invite has expired</h1>
        <h3>Ask the game owner for another link</h3>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col grow justify-center items-center text-center">
        <div className="w-[40vw] flex flex-col bg-white rounded-2xl p-15 gap-10">
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

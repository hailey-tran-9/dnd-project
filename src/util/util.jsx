import { Fragment } from "react";

//#region Text Manipulation
const numToWordMap = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
};

export function numToWord(num) {
  return numToWordMap[num];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function emboldenNum(str, identifier) {
  let words = str.split(" ");
  return (
    <p>
      {words.map((word, index) => {
        if (Object.values(numToWordMap).includes(word.toLowerCase())) {
          return (
            <Fragment key={identifier + word + index}>
              <b>{word}</b>
              {index < words.length ? " " : ""}
            </Fragment>
          );
        } else {
          return (
            <Fragment key={identifier + word + index}>
              {word}
              {index < words.length ? " " : ""}
            </Fragment>
          );
        }
      })}
    </p>
  );
}
//#endregion

export function calculateAbilityModifier(value) {
  return Math.floor((value - 10) / 2);
}

//#region Account Creation Helpers
export function basicEmailCheck(email) {
  const emailMatch = email.match(new RegExp("^.+@[a-zA-z]+\\.[a-zA-Z]{2,3}$"));
  return emailMatch != null;
}

export function validPassword(password) {
  // Check the len is between 7-12 characters
  if (!(7 <= password.length <= 12)) {
    return false;
  }

  // Check that there's at least one lowercase letter, uppercase letter, number, and non-alphanumeric character
  const alphabet = password.match(new RegExp("[a-z]", "g"));
  const upperAlphabet = password.match(new RegExp("[A-Z]", "g"));
  const numbers = password.match(new RegExp("\\d", "g"));
  const nonAlphaNum = password.match(new RegExp("[\\W_]", "g"));

  // console.log(alphabet);
  // console.log(upperAlphabet);
  // console.log(numbers);
  // console.log(nonAlphaNum);

  if (
    alphabet == null ||
    upperAlphabet == null ||
    numbers == null ||
    nonAlphaNum == null
  ) {
    return false;
  }

  return true;
}
//#endregion

//#region Cryptography
export function encodeBase64URL(str) {
  const base64 = btoa(Buffer.from(str));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeBase64URL(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  return atob(str);
}

export function encodeStr(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

export function urlToBase64(base64URL) {
  base64URL = base64URL
    .replace(new RegExp(RegExp.escape("-"), "g"), "+")
    .replace(new RegExp(RegExp.escape("_"), "g"), "/");
  // Add the base64 padding
  while (base64URL.length % 4) {
    base64URL += "=";
  }
  return base64URL;
}

export function base64toURL(base64) {
  return base64
    .replace(new RegExp(RegExp.escape("+"), "g"), "-")
    .replace(new RegExp(RegExp.escape("/"), "g"), "_")
    .replace(new RegExp(RegExp.escape("="), "g"), "");
}

export function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
//#endregion

export function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("successfully copied to clipboard");
    })
    .catch((error) => {
      console.log("error copying to clipboard");
    });
}

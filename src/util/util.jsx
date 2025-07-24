import { Fragment } from "react";

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

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function calculateAbilityModifier(value) {
  return Math.floor((value - 10) / 2);
}

export function numToWord(num) {
  return numToWordMap[num];
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

export function encodeBase64URL(str) {
  const base64 = Buffer.from(str).toString("base64");
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

export function sigToBase64(signature) {
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(signature)]));
}

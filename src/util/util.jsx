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

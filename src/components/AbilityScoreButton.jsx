import { useContext } from "react";
import { check, save } from "../roll.js";
import { ChatContext } from "./contexts/ChatContext.jsx";

export default function AbilityScoreButton({
  label,
  ability,
  modifier,
  proficiencyBonus,
}) {
  const { updateChatLog } = useContext(ChatContext);

  const classes =
    "bg-blue-950 text-white hover:bg-blue-900 rounded-sm px-2 py-1";

  function handleCheck() {
    let roll = check(modifier);
    let chatMsg =
      ability.toUpperCase() + " C: " + roll.rollStr + " = " + roll.result.toString();
    updateChatLog((prevChatLog) => [...prevChatLog, chatMsg]);
  }

  function handleSave() {
    let roll = save(modifier, proficiencyBonus);
    let chatMsg =
    ability.toUpperCase() + " S: " + roll.rollStr + " = " + roll.result.toString();
    updateChatLog((prevChatLog) => [...prevChatLog, chatMsg]);
  }

  return label === "CHECK" ? (
    <button className={classes} onClick={handleCheck}>
      {label}
    </button>
  ) : (
    <button className={classes} onClick={handleSave}>
      {label}
    </button>
  );
}

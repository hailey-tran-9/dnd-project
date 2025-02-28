import { useContext } from "react";
import { check } from "../roll.js";
import { ChatContext } from "./contexts/ChatContext.jsx";

export default function SkillButton({ skill, modifier }) {
  const { updateChatLog } = useContext(ChatContext);

  function handleCheck() {
    let roll = check(modifier);
    let chatMsg =
      skill.toUpperCase() +
      " CHECK: " +
      roll.rollStr +
      " = " +
      roll.result.toString();
    updateChatLog((prevChatLog) => [...prevChatLog, chatMsg]);
  }

  return (
    <button
      className="bg-blue-950 text-white hover:bg-blue-900 rounded-sm px-2 py-1"
      onClick={handleCheck}
    >
      CHECK
    </button>
  );
}

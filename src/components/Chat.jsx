import { useRef, useEffect, useContext } from "react";
import { ChatContext } from "./contexts/ChatContext.jsx";

export default function Chat() {
  const chatInput = useRef();
  const {chatLog, updateChatLog} = useContext(ChatContext);

  useEffect(() => {
    chatInput.current.value = "";
  }, [chatLog]);

  function handleInputClick() {
    if (chatInput.current.value) {
      updateChatLog((prevChatLog) => [...prevChatLog, chatInput.current.value]);
    } else {
      console.log("EMPTY INPUT");
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleInputClick();
    }
  }

  return (
    <section
      id="chat"
      className="flex flex-col self-end border-2 border-blue-300 p-3"
    >
      <div
        id="chatLog"
        className="w-64 h-32 flex flex-col gap-0.5 overflow-y-auto pr-0.5"
      >
        <p className="font-semibold mb-1">CHAT LOG</p>
        {chatLog.map((msg, index) => (
          <p key={`${msg}${index}`}>{msg}</p>
        ))}
      </div>
      <p>
        <input
          id="chatInput"
          ref={chatInput}
          type="text"
          className="bg-blue-100 mt-10 mr-3"
          onKeyDown={handleKeyPress}
        ></input>
        <button
          onClick={handleInputClick}
          className="bg-blue-950 text-white hover:bg-blue-900 rounded-sm px-2 py-1"
        >
          Enter
        </button>
      </p>
    </section>
  );
}

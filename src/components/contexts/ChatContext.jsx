import { useState, createContext } from "react";

export const ChatContext = createContext({
  chatLog: [],
  updateChatLog: () => {},
});

export default function ChatContextProvider({ children }) {
  const [chatLog, setChatLog] = useState([]);

  const ctxVal = {
    chatLog,
    updateChatLog: setChatLog,
  };

  return <ChatContext value={ctxVal}>{children}</ChatContext>;
}

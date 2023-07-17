"use client";
import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useReducer,
} from "react";

//importing the reducer functions

import { msgReducer, Message } from "./chatReducer";
interface ConversationInterface {
  convId: string | null;
  setConvId: React.Dispatch<React.SetStateAction<string | null>>;
  receiverId: string | null;
  setReceiverId: React.Dispatch<React.SetStateAction<string | null>>;
  user: object | null;
  setUser: React.Dispatch<React.SetStateAction<object | null>>;
  websocket: WebSocket | null;
  messages: Message[] | null;
  messageReducer: React.Dispatch<any>;
}

const initialState: ConversationInterface = {
  convId: null,
  setConvId: () => {},
  receiverId: null,
  setReceiverId: () => {},
  user: null,
  setUser: () => {},
  websocket: null,
  messages: null,
  messageReducer: () => null,
};

export const ChatContext = createContext<ConversationInterface>(initialState);

interface Props {
  children: React.ReactNode;
}

// Chat Context Provider -->
export const ChatContextProvider: React.FC<Props> = ({ children }) => {
  const [convId, setConvId] = useState<string | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [user, setUser] = useState<object | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // connection to the websocket with token
      const socket = new WebSocket(`ws://localhost:9876?__a_t=${token}`);
      socketRef.current = socket;
      setWs(socket);
    }

    // Closing the connection
    () => {
      socketRef.current?.close();
    };
  }, []);

  const [messages, messageReducer] = useReducer(msgReducer, []);

  if (socketRef.current?.OPEN) {
    socketRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log(msg);
      if (msg.convId === convId) {
        messageReducer({ type: "ADD_MSG", payload: msg });
      }
      console.log("onmessage event", event.data);
    };
  }

  useEffect(() => {}, [message]);
  return (
    <ChatContext.Provider
      value={{
        convId,
        setConvId,
        receiverId,
        setReceiverId,
        user,
        setUser,
        websocket: socketRef.current,
        messages,
        messageReducer,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

"use client";
import React, { createContext, useState, useRef, useEffect } from "react";

interface ConversationInterface {
  convId: string | null;
  setConvId: React.Dispatch<React.SetStateAction<string | null>>;
  receiverId: string | null;
  setReceiverId: React.Dispatch<React.SetStateAction<string | null>>;
  user: object | null;
  setUser: React.Dispatch<React.SetStateAction<object | null>>;
  websocket: WebSocket | null;
}

const initialState: ConversationInterface = {
  convId: null,
  setConvId: () => {},
  receiverId: null,
  setReceiverId: () => {},
  user: null,
  setUser: () => {},
  websocket: null,
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

  const socketRef = useRef<WebSocket | null>(null);
useEffect(() => {
  const socket = new WebSocket("ws://localhost:9876");
  socketRef.current = socket;

  // Closing the connection
  () => {
    socket.close();
  };
}, []);

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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

"use client";
import React, { useState, useEffect, useRef } from "react";
import Conversation from "@/components/chat/Conversation";
import Chats from "@/components/chat/Chats";
import useAuth from "@/hooks/useAuth";
import { ChatContextProvider } from "@/context/chatContext";
import { AuthContextProvider } from "@/context/authContext";
import useChat from "@/hooks/useChat";

const Chat = () => {
  const user = useAuth();
  const { websocket } = useChat();

  const token = localStorage.getItem("token");
  const [connection, setConnection] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const [convId, setConvId] = useState();
  const [receiverId, setReceiverId] = useState();

//  if(websocket.readyState){
//   websocket.addEventlistener("open", () => {
//     console.log("Connection Established");
//   });
//  }

console.log('websocket',websocket);

  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <main className="w-screen bg-blue-900 flex justify-center items-center">
          <div className="flex w-full max-w-6xl">
            <Conversation />
            <Chats convId={convId} receiverId={receiverId} />
          </div>
        </main>
      </ChatContextProvider>
    </AuthContextProvider>
  );
};

export default Chat;

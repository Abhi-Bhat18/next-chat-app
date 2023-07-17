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

  if (websocket?.readyState) {
    websocket.onopen = (event) => {
      console.log("Opening");
    };
  }


  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <main className="w-screen bg-blue-900 flex justify-center items-center">
          <div className="flex w-full max-w-6xl">
            <Conversation />
            <Chats />
          </div>
        </main>
      </ChatContextProvider>
    </AuthContextProvider>
  );
};

export default Chat;

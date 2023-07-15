import React, { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "@/actions/chatActioins";
import Message from "./Message";
import useChat from "@/hooks/useChat";
import useAuth from "@/hooks/useAuth";

const Chats = (props: any) => {
  const { convId, receiverId, websocket } = useChat();
  const { user } = useAuth();

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (convId) {
      // fetching the messages based on the conversation
      fetchMessages(convId)
        .then((data) => {
          console.log(data.messages);
          setMessages((prev) => [...prev, ...data.messages]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [convId, receiverId]);

  // Sending messages
  const sendMsg = () => {
    if (message === "") return;
    const tempMsg = {
      message,
      sentBy: user?.id,
      time: new Date(),
    };
    setMessages((prev) => [
      ...prev,
      {
        message,
        sentBy: user?.id,
        time: new Date(),
      },
    ]);
    if (websocket?.readyState) {
      websocket.send(
        JSON.stringify({
          message,
          setnBy: user?.id,
          time: new Date(),
          receiverId,
        })
      );
    }
    sendMessage(message, receiverId)
      .then((data) => {})
      .catch((err) => console.log(err));
    setMessage("");
  };

  return (
    <div className="w-full bg-white overflow-y-scroll h-screen relative">
      <div className="w-full">
        {/* <--------------------Messages--------------------> */}
        <div className="space-y-5">
          {messages.length > 0 &&
            messages?.map((e: any, i: number) => {
              return (
                <Message
                  userId={user?.id}
                  _id={e._id}
                  sentBy={e.sentBy}
                  message={e.message}
                  time={e.time}
                  key={i}
                />
              );
            })}
        </div>

        {/* <----------------Message Input ---------------> */}
        <div className="absolute bottom-0 w-full py-5 bg-slate-200 shadow-md flex justify-between space-x-5">
          <button>File</button>
          <input
            type="text"
            value={message}
            className="w-full px-2 py-1 outline-none"
            placeholder="Some message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={() => sendMsg()}
            className=" text-white py-1 bg-purple-900 px-5 rounded-sm"
          >
            Send
          </button>
        </div>

        {/* ---------------Message Input End ---------------> */}
      </div>
    </div>
  );
};

export default Chats;

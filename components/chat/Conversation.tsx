import React, { useEffect, useState } from "react";
import Chat from "@/components/chat/Chat";
import { fetchConversations } from "../../actions/chatActioins";

import useChat from "@/hooks/useChat";

const Conversation = (props : any) => {
  const {setReceiverId,setConvId} = useChat();
  const [convs, setConvs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // fetch the conversations of the user and set the latest conversation Id
    fetchConversations()
      .then((data) => {
        setConvs(data);
        console.log(data[0]._id,data[0].members[0]._id)
        setConvId(data[0]._id)
        setReceiverId(data[0].members[0]._id)
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className=" w-5/12 overflow-y-scroll bg-slate-200 min-h-screen h-screen flex flex-col py-5 lg:p-5 space-y-5">
      <div className="sticky top-0">
        <input
          type="text"
          className="px-2 w-full font-serif py-1 outline-none shadow-md "
          placeholder="Search"
        />
      </div>
      {loading ? (
        <>Loading ....</>
      ) : (
        convs.map((e, i) => {
          return (
            <Chat
            key={i}
              imgUrl={e.members[0].imgUrl}
              firstName={e.members[0].firstName}
              lastName={e.members[0].lastName}
              _id={e._id}
            />
          );
        })
      )}
      Chat with your connections ...
      {/* <Chat />
      <Chat />
      <Chat />
      <Chat /> */}
    </div>
  );
};

export default Conversation;

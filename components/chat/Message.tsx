import React from "react";
import { getTimeAgo } from "@/utils/timeUtils";


interface Message {
  userId: string | undefined;
  message: string;
  sentBy: string;
  time: any;
  _id?: string;
}

const Message = (props: Message) => {
  const { message, sentBy, time, _id, userId } = props;
  const timeAgo = getTimeAgo(time);
  const justify =
    userId === sentBy ? "justify-end" : "justify-start text-white";
  const bg =
    userId === sentBy ? "bg-slate-200 text-left" : "bg-purple-900 text-left";
  return (
    <div className={`w-full flex  px-5 ${justify}`}>
      <div className={`w-[60%] ${bg} py-1 px-2 rounded-md`}>
        <p>{message}</p>
        <p className="text-xs w-full text-right">{timeAgo}</p>
      </div>
    </div>
  );
};

export default Message;

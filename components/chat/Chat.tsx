import React from "react";
import useChat from "@/hooks/useChat";

interface ChatInterface {
  imgUrl: string;
  firstName: string;
  lastName: string;
  _id: string;
  lastMessage?: string;
  receiverId?: string;
}

const Chat = (props: ChatInterface) => {
  const { imgUrl, firstName, lastName, _id, lastMessage } = props;

  const { setConvId, setReceiverId } = useChat();

  const setConversation = (id: string) => {
    setConvId(_id);
    return;
  };

  return (
    <div
      onClick={() => setConversation(_id)}
      className="flex space-x-2 items-center cursor-pointer"
    >
      <div className="w-14 h-14">
        <img
          src={
            imgUrl
              ? imgUrl
              : "https://media.licdn.com/dms/image/C4E03AQH68VrGQpaVtw/profile-displayphoto-shrink_400_400/0/1622128498376?e=1694649600&v=beta&t=1mGAml2RtWuJj32u5v7gh_5b0m8Kw2DrhN7AmhDgptg"
          }
          alt="Abhishek"
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex justify-between w-full">
        <div>
          <p>
            {firstName} {lastName}
          </p>
          <p className="text-xs">{lastMessage}</p>
        </div>
        <div className="hidden lg:block text-sm">8:30 PM</div>
      </div>
    </div>
  );
};

export default Chat;

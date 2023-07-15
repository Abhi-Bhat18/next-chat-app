import Image from "next/image";
import Chat from "./chat/page";
import { AuthContextProvider } from "@/context/authContext";
import { ChatContextProvider } from "@/context/chatContext";
export default function Home() {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          This is home page
        </main>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

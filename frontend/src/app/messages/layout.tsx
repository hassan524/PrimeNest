"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/context/context";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import io, { Socket } from "socket.io-client";

export default function MessagesLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const isChatOpen = pathname !== "/messages";
  const { Users } = useAppContext();
  const socketRef = useRef<Socket | null>(null);
  const [Message, SetMessage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session)

  const pathParts = pathname.split("/");
  const userid = pathParts.length > 2 ? pathParts[2] : null;
  const recipientId = pathname.startsWith("/messages/") ? pathParts[2] : null;

  if (!socketRef.current) {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
  }

  const handleNavigate = (id: string) => {
    router.push(`/messages/${id}`);
  };

  const sendMessage = () => {
    if (!recipientId || Message.trim() === "") return;
  
    const fromId = session?.user?.id;
    const toId = recipientId;
    const chatRoomId = [fromId, toId].sort().join("-");
  
    const messageData = {
      from: fromId,  
      to: toId,      
      roomId: chatRoomId,  
      message: Message,    
    };
  
    console.log("Sending message:", messageData); // Debugging
  
    socketRef.current?.emit("send_message", messageData);
    SetMessage("");
  };

  return (
    <div className="flex text-gray-900">
      <aside className={`bg-white md:h-auto h-[100vh] shadow-md flex flex-col gap-[2.5rem] w-full md:w-64 
        ${isChatOpen ? "hidden md:flex" : "flex"}`}>
        <div className="flex flex-col md:mt-[2rem] mt-[2.2rem] gap-[2rem] px-4 py-2">
          <div className="flex items-center gap-4 w-full px-3 py-2 border-b">
            <i className="bi bi-search text-gray-500"></i>
            <input
              type="text"
              placeholder="Search users..."
              className="w-full flex-1 bg-transparent outline-none text-sm text-gray-400 tracking-wide"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[2rem] px-4">
          {Users?.map((user) => (
            <div
              key={user._id}
              className="flex w-full md:gap-3 gap-7 cursor-pointer"
              onClick={() => handleNavigate(user._id)}
            >
              <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
              <span className="text-gray-900">{user.username}</span>
            </div>
          ))}
        </div>
      </aside>

      <main className={`flex-1 bg-gray-100 flex flex-col h-screen ${isChatOpen ? "flex" : "hidden md:flex"}`}>
        <header className="h-[10vh] bg-white flex items-center px-6 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-slate-50"></div>
          <h2 className="ml-4">{userid ? `Chat with ${userid}` : "Select a user"}</h2>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">{children}</div>

        <footer className="h-[10vh] bottom-0 fixed md:w-[calc(100vw-16rem)] w-full bg-white flex items-center px-4 border-t">
          <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-transparent outline-none px-2 text-gray-700"
              onChange={(e) => SetMessage(e.target.value)}
              value={Message}
              disabled={!userid}
            />
            <button className="ml-3 text-blue-500 text-2xl" disabled={!userid} onClick={sendMessage}>
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

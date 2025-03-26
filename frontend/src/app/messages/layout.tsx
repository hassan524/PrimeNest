"use client";

import { usePathname, useRouter, useParams, useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/context";
import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import io, { Socket } from "socket.io-client";
import { Skeleton } from "@/components/ui/skeleton"; // ShadCN Skeleton

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { userid } = useParams(); // Get userid from URL params
  const searchParams = useSearchParams();
  const chatUsername = searchParams.get("username"); // Get username from query params
  const isChatOpen = pathname !== "/messages";
  const { Users } = useAppContext();
  const socketRef = useRef<Socket | null>(null);
  const [Message, SetMessage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  // Initialize socket if not already connected
  if (!socketRef.current) {
    socketRef.current = io("https://holy-stacee-hscode524-5fbd0f72.koyeb.app/", {
      transports: ["polling", "websocket"],
      withCredentials: true,
    });
  }

  const handleNavigate = (id: string, username: string) => {
    router.push(`/messages/${id}?username=${encodeURIComponent(username)}`);
  };

  const sendMessage = () => {
    if (!userid || Message.trim() === "") return;
    const fromId = session?.user?.id;
    const toId = userid;
    const chatRoomId = [fromId, toId].sort().join("-");

    const messageData = {
      from: fromId,
      to: toId,
      roomId: chatRoomId,
      message: Message,
    };

    socketRef.current?.emit("send_message", messageData);
    SetMessage("");
  };

  return (
    <div className="flex h-screen text-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md flex flex-col gap-8 p-4 w-full md:w-64 
          ${isChatOpen ? "hidden md:flex" : "flex"}`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b pb-2">
            <i className="bi bi-search text-gray-500"></i>
            <input
              type="text"
              placeholder="Search users..."
              className="w-full bg-transparent outline-none text-sm text-gray-400"
            />
          </div>
          <div className="flex flex-col gap-6">
            {Users?.length > 0 ? (
              Users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleNavigate(user._id, user.username)}
                >
                  <div className="h-8 w-8 rounded-full bg-slate-50"></div>
                  <span className="text-gray-900">{user.username}</span>
                </div>
              ))
            ) : (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-32 rounded-md" />
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Main Chat Section */}
      <main className={`flex-1 bg-gray-100 flex flex-col relative ${isChatOpen ? "flex" : "hidden md:flex"}`}>
        {/* Header */}
        <header className="h-16 bg-white flex items-center px-6 shadow-sm">
          {userid ? (
            <>
              <div className="w-10 h-10 rounded-full bg-slate-50"></div>
              <h2 className="ml-4 text-lg font-medium">{chatUsername || "Unknown"}</h2>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-5 w-32 rounded-md" />
            </div>
          )}
        </header>

        {/* Chat Messages */}
        <div
          className="overflow-y-auto p-6 space-y-4 h-full no-scrollbar md:w-[calc(100vw - 16rem)] w-full"
          style={{ scrollbarWidth: "none" }}
        >
          {children}
        </div>

        {/* Footer Input */}
        <footer className="h-16 bg-white flex items-center px-4 border-t">
          <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-transparent outline-none px-2 text-gray-700 break-words"
              onChange={(e) => SetMessage(e.target.value)}
              value={Message}
              disabled={!userid}
            />
            <button
              className="ml-3 text-blue-500 text-2xl"
              disabled={!userid}
              onClick={sendMessage}
            >
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

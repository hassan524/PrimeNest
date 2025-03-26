"use client";

import io, { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface Message {
  id?: string;
  from: string;
  message: string;
  timestamp?: string;
}

export default function UserMessages() {
  const { data: session } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const params = useParams();
  const recipientId = params?.userid as string;

  if (!recipientId) {
    return <div className="text-center p-4">Invalid User ID</div>;
  }

  const loggedInUserId = session?.user?.id || "user1";
  const roomId = [loggedInUserId, recipientId].sort().join("-");

  useEffect(() => {
    // Initialize socket if not already connected
    if (!socketRef.current) {
      socketRef.current = io("https://holy-stacee-hscode524-5fbd0f72.koyeb.app/", {
        transports: ["polling", "websocket"],
        withCredentials: true,
      });
    }

    // Join the chat room
    socketRef.current.emit("join_room", roomId);

    // Load previous messages
    socketRef.current.on("load_previous_messages", (prevMessages: Message[]) => {
      const sortedMessages = prevMessages.sort(
        (a, b) =>
          new Date(a.timestamp || "").getTime() - new Date(b.timestamp || "").getTime()
      );
      setMessages(sortedMessages);
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    if (!socketRef.current) return;

    const handleMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    socketRef.current.on("receive_message", handleMessage);

    return () => {
      socketRef.current?.off("receive_message", handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Messages Display */}
      <div
        className="flex-1 overflow-y-auto sm:p-4 p-3 space-y-3 no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((msg, index) => (
          <div
            key={msg.id || `${msg.from}-${index}`}
            className={`p-3 rounded-lg w-[80%] break-words ${
              msg.from === loggedInUserId
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}

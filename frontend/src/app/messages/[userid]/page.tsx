"use client";

import io, { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

interface UserMessagesProps {
  params: { userid: string };
}

export default function UserMessages({ params }: UserMessagesProps) {
  const { data: session } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<{ from: string; message: string }[]>([]);

  const loggedInUserId = session?.user?.id || "user1";
  const recipientId = params.userid;
  const roomId = [loggedInUserId, recipientId].sort().join("-");

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5200");
    }
  
    socketRef.current.emit("join_room", roomId);
  }, [roomId]); 

  useEffect(() => {
    if (!socketRef.current) return;
  
    const handleMessage = (data: { from: string; message: string }) => {
      setMessages((prev) => [...prev, data]);
    };
  
    socketRef.current.on("receive_message", handleMessage);
  
    return () => {
      socketRef.current?.off("receive_message", handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Messages Display */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
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

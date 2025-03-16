"use client";

import io, { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function UserMessages() {
  const { data: session } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<{ from: string; message: string }[]>([]);

  const params = useParams();
  const recipientId = params?.userid as string;

  if (!recipientId) {
    return <div className="text-center p-4">Invalid User ID</div>;
  }

  const loggedInUserId = session?.user?.id || "user1";
  const roomId = [loggedInUserId, recipientId].sort().join("-");

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`https://prime-nest-4q17.vercel.app`);
    }

    socketRef.current.emit("join_room", roomId);

    return () => {
      socketRef.current?.disconnect();
    };
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

'use client';
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import socket from "@/lib/socket";
import { useAppContext } from "@/context/context";
import { CreateRoomId, GetPreviousMsgs } from "@/app/methods/socket";

interface Message {
  from: string;
  to: string;
  message: string;
  timestamp?: string;
}

export default function ChatWindow({ user }: { user: any }) {
  const { ContactSelectedUser } = useAppContext();
  const { data: session } = useSession();
  const [Messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loggedInUserId = session?.user?.id || "";
  const activeRecipient = ContactSelectedUser || user;
  const recipientId = activeRecipient?._id || "";
  const roomId = CreateRoomId(loggedInUserId, recipientId);

  useEffect(() => {
    if (!loggedInUserId || !recipientId) return;

    if (!socket.connected) {
      socket.connect();
    }

    setMessages([]);

    socket.emit("join_room", roomId);

    GetPreviousMsgs().then((previousMsgs) => {
      setMessages(previousMsgs || []);
    });

    // Attach once globally
    const receiveHandler = (newMsg: Message) => {
      setMessages((prev) => [...prev, newMsg]);
    };

    // Attach
    socket.on("receive_message", receiveHandler);

    return () => {
      socket.off("receive_message", receiveHandler);
    };

  }, [roomId]);

    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);

  const sendMessage = () => {
    if (!input.trim() || !loggedInUserId || !recipientId) return;

    const newMsg: Message = {
      from: loggedInUserId,
      to: recipientId,
      message: input.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.emit("send_message", { ...newMsg, roomId });
    setInput("");
  };

  return (
    <div className="w-full h-full bg-[#f4f0ee] flex flex-col rounded-r-lg">
      <div className="h-[15%] px-5 py-3 bg-white flex items-center gap-4 shadow-sm">
        <img
          src={activeRecipient?.profileImage || "/user.png"}
          className="sm:w-10 sm:h-10 w-14 h-14 rounded-full object-cover border-2"
          alt={activeRecipient?.username}
        />
        <div>
          <div className="flex flex-col">
            <h4 className="font-medium capitalize sm:text-md text-xl text-gray-800">{activeRecipient?.username}</h4>
            <span className="text-gray-400">{activeRecipient?.email}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none px-5 py-8 space-y-4 bg-[#f4f0ee]">
        {Messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === loggedInUserId ? "justify-end" : "justify-start"}`}>
            <div className={`${msg.from === loggedInUserId ? "bg-purple-200" : "bg-white"} rounded-xl p-3 shadow-sm max-w-[70%] break-words text-sm text-gray-800`}>
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-[#f4f0ee] flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          type="text"
          placeholder={`Message ${activeRecipient?.username || "User"}...`}
          className="flex-1 border border-gray-300 bg-[#f8f8f8] rounded-full px-5 sm:py-2 py-5 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-purple-500 hover:bg-purple-600 transition text-white px-4 sm:py-2 py-5 rounded-full text-md font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}

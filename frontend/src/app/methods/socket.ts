import socket from "@/lib/socket";


interface Message {
  from: string;
  to: string;
  message: string;
  timestamp?: string;
}

export function GetPreviousMsgs(): Promise<Message[]> {
  return new Promise((resolve) => {
    socket.on("load_previous_messages", (prevMessages) => {
      const sorted = prevMessages.sort((a: any, b: any) =>
        new Date(a.timestamp || "").getTime() - new Date(b.timestamp || "").getTime()
      );
      resolve(sorted);
    });
  });
}


export function CreateRoomId(loggedinId: any, RecepentId: any): string {
    const loggedInUserId = loggedinId || "user1";
    const recipientId = RecepentId as string;

    const roomId = [loggedInUserId, recipientId].sort().join("-");
    return roomId
}
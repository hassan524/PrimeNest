"use client";
import { usePathname } from "next/navigation";

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatOpen = pathname !== "/messages"; // Check if a chat is open

  return (
    <div className="flex h-screen text-gray-900">
      {/* Sidebar - Fullscreen on Mobile */}
      <aside
        className={`bg-white border-r shadow-md flex flex-col gap-[2.5rem] w-full md:w-64 
        ${isChatOpen ? "hidden md:flex" : "flex"}`} // Hide sidebar if chat is open
      >
        {/* Header */}
        <div className="md:flex hidden items-center justify-between border-b py-[1.5rem] px-5">
          <h2 className="font-semibold text-xl">Messages</h2>
          <i className="bi bi-chat-dots text-xl"></i>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:mt-0 mt-[2.2rem] gap-[2rem] px-5">
          <div className="flex items-center gap-2 w-full px-3 py-2 border rounded-lg">
            <i className="bi bi-search text-gray-500"></i>
            <input
              type="text"
              placeholder="Search users..."
              className="w-full flex-1 bg-transparent outline-none"
            />
          </div>

          {/* User List */}
          <ul className="space-y-2">
            <li>
              <a href="/messages/user1" className="block rounded-lg px-3 py-2 hover:bg-gray-100">
                User 1
              </a>
            </li>
            <li>
              <a href="/messages/user2" className="block rounded-lg px-3 py-2 hover:bg-gray-100">
                User 2
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Chat Box - Show only when a user is selected */}
      <main className={`flex-1 bg-gray-100 p-4 pt-10 ${isChatOpen ? "flex" : "hidden md:flex"}`}>
        {children}
      </main>
    </div>
  );
}

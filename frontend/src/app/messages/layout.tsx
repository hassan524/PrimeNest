"use client";
import { usePathname } from "next/navigation";

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChatOpen = pathname !== "/messages";

  return (
    <div className="flex text-gray-900">
      {/* Sidebar */}
      <aside
        className={`bg-white md:h-auto h-[100vh] shadow-md flex flex-col gap-[2.5rem] w-full md:w-64 
        ${isChatOpen ? "hidden md:flex" : "flex"}`}
      >
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
      </aside>

      {/* Chat Box */}
      <main className={`flex-1 bg-gray-100 flex flex-col h-screen ${isChatOpen ? "flex" : "hidden md:flex"}`}>
        {/* Chat Header */}
        <header className="h-[10vh] bg-white flex items-center px-6 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-slate-50">
          {/* <img src="/user.jpg" alt="User" className="w-10 h-10 rounded-full" />  */}
          </div>
          <h2 className="ml-4">Username</h2>
        </header>

        {/* Messages Container (scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {children}
        </div>

        {/* Chat Input (fixed at bottom of chat box) */}
        <footer className="h-[10vh] bottom-0 fixed md:w-[calc(100vw-16rem)] w-full bg-white flex items-center px-4 border-t">
          <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-transparent outline-none px-2 text-gray-700"
            />
            <button className="ml-3 text-blue-500 text-2xl">
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

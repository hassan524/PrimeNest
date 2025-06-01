import { useEffect } from "react";

interface ChatWindowProps {
    user: {
        id: string;
        username: string;
        profileImage?: string;
    } | null;
    onBack?: () => void;
}

export default function ChatWindow({ user, onBack }: ChatWindowProps) {
    useEffect(() => {
        console.log(user);
    }, [user]);

    if (!user) {
        return (
            <div className="w-full h-full bg-[#f4f0ee] flex items-center justify-center text-gray-500">
                <p>Select a user to start chatting</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-[#f4f0ee] flex flex-col rounded-r-lg">
            {/* Header */}
            <div className="h-[15%] px-5 py-3 bg-white flex items-center gap-4 shadow-sm">
                <button
                    onClick={onBack}
                    className="sm:hidden text-purple-600 font-bold text-lg mr-2"
                >
                    ←
                </button>
                <img
                    src={user.profileImage || "/user.png"}
                    className="w-10 h-10 rounded-full object-cover border-2"
                    alt={user.username}
                />
                <div>
                    <h4 className="font-medium capitalize text-md text-gray-800">{user.username}</h4>
                    <span className="text-sm text-green-600">Online</span>
                </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-[#f4f0ee]">
                <div className="flex justify-start">
                    <div className="bg-white rounded-xl p-3 shadow-sm max-w-[70%] text-sm text-gray-800">
                        Hey! How can I help you?
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="bg-purple-200 rounded-xl p-3 shadow-sm max-w-[70%] text-sm text-gray-800">
                        I need some information about the project.
                    </div>
                </div>
            </div>

            {/* Input Section */}
            <div className="p-4 bg-[#f4f0ee] flex items-center gap-2">
                <input
                    type="text"
                    placeholder={`Message ${user.username}...`}
                    className="flex-1 border border-gray-300 bg-[#f8f8f8] rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                />
                <button className="bg-purple-500 hover:bg-purple-600 transition text-white px-4 py-2 rounded-full text-sm font-medium">
                    Send
                </button>
            </div>
        </div>
    );
}

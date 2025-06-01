'use client';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useAppContext } from '@/context/context';
import axios from 'axios';
import { apiRoute } from '../../utils/apiRoutes';

const ChatWindow = dynamic(() => import('./ChatWindow'), { ssr: false });

interface User {
  id: string;
  username: string;
  profileImage?: string;
}

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const {
    SetIsMessagesOpen,
    IsMessagesOpen,
    ContactSelectedUser,
    SetContactSelectedUser
  } = useAppContext();

  // Fetch users on mount
  useEffect(() => {
    axios
      .get(apiRoute.GetInformation)
      .then((res) => {
        setUsers(res.data.Users);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // On resize: switch to list view on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileView('list');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!IsMessagesOpen) {
      setSelectedUser(null);
      setMobileView('list');
    }
  }, [IsMessagesOpen]);

  useEffect(() => {
    const user = ContactSelectedUser || selectedUser;
    setCurrentUser(user);
  }, [ContactSelectedUser, selectedUser]);

  return (
    <Dialog
      open={IsMessagesOpen}
      onOpenChange={(open) => {
        SetIsMessagesOpen(open);
        if (!open) {
          setSelectedUser(null);
          setMobileView('list');
        }
      }}
    >
      <DialogContent className="sm:max-w-[44rem] h-[75vh] w-[90vw] max-h-[80vh] overflow-y-auto rounded-lg text-gray-900 flex flex-col p-0">
        <DialogTitle className="sr-only">Messages</DialogTitle>

        <div className="flex flex-1 h-full">
          {/* Sidebar: User List */}
          <div
            className={`w-full sm:w-[40%] h-full bg-white border-r flex flex-col ${
              mobileView === 'chat' ? 'hidden sm:flex' : 'flex'
            }`}
          >
            <div className="h-[15%] px-4 py-3 border-b flex items-center">
              <h3 className="sm:text-xl text-3xl font-bold">Messages</h3>
            </div>

            <div className="h-[85%] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300">
              {loading ? (
                <div className="p-4 text-gray-500">Loading users...</div>
              ) : error ? (
                <div className="p-4 text-red-500">Failed to load users</div>
              ) : (
                users?.map((user: User) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 py-3 px-3 hover:bg-purple-100 cursor-pointer transition-all"
                    onClick={() => {
                      setSelectedUser(user);
                      setMobileView('chat');
                      SetContactSelectedUser(null);
                    }}
                  >
                    <img
                      src={user.profileImage || '/user.png'}
                      alt={user.username}
                      className="w-11 h-11 rounded-full object-cover border-2 border-purple-300"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium capitalize text-gray-800">
                        {user.username}
                      </span>
                      <span className="text-xs text-gray-500">
                        Last message preview...
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Window */}
          <div
            className={`w-full sm:w-[60%] h-full ${
              mobileView === 'list' ? 'hidden sm:flex' : 'flex'
            }`}
          >
            {currentUser ? (
              <ChatWindow user={currentUser} />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                Select a user to start chatting
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

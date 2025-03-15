"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/context";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { data: session, status } = useSession();

    const { SetIsPropertyOpen, SetIsLoginOpen, SetIsSignOpen } = useAppContext();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative lg:block hidden" ref={dropdownRef}>
            {/* Profile Icon */}
            <button
                className="opacity-90 flex items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className="bi bi-person text-[32px] text-gray-900"></i>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-xl shadow-lg w-52 z-50 py-3 px-4 flex flex-col gap-3 text-sm"
                    >
                        <span className="font-semibold text-gray-900">Dropdown Menu</span>
                        <div className="flex flex-col gap-2">
                            {session ? (
                                <>
                                    {/* <Link href="/dashboard" className="text-gray-800 hover:text-blue-600 transition">Dashboard</Link> */}
                                    {/* <Link href="/profile" className="text-gray-800 hover:text-blue-600 transition">Profile</Link>  */}
                                    <span className="text-gray-800 hover:text-blue-600 transition cursor-pointer" onClick={() => SetIsPropertyOpen(true)}>Profile</span>
                                    <span className="text-gray-800 hover:text-blue-600 transition cursor-pointer" onClick={() => SetIsPropertyOpen(true)}>Sell Property</span>
                                    <span className="text-gray-800 hover:text-blue-600 transition cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>Logout</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-gray-800 hover:text-blue-600 transition cursor-pointer" onClick={() => SetIsLoginOpen(true)}>Log in</span>
                                    <span className="text-gray-800 hover:text-blue-600 transition cursor-pointer" onClick={() => SetIsSignOpen(true)}>Sign up</span>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;

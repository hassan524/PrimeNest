"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        <div className="relative lg:flex hidden" ref={dropdownRef}>
            <button className="opacity-[0.9] lg:flex hidden" onClick={() => setIsOpen(!isOpen)}>
                <i className="bi bi-person text-[32px] text-gray-900"></i>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-52 z-[600] py-2 px-4 flex flex-col gap-3 text-sm">
                    <span className='font-semibold'>Dropdown Menu</span>
                    <div className="flex flex-col gap-2">
                        <Link href="/profile" className="text-gray-800 hover:font-semibold">Profile</Link>
                        <Link href="/settings" className="text-gray-800 hover:font-semibold">Settings</Link>
                        <Link href="/help" className="text-gray-800 hover:font-semibold">Help</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

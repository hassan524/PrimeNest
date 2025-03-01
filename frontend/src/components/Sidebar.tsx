'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppContext } from "@/context/context"; // Use your AppContext

const Sidebar = () => {
    const { IsSideBarOpen, SetIsSidebarOpen } = useAppContext();
    const pathname = usePathname();

    useEffect(() => {
        SetIsSidebarOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = IsSideBarOpen ? "hidden" : "auto";
    }, [IsSideBarOpen]);

    return (
        <>
            {/* Overlay when sidebar is open */}
            {IsSideBarOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
                    onClick={() => SetIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar - Sliding in from Right */}
            <div
                className={`h-screen flex flex-col w-[60vw] sm:w-[45vw] md:w-[30vw] fixed top-0 right-0 bg-white shadow-lg z-50 transition-transform duration-300 
                ${IsSideBarOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Sidebar Header */}
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-xl">Menu</h2>
                    <i
                        className="bi bi-x-lg text-xl cursor-pointer text-gray-700 hover:text-red-500"
                        onClick={() => SetIsSidebarOpen(false)}
                    ></i>
                </div>

                {/* Sidebar Links */}
                <nav className="flex flex-col gap-[2rem] px-5 mt-8">
                    <Link href="/" className="flex items-center gap-4 text-lg text-gray-700 hover:text-blue-600">
                        <i className="bi bi-house-door-fill text-xl opacity-[0.2]"></i> Home
                    </Link>
                    <Link href="/for-sale" className="flex items-center gap-4 text-lg text-gray-700 hover:text-blue-600">
                        <i className="bi bi-cart-fill text-xl opacity-[0.2]"></i> For Sale
                    </Link>
                    <Link href="/to-rent" className="flex items-center gap-4 text-lg text-gray-700 hover:text-blue-600">
                        <i className="bi bi-key-fill text-xl opacity-[0.2]"></i> To Rent
                    </Link>
                    <Link href="/house-prices" className="flex items-center gap-4 text-lg text-gray-700 hover:text-blue-600">
                        <i className="bi bi-bar-chart-fill text-xl opacity-[0.2]"></i> House Prices
                    </Link>
                    <Link href="/dashboard" className="flex items-center gap-4 text-lg text-gray-700 hover:text-blue-600">
                        <i className="bi bi-speedometer2 text-xl opacity-[0.2]"></i> Dashboard
                    </Link>
                </nav>

                {/* Logout Button */}
                <div className="px-5 mt-auto mb-5">
                    <button
                            className="w-full bg-slate-50 py-3 rounded-lg flex items-center justify-center gap-2"
                        onClick={() => console.log("Logout Clicked")}
                    >
                        <i className="bi bi-box-arrow-right text-lg"></i> Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

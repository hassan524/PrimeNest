"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { apiRoute } from "../../utils/apiRoutes";
import { Skeleton } from "@/components/ui/skeleton";

interface Property {
    images: string[];
    title: string;
    location: string;
    price: number;
}

const UserItems = () => {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState<Property[]>([]);
    const [userProperties, setUserProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.token) return;

        const fetchData = async () => {
            try {
                const [favoritesRes, userPropsRes] = await Promise.all([
                    axios.get(apiRoute.GetProps, {
                        headers: { "Content-Type": "application/json", Authorization: session?.user?.token },
                    }),
                    axios.get(apiRoute.GetUserProps, {
                        headers: { "Content-Type": "application/json", Authorization: session?.user?.token },
                    }),
                ]);

                setFavorites(favoritesRes.data.favorites || []);
                setUserProperties(userPropsRes.data.properties || []);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [session]);

    return (
        <div className="flex md:flex-row flex-col gap-6 overflow-hidden mb-10">
            {/* Left Side - Favorites */}
            <div
                className="md:w-1/2 w-full flex flex-col gap-[1rem] rounded-xl bg-white h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-4"
                style={{ scrollbarWidth: 'none' }}
            >
                <h2 className="text-xl font-semibold mb-4">Favourite Properties</h2>
                <div className="flex flex-col gap-7">
                    {loading ? (
                        Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
                    ) : favorites.length > 0 ? (
                        favorites.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between gap-2 rounded-md cursor"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                            >
                                <div className="flex gap-4">
                                    <img src={item.images[0]} className="w-16 h-16 object-cover rounded-md" />
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-sm font-semibold text-gray-900 uppercase">{item.title}</h2>
                                        <span className="text-xs opacity-60">{item.location}</span>
                                    </div>
                                </div>
                                <span className="text-blue-500 tracking-wide">${item.price}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No favorite properties found.</p>
                    )}
                </div>
            </div>

            {/* Right Side - User Properties */}
            <div
                className="md:w-1/2 w-full flex flex-col gap-[1rem] rounded-xl bg-white h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-4"
                style={{ scrollbarWidth: 'none' }}
            >
                <h2 className="text-xl font-semibold mb-4">Your Properties</h2>
                <div className="flex flex-col gap-7">
                    {loading ? (
                        Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
                    ) : userProperties.length > 0 ? (
                        userProperties.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between gap-2 rounded-md"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                            >
                                <div className="flex gap-4">
                                    <img src={item.images[0]} className="w-16 h-16 object-cover rounded-md" />
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-sm font-semibold text-gray-900 uppercase">{item.title}</h2>
                                        <span className="text-xs opacity-60">{item.location}</span>
                                    </div>
                                </div>
                                <span className="text-blue-500 tracking-wide">
                                    {item.price > 10000 ? "$10000+" : `$${item.price}`}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No favorite properties found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserItems;

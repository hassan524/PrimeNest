"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/context";
import axios from "axios";
import { apiRoute } from "../../utils/apiRoutes";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const Cards = () => {
    const { Properties, SetProperties, SetOriginolProperties } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [Favorites, setFavorites] = useState<string[]>([]);
      const { data: session } = useSession();

    useEffect(() => {
        axios
            .get(apiRoute.GetProperty)
            .then((res) => {
                SetProperties(res.data.properties);
                SetOriginolProperties(res.data.properties);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const toggleFavorite = async (propertyId: string) => {
        try {
            const res = await axios.post(apiRoute.AddToFav, { id: propertyId }, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: session?.user?.token,
                      },
                }
            );
            
            setFavorites((prev) =>
                prev.includes(propertyId)
                    ? prev.filter((id) => id !== propertyId)
                    : [...prev, propertyId]
            );

            console.log(res.data.message); 
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
                ? [...Array(4)].map((_, index) => (
                    <div key={index} className="border p-4 rounded-md shadow-md">
                        <Skeleton className="w-full h-40 rounded-md" />
                        <Skeleton className="h-5 w-3/4 mt-3" />
                        <Skeleton className="h-4 w-5/6 mt-2" />
                        <Skeleton className="h-4 w-1/2 mt-2" />
                    </div>
                ))
                : Properties?.map((property: any) => (
                    <div key={property._id} className="border border-gray-200 rounded-lg overflow-hidden transition-all">
                        <div className="relative w-full h-60 rounded-t-md overflow-hidden">
                            <img
                                src={property.images[0]}
                                alt={property.title}
                                className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black opacity-20"></div>

                            <span className={`absolute top-3 left-3 py-1 px-3 text-xs font-semibold rounded-md text-white ${
                                property.propertyType === "For Rent" ? "bg-red-500" : "bg-blue-500"
                            }`}>
                                {property.propertyType}
                            </span>

                            <button
                                onClick={() => toggleFavorite(property._id)}
                                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md shadow-md"
                            >
                                <i className={`bi ${Favorites.includes(property._id) ? "bi-heart-fill text-red-500" : "bi-heart text-gray-400"} text-lg`}></i>
                            </button>
                        </div>

                        <div className="flex flex-col gap-6 p-5 bg-white">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-3 text-gray-600 text-sm">
                                    <span className="flex items-center gap-1 px-5 py-1 border rounded text-xs">
                                        <i className="bi bi-house-door"></i>
                                        {property.bedrooms} Beds
                                    </span>
                                    <span className="flex items-center gap-1 px-5 py-1 border rounded text-xs">
                                        <i className="fas fa-bath"></i>
                                        {property.bathrooms} Baths
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">${property.price}</h2>
                            </div>

                            <div className="flex items-center gap-2 text-sm opacity-[0.6]">
                                <i className="bi bi-geo-alt-fill"></i>
                                <span>{property.location}</span>
                            </div>

                            <Button className=" text-white w-full flex items-center justify-center gap-2 py-2 rounded-lg shadow-md transition-all">
                                <span>View Details</span>
                                <i className="bi bi-arrow-right-short text-lg"></i>
                            </Button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Cards;
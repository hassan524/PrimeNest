"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/context";
import axios from "axios";
import { apiRoute } from "../../utils/apiRoutes";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Property } from "@/context/context";

const PropertyList = () => {
    const { Properties, SetProperties, SetOriginolProperties } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<string[]>([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        axios.get(apiRoute.GetProperty)
            .then(res => {
                console.log(Properties)
                SetProperties(res.data.properties);
                SetOriginolProperties(res.data.properties);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (session?.user?.token) {
            axios.get(apiRoute.GetProps, {
                headers: {
                    Authorization: session?.user?.token,
                }
            }).then(res => {
                const favIds = res.data.favorites.map((fav: Property) => fav._id.toString());
                setFavorites(favIds);
            }).catch(err => console.error("Error fetching favorites", err));
        }
    }, [session]);

    const handleFavorite = async (id: string) => {
        try {
            const res = await axios.post(apiRoute.AddToFav, { id }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: session?.user?.token,
                },
            });
            setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
            toast.success(res.data.message);
        } catch (error) {
            console.error("Error updating favorites", error);
            toast.error("Something went wrong");
        }
    };
    return (
        <div className="flex flex-col gap-[4rem] lg:px-0 mt-[2rem]">
            {loading
                ? [...Array(4)].map((_, index) => (
                    <div key={index} className="w-full h-[400px] flex flex-col lg:flex-row items-center gap-6 border rounded-md shadow-md p-6">
                        <Skeleton className="w-full lg:w-1/2 h-64 rounded-md" />
                        <div className="w-full lg:w-1/2 space-y-4">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))
                : Properties?.map((property) => (
                    <div key={property._id} className="w-full relative flex flex-col lg:flex-row rounded-lg sm:shadow-sm py-2 overflow-hidden gap-4">
                        <div className="flex flex-col sm:flex-row sm:gap-9 gap-4 w-full">

                            <div className="sm:w-80 relative w-full h-48">
                                <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover rounded-md" />

                                <button
                                    className="absolute top-2 left-2 p-2 rounded-full transition"
                                    onClick={() => handleFavorite(property._id)}
                                >
                                    <Heart
                                        className={favorites.includes(property._id.toString()) ? "text-red-500 fill-red-500" : "text-white"}
                                        size={24}
                                    />

                                </button>
                            </div>

                            <div className="w-full flex flex-col gap-6">
                                <div className="flex justify-between items-start gap-3">
                                    <div className="flex flex-col">
                                        <p className="sm:text-2xl text-xl font-semibold capitalize tracking-wider text-black">{property.title}</p>
                                        <p className="text-gray-400 capitalize text-sm mt-2">{property.location}</p>
                                    </div>
                                    <h2 className="sm:text-3xl sm:hidden block text-2xl text-gray-800">${property.price.toLocaleString()}</h2>
                                </div>
                                <p className="capitalize sm:leading-loose leading-relaxed text-gray-500 tracking-wider break-words text-wrap">
                                    {property.description.length > 100 ? `${property.description.slice(0, 100)}...` : property.description}
                                </p>
                                <div className="flex gap-4 text-sm text-gray-600">
                                    <span className="flex items-center border px-4 py-1 gap-2">
                                        <i className="bi bi-house-door"></i> {property.bedrooms} Beds
                                    </span>
                                    <span className="flex items-center border px-4 py-1 gap-2">
                                        <i className="fas fa-bath"></i> {property.bathrooms} Baths
                                    </span>
                                </div>
                                <Button className="w-28 text-white py-2 rounded-md" onClick={() => router.push(`/property/${property._id}`)}>View Details</Button>
                            </div>
                            <div className="lg:absolute sm:block hidden lg:right-6 lg:top-6 sm:mt-0 mt-4 text-right">
                                <h2 className="sm:text-[2.5rem] text-2xl text-gray-800">${property.price.toLocaleString()}</h2>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PropertyList;

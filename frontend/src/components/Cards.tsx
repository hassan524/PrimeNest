"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/context";
import axios from "axios";
import { apiRoute } from "../../utils/apiRoutes";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const PropertyList = () => {
    const { Properties, SetProperties, SetOriginolProperties } = useAppContext();
    const [loading, setLoading] = useState(true);
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

    return (
        <div className="flex flex-col gap-[4rem] px-4 lg:px-0 mt-[2rem]">
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
                    <div 
                        key={property._id} 
                        className="w-full relative flex flex-col lg:flex-row rounded-lg overflow-hidden gap-4"
                    >
                        <div className="flex flex-col sm:flex-row sm:gap-9 gap-4 w-full">
                            {/* Image */}
                            <div className="sm:w-80 w-full h-48">
                                <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                            
                            {/* Details Section */}
                            <div className="w-full flex flex-col">
                                <div className="flex justify-between gap-2">
                                <p className="sm:text-2xl text-xl font-semibold capitalize tracking-wider text-gray-700">
                                    {property.title}
                                </p>
                                <h2 className="sm:text-3xl sm:hidden block text-2xl font-bold text-gray-800">
                                    ${property.price.toLocaleString()}
                                </h2>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <i className="bi bi-geo-alt"></i>
                                    <p className="text-gray-500">{property.location}</p>
                                </div>
                                <p className="mt-3 capitalize text-gray-500 tracking-wider break-words text-wrap">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae magni modi ex totam alias sapiente inventore. Nihil est culpa pariatur.
                                </p>
                                <div className="flex gap-4 text-sm text-gray-600 mt-4">
                                    <span className="flex items-center border px-4 py-1 gap-2">
                                        <i className="bi bi-house-door"></i> {property.bedrooms} Beds
                                    </span>
                                    <span className="flex items-center border px-4 py-1 gap-2">
                                        <i className="fas fa-bath"></i> {property.bathrooms} Baths
                                    </span>
                                </div>
                                <Button className="mt-4 w-28 text-white py-2 rounded-md">View Details</Button>
                            </div>

                            {/* Price Section */}
                            <div className="lg:absolute sm:block hidden lg:right-6 lg:top-6 sm:mt-0 mt-4 text-right">
                                <h2 className="sm:text-3xl text-2xl font-bold text-gray-800">
                                    ${property.price.toLocaleString()}
                                </h2>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PropertyList;

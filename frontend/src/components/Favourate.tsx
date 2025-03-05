"use client";

import React from "react";

const Favourate = () => {
    // Dummy data for favorite properties
    const favorites = [

        {
            id: 2,
            image: "/banner.jpg", // Replace with your actual image path
            name: "Cozy Bungalow",
            location: "Austin, TX",
            features: ["2 Bedroom", "1 Washroom"],
            price: "$250,000",
        },

    ];

    return (
        <div className="bg-white sm:p-6 p-4 rounded shadow flex flex-col gap-[2rem]">
            {/* Section Title */}
            <h2 className="text-2xl font-bold text-center mb-4">Favourite Properties ⭐</h2>

            <div className="divide-y divide-gray-200 flex flex-col gap-[.3rem]">
                {favorites.map((property) => (
                    <>
                        <div
                            key={property.id}
                            className="flex sm:items-center py-4"
                        >
                            {/* Property Image */}
                            <img
                                src={property.image}
                                alt={property.name}
                                className="sm:w-20 sm:h-20 w-14 h-14 object-cover rounded"
                            />
                            {/* Details */}
                            <div className="ml-4 flex-1 flex flex-col gap-2">
                                <h3 className="sm:text-lg text-sm">{property.name}</h3>
                                <p className="text-gray-500 text-sm">{property.location}</p>
                                <div className="sm:flex hidden space-x-2 mt-1">
                                    {property.features.map((feature, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* Price */}
                            <div className="sm:text-xl text-sm font-bold sm:text-blue-600 text-gra-900">
                                +{property.price}
                            </div>

                        </div>
                        <div className="flex sm:hidden space-x-2 mt-1">
                            {property.features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-700 text-xs py-1 px-2 rounded"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default Favourate;

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiRoute } from "../../../../utils/apiRoutes";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const PropertyDetails = () => {

    interface Property {
        id: string;
        title: string;
        price: number;
        location: string;
        bedrooms: number;
        bathrooms: number;
        propertyType: string;
        description: string;
        images: string[];
        tags: string[];
      }

    const params = useParams();
    const searchParams = useSearchParams();
    const [property, setProperty] = useState<Property | null>(null);

    const propertyID = params?.id;
    const userID = searchParams.get("userID");

    useEffect(() => {
        console.log(propertyID || 'didnt get d')
        if (!userID || !propertyID) return;

        axios
            .post(apiRoute.GetUserUniqueProp, { userID, propertyID })
            .then((response) => {
                setProperty(response.data.property);
            })
            .catch((error) => {
                console.error("Error fetching property:", error);
            });
    }, [userID, propertyID]);

    if (!property) {
        return <p className="text-center text-gray-600">Loading property details...</p>;
    }

    const steps = ["Pending", "Paired", "Confirmed"];

    return (
        <div className="min-h-screen bg-[#fafafb] sm:py-10">
            <div className="max-w-[90rem] flex sm:gap-[4rem] gap-[3rem] flex-col mx-auto sm:px-6">
                {/* Image Carousel Section */}
                {property.images && property.images.length > 0 && (
                    <Carousel className="w-full sm:rounded-2xl overflow-hidden">
                        <CarouselContent>
                            {property.images.map((image: string, index: number) => (
                                <CarouselItem key={index}>
                                    <Card>
                                        <CardContent className="flex aspect-video items-center justify-center p-0">
                                            <img
                                                src={image}
                                                alt={`Property Image ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                )}

                {/* Stepper */}
                <Box sx={{ width: "100%" }}>
                    <Stepper
                        activeStep={1}
                        alternativeLabel
                        sx={{
                            "& .MuiStepConnector-line": {
                                borderTopWidth: 2,
                                borderColor: "black",
                            },
                            "& .MuiStepIcon-root": { fontSize: "2rem", color: "black" },
                            "& .MuiStepLabel-label": { fontWeight: "bold", fontSize: "1rem" },
                        }}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {/* Property Info */}
                <div className="flex flex-col sm:gap-[3rem] gap-[2rem] sm:px-0 px-4 sm:pb-0 pb-[2.5rem]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-10">
                        {/* Left Section */}
                        <div className="flex flex-col gap-6">
                            {/* Location */}
                            <div className="flex gap-2 items-center text-gray-500">
                                <i className="fa fa-map-marker-alt text-xl"></i>
                                <p className="text-lg">{property.location}</p>
                            </div>

                            {/* Title */}
                            <h1 className="text-[2rem] md:text-[3rem] font-semibold text-black leading-tight">
                                {property.title}
                            </h1>

                            <div className="tracking-wider rounded-2xl md:hidden flex items-center md:items-start">
                                <span className="text-4xl md:text-5xl font-bold text-black">
                                    ${property.price.toLocaleString()}
                                </span>
                            </div>

                            {/* Property Details */}
                            <div className="flex flex-wrap gap-3 text-gray-700">
                                {[
                                    { label: "Bedrooms", value: property.bedrooms },
                                    { label: "Bathrooms", value: property.bathrooms },
                                    { label: "Type", value: property.propertyType },
                                ].map((detail, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 border rounded-lg text-sm font-medium flex items-center gap-2"
                                    >
                                        <span className="text-gray-600">{detail.label}:</span>
                                        <span className="font-semibold">{detail.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price (Right Side on Desktop, Below Title on Mobile) */}
                        <div className="tracking-wider rounded-2xl md:flex hidden items-center md:items-start bg-white w-96 py-7 px-7">
                            <span className="text-4xl md:text-5xl font-bold text-black">
                                ${property.price.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-[2rem]">
                        <h2 className="text-3xl font-semibold">About the property</h2>

                        {/* Description */}
                        <div className="sm:pe-14 flex flex-col gap-3">
                            <p className="text-gray-600 sm:text-lg text-md sm:leading-relaxed leading-loose">
                                {property.description}
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-3 text-gray-700">
                            {property.tags.map((tag: string, index: number) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 border rounded-lg text-sm font-medium flex items-center gap-2"
                                >
                                    <span className="font-semibold">{tag}</span>
                                </div>
                            ))}
                        </div>

                        {/* Contact Button */}
                        <Button className="px-6 py-3 text-lg rounded-lg w-52 bg-blue-800 transition duration-200 text-white shadow-md">
                            Contact Owner
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;

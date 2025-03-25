"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiRoute } from "../../../../utils/apiRoutes";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

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
  const [showFullDesc, setShowFullDesc] = useState(false);

  const propertyID = params?.id;
  const userID = searchParams.get("userID");

  useEffect(() => {
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

  return (
    <div className="min-h-screen flex sm:py-12 py-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 sm:gap-12 gap-7 sm:px-12 px-5">
        {property.images?.length > 0 && (
          <div className="relative" data-aos="fade-down" data-aos-duration="1000">
            <Carousel className="rounded-xl">
              <CarouselContent>
                {property.images.map((image: string, index: number) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="relative flex items-center justify-center p-0">
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
              <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full" />
              <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full" />
            </Carousel>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <div>
            <div className="sm:text-[3.5rem] text-[2rem] font-bold text-black" data-aos="fade-down" data-aos-duration="1000">
              ${property.price.toLocaleString()}
            </div>
            <h1 className="text-2xl sm:mt-0 mt-3 uppercase font-semibold text-black leading-tight" data-aos="fade-down" data-aos-duration="1100">
              {property.title}
            </h1>
            <div className="flex mt-5 flex-wrap gap-5 text-gray-700" data-aos="fade-down" data-aos-duration="1200">
              {[
                { label: "Bed", value: property.bedrooms, icon: "fa-bed" },
                { label: "Bath", value: property.bathrooms, icon: "fa-bath" },
                { value: property.propertyType },
              ].map((detail, index) => (
                <div
                  key={index}
                  className={`rounded-lg text-sm font-medium flex items-center gap-2 ${
                    !detail.label ? (detail.value === "For Sale" ? "text-green-600" : "text-red-600") : ""
                  }`}
                >
                  {detail.icon && <i className={`fa-solid ${detail.icon}`}></i>}
                  <span className="font-semibold">{detail.value}</span>
                  {detail.label && <span className="text-gray-600">{detail.label}</span>}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-7">
            <h2 className="text-2xl font-semibold underline" data-aos="fade-down" data-aos-duration="1300">
              Property Details
            </h2>
            <p className="text-gray-600 leading-loose sm:text-sm text-xs" data-aos="fade-down" data-aos-duration="1400">
              <span className="hidden sm:inline">{property.description}</span>
              <span className="sm:hidden">
                {showFullDesc ? property.description : `${property.description.slice(0, 300)}`}
                {property.description.length > 45 && (
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="font-bold underline ml-2"
                  >
                    {showFullDesc ? "Show Less" : "..."}
                  </button>
                )}
              </span>
            </p>

            <div className="flex flex-wrap gap-3" data-aos="fade-down" data-aos-duration="1500">
              {property.tags.map((tag, index) => (
                <div key={index} className="px-4 py-2 border capitalize rounded-lg text-sm font-medium">
                  {tag}
                </div>
              ))}
            </div>

            <Button className="px-6 py-6 text-lg rounded-lg text-white shadow-md w-full md:w-52" data-aos="fade-down" data-aos-duration="1600">
              Contact Owner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

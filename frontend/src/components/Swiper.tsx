"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from '@/context/context';
import { Property } from "@/context/context";
import { useRouter } from "next/navigation";


const SwiperCarousel = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const { Properties } = useAppContext();
    const router = useRouter();

    const propertiesArray = Array.isArray(Properties) ? Properties : [];
    const displayedProperties = [...propertiesArray.slice(0, 5)];
    while (displayedProperties.length < 5) {
        displayedProperties.push({
            _id: "",
            title: "No Property Available",
            description: "No description available",
            price: 0,
            location: "Unknown",
            tags: [],
            images: [],
            bedrooms: 0,
            bathrooms: 0,
            userId: "",
            propertyType: "N/A"
        });
    }

    const handleproperty = (property: Property) => {
        if (!property?._id || !property?.userId) {
            console.error("Property ID or User ID is missing!");
            return;
        }

        router.push(`/property/${property._id}?userID=${property.userId}`);
    };

    return (
        <div className="w-full flex flex-col gap-[2rem] justify-center md:ps-[5rem] px-[1rem]">
            <div className="flex sm:text-start text-center flex-col gap-[.5rem] text-gray-900" data-aos="fade-up" data-aos-duration="1000">
                <span className="uppercase text-blue-900 underline">latest project</span>
                <h1 className="text-4xl font-semibold">What you looking for</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illo perspiciatis suscipit numquam quam porro.</p>
            </div>

            <Swiper
                modules={[Navigation]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                centeredSlides={true}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10, centeredSlides: true },
                    640: { slidesPerView: 2, spaceBetween: 60, centeredSlides: false },
                    826: { slidesPerView: 2.7, spaceBetween: 100, centeredSlides: false },
                    940: { slidesPerView: 2.7, spaceBetween: 100, centeredSlides: false },
                    1086: { slidesPerView: 3, spaceBetween: 0, centeredSlides: false },
                    1280: { slidesPerView: 4, spaceBetween: 100, centeredSlides: false },
                }}
                className="w-full"
            >
                {displayedProperties.map((property, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <div className={`custom-sm:w-80 w-full h-64 flex items-center justify-center rounded-lg shadow-xl mx-auto cursor-pointer 
                            ${property ? "bg-gray-200" : "bg-slate-200"}`} data-aos="fade-up" data-aos-duration="1000" onClick={() => handleproperty(property)}>
                            {property && property.images?.length > 0 ? (
                                <img src={property.images[0]} alt="Property" className="w-full h-full object-cover rounded-lg" />
                            ) : <span className="text-gray-600 text-xl">{index}</span>}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex sm:justify-end justify-center gap-4" data-aos="fade-up" data-aos-duration="1000">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="w-7 h-7 bg-gray-200 text-gray-900 flex items-center justify-center rounded-full"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="w-7 h-7 bg-gray-200 text-gray-900 flex items-center justify-center rounded-full"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default SwiperCarousel;

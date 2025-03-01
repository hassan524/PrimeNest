"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper"; // Import SwiperType
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons

const SwiperCarousel = () => {
    const swiperRef = useRef<SwiperType | null>(null); // Correct type

    return (
        <div className="w-full flex flex-col gap-[2rem] justify-center md:ps-[5rem] px-[1rem]">
            <div className="flex sm:text-start text-center flex-col gap-[.5rem] text-gray-900">
                <span className="uppercase text-blue-900 underline">latest project</span>
                <h1 className="text-4xl font-semibold">What you looking for</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illo perspiciatis suscipit numquam quam porro.</p>
            </div>

            <Swiper
                modules={[Navigation]}
                onSwiper={(swiper) => (swiperRef.current = swiper)} // Now correctly typed
                centeredSlides={true}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10, centeredSlides: true },
                    640: { slidesPerView: 2, spaceBetween: 60, centeredSlides: false },
                    826: { slidesPerView: 2.7, spaceBetween: 200, centeredSlides: false },
                    940: { slidesPerView: 2.7, spaceBetween: 150, centeredSlides: false },
                    1086: { slidesPerView: 3, spaceBetween: 50, centeredSlides: false },
                    1280: { slidesPerView: 4, spaceBetween: 150, centeredSlides: false },
                }}
                className="w-full"
            >
                {[1, 2, 3, 4, 5].map((num) => (
                    <SwiperSlide key={num} className="flex justify-center">
                        <div className="bg-gray-200 custom-sm:w-80 w-full h-64 flex items-center justify-center rounded-lg shadow-xl mx-auto">
                            Slide {num}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons BELOW Swiper */}
            <div className="flex sm:justify-end justify-center gap-4">
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

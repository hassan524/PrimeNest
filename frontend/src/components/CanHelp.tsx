'use client'

import React from 'react'

const CanHelp = () => {
    return (
        <div className='flex flex-col gap-[3rem] justify-center md:px-[5rem] px-[1rem] text-gray-900'>
            <div className="flex flex-col gap-[2.8rem] text-gray-900 text-center">
                <h1 className='text-5xl font-semibold leading-[2.9rem]' data-aos="fade-up" data-aos-duration="1000">- See How Peaky Can Help -</h1>
                <p className='tracking-wide' data-aos="fade-up" data-aos-duration="1000">Discover the Power of Peaky. Unveiling How Peaky Can Simplify
                    and Enhance Your Experience.</p>
            </div>

            <div className="flex items-center gap-[4rem] justify-center flex-wrap" data-aos="fade-up" data-aos-duration="1000">
                {/* Buy a House */}
                <div className="w-80 h-[40vh] bg-[#F6F5F2] flex flex-col gap-[5px] p-4 text-center shadow-md rounded-lg">
                    <i className="bi bi-house-check text-[4rem] text-blue-600"></i>
                    <h1 className='text-xl font-semibold'>Buy a House</h1>
                    <p className='text-xs text-gray-500'>Find your dream home with ease and confidence.</p>
                </div>
                
                {/* For Rent */}
                <div className="w-80 h-[40vh] bg-[#F8FAFC] flex flex-col gap-[5px] p-4 text-center shadow-md rounded-lg">
                    <i className="bi bi-building text-[4rem] text-green-600"></i>
                    <h1 className='text-xl font-semibold'>For Rent</h1>
                    <p className='text-xs text-gray-500'>Explore rental options that fit your budget and lifestyle.</p>
                </div>
                
                {/* See Home Prices */}
                <div className="w-80 h-[40vh] bg-[#FFF7F1] flex flex-col gap-[5px] p-4 text-center shadow-md rounded-lg">
                    <i className="bi bi-cash-stack text-[4rem] text-red-600"></i>
                    <h1 className='text-xl font-semibold'>See Home Prices</h1>
                    <p className='text-xs text-gray-500'>Get insights into current market trends and home values.</p>
                </div>
            </div>
        </div>
    )
}

export default CanHelp

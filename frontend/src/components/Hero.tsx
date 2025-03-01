'use client'

import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
    return (
        <div className='h-[calc(100vh-11vh)] min-h-[calc(100vh-11vh)] flex items-center justify-between overflow-hidden'>

            {/* Left Side - Text Content */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left lg:ps-[2rem] md:ps-[2rem] md:px-0 px-[0.8rem] md:gap-5 gap-[2.8rem] py-5">

                <h1 className="sm:text-[3rem] text-[2.9rem] sm:leading-[3.3rem] leading-[2.9rem] lg:text-[4rem] font-bold text-gray-800">
                    Discover Your Home’s True Worth
                </h1>
                <p className="text-gray-600 text-[1.2rem] leading-[2.2rem]">
                    Unlock the hidden value of your property with our advanced real estate insights.
                    Whether you're buying, selling, or investing, we provide the tools and expertise to
                    help you make the best decision for your future.
                </p>
                <Button className='py-[1.5rem] px-[3rem] md:mt-0'>DISCOVER NOW</Button>
            </div>

            {/* Right Side - Image (Hidden on Mobile, Stays Same on Desktop) */}
            <div className="hidden md:block h-full w-1/2 relative">
                <div className="absolute w-full bottom-0 right-[-20px]">
                    <img className='z-10' src="hero.jpg" alt="" />
                </div>
            </div>

        </div>
    )
}

export default Hero  

'use client'

import React from 'react'

const CanHelp = () => {
    return (

        <div className='flex flex-col gap-[3rem] justify-center md:px-[5rem] px-[1rem]'>
            <div className="flex flex-col gap-[2.8rem] text-gray-900 text-center">
                <h1 className='text-5xl font-semibold leading-[2.9rem]'>- See How peaky we can help -</h1>
                <p className='tracking-wide'>Discover the Power of Peaky. Unveiling How Can Peaky Simplify
                    and Enhance Your Experience</p>
            </div>

            <div className="flex items-center  gap-[4rem]  justify-center flex-wrap">
                <div className="w-80 h-[40vh] bg-[#F6F5F2]"></div>
                <div className="w-80 h-[40vh] bg-[#F8FAFC]"></div>
                <div className="w-80 h-[40vh] bg-[#FFF7F1]"></div>
                <div className="w-80 h-[40vh] bg-[#FFF8F3]"></div>
            </div>
        </div>

    )
}

export default CanHelp
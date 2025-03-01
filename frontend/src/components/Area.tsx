'use client'

import React from 'react'

const Area = () => {
    return (
        <div className='flex flex-col gap-[3rem] justify-center md:px-[5rem] px-[1rem]'>
            <div className="flex flex-col gap-[2.8rem] text-gray-900 text-center">
                <h1 className='text-5xl font-semibold leading-[2.9rem]'>- What's happening in your area -</h1>
                <p className='tracking-wide'>If you are looking for a new home. an invesmont property to explore the area we will help your
                    find you exactly what u looking for
                </p>
            </div>

            <div className="flex items-center  gap-[4rem] bg-[#F8FAFC] justify-center flex-wrap">
                <div className="w-80 h-[40vh] bg-[#F6F5F2]"></div>
                <div className="w-80 h-[40vh] bg-[#F8FAFC]"></div>
                <div className="w-80 h-[40vh] bg-[#FFF7F1]"></div>
            </div>
        </div>
    )
}

export default Area
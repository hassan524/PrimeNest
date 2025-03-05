'use client'

import React from 'react'
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Area = () => {

    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <div className='flex flex-col gap-[3rem] justify-center md:px-[5rem] px-[1rem] text-gray-900'>
            <div className="flex flex-col gap-[2.8rem] text-gray-900 text-center">
                <h1 className='text-5xl font-semibold leading-[2.9rem]'>- What's happening in your area -</h1>
                <p className='tracking-wide'>If you are looking for a new home. an invesmont property to explore the area we will help your
                    find you exactly what u looking for
                </p>
            </div>

            <div className="flex items-center  gap-[4rem] bg-[#F8FAFC] justify-center flex-wrap">

                <div className="w-80 h-[40vh] flex flex-col gap-5 justify-center items-center">
                    <div ref={ref} className="text-5xl font-bold">
                        {inView ? <CountUp start={0} end={231} duration={2.5} /> : 0}
                    </div>
                    <span className='text-gray-500'>Homes for sale</span>
                </div>
                <div className="w-80 h-[40vh] flex flex-col gap-5 justify-center items-center">
                    <div ref={ref} className="text-5xl font-bold">
                        {inView ? <CountUp start={0} end={231} duration={2.5} /> : 0}
                    </div>
                    <span className='text-gray-500'>Homes for rent</span>
                </div>
                <div className="w-80 h-[40vh] flex flex-col gap-5 justify-center items-center">
                    <div ref={ref} className="text-5xl font-bold">
                        {inView ? <CountUp start={0} end={231} duration={2.5} /> : 0}
                    </div>
                    <span className='text-gray-500'>Real state agents</span>
                </div>
            </div>
        </div>
    )
}

export default Area
'use client'

import React from 'react'
import { Button } from './ui/button'

const Banner = () => {
    return (
        <div className="relative custom-sm:h-[70vh] h-[65vh] flex items-center justify-center bg-slate-900 mb-10 sm:py-10 sm:px-10 px-5">
            <div className="absolute lg:right-[50%] lg:top-[50%] top-[70%] translate-y-[-50%] bg-white z-50 sm:p-4 p-2 custom-sm:w-96 w-[80vw] flex flex-col gap-4 rounded-xl">
                <h1 className='font-semibold custom-sm:text-2xl text-xl'>Expert agents provide
                    expert result</h1>
                    <p className='custom-sm:text-md text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, enim.</p>
                    <Button>Connect with the agents today</Button>
                    
            </div>
            <div className="sm:w-[35rem] w-[60rem] z-40 relative lg:left-[10%] sm:top-0 top-[-50px]">
                <img src="banner.jpg" className='rounded-xl' alt="" />
            </div>
        </div>
    )
}

export default Banner
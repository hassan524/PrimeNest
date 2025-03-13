'use client'

import React from 'react'

const Footer = () => {
    return (
        <div className="border-t flex flex-col justify-between gap-[2rem] min-h-[60vh] bg-slate-50 border-slate-100 py-8 px-[2rem] md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-30 lg:gap-20">
                {/* Logo Section */}
                <div className="flex flex-col items-start">
                    <div className="Logo flex items-center cursor-pointer">
                        <div className="w-9 h-9">
                            <img src="logo.png" alt="Logo" />
                        </div>
                        <span className='text-lg font-semibold ml-2'>PrimeNest</span>
                    </div>
                </div>
                
                {/* For Sale Section */}
                <div className="flex flex-col gap-4">
                    <h1 className="font-semibold text-lg">For Sale</h1>
                    <ul className='flex flex-col text-xl gap-4'>
                        <li><a href="#" className="hover:underline">Homes</a></li>
                        <li><a href="#" className="hover:underline">Properties</a></li>
                        <li><a href="#" className="hover:underline">Land</a></li>
                        <li><a href="#" className="hover:underline">Commercial</a></li>
                    </ul>
                </div>
                
                {/* For Rent Section */}
                <div className="flex flex-col gap-4">
                    <h1 className="font-semibold text-lg">For Rent</h1>
                    <ul className='flex flex-col text-xl gap-4'>
                        <li><a href="#" className="hover:underline">Apartments</a></li>
                        <li><a href="#" className="hover:underline">Houses</a></li>
                        <li><a href="#" className="hover:underline">Office Spaces</a></li>
                        <li><a href="#" className="hover:underline">Retail</a></li>
                    </ul>
                </div>
                
                {/* Resources Section */}
                <div className="flex flex-col gap-4">
                    <h1 className="font-semibold text-lg">Resources</h1>
                    <ul className='flex flex-col text-xl gap-4'>
                        <li><a href="#" className="hover:underline">Blog</a></li>
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                        <li><a href="#" className="hover:underline">Guides</a></li>
                        <li><a href="#" className="hover:underline">Support</a></li>
                    </ul>
                </div>
            </div>
            
            {/* Bottom Section */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-center lg:text-left">
                <p className="text-sm">&copy; 2025 PrimeNest. All Rights Reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="text-xl hover:text-gray-600"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="text-xl hover:text-gray-600"><i className="bi bi-github"></i></a>
                </div>
            </div>
        </div>
    )
}

export default Footer

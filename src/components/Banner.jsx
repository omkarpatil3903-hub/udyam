import React, { useState, useEffect } from 'react';
import industry from "../assets/industry.jpg"
import office from "../assets/office.jpg"
import meeting from "../assets/meeting.jpg"
const bannerImages = [

    industry,
    meeting
];

export default function Banner() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 5000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[250px] md:h-[320px] overflow-hidden bg-gray-900 group">
            {/* Background Images with Fade Transition */}
            {bannerImages.map((image, index) => (
                <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <img
                        src={image}
                        alt={`Business Background ${index + 1}`}
                        className="w-full h-full object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-[10s]"
                    />
                    {/* Dark Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            ))}

            {/* Red/Orange Overlay Shape - Refined Gradient & Shape */}
            <div
                className="absolute top-0 left-0 h-full w-auto max-w-[90%] md:max-w-fit pr-24 bg-gradient-to-r from-red-600/90 to-orange-500/80 flex items-center z-10 backdrop-blur-[2px]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
            >
                <div className="container mx-auto px-4 md:px-8 pl-4 md:pl-16 w-full">
                    {/* Text Content directly on Banner */}
                    <div className="max-w-3xl text-white space-y-3 animate-fade-in-up">

                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold uppercase leading-none tracking-tight drop-shadow-lg transform transition-all duration-500 hover:translate-x-2">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-yellow-200">Udyam</span> Registration <br /> Portal
                        </h2>

                        <div className="h-1.5 w-24 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full shadow-md"></div>

                        {/* <p className="text-lg md:text-3xl font-bold flex items-center space-x-3 drop-shadow-md text-gray-100 tracking-wide">
                            <span className="hover:text-orange-200 transition-colors duration-300 cursor-default">Online Process</span>
                            <span className="text-orange-300 text-xl">|</span>
                            <span className="hover:text-orange-200 transition-colors duration-300 cursor-default">100% Secure</span>
                            <span className="text-orange-300 text-xl">|</span>
                            <span className="hover:text-orange-200 transition-colors duration-300 cursor-default">Fast Service</span>
                        </p> */}

                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';

export default function Banner() {
    return (
        <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden bg-gray-900">
            {/* Background Image (Right Side prominent) */}
            <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                alt="Business Background"
                className="absolute inset-0 w-full h-full object-cover object-right"
            />

            {/* Red/Orange Overlay Shape */}
            <div
                className="absolute top-0 left-0 h-full w-full md:w-[75%] lg:w-[65%] bg-gradient-to-r from-red-600 to-orange-500 flex items-center"
                style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
            >
                <div className="container mx-auto px-4 md:px-8 pl-4 md:pl-16 w-full">
                    <div className="max-w-2xl text-white space-y-2">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase leading-none tracking-wide drop-shadow-md">
                            Udyam Registration <br /> Portal
                        </h2>
                        <div className="h-1 w-24 bg-white/50 mb-4 rounded"></div>
                        <p className="text-xl md:text-2xl font-semibold flex items-center space-x-3 drop-shadow text-orange-100">
                            <span>Online Process</span>
                            <span className="text-orange-300">|</span>
                            <span>100% Secure</span>
                            <span className="text-orange-300">|</span>
                            <span>Fast Service</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

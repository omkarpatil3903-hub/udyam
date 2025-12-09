import React, { useState } from 'react';
import UdyamLogo from '../assets/UDYAMlogo.webp';
import SwachhLogo from '../assets/swachh1111.webp';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="font-sans bg-white shadow-sm">
            {/* Top Banner Area */}
            <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">

                {/* Left: Udyam Logo (Real) */}
                <div className="flex-shrink-0">
                    <div className="flex flex-col items-center">
                        <img src={UdyamLogo} alt="Udyam Registration Logo" className="w-24 md:w-28" />
                    </div>
                </div>

                {/* Center: Info Stack */}
                <div className="flex-grow flex flex-col items-center justify-center px-4">
                    <h1 className="text-blue-900 font-extrabold text-lg md:text-xl lg:text-2xl uppercase leading-tight">
                        UDYAM REGISTRATION FOR MICRO, SMALL & MEDIUM ENTERPRISES
                    </h1>
                    <h2 className="text-blue-900 font-bold text-lg md:text-xl mt-1">
                        सूक्ष्म, लघु और मध्यम उद्यमों के लिए उद्यम पंजीकरण
                    </h2>
                    <p className="text-black font-bold text-xs md:text-sm mt-1">
                        (AN ISO CERTIFIED PRIVATE CONSULTANCY ORGANISATION)
                    </p>
                    <div className="text-gray-700 text-lg md:text-xl mt-2 font-normal">
                        Udyam Registration Portal / उद्यम पंजीकरण पोर्टल
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <span className="text-pink-500 font-bold transform -rotate-12">📞</span>
                        <span className="text-blue-900 font-extrabold text-xl">HELP-LINE: +91 - 9355564608</span>
                    </div>
                </div>

                {/* Right: Swachh Bharat Logo (Real) */}
                <div className="flex-shrink-0 hidden md:block">
                    {/* Swachh Bharat Image */}
                    <img src={SwachhLogo} alt="Swachh Bharat" className="w-32 md:w-40" />
                </div>

            </div>

            {/* Navigation Bar */}
            <div className="bg-blue-900 text-white shadow-md">
                <div className="container mx-auto">
                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex justify-between items-center p-4">
                        <span className="font-bold">Menu</span>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row md:justify-center md:space-x-8 text-sm font-medium py-3 px-4 transition-all duration-300`}>
                        <a href="#" className="block py-2 md:py-0 hover:text-orange-400 transition border-b md:border-none border-blue-800">Udyam Registration</a>
                        <a href="#" className="block py-2 md:py-0 hover:text-orange-400 transition border-b md:border-none border-blue-800">Udyam Re-Registration</a>
                        <a href="#" className="block py-2 md:py-0 hover:text-orange-400 transition border-b md:border-none border-blue-800">Update Certificate</a>
                        <a href="#" className="block py-2 md:py-0 hover:text-orange-400 transition border-b md:border-none border-blue-800">Print Certificate</a>
                        <a href="#" className="block py-2 md:py-0 hover:text-orange-400 transition border-b md:border-none border-blue-800">Sample Certificate</a>
                        <a href="#" className="block py-2 md:py-0 hover:text-orange-400 transition">Contact Us</a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

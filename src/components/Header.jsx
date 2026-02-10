import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SwachhLogo from "../assets/swachh1111.webp";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Default active tab to 'Udyam Registration' or based on initial path
  const [activeTab, setActiveTab] = useState("Udyam Registration");

  // Loading State for simulate navigation
  const [isLoading, setIsLoading] = useState(false);

  const navLinks = [
    { path: "/", label: "Udyam Registration" },
    { path: "/udyam-re-registration", label: "Udyam Re-Registration" },
    { path: "/update-certificate", label: "Update Certificate" },
    { path: "/print-certificate", label: "Print Certificate" },
    { path: "/samplecertificate", label: "Sample Certificate" },
    { path: "/contact", label: "Contact" },
  ];

  // Sync activeTab with URL path changes
  useEffect(() => {
    if (location.pathname !== "/") {
      const matchingLink = navLinks.find(
        (link) => link.path === location.pathname,
      );
      if (matchingLink) {
        setActiveTab(matchingLink.label);
      }
    } else {
      const isCurrentTabHome = navLinks.some(
        (link) => link.path === "/" && link.label === activeTab,
      );
      if (!isCurrentTabHome) {
        setActiveTab("Udyam Registration");
      }
    }
  }, [location.pathname]);

  // Handle Tab Click with Fake Loading
  const handleTabClick = (label) => {
    setIsMenuOpen(false);
    setActiveTab(label);

    // Trigger Loading Effect
    setIsLoading(true);
    window.scrollTo(0, 0);

    // Turn off loading after delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms delay for "form loading" feel
  };

  return (
    <header className="font-sans bg-white relative z-50">
      {/* Simple Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Top Banner Area - More Compact */}
      <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-center md:text-left relative z-50">
        {/* Center: Info Stack */}
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          <h1 className="text-red-600 font-extrabold text-lg md:text-xl lg:text-2xl uppercase leading-tight tracking-tight">
            UDYAM REGISTRATION CONSULTANCY SERVICE PROVIDER
          </h1>

          <h3 className="text-[#0a1d4a] font-black text-base md:text-lg mt-0.5">
            सूक्ष्म, लघु और मध्यम उद्यमों के लिए उद्यम पंजीकरण
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-pink-600 font-bold transform -rotate-12 text-sm">
              📞
            </span>
            <span className="text-blue-900 font-extrabold text-lg">
              HELP-LINE: +91 - 9623551923
            </span>
          </div>
        </div>

        {/* Right: Swachh Bharat Logo (Real) */}
        {/* <div className="flex-shrink-0 hidden md:block">
          <img src={SwachhLogo} alt="Swachh Bharat" className="w-28 md:w-36" />
        </div> */}
      </div>

      {/* Navigation Bar - Compact & Improved */}
      <div className="bg-gradient-to-r bg-green-600 text-white shadow-lg relative z-50">
        <div className="container mx-auto">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex justify-between items-center p-3">
            <span className="font-bold text-lg tracking-wide uppercase">
              Menu
            </span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none text-white hover:text-orange-400 transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav
            className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row md:justify-center md:items-center text-sm font-medium transition-all duration-300`}
          >
            {navLinks.map((link, index) => {
              // Active state check based on activeTab
              const isActive = activeTab === link.label;

              return (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => handleTabClick(link.label)}
                  className={`
                                        relative group py-3 px-4 lg:px-6 transition-colors duration-300
                                        ${isActive ? "text-orange-400 bg-blue-950/40" : "text-slate-100 hover:text-orange-300 hover:bg-blue-800/50"}
                                    `}
                >
                  {link.label}
                  {/* Animated Underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  ></span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Taglines Section - Below Navigation Bar */}
      <div className="bg-white py-3 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-2">
            <p className="text-blue-900 font-semibold text-base md:text-lg text-center leading-relaxed">
              We offer professional, private assistance for MSME/Udyam
              registration, trusted by clients nationwide, with full support
              through approval
            </p>
            <p className="text-green-700 font-bold text-base md:text-lg text-center leading-relaxed flex items-center justify-center space-x-2">
              <span className="text-2xl">✓</span>
              <span>
                Get Your MSME/Udyam Certificate in Same Day – Full Support Till
                Approval
              </span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

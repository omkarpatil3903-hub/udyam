import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-orange-600 text-white font-sans text-xs md:text-sm mt-auto relative z-50">
            <div className="container mx-auto px-4 py-8 flex justify-center">

                {/* Useful Links */}
                <div className="text-center">
                    <h3 className="font-bold text-lg mb-4 text-white">Useful Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition">Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition">Terms Of Services</Link></li>
                        <li><Link to="/cancellation-refund-policy" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition">Cancellation & Refund Policy</Link></li>
                        <li><Link to="/sop" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition">SOP</Link></li>
                        <li><Link to="/about-us" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition">About Us</Link></li>
                        <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition">Contact Us</Link></li>
                        <li><Link to="/shipping-policy" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition">Shipping Policy</Link></li>
                    </ul>

                </div>
            </div>

            {/* Bottom Bar
            <div className="bg-orange-600 border-t border-orange-500">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs opacity-90">
                    <div className="mb-2 md:mb-0">
                        LAST UPDATED ON : 08/12/2025
                    </div>
                    <div>
                        TOTAL VISITOR : 84,399
                    </div>
                </div>
            </div> */}

            {/* Back to Top Button */}
            <div className={`fixed bottom-8 right-8 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <button
                    onClick={scrollToTop}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex flex-col items-center justify-center shadow-lg focus:outline-none transform hover:-translate-y-1 transition-all duration-300"
                    title="Back to Top"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span className="text-[9px] font-bold uppercase mt-[-2px]">Top</span>
                </button>
            </div>
        </footer>
    );
}

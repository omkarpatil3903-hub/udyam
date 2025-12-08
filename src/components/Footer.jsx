import React from 'react';

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
        <footer className="bg-orange-600 text-white font-sans text-xs md:text-sm mt-auto relative">
            <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Useful Links */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-white">Useful Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-black transition">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-black transition">Terms Of Services</a></li>
                        <li><a href="#" className="hover:text-black transition">Cancellation & Refund Policy</a></li>
                        <li><a href="#" className="hover:text-black transition">SOP</a></li>
                        <li><a href="#" className="hover:text-black transition">About Us</a></li>
                        <li><a href="#" className="hover:text-black transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-black transition">Shipping Policy</a></li>
                    </ul>
                </div>

                {/* Internal Links Col 1 */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-white">Internal Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-black transition">Udyam Registration For Proprietor</a></li>
                        <li><a href="#" className="hover:text-black transition">Udyam Registration For Partnership</a></li>
                        <li><a href="#" className="hover:text-black transition">Udyam Registration For Public Limited</a></li>
                        <li><a href="#" className="hover:text-black transition">Udyam Registration For Others</a></li>
                        <li><a href="#" className="hover:text-black transition">Update Udyam Registration</a></li>
                        <li><a href="#" className="hover:text-black transition">Print Udyam Registration</a></li>
                        <li><a href="#" className="hover:text-black transition">Udyog Print Certificate</a></li>
                    </ul>
                </div>

                {/* Internal Links Col 2 */}
                <div>
                    <div className="h-8 md:block hidden"></div> {/* Spacer */}
                    <ul className="space-y-2 mt-0 md:mt-11">
                        <li><a href="#" className="hover:text-black transition">Udyam Re Registration For Proprietor</a></li>
                        <li><a href="#" className="hover:text-black transition">Udyam Re Registration For Partnership</a></li>
                        <li><a href="#" className="hover:text-black transition">Udyam Re Registration For Public Limited</a></li>
                        <li><a href="#" className="hover:text-black transition">Udyam Re Registration For Others</a></li>
                        <li><a href="#" className="hover:text-black transition">Udyam Re-registration</a></li>
                        <li><a href="#" className="hover:text-black transition">Raise A Concern</a></li>
                        <li><a href="#" className="hover:text-black transition">Track Complaint</a></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-black transition">Home</a></li>
                        <li><a href="#" className="hover:text-black transition">Track Order</a></li>
                        <li><a href="#" className="hover:text-black transition">Blog</a></li>
                        <li><a href="#" className="hover:text-black transition">Enquiry</a></li>
                        <li><a href="#" className="hover:text-black transition">Pricing</a></li>
                        <li><a href="#" className="hover:text-black transition">File A Grievance</a></li>
                        <li><a href="#" className="hover:text-black transition">Track A Grievance</a></li>
                    </ul>
                    {/* Facebook Icon */}
                    <div className="mt-4">
                        <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                            <span className="text-white font-bold text-xl">f</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-orange-600 border-t border-orange-500">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs opacity-90">
                    <div className="mb-2 md:mb-0">
                        LAST UPDATED ON : 08/12/2025
                    </div>
                    <div>
                        TOTAL VISITOR : 84,399
                    </div>
                </div>
            </div>

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

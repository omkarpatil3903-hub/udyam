import React from 'react';

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 py-16 px-4 md:px-8 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Content */}
                <div className="text-white space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Udyam Registration <br />
                        <span className="text-orange-400">Zero Cost & Paperless</span>
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl font-light">
                        Government of India's Official MSME Registration Portal. Get your Udyam Certificate instantly.
                    </p>

                    <ul className="space-y-3">
                        {[
                            "Permanent Registration & No Renewal",
                            "No Documents Required",
                            "Integrated with Income Tax & GST Systems"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center space-x-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white">✓</span>
                                <span className="text-blue-50 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Form */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 md:p-8 rounded-2xl shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Registration Form</h2>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-blue-100 text-sm font-semibold mb-2">Aadhaar / Form Number</label>
                            <input
                                type="text"
                                placeholder="Enter 12 Digit Aadhaar Number"
                                className="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-blue-100 text-sm font-semibold mb-2">Name of Entrepreneur</label>
                            <input
                                type="text"
                                placeholder="Name as per Aadhaar"
                                className="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-blue-100 text-sm font-semibold mb-2">Mobile Number</label>
                            <input
                                type="tel"
                                placeholder="Linked with Aadhaar"
                                className="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-inner"
                            />
                        </div>

                        <div className="flex items-start space-x-3 pt-2">
                            <input type="checkbox" className="mt-1 w-4 h-4 text-orange-500 focus:ring-orange-500 rounded cursor-pointer" />
                            <p className="text-xs text-blue-200">
                                I agree to the Terms & Conditions and declare that the information provided is correct.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition duration-200"
                        >
                            Validate & Generate OTP
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}

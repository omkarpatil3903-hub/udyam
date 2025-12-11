import React from 'react';

export default function ContactPage() {
    return (
        <section className="container mx-auto px-2 py-8 font-sans">
            <div className="bg-orange-50 rounded-lg overflow-hidden shadow-sm border border-orange-100">
                {/* Header matching UdyamDetails */}
                <div className="bg-green-600 text-white text-center py-3 font-bold uppercase tracking-wide">
                    CONTACT US
                </div>

                {/* Content Area */}
                <div className="p-6 text-center space-y-8">

                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-blue-800 mb-2 uppercase tracking-tight">
                            UNITED CONSULTANCY SERVICES
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {/* Address */}
                        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm">
                            <h4 className="font-bold text-gray-800 mb-2 uppercase text-sm border-b border-gray-200 pb-2 inline-block">
                                Address
                            </h4>
                            <p className="text-gray-700 font-medium leading-relaxed">
                                Vinkar Soceity, Mangalwar Peth <br />
                                Madhavnagar 416406
                            </p>
                        </div>

                        {/* Contact No */}
                        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm">
                            <h4 className="font-bold text-gray-800 mb-2 uppercase text-sm border-b border-gray-200 pb-2 inline-block">
                                Contact Number
                            </h4>
                            <p className="text-xl font-bold text-blue-900">
                                +91 - 9623551923
                            </p>
                        </div>

                        {/* Email */}
                        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm md:col-span-2">
                            <h4 className="font-bold text-gray-800 mb-2 uppercase text-sm border-b border-gray-200 pb-2 inline-block">
                                Email
                            </h4>
                            <p className="text-lg font-bold text-blue-900">
                                <a href="mailto:eudyogonline@gmail.com" className="hover:underline">
                                    eudyogonline@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

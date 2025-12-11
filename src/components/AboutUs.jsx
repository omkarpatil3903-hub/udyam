import React from 'react';

export default function AboutUs() {
    return (
        <section className="font-sans">
            {/* Section Title */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
                    About Us
                </h2>

                <div className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-100 max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-6">

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Why to choose us:</h3>
                        <p>
                            There are several compelling reasons for individuals or businesses seeking assistance with their Udyam registration process. With our expertise and commitment to client satisfaction, we provide a streamlined and satisfying experience to all our clients. Our services include comprehensive guidance and support throughout the registration procedure. We prioritize accuracy and compliance, ensuring that all necessary documents and information are properly submitted. Moreover, our team of knowledgeable professionals stays up to date with the latest update in regulations and guidelines.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Our Motto</h3>
                        <p>
                            Our Motto is to ensure that clients benefit from accurate and current information. By choosing Udyam Registration Consultancy, clients can save time and effort while achieving a hassle-free registration process.
                        </p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded border border-blue-100">
                        <p className="font-semibold text-gray-800 mb-2">
                            UDYAMREGISTRATIONS.CO.IN Website Is A Property Of (UNITED CONSULTANCY SERVICES), a Consultancy Firm, Providing Consultancy Services. We are a B2B Consulting Firm. We have served more than 2 lac happy & satisfied clients.
                        </p>
                    </div>

                    <div className="text-sm text-gray-600">
                        <p className="mb-1">
                            <strong>Address:</strong> Vinkar Soceity, Mangalwar Peth
                            Madhavnagar 416406
                        </p>
                        <p>
                            <strong>EMAIL:</strong> <a href="mailto:eudyogonline@gmail.com" className="text-blue-600 hover:underline">eudyogonline@gmail.com</a>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

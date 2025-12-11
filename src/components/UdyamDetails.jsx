import React from 'react';

export default function UdyamDetails() {
    return (
        <section className="container mx-auto px-2 py-8 font-sans">
            <div className="bg-orange-50 rounded-lg overflow-hidden shadow-sm border border-orange-100">

                {/* Section 1: What is Udyam Registration? */}
                <div>
                    <div className="bg-orange-600 text-white text-center py-3 font-bold uppercase tracking-wide">
                        WHAT IS UDYAM REGISTRATION?
                    </div>
                    <div className="p-6 text-gray-800 text-sm md:text-base leading-relaxed space-y-4">
                        <p>
                            The Ministry of MSME established Udyam Registration as an online gateway to facilitate and streamline MSMEs' registration procedures. For the registration, categorization, and tracking of MSMEs, it offers a single-window system. Businesses are categorized under Udyam Registration according to the amount they invest in machinery and/or equipment as well as their Annual Turnover.
                        </p>
                        <p>
                            Udyam Registration is available to businesses that are under the MSME Category. The MSMEs include the business on the basis of their investments and turnover. Udyam Registration is fully online and can be done through the official website of Udyam Registration. The registration process is very simple and involves just providing some Business details.
                        </p>
                        <p>
                            Once registered in MSME, you can avail many benefits provided by the Government including preferential treatment in government tenders, easier access to credit, subsidies, and various support schemes. It also helps in promoting the ease of doing business.
                        </p>
                    </div>
                </div>

                {/* Section 2: Process of Udyam Registration */}
                <div>
                    <div className="bg-orange-600 text-white text-center py-3 font-bold uppercase tracking-wide">
                        PROCESS OF UDYAM REGISTRATION
                    </div>
                    <div className="p-6 text-gray-800 text-sm md:text-base leading-relaxed">
                        <p className="font-semibold mb-4 text-gray-900">Simple and quick process to get a udyam certificate</p>
                        <ol className="list-decimal list-inside space-y-2 ml-2">
                            <li>Visit the Udyam Registration website</li>
                            <li>Fill out the udyam registration form with the correct business details. Click on the submit button to proceed.</li>
                            <li>Payment Page will appear. Make the payment for your Application.</li>
                            <li>Our Registration Experts will call you for collecting additional details, Documents and OTPs for processing of your application.</li>
                            <li>It will take a couple of hours then you will receive your <span className="text-blue-600 font-medium">Udyam certificate</span> in your email</li>
                        </ol>
                    </div>
                </div>

            </div>
        </section>
    );
}

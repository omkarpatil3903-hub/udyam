import React from 'react';
import StandardOperatingProcedure from './StandardOperatingProcedure';

export default function SOP() {
    return (
        <section className="font-sans">
            {/* Section Title */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-8 uppercase tracking-wide">
                    Standard Operating Procedure
                </h2>

                <div className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-100 max-w-5xl mx-auto text-gray-700 leading-relaxed space-y-8">

                    {/* Step 1 */}
                    <div className="flex gap-4 items-start">
                        <span className="font-bold text-gray-900 text-lg min-w-[20px]">1.</span>
                        <p>
                            After Receiving The Form And Payment Fees, We Will Start The Processing. Our Representative May Contact The Clients By Phone, Text, Email, Or Whatsapp To Gather The Otp, More Information, And Additional Documents.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4 items-start">
                        <span className="font-bold text-gray-900 text-lg min-w-[20px]">2.</span>
                        <p>
                            We Shall Complete Order Processing Within A Reasonable Time And Deliver To Client Earliest On The Client's Registered Email At Our Websites After The Clients Provide The Above Mentioned Documents Details.
                        </p>
                    </div>

                    {/* Note */}
                    <div className="bg-orange-50 p-6 rounded border border-orange-100">
                        <p className="mb-0">
                            <span className="font-bold text-gray-900">Note :</span> If any shortcomings on the part of the client, such as failing to give the OTP, more information, additional documents, or any other circumstances that might prevent us from providing the services, prevent the delivery of the services.
                        </p>
                    </div>

                    {/* Data Privacy */}
                    <p className="text-gray-600 italic">
                        Your uploaded data and files are only stored on our servers in a transient state. It will be immediately deleted from our servers after our working process is complete.
                    </p>

                </div>

                {/* Graphic Process Section */}
                <div className="mt-12">
                    <StandardOperatingProcedure />
                </div>
            </div>
        </section>
    );
}

import React from 'react';

export default function ShippingPolicy() {
    return (
        <section className="font-sans">
            {/* Section Title */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-8 uppercase tracking-wide">
                    Shipping Policy
                </h2>

                <div className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-100 max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-6">

                    <p>
                        "We do not provide physical copies of certificates or account credentials. Certificates are exclusively delivered to the registered email address of the applicant. Applicants have the option to take a printout of the certificate received in their email.
                    </p>

                    <p className="font-semibold text-gray-900">
                        Please note, that requests for physical delivery of certificates will not be entertained under any circumstances."
                    </p>

                </div>
            </div>
        </section>
    );
}

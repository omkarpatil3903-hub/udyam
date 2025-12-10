import React from 'react';

export default function PrintCertificateDetails() {
    return (
        <section className="font-sans">
            {/* Header */}
            <div className="bg-blue-700 text-white text-center py-3 shadow">
                <h2 className="text-lg font-bold tracking-wide">PRINT UDYAM CERTIFICATE</h2>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Main Content */}
                <div className="bg-orange-100 p-5 rounded border border-orange-200 text-sm text-gray-800 leading-relaxed space-y-4">
                    <p>
                        At times, business owner holding <strong>Udyam Registration Certificate</strong>, misplaces the Copy of the Certificate issued to them. In such cases, the business owner need not apply for New Udyam Registration Certificate. Inspite of applying for New Certificate, He shall apply for <strong>Print Udyam Certificate</strong>.
                    </p>
                    <p>
                        <strong>Please Note :</strong> Print Udyam Certificate option can only be used to get a copy of the Udyam Certificate that already exist. Print Udyam Certificate will not generate a New Udyam Certificate. It is easy to print your Udyam Certificate and only requires a few easy steps. This certificate is a crucial record that confirms your UDYAM Registration and gives you entry to a host of government perks and prospects.
                    </p>
                    <p>
                        Along with General Business details, It also contains details the Category of MSME to which the business belong to viz. Micro, Small & Medium Enterprises. Business Owner should make sure that they have a tangible copy of your Udyam Certificate available for any business related requirements.
                    </p>
                    <p>
                        The best Practice is to keep several hard copies of the Udyam Registration Certificate in the Business File. However, anyone who has misplaced the Certificate may apply for <strong>PRINT UDYAM CERTIFICATE</strong>, to get a copy.
                    </p>
                </div>
            </div>
        </section>
    );
}

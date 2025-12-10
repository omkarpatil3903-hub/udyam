import React from 'react';

export default function CancelRegistrationDetails() {
    return (
        <section className="font-sans">
            {/* Header */}
            <div className="bg-blue-700 text-white text-center py-3 shadow">
                <h2 className="text-lg font-bold tracking-wide">CANCEL UDYAM REGISTRATION</h2>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Main Content */}
                <div className="bg-orange-100 p-5 rounded border border-orange-200 text-sm text-gray-800 leading-relaxed space-y-4">
                    <p>
                        Indian government has a dedicated ministry for ideating & implementing various programmes for MSME Units in India. MSME Units in India have to met a Registration Requirement in India for availing various benefits launched by the government. However, at times there can be circumstances where the owner needs to revoke their Registration. In Such cases, the owner needs to apply for <strong>Cancellation of Udyam Registration</strong>.
                    </p>
                    <p>
                        Cancel Udyam registration will enable the owners to modify their Registration status from Registered to Cancelled. To ensure a seamless cancellation process, it is essential to follow the prescribed steps and give accurate reason for cancellation. Also, make sure you keep a record of all the documents related to cancellation, for future reference.
                    </p>
                </div>
            </div>
        </section>
    );
}

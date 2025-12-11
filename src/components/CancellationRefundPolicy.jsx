import React from 'react';

export default function CancellationRefundPolicy() {
    return (
        <section className="font-sans">
            {/* Section Title */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
                    Refund Policy
                </h2>

                <div className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-100 max-w-4xl mx-auto text-gray-700 leading-relaxed space-y-6">

                    <p className="font-semibold text-lg text-gray-900">
                        Refunds will be allowed only under 2 circumstances:
                    </p>

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <span className="font-bold text-gray-900 min-w-[20px]">1.</span>
                            <p>
                                If a client requests in writing to cancel their order within <span className="font-bold text-gray-900">2 hours</span> from the time of a) Making payment, or b) Processing of their application by our executives, whichever is earlier. Our company officials will review the case and make a decision regarding the refund. In such cases, the amount of refund <span className="font-bold text-gray-900">cannot exceed 50.00%</span> of the amount paid by the client. <br />
                                <span className="font-semibold italic text-red-600">Note: Where request for refund is made after 2 hours of making payment, NO refund will be entertained.</span>
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <span className="font-bold text-gray-900 min-w-[20px]">2.</span>
                            <p>
                                Orders placed with us can only be canceled if service delivery from our end is <span className="font-bold text-gray-900">Impossible</span>. In such cases, refunds will be granted to the client, deducting Ads Charges, PG Charges & Internet and handling charges <span className="font-bold text-gray-900">(Approximately: Rs 500/-)</span>.
                            </p>
                        </div>
                    </div>

                    <div className="bg-red-50 p-6 rounded border border-red-100 mt-6">
                        <h3 className="text-lg font-bold text-red-700 mb-4">
                            NO Refund in Case of Non-delivery of services due to:
                        </h3>
                        <ul className="list-disc list-outside ml-6 space-y-2 text-red-800">
                            <li>Not providing required documents by client,</li>
                            <li>Failure to provide OTP (ONE TIME PASSWORD) by client,</li>
                            <li>Non Payment of Government Fees (if any) by client,</li>
                            <li>Non-cooperation of any kind from the client,</li>
                            <li>
                                And / or any other shortcomings on client’s part, which makes service delivery impossible on our end, will be considered as <strong>NON COOPERATION FROM CLIENT’S END & NO REFUND</strong> will be allowed.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

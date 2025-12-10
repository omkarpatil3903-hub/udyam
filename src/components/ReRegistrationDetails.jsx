import React from 'react';

export default function ReRegistrationDetails() {
    return (
        <section className="font-sans">
            {/* Header */}
            <div className="bg-blue-700 text-white text-center py-3 shadow">
                <h2 className="text-lg font-bold tracking-wide">UDYAM RE-REGISTRATION PORTAL</h2>
            </div>

            <div className="container mx-auto px-4 py-6 space-y-6">

                {/* Introduction */}
                <div className="bg-orange-100 p-4 rounded border border-orange-200 text-md text-gray-800 leading-relaxed">
                    <p>
                        The process of migrating from the Udyog Aadhaar Registration Certificate to Newly launched Udyam Registration Certificate is called <strong>Udyam RE-Registration</strong>. The newly launched Udyam Registration has been introduced by the Ministry of MSME, Government of India to replace the Udyog Aadhaar Registration. By registering under the Newly launched Udyam Registration businesses can take advantage of a variety of assistance programs put out by the Ministry of Micro, Small, and Medium Enterprises.
                    </p>
                </div>

                {/* Advantages Section */}
                <div>
                    <div className="bg-blue-700 text-white text-center py-2 text-sm font-bold tracking-wide">
                        ADVANTAGES OF RE REGISTERING
                    </div>
                    <div className="bg-blue-50 p-4 border border-blue-200">
                        <p className="text-md text-gray-800 mb-3">The advantages of re-registering with Udyam are as follows:</p>
                        <ol className="list-decimal list-outside text-md text-gray-700 space-y-1.5 ml-6">
                            <li>100% Collateral free loans</li>
                            <li>Loans without any Guarantee & Security</li>
                            <li>Subsidy on Interest Rates</li>
                            <li>Assistance from government for attending international trade fairs</li>
                            <li>Subsidy on ISO Certification</li>
                            <li>Discount on electricity bills to manufacturing units</li>
                            <li>No need for EMD for availing Government Contracts</li>
                            <li>Simple government contracts</li>
                            <li>Relaxations from direct taxation</li>
                            <li>Special GST tax reduction provisions</li>
                            <li>Relaxation in various compliances for GeM Registration</li>
                            <li>Makes registration under Startup India easy</li>
                            <li>Online market assistance</li>
                            <li>Access to the Internet marketplace</li>
                        </ol>
                    </div>
                </div>

                {/* Documents Section */}
                <div>
                    <div className="bg-blue-700 text-white text-center py-2 text-sm font-bold tracking-wide">
                        DOCUMENTS NEEDED TO RE-REGISTER WITH UDYAM
                    </div>
                    <div className="bg-blue-50 p-4 border border-blue-200">
                        <p className="text-sm text-gray-800 mb-3">The following documentation is required for Udyam re-registration:</p>
                        <ul className="list-disc list-outside text-md text-gray-700 space-y-1.5 ml-6">
                            <li><strong>UAM Number</strong> – This can be found on old Udyog Aadhaar Registration Certificate.</li>
                            <li>The National Industrial Classification System (NIC) Code</li>
                            <li>Access to Email address and phone number mentioned on old Udyog Aadhaar Registration Certificate. (For OTPs).</li>
                        </ul>
                    </div>
                </div>

                {/* Procedures Section */}
                <div>
                    <div className="bg-blue-700 text-white text-center py-2 text-sm font-bold tracking-wide">
                        RE REGISTRATION PROCEDURES FOR UDYAM REGISTRATION
                    </div>
                    <div className="bg-blue-50 p-4 border border-blue-200">
                        <p className="text-md text-gray-800 mb-3">If you want to re-register through Udyam registration, you must do the following:</p>
                        <ul className="list-disc list-outside text-md text-gray-700 space-y-2 ml-6">
                            <li><strong>Applicant Name</strong> – Mention Name of the Applicant, as mentioned on Aadhaar of the Applicant</li>
                            <li><strong>Mobile Number</strong> – The one which is mentioned on Udyog Aadhaar Certificate.</li>
                            <li><strong>Email Address</strong> – As mentioned Udyog Aadhaar Certificate, for OTP Purposes.</li>
                            <li><strong>Specify your UAM Number</strong> – It can be found on top of the Udyog Aadhaar Certificate.</li>
                            <li>
                                <strong>Do you want Changes in New Udyam Certificate</strong> – Select Yes / No.
                                <br />
                                <span className="text-gray-600 text-sm ml-4">
                                    <strong>Note:</strong> Following details on Udyog Aadhaar can not be changed during Re-Registration: Name of Owner, Aadhaar Number of Owner / PAN Number of Owner / DIC / State.
                                </span>
                            </li>
                            <li>Submit your application.</li>
                            <li>Make a payment online.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>
    );
}

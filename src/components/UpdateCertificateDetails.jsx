import React from 'react';

export default function UpdateCertificateDetails() {
    return (
        <section className="font-sans">
            {/* Header */}
            <div className="bg-blue-700 text-white text-center py-3 shadow">
                <h2 className="text-lg font-bold tracking-wide">UPDATE UDYAM CERTIFICATE</h2>
            </div>

            <div className="container mx-auto px-4 py-6 space-y-6">

                {/* Introduction */}
                <div className="bg-orange-100 p-4 rounded border border-orange-200 text-sm text-gray-800 leading-relaxed">
                    <p>
                        For small firms in India, the Udyam Registration, formerly known as the MSME registration, is an essential document. Businesses receive a range of advantages and concessions from it, including easy access to finance for the business, subsidies, and exemptions from other government compliance & much more.
                    </p>
                </div>

                {/* Why Update Section */}
                <div>
                    <div className="bg-blue-700 text-white text-center py-2 text-sm font-bold tracking-wide">
                        WHY UPDATE YOUR UDYAM CERTIFICATE?
                    </div>
                    <div className="bg-blue-50 p-4 border border-blue-200">
                        <p className="text-sm text-gray-800 mb-4">
                            Business is ever changing & with the any material change in the Business, it is the owners responsibility to keep the details updated in the Udyam Certificate all the times. It is crucial to maintain your Udyam Certificate updated in order for your company to continue to enjoy the benefits provided by the government. In this article, step by step guide to Update Udyam Certificate, will be provided
                        </p>
                        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-3 pl-2">
                            <li>
                                <strong>Change in General Business:</strong> Update Udyam certificate to change your company name, address and contact information, or the line of business etc
                            </li>
                            <li>
                                <strong>Change in Financial Details:</strong> For you to be eligible for the proper benefits and concessions offered to your business, it's essential to update your financial information, including the investment in plant and machinery or equipment & Turnover of the business.
                            </li>
                            <li>
                                <strong>Change in Eligibility:</strong> It's important to confirm that your company still qualifies for the advantages connected with Udyam registration because the eligibility requirements for MSMEs are subject to change over time. Also, Classification of Udyam Registered Units is done on the basis of Investment in Plant & Machinery AND Turnover of the business. Due to any Change in these attributes may also change the Classification of the business from Micro to Small or Medium Unit.
                            </li>
                            <li>
                                <strong>Government Initiatives:</strong> New MSMEs focused programs and incentives are frequently introduced by the government. You must have a Updated Udyam Certificate in order to reap benefits from these Schemes.
                            </li>
                            <li>
                                <strong>Data fields that can not be Updated on Udyam Registration Certificate:</strong> Amongst all the data fields those can be updated on Udyam Registration Certificate, there are few data fields that cannot be updated:
                                <ol className="list-decimal list-inside ml-6 mt-2 space-y-1">
                                    <li>Name of Owner / Applicant.</li>
                                    <li>Aadhaar Number of Owner / Applicant.</li>
                                    <li>State</li>
                                    <li>DIC Address</li>
                                </ol>
                                <p className="mt-2 text-gray-600">Apart from above mentioned fields almost all the data fields can be edited / updated.</p>
                            </li>
                        </ol>
                    </div>
                </div>

            </div>
        </section>
    );
}

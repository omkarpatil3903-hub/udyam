import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQsPage() {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const email = "care@udyamregistrations.co.in";

    const handleCopy = (index) => {
        navigator.clipboard.writeText(email);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const faqs = [
        {
            question: "What is Udyam Registration?",
            answer: "Udyam registration is the new process of MSME and Udyog aadhar registration for MSMEs, which is launched by the Government of India and the Ministry of MSME."
        },
        {
            question: "What is the need for Udyam registration?",
            answer: "Under Udyam registration MSMEs can avail various benefits from the government for example- reimbursement in electricity bills, government preferences in tender and international trade fair, Subsidies in patent fees and bar code registration."
        },
        {
            question: "Who can apply for the Udyam Registration?",
            answer: "Any enterprise that is categorised as MSMEs can apply for the Udyam registration."
        },
        {
            question: "What are the documents for the Udyam registration?",
            answer: "The document required for Udyam registration is only an aadhar card and PAN card."
        },
        {
            question: "How to do the Udyam registration?",
            answer: "If you want to do the Udyam registration then you can click on the given link and enter your details as mentioned in the aadhar card, along with your business details, bank details, and upload a copy of the aadhar card before submission.",
            link: { text: "Udyam Registration Portal", path: "/" }
        },
        {
            question: "How to apply for the Udyam certificate?",
            answer: "You can apply for the Udyam registration by visiting the Print Udyam Portal. Enter all the details mentioned in the form and after submission of the application Udyam certificate will be sent to your registered mail ID within 1-2 business days.",
            link: { text: "Print Udyam Portal", path: "/printcertificate" }
        },
        {
            question: "How to track the status of Udyam registration?",
            answer: "To track the status of the Udyam registration you can follow the steps: First, visit the Udyam registration portal then click on TRACK ORDER. Next, enter the order ID to track your status."
        },
        {
            question: "How to apply for the renewal of Udyam registration for MSME enterprises?",
            answer: "You can apply for the renewal by visiting the Udyam Re-Registration Portal.\n\nStep 1: Enter the name of the applicant, mobile number and email ID in the Online Udyam re-registration form. (NOTE: The OTP will be sent to the registered mobile number mentioned in the UAM certificate)\nStep 2: Type your 12 digit aadhar number for verification of identity, issued by the UIDAI.\nStep 3: Enter your UAM number as mentioned in the UAM certificate which you want to renew.\nStep 4: Upload a copy of the front side of the aadhar card for verification.\nStep 5: Click to the SUBMIT APPLICATION box to apply successfully for the renewal of the Udyam certificate.",
            link: { text: "Udyam Re-Registration Portal", path: "/reregister" }
        },
        {
            question: "What are Micro Small and Medium Enterprises?",
            answer: "Depending on the investment and turnover enterprises are categorised as:\n\nMicro Enterprises - A micro enterprise is an enterprise where investment in plant and machinery is 1 crore and turnover is 5 crore.\n\nSmall Enterprises - A small enterprise is an enterprise where investment in plant and machinery is 10 crore and turnover is up to 50 crore.\n\nMedium Enterprises - A medium enterprise is an enterprise where investment in plant and machinery is 50 crore and turnover is up to 250 crore."
        },
        {
            question: "How to calculate the investment of the company for machinery and equipment?",
            answer: "The calculation of investment of the company for machinery and equipment is mentioned in the ITR file of the income tax act and for newly registered companies when no ITR is available then-owner have to provide the self-declaration for ITR."
        },
        {
            question: "Is MSME registration, Udyog aadhar and Udyam registration are same?",
            answer: "Yes, MSME registration, Udyog aadhar and Udyam registration are different because Udyam is the latest process of online registration launched by the Ministry of MSME on 1st July 2020."
        },
        {
            question: "What is the eligibility criteria for MSME enterprises to get Udyam registration?",
            answer: "The eligibility criteria for MSME enterprises to get Udyam registration is described below:\n\nFor Micro enterprises investment must be 1 crore and turnover is up to 5 crore.\nFor Small enterprises investment must be 10 crores and turnover is up to 50 crores.\nFor Medium enterprises investment must be 20 crores and turnover is up to 250 crores."
        },
        {
            question: "Is MSME Loan available under the Udyam registration?",
            answer: "Yes, You can get the MSME loan if you are registered under Udyam registration which will help you to get financial support in capital funds."
        },
        {
            question: "Does one person do more than one Udyam registration online with the same aadhar?",
            answer: "No, with the same aadhar one person cannot apply for more than one Udyam registration. But they can add their other name of the business under the same registration."
        },
        {
            question: "What is the validity of the UAM certificate?",
            answer: "There is no specific mention of the validity of the UAM certificate in the government notice for MSMEs. But if you want to make any changes to your Udyam registration certificate then you can change the details by visiting the Udyam Re-Registration.",
            link: { text: "Udyam Re-Registration", path: "/reregister" }
        },
        {
            question: "How to cancel the Udyam registration Online?",
            answer: "Visit the Cancel Udyam registration to cancel your registration and UAM certificate.\n\n1. Enter the name of the applicant, mobile number, email ID as mentioned in the aadhar card issued by the central government of India (UIDAI).\n2. Type the 12 digit aadhar number of the applicant as mentioned in the aadhar card issued by the UIDAI.\n3. Enter your UAM number to cancel it.\n4. Write the name of your business as it is printed on the UAM certificate.\n5. Select the type of cancellation as per your requirement.",
            link: { text: "Cancel Udyam Registration", path: "/cancelregistration" }
        },
        {
            question: "Is aadhar mandatory to apply for Udyam registration online?",
            answer: "Aadhar is mandatory to apply for Udyam registration online as per the government guidelines."
        },
        {
            question: "How to update the Udyam certificate?",
            answer: "Click Here to update your Udyam registration certificate online by providing your existing UAM certificate. And enter all your details as mentioned in aadhar along with your business and bank details.",
            link: { text: "Update Certificate", path: "/updatecertificate" }
        },
        {
            question: "How to print Udyog aadhar/ MSME certificate online?",
            answer: "1. To print the Udyog aadhar/ MSME certificate online - visit the Print Certificate page.\n2. Enter the name of the applicant as mentioned in the aadhar card issued by UIDAI.\n3. Type your mobile number and email ID, the certificate will be sent to this mail ID.\n4. Applicants have to enter the UAM number to print the Udyog aadhar/ MSME certificate.\n5. Click to the SUBMIT APPLICATION and after processing the application form the certificate will be delivered to your registered mail ID in 1-2 business days.",
            link: { text: "Print Certificate", path: "/printcertificate" }
        }
    ];

    // Helper function to render answer with links
    const renderAnswer = (faq) => {
        const lines = faq.answer.split('\n');
        return (
            <>
                {lines.map((line, i) => (
                    <span key={i}>
                        {line}
                        {i < lines.length - 1 && <br />}
                    </span>
                ))}
                {faq.link && (
                    <>
                        {' '}
                        <Link to={faq.link.path} className="text-blue-800 underline font-medium hover:text-blue-900">
                            {faq.link.text}
                        </Link>
                    </>
                )}
            </>
        );
    };

    return (
        <section className="font-sans">
            {/* Section Title */}
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
                    Frequently Asked Questions
                </h2>

                {/* FAQ List */}
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100">
                            {/* Question */}
                            <div className="p-4">
                                <h3 className="text-gray-800 font-semibold">
                                    Q{index + 1}. {faq.question}
                                </h3>
                                <p className="text-blue-600 mt-2 text-sm leading-relaxed whitespace-pre-line">
                                    {renderAnswer(faq)}
                                </p>
                            </div>

                            {/* Action Bar */}
                            <div className="flex flex-col sm:flex-row">
                                {/* Email Copy Section */}
                                <div className="flex-1 bg-blue-600 text-white p-3 flex items-center justify-between gap-2">
                                    <div className="text-sm">
                                        <p className="font-medium">For More Information Send To Email</p>
                                        <p className="text-blue-100">{email}</p>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(index)}
                                        className="bg-black text-white px-4 py-1.5 text-xs font-bold uppercase hover:bg-gray-800 transition-colors"
                                    >
                                        {copiedIndex === index ? 'COPIED' : '(COPY)'}
                                    </button>
                                </div>

                                {/* Apply Button Section */}
                                <div className="bg-blue-500 text-white p-3 flex items-center justify-center sm:w-64">
                                    <div className="text-center">
                                        <p className="text-sm font-medium mb-1">To Apply For Registration Certificate</p>
                                        <Link
                                            to="/"
                                            className="inline-block bg-black text-white px-6 py-1.5 text-xs font-bold hover:bg-gray-800 transition-colors"
                                        >
                                            Click Here
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

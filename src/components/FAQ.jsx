import React, { useState } from 'react';

const faqData = [
    {
        question: "What is Udyam Registration?",
        answer: "Udyam Registration is a new procedure to register Micro, Small and Medium Enterprises (MSME) launched by the Ministry of MSME, Govt of India, effective from July 1, 2020."
    },
    {
        question: "Who can apply for Udyam Registration?",
        answer: "Any person who intends to establish a micro, small or medium enterprise may file Udyam Registration online in the Udyam Registration portal."
    },
    {
        question: "Is Aadhaar mandatory for registration?",
        answer: "Yes, the Aadhaar number is mandatory for Udyam Registration. For a proprietorship firm, the Aadhaar number of the proprietor is required."
    },
    {
        question: "Is there any fee for registration?",
        answer: "No, the government registration process is free of cost. However, we are a private consultancy and charge a fee for our professional services to assist you."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 px-4 md:px-8 bg-blue-50">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition"
                            >
                                <span className="font-semibold text-gray-800">{faq.question}</span>
                                <span className={`transform transition-transform duration-200 text-orange-500 font-bold ${openIndex === index ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 animate-fadeIn">
                                    <p className="pt-2">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

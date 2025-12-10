import React from 'react';
import SampleCertificateImage from '../assets/samplecertifiacte.jpg';

export default function SampleCertificate() {
    return (
        <section className="font-sans">
            <div className="container mx-auto px-4 py-8">
                {/* Section Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
                    Sample Udyam Certificate
                </h2>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                    {/* Left Column: Certificate Image (Sticky) */}
                    <div className="lg:sticky lg:top-4">
                        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
                            <img
                                src={SampleCertificateImage}
                                alt="Udyam Registration Certificate Sample"
                                className="w-full h-auto rounded"
                            />
                            <p className="text-center text-xs text-gray-500 mt-3 font-medium">
                                Sample Udyam Registration Certificate issued by Ministry of MSME
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Content Cards */}
                    <div className="space-y-6">

                        {/* Card 1: Hindi Content */}
                        <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden">
                            <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide">
                                UDYAM REGISTRATION CERTIFICATE SAMPLE
                            </div>
                            <div className="bg-orange-50 p-5 text-sm text-gray-800 leading-relaxed space-y-4">
                                <p>
                                    एमएसएमई मंत्रालय की पहल के हिस्से के रूप में भारत सरकार द्वारा प्रदान किया जाने वाला एक आवश्यक दस्तावेज उद्यम पंजीकरण प्रमाणपत्र है। यह प्रमाणपत्र उन कंपनियों को दिया जाता है जो उद्यम पंजीकरण प्रकिया को सफलतापूर्वक पूरा करते हैं जिसे पहले उद्योग आधार पंजीकरण के रूप में जाना जाता था।
                                </p>
                                <p><strong>उद्यम पंजीकरण संख्या:</strong> पंजीकृत कंपनी इकाई को एक पहचान संख्या दी जाती है जो आधिकारिक उपयोग के लिए जानकारी के मुख्य स्त्रोत के रूप में कार्य करता है।</p>
                                <p><strong>उद्यम का नाम:</strong> प्रमाणपत्र स्पष्ट रूप से पंजीकृत व्यवसाय का पूरा कानूनी नाम प्रदर्शित करता है।</p>
                                <p><strong>संगठन का प्रकार:</strong> एकमात्र स्वामित्व, साझेदारी, प्राइवेट लिमिटेड कंपनी या अन्य।</p>
                                <p><strong>उद्यम की श्रेणी:</strong> सूक्ष्म, लघु या मध्यम आकार की एमएसएमई श्रेणी।</p>
                                <p><strong>व्यवसाय का पता:</strong> व्यवसाय का पंजीकृत पता प्रमाणपत्र पर सूचीबद्ध है।</p>
                                <p><strong>जारी करने की तिथि:</strong> प्रमाणपत्र जारी करने की तारीख।</p>
                                <p><strong>वैधता अवधि:</strong> प्रमाणपत्र की वैधता समय सीमा।</p>
                                <p><strong>अधिकृत हस्ताक्षरकर्ता:</strong> सरकारी प्रतिनिधि या रजिस्ट्रार का नाम।</p>
                            </div>
                        </div>

                        {/* Card 2: English Content */}
                        <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden">
                            <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide">
                                CERTIFICATE FIELDS EXPLAINED (ENGLISH)
                            </div>
                            <div className="bg-orange-50 p-5 text-sm text-gray-800 leading-relaxed space-y-4">
                                <p><strong>Udyam Registration Number:</strong> The Registered Company Entity Is Given A Identifying Number For Official Use And Verification.</p>
                                <p><strong>Name Of The Enterprise:</strong> The Certificate Clearly Displays The Complete Legal Name Of The Registered Business.</p>
                                <p><strong>Type Of Organization:</strong> Sole Proprietorship, Partnership, Private Limited Company, Or Another.</p>
                                <p><strong>Category Of The Enterprise:</strong> The MSME Category - Micro, Small, Or Medium-Sized Based On Turnover.</p>
                                <p><strong>Address Of The Enterprise:</strong> The Registered Address Of The Business Is Listed On The Certificate.</p>
                                <p><strong>Date Of Issue:</strong> The Date When The Certificate Was Issued.</p>
                                <p><strong>Validity Period:</strong> The Time Frame For Which The Certificate Remains Valid.</p>
                                <p><strong>Objective Of The Enterprise:</strong> Brief Summary Of The Enterprise's Main Goals Or Activities.</p>
                                <p><strong>Authorized Signatory:</strong> Name And Title Of The Government Representative Or Registrar.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

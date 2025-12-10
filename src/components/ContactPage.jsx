import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await addDoc(collection(db, "contacts"), {
                ...formData,
                timestamp: serverTimestamp(),
                date: new Date().toLocaleDateString('en-IN')
            });

            setIsSubmitted(true);
            setFormData({ name: '', mobile: '', email: '' });
        } catch (error) {
            console.error("Error submitting contact:", error);
            alert("Failed to submit. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="container mx-auto px-2 py-8 font-sans">
            {/* Section Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
                Contact Us
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                {/* Left Column: Contact Form */}
                <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide min-h-[72px] flex flex-col justify-center">
                        CONTACT FORM ONLINE <br />
                        <span className="text-xs font-normal opacity-90">संपर्क फॉर्म ऑनलाइन</span>
                    </div>

                    {isSubmitted ? (
                        <div className="p-8 text-center">
                            <div className="text-green-600 text-5xl mb-4">✓</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
                            <p className="text-gray-600 text-sm">Your message has been submitted successfully. We will contact you soon.</p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                            >
                                Submit Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs md:text-sm bg-white">
                            {/* Row 1: Name */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">APPLICANT NAME / आवेदक का नाम <span className="text-red-600">*</span></label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* Row 2: Mobile */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">Mobile Number / मोबाइल संख्या <span className="text-red-600">*</span></label>
                                <input
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                    type="tel"
                                    pattern="[0-9]{10}"
                                    maxLength="10"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* Row 3: Email */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">Email Id / ईमेल आईडी <span className="text-red-600">*</span></label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    type="email"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2.5 bg-blue-700 text-white font-bold uppercase rounded-sm hover:bg-blue-800 transition disabled:opacity-50 tracking-wide"
                            >
                                {isLoading ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Right Column: Instructions */}
                <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden flex flex-col">
                    {/* Instructions Header */}
                    <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide min-h-[72px] flex flex-col justify-center">
                        READ THE INSTRUCTION TO FILL CONTACT FORM <br />
                        <span className="text-xs font-normal opacity-90">संपर्क फॉर्म भरने के लिए निर्देश पढ़ें</span>
                    </div>

                    <div className="p-4 space-y-4 text-xs md:text-sm leading-relaxed flex-grow">
                        <p>
                            <span className="font-bold">Applicant Name :</span> Applicant Has To Enter His/Her Name As Mentioned In Your Identity Card. <br />
                            <span className="text-gray-600">आवेदक को अपना नाम दर्ज करना होगा जैसा कि आपके पहचान पत्र में उल्लिखित है।</span>
                        </p>

                        <p>
                            <span className="font-bold">Mobile Number :</span> Applicants Have To Provide Their Phone Number. <br />
                            <span className="text-gray-600">आवेदको को अपना फोन नंबर देना होगा।</span>
                        </p>

                        <p>
                            <span className="font-bold">Email Id :</span> Please Enter The Correct Email Id To Receive All Information Regarding All Notifications. <br />
                            <span className="text-gray-600">सभी सूचनाओं के संबंध में सभी जानकारी प्राप्त करने के लिए कृपया सही ईमेल आईडी दर्ज करें।</span>
                        </p>

                        <div className="mt-4 p-2 bg-yellow-100 border border-yellow-200 rounded text-[13px] text-gray-700">
                            <span className="font-bold">SUBMIT APPLICATION :</span> After Filling All Details, Click On Submit Application Button. <br />
                            <span className="text-gray-600">सभी विवरण भरने के बाद सबमिट एप्लीकेशन बटन पर क्लिक करें।</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

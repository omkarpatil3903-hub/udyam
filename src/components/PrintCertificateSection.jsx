import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { statesAndDistricts } from '../data/statesDistricts';
import SuccessModal from './SuccessModal';

export default function PrintCertificateSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedAppId, setSubmittedAppId] = useState('');
    const [formData, setFormData] = useState({
        udyamNumber: '',
        applicantName: '',
        mobile: '',
        email: '',
        state: '',
        verificationCode: ''
    });

    const [captchaCode, setCaptchaCode] = useState('');

    const generateCaptcha = () => {
        const code = Math.floor(10000 + Math.random() * 90000).toString();
        setCaptchaCode(code);
    };

    React.useEffect(() => {
        generateCaptcha();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.verificationCode !== captchaCode) {
            alert("Invalid Verification Code! Please try again.");
            return;
        }

        setIsLoading(true);

        try {
            const printData = {
                udyamNumber: formData.udyamNumber,
                applicantName: formData.applicantName,
                mobile: formData.mobile,
                email: formData.email,
                state: formData.state,
                paymentStatus: 'Unpaid',
                workStatus: 'Pending',
                date: new Date().toISOString().split('T')[0],
                timestamp: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, "printcertificates"), printData);

            setSubmittedAppId(docRef.id);
            setShowSuccessModal(true);

            setFormData({
                udyamNumber: '',
                applicantName: '',
                mobile: '',
                email: '',
                state: '',
                verificationCode: ''
            });
            generateCaptcha();

        } catch (error) {
            console.error("Error submitting print request: ", error);
            alert(`Error submitting application: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                applicationId={submittedAppId}
            />

            {/* Section Title */}
            <section className="container mx-auto px-2 py-8 font-sans">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
                    Print Udyam Certificate
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                    {/* Left Column: Print Certificate Form */}
                    <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide">
                            APPLICATION FORM TO PRINT UDYAM REGISTRATION CERTIFICATE <br />
                            <span className="text-xs font-normal opacity-90">उद्यम पंजीकरण प्रमाणपत्र प्रिंट करने के लिए आवेदन पत्र</span>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs md:text-sm bg-white">
                            {/* Udyam Registration Number */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">UDYAM REGISTRATION NUMBER / उद्यम पंजीकरण संख्या <span className="text-red-600">*</span></label>
                                <input
                                    name="udyamNumber"
                                    value={formData.udyamNumber}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* Applicant Name */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">APPLICANT NAME / आवेदक का नाम <span className="text-red-600">*</span></label>
                                <input
                                    name="applicantName"
                                    value={formData.applicantName}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* Mobile Number */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">MOBILE NUMBER / मोबाइल संख्या <span className="text-red-600">*</span></label>
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

                            {/* Email */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">EMAIL ID / ईमेल आईडी <span className="text-red-600">*</span></label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    type="email"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* State */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">State / राज्य <span className="text-red-600">(Required)</span></label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm"
                                >
                                    <option value="">Select State</option>
                                    {Object.keys(statesAndDistricts).sort().map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Captcha */}
                            <div className="space-y-2">
                                <label className="block text-gray-800 font-bold text-xs">Verfication Code</label>
                                <div className="flex gap-2 items-center">
                                    <div className="flex-grow max-w-[200px]">
                                        <input
                                            name="verificationCode"
                                            value={formData.verificationCode}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Verification Code *"
                                            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 rounded-sm"
                                        />
                                    </div>
                                    <div
                                        className="bg-black text-white px-4 py-2 font-mono tracking-widest text-lg font-bold select-none cursor-pointer"
                                        onClick={generateCaptcha}
                                        title="Click to refresh"
                                    >
                                        {captchaCode}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`bg-blue-600 text-white font-bold py-3 px-8 rounded shadow hover:bg-blue-700 w-full md:w-auto uppercase text-sm transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Submitting...' : 'Submit Application'}
                            </button>

                        </form>
                    </div>

                    {/* Right Column: Instructions */}
                    <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden flex flex-col">
                        <div className="bg-blue-700 text-white text-center py-3 font-bold text-xs uppercase tracking-wide">
                            DIRECTIONS TO FILL PRINT UDYAM REGISTRATION CERTIFICATE FORM <br />
                            <span className="opacity-90 font-normal">प्रिंट उद्यम पंजीकरण प्रमाणपत्र फॉर्म भरने के निर्देश</span>
                        </div>
                        <div className="bg-white p-5 text-sm text-gray-800 space-y-5 leading-relaxed font-medium flex-grow">
                            <p>
                                <span className="font-bold">Udyam Registration Number :</span> Submit The Business's Udyam Registration Number As Per Udyam Certificate. <br />
                                <span className="text-gray-600">आवेदक को उद्यम प्रमाणपत्र के अनुसार उद्यम पंजीकरण संख्या लिखना होगा |</span>
                            </p>
                            <p>
                                <span className="font-bold">Applicant Name :</span> Mention The Applicant Name As Mentioned On The Aadhaar Card. <br />
                                <span className="text-gray-600">आधार कार्ड पर उल्लिखित आवेदक का नाम दर्ज करें |</span>
                            </p>
                            <p>
                                <span className="font-bold">Mobile Number :</span> The 10 Digit Mobile Number Of The Applicant And Do Not Country Code I.E. +91. <br />
                                <span className="text-gray-600">आवेदक का 10 अंकों का मोबाइल नंबर लिखे, मोबाइल नंबर बिना कंट्री कोड लगाए लिखे |</span>
                            </p>
                            <p>
                                <span className="font-bold">Email Id :</span> ENTER Mention Valid Email ID Of The Applicant. Udyam Certificate Will Be Sent To This Email Only. <br />
                                <span className="text-gray-600">आवेदक की वैध ईमेल आईडी का उल्लेख करें। उद्यम प्रमाणपत्र केवल इसी ईमेल पर भेजा जाएगा।</span>
                            </p>
                            <p>
                                <span className="font-bold">State :</span> Choose The Correct State Of The Applicant From The Drop Down Menu. <br />
                                <span className="text-gray-600">ड्रॉप डाउन मेन्यू से आवेदक की सही राज्य का नाम चुनें |</span>
                            </p>
                            <p>
                                <span className="font-bold">Enter 5 Digit Captch Code In The Verification Field</span> <br />
                                <span className="text-gray-600">वेरिफिकेशन फ़ील्ड में 5 अंकों का कैप्चा कोड दर्ज करें।</span>
                            </p>
                            <p>
                                <span className="font-bold">Submit Application :</span> Click On The Submit Application. <br />
                                <span className="text-gray-600">सारी जानकारी डालने के बाद सबमिट एप्लिकेशन पर क्लिक करें</span>
                            </p>
                            <div className="mt-4 p-2 bg-yellow-100 border border-yellow-200 rounded text-[13px] text-gray-700">
                                <span className="font-bold">Note:</span> After the payment is made successfully document(AADHAR CARD OF THE OWNER) submission will be required. <br />
                                <span className="text-gray-600">भुगतान सफलतापूर्वक हो जाने के बाद दस्तावेज़ (आधार कार्ड) जमा करना आवश्यक होगा।</span>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}

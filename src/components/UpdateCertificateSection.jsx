import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { statesAndDistricts } from '../data/statesDistricts';
import SuccessModal from './SuccessModal';

export default function UpdateCertificateSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedAppId, setSubmittedAppId] = useState('');
    const [formData, setFormData] = useState({
        udyamNumber: '',
        applicantName: '',
        mobile: '',
        email: '',
        otpOption: '',
        updateDetails: '',
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

        if (!formData.otpOption) {
            alert("Please select an OTP option.");
            return;
        }

        setIsLoading(true);

        try {
            const updateData = {
                udyamNumber: formData.udyamNumber,
                applicantName: formData.applicantName,
                mobile: formData.mobile,
                email: formData.email,
                otpOption: formData.otpOption,
                updateDetails: formData.updateDetails,
                state: formData.state,
                paymentStatus: 'Unpaid',
                workStatus: 'Pending',
                date: new Date().toISOString().split('T')[0],
                timestamp: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, "updatecertificates"), updateData);

            setSubmittedAppId(docRef.id);
            setShowSuccessModal(true);

            setFormData({
                udyamNumber: '',
                applicantName: '',
                mobile: '',
                email: '',
                otpOption: '',
                updateDetails: '',
                state: '',
                verificationCode: ''
            });
            generateCaptcha();

        } catch (error) {
            console.error("Error submitting update request: ", error);
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

            <section className="container mx-auto px-2 py-8 font-sans">
                {/* Section Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
                    Update Udyam Certificate
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                    {/* Left Column: Update Certificate Form */}
                    <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide">
                            REGISTRATION FORM FOR UPDATE UDYAM CERTIFICATE <br />
                            <span className="text-xs font-normal opacity-90">अध्यतन उद्यम प्रमाणपत्र के लिए पंजीकरण फॉर्म</span>
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
                                <label className="block text-gray-800 font-bold mb-1">MOBILE NUMBER / मोबाइल संख्या</label>
                                <p className="text-red-500 text-[10px] mb-1">(ENTER MOBILE NUMBER AS MENTIONED ON YOUR UDYAM CERTIFICATE) (अपने उद्यम प्रमाणपत्र पर उल्लिखित मोबाइल नंबर दर्ज करें)</p>
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
                                <label className="block text-gray-800 font-bold mb-1">EMAIL ID / ईमेल आईडी</label>
                                <p className="text-red-500 text-[10px] mb-1">(ENTER EMAIL ID AS MENTIONED ON YOUR UDYAM CERTIFICATE) (अपने उद्यम प्रमाणपत्र पर उल्लिखित ईमेल आईडी दर्ज करें)</p>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    type="email"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* OTP Option */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-2">
                                    CHOOSE THE OPTION ON WHICH YOU WANT TO RECEIVE OTP / वह विकल्प चुनें जिस पर आप ओटीपी प्राप्त करना चाहते हैं
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="otpOption"
                                            value="mobile"
                                            checked={formData.otpOption === 'mobile'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm">MOBILE NUMBER AS MENTIONED ON YOUR UDYAM CERTIFICATE</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="otpOption"
                                            value="email"
                                            checked={formData.otpOption === 'email'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm">EMAIL ID AS MENTIONED ON YOUR UDYAM CERTIFICATE</span>
                                    </label>
                                </div>
                            </div>

                            {/* Details to Update */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">
                                    PROVIDE THE DETAILS TO BE UPDATED ON CERTIFICATE / प्रमाण पत्र पर मुद्रित किए जाने वाले विवरण प्रदान करें
                                </label>
                                <p className="text-gray-500 text-[10px] mb-2 italic">KYC DETAILS, PAN Number, State And District Cannot Be Updated</p>
                                <textarea
                                    name="updateDetails"
                                    value={formData.updateDetails}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm resize-none"
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
                            KEYPOINTS TO FILL UPDATE UDYAM REGISTRATION FORM <br />
                            <span className="opacity-90 font-normal">अध्यतन उद्यम पंजीकरण फॉर्म भरने के लिए मुख्य बिंदु</span>
                        </div>
                        <div className="bg-white p-5 text-sm text-gray-800 space-y-5 leading-relaxed font-medium flex-grow">
                            <p>
                                <span className="font-bold">UDYAM REGISTRATION NUMBER :</span> Enter The Applicant's Udyam Registration Number As Per As Udyam Certificate <br />
                                <span className="text-gray-600">उद्यम प्रमाणपत्र के अनुसार आवेदक का उद्यम पंजीकरण नंबर दर्ज करें</span>
                            </p>
                            <p>
                                <span className="font-bold">Applicant Name :</span> Enter The Applicant Name As Per The PAN Card <br />
                                <span className="text-gray-600">पैन कार्ड के अनुसार आवेदक का नाम दर्ज करें</span>
                            </p>
                            <p>
                                <span className="font-bold">Mobile Number :</span> Enter Applicant's Indian Mobile Number Without +91 <br />
                                <span className="text-gray-600">आवेदक का भारतीय मोबाइल नंबर बिना +91 के दर्ज करें</span>
                            </p>
                            <p>
                                <span className="font-bold">Email Id :</span> The Applicant Must Enter A Valid Email Address Because The Certificate And Acknowledgment Will Be Sent To The Registered Email Address. <br />
                                <span className="text-gray-600">आवेदक को एक वैध ईमेल पता दर्ज करना होगा क्योंकि प्रमाणपत्र और पावती पंजीकृत ईमेल पते पर भेजी जाएगी</span>
                            </p>
                            <p>
                                <span className="font-bold">CHOOSE THE OPTION ON WHICH YOU WANT TO RECEIVE OTP :</span> Select Any One Option From Below To Get An OTP (Mobile Number Or Email) <br />
                                <span className="text-gray-600">ओटीपी (मोबाइल नंबर या ईमेल) प्राप्त करने के लिए नीचे दिए गए विकल्पों में से एक का चयन करें</span>
                            </p>
                            <p>
                                <span className="font-bold">Verification Code :</span> Enter 5 Digit Captch Code In The Verification Field. <br />
                                <span className="text-gray-600">वेरिफिकेशन फ़ील्ड में 5 अंकों का कैप्चा कोड दर्ज करें।</span>
                            </p>
                            <div className="mt-4 p-2 bg-yellow-100 border border-yellow-200 rounded text-[13px] text-gray-700">
                                <span className="font-bold">SUBMIT APPLICATION :</span> After All Details And Documents Click On Submit Application Button To Proceed <br />
                                <span className="text-gray-600">सभी विवरण और दस्तावेजों के बाद आगे बढ़ने के लिए सबमिट एप्लीकेशन बटन पर क्लिक करें</span>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}

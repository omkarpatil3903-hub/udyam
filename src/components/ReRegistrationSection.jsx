import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { statesAndDistricts } from '../data/statesDistricts';
import SuccessModal from './SuccessModal';

export default function ReRegistrationSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedAppId, setSubmittedAppId] = useState('');
    const [formData, setFormData] = useState({
        applicantName: '',
        mobile: '',
        email: '',
        uamNumber: '',
        state: '',
        wantChanges: '',
        agreedToTerms: false,
        agreedToOTP: false,
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
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.verificationCode !== captchaCode) {
            alert("Invalid Verification Code! Please try again.");
            return;
        }

        if (!formData.agreedToTerms || !formData.agreedToOTP) {
            alert("Please agree to both terms and conditions.");
            return;
        }

        if (!formData.wantChanges) {
            alert("Please select if you want to make changes to your existing certificate.");
            return;
        }

        setIsLoading(true);

        try {
            const reregistrationData = {
                applicantName: formData.applicantName,
                mobile: formData.mobile,
                email: formData.email,
                uamNumber: formData.uamNumber,
                state: formData.state,
                wantChanges: formData.wantChanges === 'yes',
                agreedToTerms: formData.agreedToTerms,
                agreedToOTP: formData.agreedToOTP,
                paymentStatus: 'Unpaid',
                workStatus: 'Pending',
                date: new Date().toISOString().split('T')[0],
                timestamp: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, "reregistrations"), reregistrationData);

            setSubmittedAppId(docRef.id);
            setShowSuccessModal(true);

            setFormData({
                applicantName: '',
                mobile: '',
                email: '',
                uamNumber: '',
                state: '',
                wantChanges: '',
                agreedToTerms: false,
                agreedToOTP: false,
                verificationCode: ''
            });
            generateCaptcha();

        } catch (error) {
            console.error("Error submitting re-registration: ", error);
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
                    Udyam Re-Registration Portal
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                    {/* Left Column: Re-Registration Form */}
                    <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide">
                            UDYAM RE-REGISTRATION FORM ONLINE <br />
                            <span className="text-xs font-normal opacity-90">उद्यम पुनः पंजीकरण फॉर्म ऑनलाइन</span>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs md:text-sm bg-white">
                            {/* Applicant Name */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">APPLICANT (OWNER) NAME / आवेदक (मालिक) का नाम <span className="text-red-600">*</span></label>
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
                                <label className="block text-gray-800 font-bold mb-1">MOBILE NUMBER / मोबाइल नंबर <span className="text-red-600">*</span></label>
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
                                <p className="text-red-500 text-[10px] mt-1">Note: OTP will be sent on mobile number mentioned on UAM certificate for verification.</p>
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

                            {/* UAM Number */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">UAM NUMBER / UAM नंबर <span className="text-red-600">*</span></label>
                                <input
                                    name="uamNumber"
                                    value={formData.uamNumber}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* State */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">STATE / राज्य <span className="text-red-600">*</span></label>
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

                            {/* Want Changes Radio */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-2">
                                    DO YOU WANT TO MAKE ANY CHANGES IN DETAILS OF YOUR EXISTING UDYOG/UDYAM CERTIFICATE?
                                </label>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="wantChanges"
                                            value="yes"
                                            checked={formData.wantChanges === 'yes'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="wantChanges"
                                            value="no"
                                            checked={formData.wantChanges === 'no'}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-blue-600"
                                        />
                                        <span className="text-sm font-medium">No</span>
                                    </label>
                                </div>
                            </div>

                            {/* Agreements */}
                            <div className="bg-orange-100 p-3 border border-orange-200 rounded-sm space-y-3">
                                <label className="flex items-start space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreedToTerms"
                                        checked={formData.agreedToTerms}
                                        onChange={handleChange}
                                        className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500"
                                    />
                                    <span className="text-xs font-semibold text-gray-800">
                                        I AGREE TO THE <Link to="/terms-of-service" className="text-blue-600 underline" target="_blank">TERMS OF SERVICE [UPDATED]</Link>
                                    </span>
                                </label>
                                <label className="flex items-start space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreedToOTP"
                                        checked={formData.agreedToOTP}
                                        onChange={handleChange}
                                        className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500"
                                    />
                                    <span className="text-xs font-semibold text-gray-800">
                                        I, The Applicant I Am Aware That OTP Will Be Required And I Agree To Share OTPs / Additional Details Etc Required While Processing MSME / Udyam Certificate [UPDATED]
                                    </span>
                                </label>
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
                            IMPORTANT INSTRUCTIONS TO FILL UDYAM RE-REGISTRATION FORM <br />
                            <span className="opacity-90 font-normal">उद्यम पुनः पंजीकरण फॉर्म भरने के लिए महत्वपूर्ण निर्देश</span>
                        </div>
                        <div className="bg-white p-5 text-sm text-gray-800 space-y-5 leading-relaxed font-medium flex-grow">
                            <p>
                                <span className="font-bold">Applicant Name :</span> Name Of Applicant As Appears On Aadhaar Card. <br />
                                <span className="text-gray-600">आवेदक का नाम जैसा आधार कार्ड पर अंकित है।</span>
                            </p>
                            <p>
                                <span className="font-bold">Mobile Number :</span> Mention 10 digit mobile number of the applicant without using  <br />
                                <span className="text-gray-600">+91.   कंट्री कोड +91 का उपयोग किए बिना आवेदक अपना 10 अंकों का मोबाइल नंबर लिखें</span>

                            </p>
                            <p>
                                <span className="font-bold">Email Id :</span> Mention The Applicant's Email Id. The Certificate Will Be Delivered To This Email ID. <br />
                                <span className="text-gray-600">आवेदक की ईमेल आईडी नोट करें, प्रमाणपत्र इसी ईमेल आईडी पर भेजा जाएगा।</span>
                            </p>
                            <p>
                                <span className="font-bold">UAM Number :</span> MENTION APPLICANT'S UAM NUMBER AS MENTIONED ON THE CERTIFICATE. <br />
                                <span className="text-gray-600">आवेदक अपने पुराने MSME सर्टिफिकेट पर अंकित UAM नंबर दर्ज करे।</span>
                            </p>
                            <p>
                                <span className="font-bold">State :</span> Select Your State From The Drop Down Menu. <br />
                                <span className="text-gray-600">ड्रॉप डाउन मेनू से अपना राज्य चुनें।</span>
                            </p>
                            <p>
                                <span className="font-bold">Changes In Certificate :</span> Select Yes If You Want To Update Any Details In Your Existing Certificate, Otherwise Select No. <br />
                                <span className="text-gray-600">अगर आप अपने मौजूदा प्रमाणपत्र में कोई विवरण अपडेट करना चाहते हैं तो हां चुनें, अन्यथा नहीं चुनें।</span>
                            </p>
                            <p>
                                <span className="font-bold">Terms & Conditions :</span> Tick Both Checkboxes To Agree To The Terms And Conditions. Please Note That To Process Your Application, OTP Is Required. <br />
                                <span className="text-gray-600">नियम और शर्तों से सहमत होने के लिए दोनों चेकबॉक्स पर क्लिक कर के टर्म्स एंड कंडीशंस एक्सेप्ट करे | कृपया ध्यान दें कि आपके आवेदन को प्रोसेस करने के लिए ओटीपी की आवश्यकता है| आपके एप्लीकेशन के प्रोसेसिंग के समय आपसे OTP कलेक्ट की जाएगी
                                </span>
                            </p>
                            <div className="mt-4 p-2 bg-yellow-100 border border-yellow-200 rounded text-[13px] text-gray-700">
                                <span className="font-bold">SUBMIT APPLICATION :</span> Click The Submit Application Button, To Submit Your Application. <br />
                                <span className="text-gray-600">अपना आवेदन जमा करने के लिए सबमिट एप्लीकेशन बटन पर क्लिक करें।</span>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { statesAndDistricts } from '../data/statesDistricts';
import SuccessModal from './SuccessModal';

export default function CancelRegistrationSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedAppId, setSubmittedAppId] = useState('');
    const [formData, setFormData] = useState({
        applicantName: '',
        mobile: '',
        email: '',
        udyamNumber: '',
        businessName: '',
        cancellationType: '',
        state: '',
        verificationCode: '',
        agreeTerms: false,
        agreeShare: false
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


    const cancellationTypes = [
        "No further need",
        "I have shut down my Business",
        "This is my duplicate UDYAM / UAM",
        "Company owner changed",
        "Other"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.verificationCode !== captchaCode) {
            alert("Invalid Verification Code! Please try again.");
            return;
        }

        if (!formData.agreeTerms || !formData.agreeShare) {
            alert("Please agree to the terms and conditions.");
            return;
        }

        setIsLoading(true);

        try {
            const cancelData = {
                applicantName: formData.applicantName,
                mobile: formData.mobile,
                email: formData.email,
                udyamNumber: formData.udyamNumber,
                businessName: formData.businessName,
                cancellationType: formData.cancellationType,
                state: formData.state,
                paymentStatus: 'Unpaid',
                workStatus: 'Pending',
                date: new Date().toISOString().split('T')[0],
                timestamp: serverTimestamp()
            };

            const docRef = await addDoc(collection(db, "cancelregistrations"), cancelData);

            setSubmittedAppId(docRef.id);
            setShowSuccessModal(true);

            setFormData({
                applicantName: '',
                mobile: '',
                email: '',
                udyamNumber: '',
                businessName: '',
                cancellationType: '',
                state: '',
                verificationCode: '',
                agreeTerms: false,
                agreeShare: false
            });
            generateCaptcha();

        } catch (error) {
            console.error("Error submitting cancel request: ", error);
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
                    Cancel Udyam Registration
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

                    {/* Left Column: Cancel Registration Form */}
                    <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-blue-700 text-white text-center py-3 font-bold uppercase text-sm tracking-wide">
                            CANCEL UDYAM REGISTRATION <br />
                            <span className="text-xs font-normal opacity-90">उद्यम पंजीकरण रद्द करें</span>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs md:text-sm bg-white">
                            {/* Applicant Name */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">APPLICANT NAME / आवेदक का नाम <span className="text-red-600">(Required)</span></label>
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
                                <label className="block text-gray-800 font-bold mb-1">MOBILE NUMBER / मोबाइल संख्या <span className="text-red-600">(Required)</span></label>
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
                                <label className="block text-gray-800 font-bold mb-1">EMAIL ID / ईमेल आईडी <span className="text-red-600">(Required)</span></label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    type="email"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* Udyam/UAM Number */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">UDYAM / UAM NUMBER / उद्यम / उद्योग आधार संख्या <span className="text-red-600">(Required)</span></label>
                                <p className="text-gray-500 text-[10px] mb-1 italic">Find Your Udyam/ UAM Number</p>
                                <input
                                    name="udyamNumber"
                                    value={formData.udyamNumber}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* Business Name */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">BUSINESS NAME / व्यवसाय नाम <span className="text-red-600">(Required)</span></label>
                                <input
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm"
                                />
                            </div>

                            {/* Type of Cancellation */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">Type Of Cancellation / रद्द करने का प्रकार <span className="text-red-600">(Required)</span></label>
                                <select
                                    name="cancellationType"
                                    value={formData.cancellationType}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm"
                                >
                                    <option value="">Select An Option</option>
                                    {cancellationTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
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

                            {/* Checkboxes */}
                            <div className="space-y-2 text-xs">
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleChange}
                                        className="mt-0.5"
                                    />
                                    <span>I AGREE TO THE <Link to="/terms-of-service" className="text-blue-600 underline" target="_blank">TERMS OF SERVICE</Link> <span className="text-red-500">(UPDATED)</span></span>
                                </label>
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreeShare"
                                        checked={formData.agreeShare}
                                        onChange={handleChange}
                                        className="mt-0.5"
                                    />
                                    <span>I, The Applicant Agree To Share Details / Passcodes Etc As & When Required For The Purpose Of Udyam Certificate Generation. <span className="text-red-500">(UPDATED)</span></span>
                                </label>
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
                            READ THE INSTRUCTION TO CANCEL UDYAM REGISTRATION <br />
                            <span className="opacity-90 font-normal">उद्यम पंजीकरण रद्द करने के निर्देश पढ़ें</span>
                        </div>
                        <div className="bg-white p-5 text-sm text-gray-800 space-y-5 leading-relaxed font-medium flex-grow">
                            <p>
                                <span className="font-bold">Applicant Name :</span> The Applicant Must Enter Their Name Exactly As It Appears On Their Aadhaar Card. <br />
                                <span className="text-gray-600">आवेदक को अपना नाम बिल्कुल वैसा ही दर्ज करना होगा जैसा उनके आधार कार्ड पर है।</span>
                            </p>
                            <p>
                                <span className="font-bold">Mobile Number :</span> An Indian Mobile Number Must Be Entered By The Applicant Never Add +91. <br />
                                <span className="text-gray-600">आवेदक को एक भारतीय मोबाइल नंबर दर्ज करना होगा, +91 कभी न जोड़ें।</span>
                            </p>
                            <p>
                                <span className="font-bold">Email Id :</span> The Applicant Must Enter His Or Her Email Address Because The Confirmation And Certificate Will Be Sent To The Registered ID. <br />
                                <span className="text-gray-600">आवेदक को अपना ईमेल पता दर्ज करना होगा क्योंकि पुष्टिकरण और प्रमाणपत्र पंजीकृत आईडी पर भेजा जाएगा।</span>
                            </p>
                            <p>
                                <span className="font-bold">Business Name :</span> The Applicant Must Include Their Company Name Because It Will Be Printed On The Certificate. <br />
                                <span className="text-gray-600">आवेदक को अपनी कंपनी का नाम शामिल करना होगा क्योंकि यह प्रमाणपत्र पर मुद्रित किया जाएगा।</span>
                            </p>
                            <p>
                                <span className="font-bold">Type Of Cancellation :</span> Choose The Reason To Cancel From The Given Option. <br />
                                <span className="text-gray-600">दिए गए विकल्पों में से रद्द करने का कारण चुनें</span>
                            </p>
                            <p>
                                <span className="font-bold">STATE :</span> Select the Choice For the Applicant's State Name. <br />
                                <span className="text-gray-600">आवेदक के राज्य के नाम के लिए विकल्प का चयन करें।</span>
                            </p>
                            <div className="mt-4 p-2 bg-yellow-100 border border-yellow-200 rounded text-[13px] text-gray-700">
                                <span className="font-bold">SUBMIT APPLICATION :</span> After Uploading The Required Information And Documents, The Applicant Must Click The "Submit Application" Button. <br />
                                <span className="text-gray-600">आवश्यक जानकारी और दस्तावेज़ अपलोड करने के बाद आवेदक को "आवेदन सबमिट करें" बटन पर क्लिक करना होगा।</span>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}

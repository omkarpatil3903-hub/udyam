import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { statesAndDistricts } from '../data/statesDistricts';
import SuccessModal from './SuccessModal';

export default function RegistrationSection() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions
    const [loadingMessage, setLoadingMessage] = useState(''); // Message for loading overlay
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submittedAppId, setSubmittedAppId] = useState('');
    const [submittedPaymentStatus, setSubmittedPaymentStatus] = useState('Paid');
    const [pendingRegistrationData, setPendingRegistrationData] = useState(null);

    // Determine collection based on current route (form header stays the same)
    const getCollectionName = () => {
        switch (location.pathname) {
            case '/udyam-re-registration':
                return 're-registrations';
            case '/update-certificate':
                return 'update-certificates';
            case '/print-certificate':
                return 'print-certificates';
            default:
                return 'registrations';
        }
    };

    const collectionName = getCollectionName();
    const [formData, setFormData] = useState({
        applicantName: '',
        mobile: '',
        email: '',
        officeAddress: '',
        pincode: '',
        state: '',
        district: '',
        socialCategory: '',
        orgType: '',
        pan: '',
        businessName: '',
        commencementDate: '',
        mainActivity: '',
        additionalDetails: '',
        employeesMale: '',
        employeesFemale: '',
        employeesOther: '',
        verificationCode: ''
    });

    const [captchaCode, setCaptchaCode] = useState('');

    const generateCaptcha = () => {
        const code = Math.floor(10000 + Math.random() * 90000).toString();
        setCaptchaCode(code);
    };

    // Generate captcha on initial load
    React.useEffect(() => {
        generateCaptcha();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'state') {
            setFormData(prev => ({
                ...prev,
                [name]: value,
                district: '' // Reset district when state changes
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const calculateTotalEmployees = () => {
        return (Number(formData.employeesMale || 0) + Number(formData.employeesFemale || 0) + Number(formData.employeesOther || 0));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // CRITICAL: Prevent duplicate submissions
        if (isSubmitting) {
            console.warn('Payment already in progress, ignoring duplicate submission');
            return;
        }

        // Validate Captcha
        if (formData.verificationCode !== captchaCode) {
            alert("Invalid Verification Code! Please try again.");
            return;
        }

        // Validate required fields for payment
        if (!formData.applicantName || !formData.email || !formData.mobile) {
            alert('Missing required customer information. Please fill out all required fields.');
            return;
        }

        // Prepare registration data
        const registrationData = {
            ...formData,
            totalEmployees: calculateTotalEmployees(),
            date: new Date().toISOString().split('T')[0],
        };

        // Store pending data for later use
        setPendingRegistrationData(registrationData);
        setIsSubmitting(true); // Mark as submitting to prevent duplicates
        setIsLoading(true);
        setLoadingMessage('Opening payment gateway...'); // Show loading message

        // Directly initiate payment
        try {
            const { initiateCashfreePayment, getPaymentAmount } = await import('../services/paymentService');
            const registrationType = getRegistrationType();
            const amount = getPaymentAmount(registrationType);

            const paymentData = {
                amount: amount,
                customerName: registrationData.applicantName,
                customerEmail: registrationData.email,
                customerPhone: registrationData.mobile,
                registrationType: registrationType,
            };

            // CRITICAL: Prevent race condition - only allow one callback to execute
            let callbackExecuted = false;

            await initiateCashfreePayment(
                paymentData,
                // Success callback - VERIFY payment before trusting client
                async (result) => {
                    // Race condition check - prevent duplicate execution
                    if (callbackExecuted) {
                        console.warn('Success callback ignored - another callback already executed');
                        return;
                    }
                    callbackExecuted = true;

                    try {
                        setLoadingMessage('Processing payment...'); // Update loading message
                        console.log('Payment success reported by client, verifying with server...');

                        // CRITICAL: Verify payment with server before trusting client callback
                        const { verifyPaymentStatus } = await import('../services/paymentService');
                        const verification = await verifyPaymentStatus(result.orderId);

                        console.log('Server verification result:', verification);

                        // Only save as "Paid" if server confirms payment success
                        if (verification.success && verification.status === 'PAID') {
                            await handlePaymentSuccess({
                                orderId: result.orderId,
                                paymentDetails: result.paymentDetails,
                                amount: amount,
                            }, registrationData);
                        } else {
                            // Server says payment not successful - save as unpaid
                            console.warn('Payment verification failed, saving as unpaid');
                            setIsSubmitting(false); // Reset flag
                            await handlePaymentSkip(registrationData);
                        }
                    } catch (verifyError) {
                        console.error('Payment verification error:', verifyError);
                        // If verification fails, save as unpaid to be safe
                        setIsSubmitting(false); // Reset flag
                        await handlePaymentSkip(registrationData);
                    }
                },
                // Failure callback - ASYNC to properly handle data saving
                async (error) => {
                    // Race condition check - prevent duplicate execution
                    if (callbackExecuted) {
                        console.warn('Failure callback ignored - another callback already executed');
                        return;
                    }
                    callbackExecuted = true;

                    console.log('Payment error:', error); // Debug log

                    try {
                        // Automatically submit without payment when payment fails/is aborted
                        // Pass registrationData directly instead of relying on state (which may not be updated yet)
                        await handlePaymentSkip(registrationData);
                    } catch (saveError) {
                        console.error('Failed to save application after payment failure:', saveError);
                        setIsLoading(false);
                        alert('Failed to save your application. Please try again or contact support.\n\nError: ' + saveError.message);
                    }
                }
            );
        } catch (error) {
            setIsLoading(false);
            setIsSubmitting(false); // Reset on error
            alert(error.message || 'Failed to initiate payment');
        }
    };

    // Handle payment success - save registration with payment details
    const handlePaymentSuccess = async (paymentDetails, dataToSave = null) => {
        setIsLoading(true);

        try {
            // Use provided data or fall back to state
            const registrationData = {
                ...(dataToSave || pendingRegistrationData),
                paymentStatus: 'Paid',
                paymentId: paymentDetails.orderId,
                paymentOrderId: paymentDetails.orderId, // Link to payment transaction
                transactionId: paymentDetails.paymentDetails?.transactionId || '',
                paymentAmount: paymentDetails.amount,
                paymentMethod: paymentDetails.paymentDetails?.paymentMethod || '',
                paymentDate: serverTimestamp(),
                workStatus: 'Pending',
                timestamp: serverTimestamp()
            };

            // SECURITY: Log only non-sensitive fields (no PAN, email, phone, names)
            console.log("Submitting registration:", {
                paymentStatus: registrationData.paymentStatus,
                paymentId: registrationData.paymentId,
                workStatus: registrationData.workStatus,
                registrationType: getRegistrationType(),
                // Sensitive fields redacted: applicantName, email, mobile, pan, businessName
            });
            console.log("Network Status:", navigator.onLine ? "Online" : "Offline");

            // ERROR RECOVERY: Store payment details in localStorage before Firestore save
            // If Firestore fails, user still has proof of payment
            try {
                localStorage.setItem('udyam_payment_backup', JSON.stringify({
                    paymentId: registrationData.paymentId,
                    paymentAmount: registrationData.paymentAmount,
                    timestamp: new Date().toISOString(),
                    customerEmail: registrationData.email,
                }));
            } catch (storageError) {
                console.warn('Failed to backup payment to localStorage:', storageError);
            }

            // Create a timeout promise (60 seconds for slow connections)
            const timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Firestore request timed out. Check your network connection or Firebase configuration.")), 60000)
            );

            // Race the addDoc against the timeout
            const docRef = await Promise.race([
                addDoc(collection(db, collectionName), registrationData),
                timeout
            ]);

            console.log("Document successfully written with ID:", docRef.id);

            // AUDIT TRAIL: Link payment transaction to registration
            try {
                const { updatePaymentTransaction } = await import('../services/paymentService');
                await updatePaymentTransaction(paymentDetails.orderId, {
                    registrationId: docRef.id,
                    collectionName: collectionName,
                });
                console.log("Payment transaction linked to registration:", docRef.id);
            } catch (linkError) {
                console.error("Failed to link payment transaction:", linkError);
                // Don't fail the registration if linking fails - it's non-critical
                // Transaction will be linked via webhook instead
            }

            // Track conversion in Google Ads
            if (window.gtag) {
                window.gtag('event', 'conversion', {
                    'send_to': 'AW-17796798816/jEPbCIPv4s8bEOCylqZC',
                    'value': 1.0,
                    'currency': 'INR'
                });
            }

            // Clear payment backup from localStorage on successful save
            try {
                localStorage.removeItem('udyam_payment_backup');
            } catch (e) {
                console.warn('Failed to clear payment backup:', e);
            }

            // Reset form
            setFormData({
                applicantName: '', mobile: '', email: '', officeAddress: '', pincode: '', state: '', district: '',
                socialCategory: '', orgType: '', pan: '', businessName: '',
                commencementDate: '', mainActivity: '', additionalDetails: '',
                employeesMale: '', employeesFemale: '', employeesOther: '', verificationCode: ''
            });
            setPendingRegistrationData(null);
            generateCaptcha();

            // Reset loading states BEFORE showing modal
            setIsLoading(false);
            setIsSubmitting(false);

            // Show success modal
            setSubmittedAppId(docRef.id);
            setSubmittedPaymentStatus('Paid');
            setShowSuccessModal(true);

        } catch (error) {
            console.error("Error submitting document: ", error);

            // ERROR RECOVERY: If save failed but payment succeeded, show payment ID
            const paymentId = registrationData.paymentId;
            const errorMessage = `Failed to save your application, but your payment was successful!\n\n` +
                `IMPORTANT - Save this information:\n` +
                `Payment ID: ${paymentId}\n` +
                `Amount: ₹${registrationData.paymentAmount}\n\n` +
                `Please contact support with this Payment ID to complete your registration.\n` +
                `Support: ${registrationData.email || 'support@udyam.com'}\n\n` +
                `Error: ${error.message}`;

            alert(errorMessage);

            // Don't reset form - keep data for retry
            setIsLoading(false);
            setIsSubmitting(false);
            return; // Exit without resetting form
        }
    };

    // Handle payment skip - save registration without payment
    const handlePaymentSkip = async (dataToSave = null) => {
        setIsLoading(true);

        try {
            // Use provided data or fall back to state
            const registrationData = {
                ...(dataToSave || pendingRegistrationData),
                paymentStatus: 'Unpaid',
                workStatus: 'Pending',
                timestamp: serverTimestamp()
            };

            // SECURITY: Log only non-sensitive fields (no PAN, email, phone, names)
            console.log("Saving registration without payment:", {
                paymentStatus: registrationData.paymentStatus,
                workStatus: registrationData.workStatus,
                registrationType: getRegistrationType(),
                // Sensitive fields redacted: applicantName, email, mobile, pan, businessName
            });

            // Create a timeout promise (60 seconds for slow connections)
            const timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Firestore request timed out.")), 60000)
            );

            const docRef = await Promise.race([
                addDoc(collection(db, collectionName), registrationData),
                timeout
            ]);

            console.log("Document successfully written with ID:", docRef.id);

            // Track conversion
            if (window.gtag) {
                window.gtag('event', 'conversion', {
                    'send_to': 'AW-17796798816/jEPbCIPv4s8bEOCylqZC',
                    'value': 1.0,
                    'currency': 'INR'
                });
            }

            // Show success modal
            setSubmittedAppId(docRef.id);
            setSubmittedPaymentStatus('Unpaid');
            setShowSuccessModal(true);

            // Reset form
            setFormData({
                applicantName: '', mobile: '', email: '', officeAddress: '', pincode: '', state: '', district: '',
                socialCategory: '', orgType: '', pan: '', businessName: '',
                commencementDate: '', mainActivity: '', additionalDetails: '',
                employeesMale: '', employeesFemale: '', employeesOther: '', verificationCode: ''
            });
            setPendingRegistrationData(null);
            generateCaptcha();

        } catch (error) {
            console.error("Error submitting document: ", error);
            alert(`Error submitting application: ${error.message}`);
        } finally {
            setIsLoading(false);
            setIsSubmitting(false); // Reset submission flag
        }
    };

    // Get registration type for payment modal
    const getRegistrationType = () => {
        switch (location.pathname) {
            case '/udyam-re-registration':
                return 're-registration';
            case '/update-certificate':
                return 'update-certificate';
            case '/print-certificate':
                return 'print-certificate';
            default:
                return 'registration';
        }
    };

    return (
        <>
            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                applicationId={submittedAppId}
                paymentStatus={submittedPaymentStatus}
            />

            <section className="container mx-auto px-2 py-8 font-sans">
                {/* Section Title
                <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
                    Udyam Registration Portal
                </h2> */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-orange-600 text-white text-center py-3 font-bold uppercase text-sm tracking-wide min-h-[72px] flex flex-col justify-center">
                            UDYAM REGISTRATION FORM ONLINE <br />
                            <span className="text-xs font-normal opacity-90">उद्यम पंजीकरण फॉर्म ऑनलाइन</span>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs md:text-sm bg-white">
                            {/* Row 1: Name */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">APPLICANT NAME / आवेदक का नाम <span className="text-red-600">*</span></label>
                                <input name="applicantName" value={formData.applicantName} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                            </div>

                            {/* Row 2: Mobile */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">Mobile Number / मोबाइल संख्या <span className="text-red-600">*</span></label>
                                <input name="mobile" value={formData.mobile} onChange={handleChange} required type="tel" pattern="[0-9]{10}" maxLength="10" minLength="10" title="Mobile number must be exactly 10 digits" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                            </div>

                            {/* Row 3: Email */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">Email Id / ईमेल आईडी <span className="text-red-600">*</span></label>
                                <input name="email" value={formData.email} onChange={handleChange} required type="email" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                            </div>

                            {/* Row 4: Address */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">Office Address / कार्यालय का पता <span className="text-red-600">*</span></label>
                                <input name="officeAddress" value={formData.officeAddress} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-2 py-1.5 mb-2 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                            </div>

                            {/* Row 5: Pincode, State, District */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <div>
                                    <label className="block text-gray-800 font-bold mb-1">Pincode / पिन कोड <span className="text-red-600">*</span></label>
                                    <input name="pincode" value={formData.pincode} onChange={handleChange} required type="number" pattern="[0-9]{6}" maxLength="6" minLength="6" title="Pincode must be exactly 6 digits" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                                </div>
                                <div>
                                    <label className="block text-gray-800 font-bold mb-1">State / राज्य <span className="text-red-600">*</span></label>
                                    <select name="state" value={formData.state} onChange={handleChange} required className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm">
                                        <option value="">Select State</option>
                                        {Object.keys(statesAndDistricts).sort().map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-800 font-bold mb-1">District / जिला <span className="text-red-600">*</span></label>
                                    <select
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                        disabled={!formData.state}
                                        className={`w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm ${!formData.state ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                    >
                                        <option value="">Select District</option>
                                        {formData.state && statesAndDistricts[formData.state]?.sort().map(district => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Row 6: Social & Org Type */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm space-y-3">
                                <div>
                                    <label className="block text-gray-800 font-bold mb-1">Social Category / सामाजिक श्रेणी <span className="text-red-600">*</span></label>
                                    <select name="socialCategory" value={formData.socialCategory} onChange={handleChange} required className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm">
                                        <option value="">--Select--</option>
                                        <option value="General">General</option>
                                        <option value="OBC">OBC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-800 font-bold mb-1">Type Of Organisation / संगठन का प्रकार <span className="text-red-600">*</span></label>
                                    <select name="orgType" value={formData.orgType} onChange={handleChange} required className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm">
                                        <option value="">--Select--</option>
                                        <option value="Proprietorship Firm">Proprietorship</option>
                                        <option value="Partnership Firm">Partnership Firm</option>
                                        <option value="Hindu Undivided Family">Hindu Undivided Family</option>
                                        <option value="Limited Liability Partnership">Limited Liability Partnership</option>
                                        <option value="Private Limited">Private Limited</option>
                                        <option value="Public Limited">Public Limited</option>
                                        <option value="Self Help Group">Self Help Group</option>
                                        <option value="Government Department">Government Department</option>
                                        <option value="Society">Society</option>
                                        <option value="Trust">Trust</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row 7: PAN */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">Pan Card Number / पैन कार्ड नंबर <span className="text-red-600">*</span></label>
                                <input name="pan" value={formData.pan} onChange={handleChange} required type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 uppercase rounded-sm" />
                            </div>


                            {/* Row 8: Business Name */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">Business Name / व्यवास्यक नाम</label>
                                <input name="businessName" value={formData.businessName} onChange={handleChange} type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                            </div>

                            {/* Row 10: Date, Main Activity */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm space-y-3">
                                <div>
                                    <label className="block text-gray-800 font-bold mb-1">Date Of Commencement Of Business / व्यवसाय के प्रारंभ होने की तिथि</label>
                                    <input name="commencementDate" value={formData.commencementDate} onChange={handleChange} type="date" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                                </div>
                                <div>
                                    <label className="block text-gray-800 font-bold mb-1">Main Business Activity Of Enterprise / उद्यम की मुख्य व्यावसायिक गतिविधि</label>
                                    <select name="mainActivity" value={formData.mainActivity} onChange={handleChange} className="w-full border border-gray-300 px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white rounded-sm">
                                        <option value="">--Select--</option>
                                        <option value="Manufacturer">Manufacturer</option>
                                        <option value="Service Provider">Service Provider</option>
                                        <option value="Trader">Trader [NEWLY INTRODUCED BY GOVT OF INDIA]</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row 11: Additional Details (New) */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-1">Additional Details About Business / व्यापार के बारे में अतिरिक्त विवरण</label>
                                <input name="additionalDetails" value={formData.additionalDetails} onChange={handleChange} type="text" className="w-full border border-gray-300 px-2 py-1.5 bg-[#fffaf4] focus:outline-none focus:border-blue-500 rounded-sm" />
                            </div>

                            {/* Row 12: Employees */}
                            <div className="bg-[#fffbef] p-3 border border-orange-200 rounded-sm">
                                <label className="block text-gray-800 font-bold mb-2">Number of persons employed / व्यक्ति नियोजित</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <span className="block text-xs mb-1">Male / पुरुष</span>
                                        <input name="employeesMale" value={formData.employeesMale} onChange={handleChange} type="number" min="0" className="w-full border border-gray-300 px-2 py-1 rounded-sm" />
                                    </div>
                                    <div>
                                        <span className="block text-xs mb-1">Female / महिला</span>
                                        <input name="employeesFemale" value={formData.employeesFemale} onChange={handleChange} type="number" min="0" className="w-full border border-gray-300 px-2 py-1 rounded-sm" />
                                    </div>
                                    <div>
                                        <span className="block text-xs mb-1">Other / अन्य</span>
                                        <input name="employeesOther" value={formData.employeesOther} onChange={handleChange} type="number" min="0" className="w-full border border-gray-300 px-2 py-1 rounded-sm" />
                                    </div>
                                    <div>
                                        <span className="block text-xs mb-1">Total / संपूर्ण</span>
                                        <input value={calculateTotalEmployees()} type="number" className="w-full border border-gray-300 px-2 py-1 bg-gray-100 rounded-sm" readOnly />
                                    </div>
                                </div>
                            </div>

                            {/* Agreement */}
                            <div className="bg-orange-100 p-3 border border-orange-200 rounded-sm">
                                <label className="flex items-start space-x-2">
                                    <input type="checkbox" required className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500" />
                                    <span className="text-xs font-semibold text-gray-800">
                                        I AGREE TO THE <Link to="/terms-of-service" className="text-blue-600 underline" target="_blank">TERMS OF SERVICE [UPDATED]</Link>
                                        <br />
                                        I, the applicant agree to share Details / Passcodes etc as & when required for the purpose of Udyam Certificate Generation.[UPDATED]
                                    </span>
                                </label>
                            </div>

                            {/* Submit */}
                            <div className="space-y-2">
                                <label className="block text-gray-800 font-bold text-xs">Verfication Code</label>
                                <div className="flex gap-2 items-center">
                                    <div className="flex-grow max-w-[200px]">
                                        <input name="verificationCode" value={formData.verificationCode} onChange={handleChange} type="text" placeholder="Verification Code *" className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 rounded-sm" />
                                    </div>
                                    {/* Captcha Placeholder */}
                                    <div className="bg-black text-white px-4 py-2 font-mono tracking-widest text-lg font-bold select-none cursor-pointer" onClick={generateCaptcha} title="Click to refresh">
                                        {captchaCode}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={isLoading} className={`bg-blue-600 text-white font-bold py-3 px-8 rounded shadow hover:bg-blue-700 w-full md:w-auto uppercase text-sm transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                {isLoading ? 'Submitting...' : 'Submit Application'}
                            </button>

                        </form>
                    </div>

                    {/* Right Column: Instructions (1 col) */}
                    <div className="bg-white border border-blue-100 shadow-md rounded overflow-hidden flex flex-col">
                        <div className="bg-orange-600 text-white text-center py-3 font-bold text-sm uppercase tracking-wide min-h-[72px] flex flex-col justify-center">
                            READ THE INSTRUCTION TO FILL UDYAM APPLICATION FORM <br />
                            <span className="text-xs opacity-90 font-normal">उद्यम आवेदन पत्र भरने के लिए निर्देश पढ़ें</span>
                        </div>
                        {/* Scrollable container if content is too long compared to form, or just regular */}
                        <div className="bg-white p-5 text-sm text-gray-800 space-y-5 leading-relaxed font-medium flex-grow">
                            <p>
                                <span className="font-bold">Applicant Name :</span> Name Of The Applicant Should Exactly Match With His Name Printed On Aadhaar Card. <br />
                                <span className="text-gray-600">आवेदक का नाम आधार कार्ड पर छपे उसके नाम से बिल्कुल मेल खाना चाहिए।</span>
                            </p>
                            <p>
                                <span className="font-bold">Mobile Number :</span> Mobile Numbers Must Be Ten Digits. Do Not Add Country Code (+91). <br />
                                <span className="text-gray-600">मोबाइल नंबर दस अंकों का होना चाहिए। कंट्री कोड (+91) न जोड़ें।</span>
                            </p>
                            <p>
                                <span className="font-bold">Email Id :</span> Enter A Legitimate Email Address, Since All Communications Will Be Done On Registered Email Address Only. <br />
                                <span className="text-gray-600">अपना वैध ईमेल पता दर्ज करें, क्योंकि सभी कम्युनिकेशन केवल रजिस्टर्ड ईमेल पते पर ही किए जाएंगे।</span>
                            </p>
                            <p>
                                <span className="font-bold">Plant Address :</span> Please Provide Your Complete Plant Address, Including State And Pincode, In The Plant Address Field. <br />
                                <span className="text-gray-600">प्लांट का पूरा पता, राज्य और पिनकोड सहित डाले|</span>
                            </p>
                            <p>
                                <span className="font-bold">Office Address :</span> Enter Your Complete Office Address Including State, And Pin Code. <br />
                                <span className="text-gray-600">कार्यालय का पूरा पता, राज्य और पिनकोड सहित, दर्ज करें।</span>
                            </p>
                            <p>
                                <span className="font-bold">Annual Turnover :</span> Applicant Need To Mention His / Her Annual Turnover. <br />
                                <span className="text-gray-600">आवेदक अपना वार्षिक कारोबार दर्ज कर सकता है</span>
                            </p>
                            <p>
                                <span className="font-bold">Social Category :</span> Choose Your Social Category From The Drop Down Menu, Viz, General, OBC, SC, ST. <br />
                                <span className="text-gray-600">ड्रॉप डाउन मेनू से अपनी सामाजिक श्रेणी का चयन करे, जैसे सामान्य, ओबीसी, एससी, एसटी।</span>
                            </p>
                            <p>
                                <span className="font-bold">PAN Card Number :</span> Please Enter Your 10 Digit Pan Card Number. <br />
                                <span className="text-gray-600">अपने १० अंको का पैन कार्ड नंबर दर्ज करें।</span>
                            </p>

                            <p>
                                <span className="font-bold">Date Of Commencement Of Business :</span> Mention The Date Your Business began Operations. <br />
                                <span className="text-gray-600">व्यवसाय के प्रारंभ होने की तारीख दर्ज करें, जिसे प्रमाणपत्र पर उल्लिखित किया जाएगा।</span>
                            </p>
                            <p>
                                <span className="font-bold">Type Of Organization :</span> Please Select Your Organization Type From Drop Down Menu. <br />
                                <span className="text-gray-600">आवेदकों को अपने संगठन के प्रकार को ड्रॉप डाउन मेनू से चुनना आवश्यक है, क्योंकि यह प्रमाणपत्र पर छापा जाएगा।</span>
                            </p>
                            <p>
                                <span className="font-bold">Main Business Activity Of Enterprise :</span> Please Choose The Primary Business Activity From The Drop Down Menu Viz Manufacturing / Trading / Service Provider. <br />
                                <span className="text-gray-600">उद्यम की मुख्य व्यवसायिक गतिविधि का चयन करें viz मैन्युफैक्चरिंग / ट्रेडिंग / सर्विस प्रोवाइडर ।</span>
                            </p>
                            <p>
                                <span className="font-bold">ADDITIONAL BUSINESS DETAILS :</span> Mention What Your Busiess Does Ex : Computer Manufacturar / Cloth Shop / Road Contractor. <br />
                                <span className="text-gray-600">उल्लेख करें कि आपका व्यवसाय क्या है, उदाहरणार्थ: कंप्यूटर निर्माता/कपड़े की दुकान/सड़क ठेकेदार।</span>
                            </p>
                            <p>
                                <span className="font-bold">Number Of Employees :</span> Please Indicate The Number Of Current Employees In Your Organization. <br />
                                <span className="text-gray-600">कृपया आपके संगठन में कार्यरत कर्मचारियों की संख्या दर्ज करें।</span>
                            </p>
                            <p>
                                <span className="font-bold">Investment In Plant & Machinery / Equipment :</span> Enter The Total Investment Made By The Applicant In Plant Machinery, Equipment Etc. <br />
                                <span className="text-gray-600">संयंत्र, मशीनरी, और उपकरण आदि में किए गए निवेश का योगदान करें।</span>
                            </p>
                            <div className="mt-4 p-2 bg-yellow-100 border border-yellow-200 rounded text-[13px] text-gray-700">
                                <span className="font-bold">SUBMIT APPLICATION :</span> Once All Required Information Has Been Entered And Documents Have Been Attached Click On The “Submit Application” Button. <br />
                                <span className="text-gray-600">कृपया सभी आवश्यक जानकारी और दस्तावेज जमा किए जाने पर "आवेदन सबमिट करें" बटन पर क्लिक करें।</span>
                            </div>
                        </div>
                    </div>
                </div >

            </section >

            {/* Loading Spinner Overlay */}
            {isLoading && loadingMessage && (
                <div className="fixed inset-0 bg-white/95 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
                        <p className="text-gray-800 font-semibold text-lg">{loadingMessage}</p>
                        <p className="text-gray-600 text-sm mt-1">Please wait...</p>
                    </div>
                </div>
            )}
        </>
    );
}

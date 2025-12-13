import React, { useState } from 'react';
import { X, CreditCard, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { initiateCashfreePayment, getPaymentAmount } from '../services/paymentService';

export default function PaymentModal({
    isOpen,
    onClose,
    registrationData,
    registrationType = "registration",
    onPaymentSuccess,
    onPaymentSkip
}) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'failed', null
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen) return null;

    const amount = getPaymentAmount(registrationType);

    const handlePayNow = async () => {
        setIsProcessing(true);
        setPaymentStatus(null);
        setErrorMessage('');

        try {
            // Validate required fields
            if (!registrationData.applicantName || !registrationData.email || !registrationData.mobile) {
                throw new Error('Missing required customer information. Please fill out all required fields.');
            }

            const paymentData = {
                amount: amount,
                customerName: registrationData.applicantName,
                customerEmail: registrationData.email,
                customerPhone: registrationData.mobile,
                registrationType: registrationType,
            };

            await initiateCashfreePayment(
                paymentData,
                // Success callback
                (result) => {
                    setPaymentStatus('success');
                    setIsProcessing(false);

                    // Call parent success handler with payment details
                    if (onPaymentSuccess) {
                        onPaymentSuccess({
                            orderId: result.orderId,
                            paymentDetails: result.paymentDetails,
                            amount: amount,
                        });
                    }
                },
                // Failure callback
                (error) => {
                    setPaymentStatus('failed');

                    // Handle different error types
                    if (error.code === 'USER_CANCELLED') {
                        setErrorMessage('Payment was cancelled. You can try again or skip payment.');
                    } else if (error.code === 'CHECKOUT_ERROR') {
                        setErrorMessage('Unable to open payment checkout. Please try again.');
                    } else {
                        setErrorMessage(error.message || 'Payment failed. Please try again.');
                    }

                    setIsProcessing(false);
                }
            );
        } catch (error) {
            setPaymentStatus('failed');
            setErrorMessage(error.message || 'Failed to initiate payment');
            setIsProcessing(false);
        }
    };

    const handleSkipPayment = () => {
        if (onPaymentSkip) {
            onPaymentSkip();
        }
        onClose();
    };

    const handleRetry = () => {
        setPaymentStatus(null);
        setErrorMessage('');
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full animate-fadeIn">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-lg relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                        disabled={isProcessing}
                    >
                        <X size={20} />
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="bg-white/20 p-3 rounded-full">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Payment</h2>
                            <p className="text-sm text-blue-100">Secure Payment Gateway</p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6">
                    {/* Payment Status Messages */}
                    {paymentStatus === 'success' && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="font-semibold text-green-800">Payment Successful!</p>
                                <p className="text-sm text-green-700">Your payment has been processed successfully.</p>
                            </div>
                        </div>
                    )}

                    {paymentStatus === 'failed' && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                            <div className="flex-grow">
                                <p className="font-semibold text-red-800">Payment Failed</p>
                                <p className="text-sm text-red-700">{errorMessage}</p>
                            </div>
                        </div>
                    )}

                    {/* Order Summary */}
                    {!paymentStatus && (
                        <>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Service</span>
                                        <span className="font-medium text-gray-800">
                                            {registrationType === 're-registration' ? 'Udyam Re-Registration' :
                                                registrationType === 'update-certificate' ? 'Update Certificate' :
                                                    registrationType === 'print-certificate' ? 'Print Certificate' :
                                                        'Udyam Registration'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Applicant</span>
                                        <span className="font-medium text-gray-800">{registrationData.applicantName}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Email</span>
                                        <span className="font-medium text-gray-800 truncate max-w-[200px]">{registrationData.email}</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-2 mt-2">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-800">Total Amount</span>
                                            <span className="font-bold text-blue-600 text-lg">₹{amount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-xs text-blue-800">
                                    <strong>Secure Payment:</strong> Your payment is processed through Cashfree's secure payment gateway.
                                    We accept UPI, Cards, Net Banking, and Wallets.
                                </p>
                            </div>
                        </>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {!paymentStatus && (
                            <>
                                <button
                                    onClick={handlePayNow}
                                    disabled={isProcessing}
                                    className={`w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard size={20} />
                                            <span>Pay ₹{amount} Now</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleSkipPayment}
                                    disabled={isProcessing}
                                    className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    Skip Payment (Pay Later)
                                </button>
                            </>
                        )}

                        {paymentStatus === 'failed' && (
                            <>
                                <button
                                    onClick={handleRetry}
                                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Retry Payment
                                </button>
                                <button
                                    onClick={handleSkipPayment}
                                    className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Skip Payment (Pay Later)
                                </button>
                            </>
                        )}

                        {paymentStatus === 'success' && (
                            <button
                                onClick={onClose}
                                className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Continue
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

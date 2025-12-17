import React, { useState } from "react";
import { X, Mail, ArrowRight, Check, AlertCircle } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ForgotPasswordModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email) {
            setError("Please enter your email address.");
            setIsLoading(false);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/user-not-found') {
                // For security, checking user existence can be tricky, but Firebase usually throws this
                setError("No account found with this email.");
            } else if (err.code === 'auth/invalid-email') {
                setError("Invalid email address format.");
            } else {
                setError("Failed to send reset email. " + err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        // Reset state on close
        setEmail("");
        setError("");
        setSuccess(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-800">
                        Reset Password
                    </h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {success ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                                <Check size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Check your email</h4>
                            <p className="text-gray-600 mb-6">
                                We've sent a password reset link to <br />
                                <span className="font-semibold text-gray-800">{email}</span>
                            </p>
                            <button
                                onClick={handleClose}
                                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20"
                            >
                                Back to Login
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <p className="text-gray-600 text-sm">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>

                            {error && (
                                <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-2">
                                    <AlertCircle size={18} className="flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                                        placeholder="admin@example.com"
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3.5 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${isLoading
                                        ? "bg-blue-400 cursor-not-allowed shadow-none"
                                        : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5"
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending Link...
                                    </>
                                ) : (
                                    <>
                                        Send Reset Link
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

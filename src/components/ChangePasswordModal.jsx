import React, { useState } from "react";
import { X, Lock, Key, Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { auth } from "../firebase";

export default function ChangePasswordModal({ isOpen, onClose }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        // Validate passwords
        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters long.");
            setIsLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            setIsLoading(false);
            return;
        }

        const user = auth.currentUser;
        if (!user || !user.email) {
            setError("No user is currently logged in.");
            setIsLoading(false);
            return;
        }

        try {
            // 1. Re-authenticate
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            // 2. Update Password
            await updatePassword(user, newPassword);

            setSuccess("Password updated successfully!");

            // Clear form
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            // Close modal after delay
            setTimeout(() => {
                onClose();
                setSuccess("");
            }, 2000);

        } catch (err) {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
                setError("Incorrect current password.");
            } else if (err.code === 'auth/too-many-requests') {
                setError("Too many attempts. Please try again later.");
            } else {
                setError("Failed to update password. " + err.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Key className="w-5 h-5 text-blue-600" />
                        Change Password
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-2">
                            <AlertCircle size={18} className="flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm px-4 py-3 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-2">
                            <Check size={18} className="flex-shrink-0" />
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Current Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                                    placeholder="Enter current password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                                    placeholder="At least 6 characters"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                                    placeholder="Re-enter new password"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-2 flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || success}
                                className={`flex-1 px-4 py-2.5 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${isLoading || success
                                    ? "bg-blue-400 cursor-not-allowed shadow-none"
                                    : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5"
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : success ? (
                                    <>
                                        <Check size={18} />
                                        Updated
                                    </>
                                ) : (
                                    "Update Password"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

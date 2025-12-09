import React from 'react';
import { CheckCircle, X, Copy, Check } from 'lucide-react';

export default function SuccessModal({ isOpen, onClose, applicationId }) {
    const [copied, setCopied] = React.useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(applicationId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header with success icon */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CheckCircle className="text-emerald-500" size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Application Submitted!</h2>
                    <p className="text-emerald-100 mt-2 text-sm">Your UDYAM registration has been received successfully.</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2 text-center">Your Application ID</p>
                        <div className="flex items-center justify-center gap-2">
                            <code className="text-lg font-mono font-bold text-gray-800 bg-white px-4 py-2 rounded-lg border border-gray-200">
                                {applicationId}
                            </code>
                            <button
                                onClick={handleCopy}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Copy ID"
                            >
                                {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                            </button>
                        </div>
                        {copied && (
                            <p className="text-xs text-emerald-600 text-center mt-2 font-medium">Copied to clipboard!</p>
                        )}
                    </div>

                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-xs text-amber-800 text-center">
                            <span className="font-bold">Important:</span> Please save this ID for future reference. You will need it to track your application status.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

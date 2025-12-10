import React from 'react';
import { X, Printer, FileText, User, MapPin, CreditCard, Clock, CheckCircle, Hash, Building2, XCircle } from 'lucide-react';

export default function CancelRegistrationViewModal({ isOpen, onClose, data, onPaymentStatusUpdate, onWorkStatusUpdate }) {
    if (!isOpen || !data) return null;

    const isPaid = data.paymentStatus === 'Paid' || data.paymentStatus === 'Successful';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-lg text-red-600">
                            <XCircle size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Cancel Registration Details</h2>
                            <p className="text-xs text-gray-500 font-mono">ID: {data.id}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Payment Status */}
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment:</span>
                            <select
                                value={isPaid ? 'Paid' : 'Unpaid'}
                                onChange={(e) => onPaymentStatusUpdate(data.id, e.target.value)}
                                className={`font-bold text-sm bg-transparent cursor-pointer outline-none ${isPaid ? 'text-emerald-600' : 'text-orange-600'}`}
                            >
                                <option value="Unpaid" className="text-orange-600 font-bold">Unpaid</option>
                                <option value="Paid" className="text-emerald-600 font-bold">Paid</option>
                            </select>
                        </div>

                        {/* Work Status (only show if paid) */}
                        {isPaid && (
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Work:</span>
                                <select
                                    value={data.workStatus || 'Pending'}
                                    onChange={(e) => onWorkStatusUpdate(data.id, e.target.value)}
                                    className={`font-bold text-sm bg-transparent cursor-pointer outline-none ${data.workStatus === 'Completed' ? 'text-emerald-600' : 'text-blue-600'}`}
                                >
                                    <option value="Pending" className="text-blue-600 font-bold">Pending</option>
                                    <option value="Completed" className="text-emerald-600 font-bold">Completed</option>
                                </select>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => window.print()}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Print Details"
                            >
                                <Printer size={20} />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-white">

                    {/* Status Banner */}
                    <div className="mb-6 flex items-center justify-between bg-red-50 p-4 rounded-lg border border-red-100">
                        <div className="flex gap-8">
                            <div>
                                <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">Payment Status</span>
                                <span className={`font-bold flex items-center gap-1 ${isPaid ? 'text-emerald-600' : 'text-orange-600'}`}>
                                    {isPaid ? <CreditCard size={14} /> : <Clock size={14} />}
                                    {isPaid ? 'Paid' : 'Unpaid'}
                                </span>
                            </div>
                            {isPaid && (
                                <div>
                                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">Work Status</span>
                                    <span className={`font-bold flex items-center gap-1 ${data.workStatus === 'Completed' ? 'text-emerald-600' : 'text-blue-600'}`}>
                                        {data.workStatus === 'Completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                        {data.workStatus || 'Pending'}
                                    </span>
                                </div>
                            )}
                            <div>
                                <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">Applied On</span>
                                <span className="font-semibold text-gray-700">{data.date}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Section: Applicant Details */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <User size={16} className="text-red-500" /> Applicant Information
                            </h3>
                            <div className="grid grid-cols-1 gap-y-3 text-sm">
                                <DetailRow label="Applicant Name" value={data.applicantName} />
                                <DetailRow label="Mobile Number" value={data.mobile} />
                                <DetailRow label="Email ID" value={data.email} />
                            </div>
                        </div>

                        {/* Section: Business Details */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <Building2 size={16} className="text-orange-500" /> Business Details
                            </h3>
                            <div className="grid grid-cols-1 gap-y-3 text-sm">
                                <DetailRow label="Udyam Number" value={data.udyamNumber} />
                                <DetailRow label="Business Name" value={data.businessName} />
                                <DetailRow label="State" value={data.state} />
                            </div>
                        </div>

                        {/* Section: Cancellation Details */}
                        <div className="space-y-4 md:col-span-2">
                            <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                                <XCircle size={16} className="text-red-500" /> Cancellation Details
                            </h3>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide block mb-1">Type of Cancellation</span>
                                <span className="text-red-700 font-bold text-lg">{data.cancellationType || 'N/A'}</span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
            <span className="text-gray-900 font-semibold break-words">{value || 'N/A'}</span>
        </div>
    );
}

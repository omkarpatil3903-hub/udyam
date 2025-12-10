import React, { useState } from 'react';
import { X, Printer, FileText, User, MapPin, Building2, CreditCard, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function RegistrationViewModal({ isOpen, onClose, data, onPaymentStatusUpdate, onWorkStatusUpdate }) {
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', newValue: '' });

    if (!isOpen || !data) return null;

    // Handle backward compatibility
    const isPaid = data.paymentStatus === 'Paid' || data.paymentStatus === 'Successful';
    const isUnpaid = data.paymentStatus === 'Unpaid' || data.paymentStatus === 'Pending';

    const handlePaymentChange = (e) => {
        const newValue = e.target.value;
        setConfirmModal({ isOpen: true, type: 'payment', newValue });
    };

    const handleWorkChange = (e) => {
        const newValue = e.target.value;
        setConfirmModal({ isOpen: true, type: 'work', newValue });
    };

    const confirmStatusChange = () => {
        if (confirmModal.type === 'payment') {
            onPaymentStatusUpdate(data.id, confirmModal.newValue);
        } else if (confirmModal.type === 'work') {
            onWorkStatusUpdate(data.id, confirmModal.newValue);
        }
        setConfirmModal({ isOpen: false, type: '', newValue: '' });
    };

    const cancelStatusChange = () => {
        setConfirmModal({ isOpen: false, type: '', newValue: '' });
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg md:max-w-4xl lg:max-w-6xl max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">

                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                <FileText size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Application Details</h2>
                                <p className="text-xs text-gray-500 font-mono">ID: {data.id}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Payment Status */}
                            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm relative z-10">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment:</span>
                                <button
                                    type="button"
                                    onClick={() => alert('BUTTON WORKS!')}
                                    className={`font-bold text-sm px-2 py-1 rounded cursor-pointer ${isPaid ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}
                                >
                                    {isPaid ? 'Paid ✓' : 'Unpaid'}
                                </button>
                            </div>

                            {/* Work Status (only show if paid) */}
                            {isPaid && (
                                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Work:</span>
                                    <button
                                        onClick={() => {
                                            const newValue = data.workStatus === 'Completed' ? 'Pending' : 'Completed';
                                            if (window.confirm(`Are you sure you want to change the work status to "${newValue}"?`)) {
                                                onWorkStatusUpdate(data.id, newValue);
                                            }
                                        }}
                                        className={`font-bold text-sm px-2 py-1 rounded ${data.workStatus === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}
                                    >
                                        {data.workStatus === 'Completed' ? 'Completed ✓' : 'Pending'}
                                    </button>
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
                    <div className="flex-1 overflow-y-auto p-6 bg-white custom-scrollbar">

                        {/* Status Banner */}
                        <div className="mb-6 flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="flex gap-8">
                                <div>
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">Payment Status</span>
                                    <span className={`font-bold flex items-center gap-1 ${isPaid ? 'text-emerald-600' : 'text-orange-600'}`}>
                                        {isPaid ? <CreditCard size={14} /> : <Clock size={14} />}
                                        {isPaid ? 'Paid' : 'Unpaid'}
                                    </span>
                                </div>
                                {isPaid && (
                                    <div>
                                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">Work Status</span>
                                        <span className={`font-bold flex items-center gap-1 ${data.workStatus === 'Completed' ? 'text-emerald-600' : 'text-blue-600'}`}>
                                            {data.workStatus === 'Completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                            {data.workStatus || 'Pending'}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">Applied On</span>
                                    <span className="font-semibold text-gray-700">{data.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Section: Applicant Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                                    <User size={16} className="text-blue-500" /> Applicant Information
                                </h3>
                                <div className="grid grid-cols-1 gap-y-3 text-sm">
                                    <DetailRow label="Applicant Name" value={data.applicantName} />
                                    <DetailRow label="Mobile Number" value={data.mobile} />
                                    <DetailRow label="Email ID" value={data.email} />
                                    <DetailRow label="Social Category" value={data.socialCategory} />
                                    <DetailRow label="PAN Number" value={data.pan?.toUpperCase()} />
                                </div>
                            </div>

                            {/* Section: Business Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                                    <Building2 size={16} className="text-orange-500" /> Enterprise Details
                                </h3>
                                <div className="grid grid-cols-1 gap-y-3 text-sm">
                                    <DetailRow label="Business Name" value={data.businessName} />
                                    <DetailRow label="Organization Type" value={data.orgType} />
                                    <DetailRow label="Commencement Date" value={data.commencementDate} />
                                    <DetailRow label="Main Activity" value={data.mainActivity} />
                                    <DetailRow label="Additional Details" value={data.additionalDetails} />
                                </div>
                            </div>

                            {/* Section: Address */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                                    <MapPin size={16} className="text-red-500" /> Location
                                </h3>
                                <div className="grid grid-cols-1 gap-y-3 text-sm">
                                    <DetailRow label="Office Address" value={data.officeAddress} />
                                    <DetailRow label="District" value={data.district} />
                                    <DetailRow label="State" value={data.state} />
                                    <DetailRow label="Pincode" value={data.pincode} />
                                </div>
                            </div>

                            {/* Section: Employment */}
                            <div className="space-y-4 md:col-span-3">
                                <h3 className="text-sm font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                                    <Users size={16} className="text-purple-500" /> Employment Details
                                </h3>
                                <div className="flex gap-4 items-center">
                                    <div className="flex-1 bg-gray-50 p-3 rounded border border-gray-100 text-center">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Male</div>
                                        <div className="font-bold text-gray-800 text-lg">{data.employeesMale || 0}</div>
                                    </div>
                                    <div className="flex-1 bg-gray-50 p-3 rounded border border-gray-100 text-center">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Female</div>
                                        <div className="font-bold text-gray-800 text-lg">{data.employeesFemale || 0}</div>
                                    </div>
                                    <div className="flex-1 bg-gray-50 p-3 rounded border border-gray-100 text-center">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Other</div>
                                        <div className="font-bold text-gray-800 text-lg">{data.employeesOther || 0}</div>
                                    </div>
                                    <div className="flex-1 bg-blue-50 p-3 rounded border border-blue-100 text-center">
                                        <div className="text-xs text-blue-500 uppercase tracking-wider mb-1">Total</div>
                                        <div className="font-bold text-blue-800 text-lg">{data.totalEmployees}</div>
                                    </div>
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

            {/* Confirmation Modal */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Status Change</h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Are you sure you want to change the {confirmModal.type === 'payment' ? 'payment' : 'work'} status to <span className="font-bold text-blue-600">{confirmModal.newValue}</span>?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={cancelStatusChange}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmStatusChange}
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function DetailRow({ label, value, fullWidth }) {
    return (
        <div className={`flex flex-col ${fullWidth ? 'md:col-span-2' : ''}`}>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
            <span className="text-gray-900 font-semibold break-words">{value || 'N/A'}</span>
        </div>
    );
}

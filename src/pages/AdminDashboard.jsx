import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { LayoutDashboard, CreditCard, Clock, User, Phone, Mail, Building2, FileText, Search, LogOut, CheckCircle, Eye, TrendingUp, AlertCircle } from 'lucide-react';
import RegistrationViewModal from '../components/RegistrationViewModal';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard({ onLogout }) {
    const [activeTab, setActiveTab] = useState('pending');
    const [registrations, setRegistrations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const q = query(collection(db, "registrations"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRegistrations(data);
        });
        return () => unsubscribe();
    }, []);

    const handleViewClick = (item) => {
        setSelectedRegistration(item);
        setIsViewModalOpen(true);
    };

    const handleLogoutClick = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout && onLogout) {
            onLogout(); // This calls signOut(auth) from App.jsx
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            if (!id) return;
            const registrationRef = doc(db, "registrations", id);
            await updateDoc(registrationRef, { paymentStatus: newStatus });
            if (selectedRegistration && selectedRegistration.id === id) {
                setSelectedRegistration(prev => ({ ...prev, paymentStatus: newStatus }));
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const filteredData = registrations.filter(item => {
        const matchesSearch =
            item.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.mobile?.includes(searchTerm) ||
            item.id?.toLowerCase().includes(searchTerm.toLowerCase());

        if (activeTab === 'pending') return item.paymentStatus === 'Pending' && matchesSearch;
        if (activeTab === 'successful') return item.paymentStatus === 'Successful' && matchesSearch;
        return matchesSearch;
    });

    const pendingCount = registrations.filter(i => i.paymentStatus === 'Pending').length;
    const successCount = registrations.filter(i => i.paymentStatus === 'Successful').length;

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100 font-sans text-slate-800">
            <RegistrationViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                data={selectedRegistration}
                onStatusUpdate={handleStatusUpdate}
            />

            {/* Premium Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white flex flex-col shadow-2xl z-30">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                            <LayoutDashboard className="text-white" size={22} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight">UDYAM</h1>
                            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Admin Portal</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-3">Navigation</p>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all">
                        <FileText size={18} />
                        <span className="font-semibold text-sm">Applications</span>
                        <span className="ml-auto bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full">{registrations.length}</span>
                    </button>
                </nav>

                {/* User Profile Section */}
                <div className="p-4 border-t border-white/10 bg-slate-800/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-lg">
                            AD
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold">Administrator</p>
                            <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{auth.currentUser?.email || 'admin@udyam.gov.in'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogoutClick}
                        className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-white px-4 py-2.5 rounded-lg hover:bg-white/5 border border-white/10 transition-all text-sm"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 h-16 px-6 flex justify-between items-center sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
                        <span className="text-xs text-gray-400">/ Applications</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search by ID, name, or phone..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 w-72 bg-white/80 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Total Applications</p>
                                    <p className="text-3xl font-black text-gray-900">{registrations.length}</p>
                                    <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                                        <TrendingUp size={12} /> All time records
                                    </p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                                    <FileText size={22} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => setActiveTab('pending')}
                            className={`bg-white rounded-2xl p-5 shadow-sm border cursor-pointer hover:shadow-lg transition-all duration-300 group ${activeTab === 'pending' ? 'border-orange-300 ring-2 ring-orange-100' : 'border-gray-100'}`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Pending Review</p>
                                    <p className="text-3xl font-black text-gray-900">{pendingCount}</p>
                                    <p className="text-xs text-orange-600 font-medium mt-2 flex items-center gap-1">
                                        <AlertCircle size={12} /> Needs attention
                                    </p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                                    <Clock size={22} className="text-white" />
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => setActiveTab('successful')}
                            className={`bg-white rounded-2xl p-5 shadow-sm border cursor-pointer hover:shadow-lg transition-all duration-300 group ${activeTab === 'successful' ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-gray-100'}`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Completed</p>
                                    <p className="text-3xl font-black text-gray-900">{successCount}</p>
                                    <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                                        <CheckCircle size={12} /> Successfully processed
                                    </p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                                    <CheckCircle size={22} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Table Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-gray-900">Applications</h3>
                                <div className="flex bg-white rounded-lg p-0.5 border border-gray-200">
                                    <button
                                        onClick={() => setActiveTab('pending')}
                                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'pending' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Pending ({pendingCount})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('successful')}
                                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === 'successful' ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        Completed ({successCount})
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">
                                Showing <span className="font-bold text-gray-700">{filteredData.length}</span> results
                            </p>
                        </div>

                        {/* Table Content */}
                        <div className="divide-y divide-gray-100">
                            {/* Column Headers */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                <div className="col-span-3">Application ID</div>
                                <div className="col-span-3">Applicant</div>
                                <div className="col-span-2">Contact</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-2 text-right">Actions</div>
                            </div>

                            {/* Table Rows */}
                            {filteredData.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-50/50 transition-colors group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                                >
                                    <div className="col-span-3">
                                        <p className="font-bold text-gray-900 text-sm">{item.id}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                                    </div>
                                    <div className="col-span-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">{item.applicantName}</p>
                                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Building2 size={10} /> {item.businessName || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-sm text-gray-700 font-mono">{item.mobile}</p>
                                        <p className="text-xs text-gray-400 truncate">{item.email}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <div
                                            className="inline-flex items-center gap-1.5 cursor-pointer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <select
                                                value={item.paymentStatus}
                                                onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                                                className={`text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer border-0 outline-none appearance-none pr-7 ${item.paymentStatus === 'Pending'
                                                    ? 'bg-orange-100 text-orange-700'
                                                    : 'bg-emerald-100 text-emerald-700'
                                                    }`}
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 8px center',
                                                    backgroundSize: '14px'
                                                }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Successful">Completed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-2">
                                        <button
                                            onClick={() => handleViewClick(item)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                        >
                                            <Eye size={14} />
                                            View
                                        </button>
                                        {item.paymentStatus === 'Pending' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusUpdate(item.id, 'Successful');
                                                }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                                            >
                                                <CheckCircle size={14} />
                                                Approve
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredData.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                                    <FileText size={32} className="text-gray-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-400">No applications found</h3>
                                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

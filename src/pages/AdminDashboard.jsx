import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { LayoutDashboard, CreditCard, Clock, User, Phone, Mail, Building2, Calendar, FileText, ChevronRight, Search, Bell, LogOut, CheckCircle } from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
    const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'successful'
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "registrations"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRegistrations(data);
        });
        return () => unsubscribe();
    }, []);

    // Filter Logic
    const filteredData = registrations.filter(item =>
        activeTab === 'pending' ? item.paymentStatus === 'Pending' : item.paymentStatus === 'Successful'
    );

    // Stats
    const pendingCount = registrations.filter(i => i.paymentStatus === 'Pending').length;
    const successCount = registrations.filter(i => i.paymentStatus === 'Successful').length;

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-slate-800">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl transition-all duration-300 z-30">
                <div className="p-8 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
                            <LayoutDashboard className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-white">UDYAM ADMIN</h1>
                            <p className="text-xs text-slate-400 font-medium tracking-wider uppercase">Control Panel</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 mt-8 px-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase px-4 mb-2 tracking-wider">Main Menu</div>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 bg-blue-600 text-white shadow-blue-500/20 shadow-lg">
                        <FileText size={18} />
                        <span className="font-medium text-sm">Udyam Applications</span>
                    </button>

                    {/* <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-400 hover:bg-slate-800 hover:text-white">
                        <User size={18} />
                        <span className="font-medium text-sm">Users</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-400 hover:bg-slate-800 hover:text-white">
                        <Building2 size={18} />
                        <span className="font-medium text-sm">Business Types</span>
                    </button> */}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 text-slate-400 hover:text-white w-full px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                    <div className="text-center mt-4 pb-2">
                        <p className="text-[10px] text-slate-600">v1.0.2 &copy; 2025 Udyam Portal</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 h-20 px-8 flex justify-between items-center sticky top-0 z-20">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <FileText strokeWidth={2.5} size={28} className="text-blue-600" />
                            <span>Udyam Applications</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search Application ID..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-gray-50 focus:bg-white transition-all"
                            />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 relative cursor-pointer hover:bg-gray-200 transition">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </div>
                        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-800">Administrator</p>
                                <p className="text-xs text-gray-500">admin@udyam.com</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-md">AD</div>
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-8 relative">

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <FileText size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Recived</p>
                                <p className="text-3xl font-extrabold text-gray-900">{registrations.length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                                <Clock size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Pending</p>
                                <p className="text-3xl font-extrabold text-gray-900">{pendingCount}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Completed</p>
                                <p className="text-3xl font-extrabold text-gray-900">{successCount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs & List */}
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

                            {/* In-Page Toggles */}
                            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                                <button
                                    onClick={() => setActiveTab('pending')}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'pending' ? 'bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <Clock size={16} />
                                    Pending ({pendingCount})
                                </button>
                                <button
                                    onClick={() => setActiveTab('successful')}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'successful' ? 'bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-200' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <CheckCircle size={16} />
                                    Successful ({successCount})
                                </button>
                            </div>

                            <div className="text-sm text-gray-500">
                                Showing <span className="font-bold text-gray-900">{filteredData.length}</span> results
                            </div>
                        </div>

                        {filteredData.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                                <div className="flex flex-col md:flex-row items-stretch">
                                    {/* Left Border Status Indicator */}
                                    <div className={`w-full md:w-2 ${activeTab === 'pending' ? 'bg-orange-500' : 'bg-emerald-500'}`}></div>

                                    <div className="p-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                                        {/* ID & Basic Info */}
                                        <div className="md:col-span-3">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${activeTab === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                                    {item.paymentStatus}
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium">{item.date}</span>
                                            </div>
                                            <div className="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors flex items-center gap-2">
                                                {item.id}
                                                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500 transition-all opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0" />
                                            </div>
                                        </div>

                                        {/* Contact Details */}
                                        <div className="md:col-span-3 space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <User size={14} className="text-gray-400" />
                                                <span className="font-semibold text-gray-800">{item.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Building2 size={14} className="text-gray-400" />
                                                <span>{item.businessName}</span>
                                            </div>
                                        </div>

                                        <div className="md:col-span-3 space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone size={14} className="text-gray-400" />
                                                <span className="font-medium font-mono">{item.mobile}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Mail size={14} className="text-gray-400" />
                                                <span>{item.email}</span>
                                            </div>
                                        </div>

                                        {/* Step Indicator */}
                                        <div className="md:col-span-3 flex justify-end">
                                            <div className="text-right">
                                                <span className="text-xs text-gray-400 block mb-1 uppercase font-medium tracking-wide">Process Status</span>
                                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-bold text-sm border border-blue-100">
                                                    Step {item.step}
                                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredData.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <FileText size={40} className="text-gray-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-400">No applications found</h3>
                                <p className="text-sm text-gray-400 mt-1">Try switching categories or check back later.</p>
                            </div>
                        )}
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl pointer-events-none"></div>
                </div>
            </main>
        </div>
    );
}

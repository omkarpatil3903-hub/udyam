import React from 'react';
import { LayoutDashboard, FileText, LogOut, Search } from 'lucide-react';
import { auth } from '../firebase';

export default function AdminLayout({ children, onLogout, searchTerm, setSearchTerm, totalCount }) {
    const handleLogoutClick = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout && onLogout) {
            onLogout();
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100 font-sans text-slate-800">
            {/* Sidebar */}
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
                        {totalCount !== undefined && (
                            <span className="ml-auto bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full">{totalCount}</span>
                        )}
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

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

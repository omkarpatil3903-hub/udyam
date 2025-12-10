import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, RefreshCw, Edit, Printer, XCircle, LogOut, Search, Menu, X, HelpCircle } from 'lucide-react';
import { auth } from '../firebase';

export default function AdminLayout({ children, onLogout, searchTerm, setSearchTerm, totalCount }) {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogoutClick = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout && onLogout) {
            onLogout();
        }
    };

    const navItems = [
        {
            id: 'applications',
            label: 'Registrations',
            icon: FileText,
            href: '/admin',
        },
        {
            id: 'queries',
            label: 'Queries',
            icon: HelpCircle,
            href: '/admin/queries',
        }
    ];

    const getActivePage = () => {
        if (location.pathname === '/admin/queries') return 'queries';
        if (location.pathname === '/admin/reregistrations') return 'reregistrations';
        if (location.pathname === '/admin/updatecertificates') return 'updatecertificates';
        if (location.pathname === '/admin/printcertificates') return 'printcertificates';
        if (location.pathname === '/admin/cancelregistrations') return 'cancelregistrations';
        return 'applications';
    };
    const activePage = getActivePage();
    const currentPage = navItems.find(item => item.id === activePage) || navItems[0];

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 to-gray-100 font-sans text-slate-800">

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:relative inset-y-0 left-0 z-50
                w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 
                text-white flex flex-col shadow-2xl
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                                <LayoutDashboard className="text-white" size={22} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight">UDYAM</h1>
                                <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Admin Portal</p>
                            </div>
                        </div>
                        {/* Close button for mobile */}
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-3">Navigation</p>

                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activePage === item.id;

                        return (
                            <Link
                                key={item.id}
                                to={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="font-semibold text-sm">{item.label}</span>
                                {isActive && totalCount !== undefined && (
                                    <span className="ml-auto bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full">{totalCount}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile Section */}
                <div className="p-4 border-t border-white/10 bg-slate-800/50">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-lg">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold">Administrator</p>
                            <p className="text-[10px] text-slate-400 truncate">{auth.currentUser?.email || 'admin@udyam.gov.in'}</p>
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
                <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 h-16 px-4 lg:px-6 flex justify-between items-center sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Menu size={22} className="text-gray-600" />
                        </button>
                        <h2 className="text-base lg:text-lg font-bold text-gray-800">Dashboard</h2>
                        <span className="text-xs text-gray-400 hidden sm:inline">/ {currentPage.label}</span>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 w-40 sm:w-56 lg:w-72 bg-white/80 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

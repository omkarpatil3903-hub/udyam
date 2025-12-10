import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import AdminLayout from '../components/AdminLayout';
import { Trash2, Mail, Phone, User, Calendar, Eye, CheckCircle, Clock, X } from 'lucide-react';

export default function Queries({ onLogout }) {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const q = query(collection(db, "contacts"), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setQueries(data);
        } catch (error) {
            console.error("Error fetching queries:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this query?")) {
            try {
                await deleteDoc(doc(db, "contacts", id));
                setQueries(queries.filter(q => q.id !== id));
            } catch (error) {
                console.error("Error deleting query:", error);
            }
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Contacted' ? 'Pending' : 'Contacted';
        try {
            await updateDoc(doc(db, "contacts", id), { status: newStatus });
            setQueries(queries.map(q => q.id === id ? { ...q, status: newStatus } : q));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleView = (query) => {
        setSelectedQuery(query);
        setIsViewModalOpen(true);
    };

    const filteredQueries = queries.filter(q =>
        q.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.mobile?.includes(searchTerm)
    );

    const pendingCount = queries.filter(q => q.status !== 'Contacted').length;
    const contactedCount = queries.filter(q => q.status === 'Contacted').length;

    return (
        <AdminLayout
            onLogout={onLogout}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            totalCount={queries.length}
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Queries</p>
                            <p className="text-xl font-bold text-gray-800">{queries.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center gap-4">
                        <div className="bg-orange-100 p-3 rounded-lg">
                            <Clock className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Pending</p>
                            <p className="text-xl font-bold text-orange-600">{pendingCount}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Contacted</p>
                            <p className="text-xl font-bold text-green-600">{contactedCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">Contact Queries</h2>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : filteredQueries.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No queries found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left">Sr.</th>
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Mobile</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-4 py-3 text-left">Date</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                    <th className="px-4 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredQueries.map((query, index) => (
                                    <tr key={query.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-500">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <span className="font-medium text-gray-800">{query.name}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <a href={`tel:${query.mobile}`} className="text-blue-600 hover:underline flex items-center gap-1">
                                                <Phone size={12} /> {query.mobile}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3">
                                            <a href={`mailto:${query.email}`} className="text-blue-600 hover:underline flex items-center gap-1">
                                                <Mail size={12} /> {query.email}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{query.date || 'N/A'}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleStatusToggle(query.id, query.status)}
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${query.status === 'Contacted'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-orange-100 text-orange-700'
                                                    }`}
                                            >
                                                {query.status === 'Contacted' ? 'Contacted' : 'Pending'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-1">
                                                <button
                                                    onClick={() => handleView(query)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(query.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {isViewModalOpen && selectedQuery && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <h2 className="text-lg font-bold text-gray-800">Query Details</h2>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="p-2 text-gray-400 hover:text-red-500 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Name</p>
                                <p className="font-semibold text-gray-800 flex items-center gap-2">
                                    <User size={16} className="text-gray-400" /> {selectedQuery.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Mobile</p>
                                <a href={`tel:${selectedQuery.mobile}`} className="font-semibold text-blue-600 flex items-center gap-2">
                                    <Phone size={16} className="text-gray-400" /> {selectedQuery.mobile}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Email</p>
                                <a href={`mailto:${selectedQuery.email}`} className="font-semibold text-blue-600 flex items-center gap-2">
                                    <Mail size={16} className="text-gray-400" /> {selectedQuery.email}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Date</p>
                                <p className="font-semibold text-gray-800 flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-400" /> {selectedQuery.date || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase mb-1">Status</p>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedQuery.status === 'Contacted'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-orange-100 text-orange-700'
                                    }`}>
                                    {selectedQuery.status === 'Contacted' ? 'Contacted' : 'Pending'}
                                </span>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t flex gap-3">
                            <button
                                onClick={() => handleStatusToggle(selectedQuery.id, selectedQuery.status)}
                                className={`flex-1 py-2 rounded-lg font-bold text-sm ${selectedQuery.status === 'Contacted'
                                        ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    }`}
                            >
                                {selectedQuery.status === 'Contacted' ? 'Mark as Pending' : 'Mark as Contacted'}
                            </button>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

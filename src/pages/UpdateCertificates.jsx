import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  CreditCard,
  Clock,
  User,
  FileText,
  CheckCircle,
  Eye,
  AlertCircle,
  IndianRupee,
  Hash,
} from "lucide-react";
import UpdateCertificateViewModal from "../components/UpdateCertificateViewModal";
import AdminLayout from "../components/AdminLayout";

export default function UpdateCertificates({ onLogout }) {
  const [mainTab, setMainTab] = useState("paid");
  const [workFilter, setWorkFilter] = useState("all");
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: "",
    itemId: "",
    newValue: "",
  });

  useEffect(() => {
    const q = query(
      collection(db, "updatecertificates"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRegistrations(data);
    });
    return () => unsubscribe();
  }, []);

  const handleViewClick = (item) => {
    setSelectedRegistration(item);
    setIsViewModalOpen(true);
  };

  const handlePaymentStatusUpdate = async (id, newStatus) => {
    try {
      if (!id) return;
      const registrationRef = doc(db, "updatecertificates", id);
      await updateDoc(registrationRef, { paymentStatus: newStatus });
      if (selectedRegistration && selectedRegistration.id === id) {
        setSelectedRegistration((prev) => ({
          ...prev,
          paymentStatus: newStatus,
        }));
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Failed to update payment status");
    }
  };

  const handleWorkStatusUpdate = async (id, newStatus) => {
    try {
      if (!id) return;
      const registrationRef = doc(db, "updatecertificates", id);
      await updateDoc(registrationRef, { workStatus: newStatus });
      if (selectedRegistration && selectedRegistration.id === id) {
        setSelectedRegistration((prev) => ({ ...prev, workStatus: newStatus }));
      }
    } catch (error) {
      console.error("Error updating work status:", error);
      alert("Failed to update work status");
    }
  };

  const handleListWorkStatusChange = (itemId, newValue) => {
    const currentItem = registrations.find((r) => r.id === itemId);
    const currentValue = currentItem?.workStatus || "Pending";
    if (newValue !== currentValue) {
      setConfirmModal({ isOpen: true, type: "work", itemId, newValue });
    }
  };

  const handleListPaymentStatusChange = (itemId, newValue) => {
    setConfirmModal({ isOpen: true, type: "payment", itemId, newValue });
  };

  const confirmListStatusChange = async () => {
    const { type, itemId, newValue } = confirmModal;
    setConfirmModal({ isOpen: false, type: "", itemId: "", newValue: "" });

    if (type === "payment") {
      await handlePaymentStatusUpdate(itemId, newValue);
    } else if (type === "work") {
      await handleWorkStatusUpdate(itemId, newValue);
    }
  };

  const cancelListStatusChange = () => {
    setConfirmModal({ isOpen: false, type: "", itemId: "", newValue: "" });
  };

  const filteredData = registrations.filter((item) => {
    const matchesSearch =
      item.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile?.includes(searchTerm) ||
      item.udyamNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchTerm.toLowerCase());

    const isPaid =
      item.paymentStatus === "Paid" || item.paymentStatus === "Successful";
    const isUnpaid =
      item.paymentStatus === "Unpaid" || item.paymentStatus === "Pending";
    const workStatus = item.workStatus || "Pending";

    if (mainTab === "unpaid") {
      return isUnpaid && matchesSearch;
    } else {
      if (workFilter === "all") return isPaid && matchesSearch;
      if (workFilter === "pending")
        return isPaid && workStatus === "Pending" && matchesSearch;
      if (workFilter === "completed")
        return isPaid && workStatus === "Completed" && matchesSearch;
    }
    return matchesSearch;
  });

  const unpaidCount = registrations.filter(
    (i) => i.paymentStatus === "Unpaid" || i.paymentStatus === "Pending"
  ).length;
  const paidCount = registrations.filter(
    (i) => i.paymentStatus === "Paid" || i.paymentStatus === "Successful"
  ).length;
  const paidPendingCount = registrations.filter(
    (i) =>
      (i.paymentStatus === "Paid" || i.paymentStatus === "Successful") &&
      (i.workStatus === "Pending" || !i.workStatus)
  ).length;
  const paidCompletedCount = registrations.filter(
    (i) =>
      (i.paymentStatus === "Paid" || i.paymentStatus === "Successful") &&
      i.workStatus === "Completed"
  ).length;

  return (
    <AdminLayout
      onLogout={onLogout}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      totalCount={registrations.length}
    >
      <UpdateCertificateViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        data={selectedRegistration}
        onPaymentStatusUpdate={handlePaymentStatusUpdate}
        onWorkStatusUpdate={handleWorkStatusUpdate}
      />

      {/* Section Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6 uppercase tracking-wide">
        Update Udyam Certificate
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div
          onClick={() => {
            setMainTab("paid");
            setWorkFilter("all");
          }}
          className={`bg-white rounded-2xl p-5 shadow-sm border cursor-pointer hover:shadow-lg transition-all duration-300 group ${
            mainTab === "paid"
              ? "border-emerald-300 ring-2 ring-emerald-100"
              : "border-gray-100"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Paid
              </p>
              <p className="text-3xl font-black text-gray-900">{paidCount}</p>
              <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                <IndianRupee size={12} /> Payment received
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
              <CreditCard size={22} className="text-white" />
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setMainTab("unpaid");
            setWorkFilter("all");
          }}
          className={`bg-white rounded-2xl p-5 shadow-sm border cursor-pointer hover:shadow-lg transition-all duration-300 group ${
            mainTab === "unpaid"
              ? "border-orange-300 ring-2 ring-orange-100"
              : "border-gray-100"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Unpaid
              </p>
              <p className="text-3xl font-black text-gray-900">{unpaidCount}</p>
              <p className="text-xs text-orange-600 font-medium mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> Payment pending
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
              <Clock size={22} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-gray-900">Update Certificates</h3>

            {/* Sub-tabs for Paid section */}
            {mainTab === "paid" && (
              <div className="flex bg-gray-100 rounded-lg p-0.5 ml-2">
                <button
                  onClick={() => setWorkFilter("all")}
                  className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                    workFilter === "all"
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setWorkFilter("pending")}
                  className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                    workFilter === "pending"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Pending ({paidPendingCount})
                </button>
                <button
                  onClick={() => setWorkFilter("completed")}
                  className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                    workFilter === "completed"
                      ? "bg-white text-emerald-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Completed ({paidCompletedCount})
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-700">
              {filteredData.length}
            </span>{" "}
            results
          </p>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Column Headers */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <div className="col-span-2">Application ID</div>
              <div className="col-span-2">Applicant</div>
              <div className="col-span-2">Udyam Number</div>
              <div className="col-span-2">Contact</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Table Rows */}
            {filteredData.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-50/50 transition-colors group ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                <div className="col-span-2">
                  <p
                    className="font-bold text-gray-900 text-sm truncate"
                    title={item.id}
                  >
                    {item.id.slice(0, 12)}...
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm truncate">
                        {item.applicantName}
                      </p>
                      <p className="text-xs text-gray-400">{item.state}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-700 font-mono flex items-center gap-1">
                    <Hash size={12} className="text-gray-400" />
                    {item.udyamNumber || "N/A"}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-700 font-mono">
                    {item.mobile}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{item.email}</p>
                </div>
                <div className="col-span-2">
                  {mainTab === "unpaid" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                      <Clock size={10} /> Unpaid
                    </span>
                  ) : (
                    <div
                      className="inline-flex items-center gap-1.5 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={item.workStatus || "Pending"}
                        onChange={(e) =>
                          handleListWorkStatusChange(item.id, e.target.value)
                        }
                        className={`text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer border-0 outline-none appearance-none pr-7 ${
                          item.workStatus === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 8px center",
                          backgroundSize: "14px",
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <button
                    onClick={() => handleViewClick(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <Eye size={14} />
                    View
                  </button>
                  {mainTab === "unpaid" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleListPaymentStatusChange(item.id, "Paid");
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                    >
                      <CreditCard size={14} />
                      Mark Paid
                    </button>
                  )}
                  {mainTab === "paid" &&
                    (item.workStatus || "Pending") !== "Completed" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWorkStatusUpdate(item.id, "Completed");
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                      >
                        <CheckCircle size={14} />
                        Complete
                      </button>
                    )}
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <FileText size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-400">
                  No update requests found
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your search or filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-linear-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Confirm Status Change
              </h3>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Are you sure you want to change the{" "}
                <span className="font-semibold text-gray-800">
                  {confirmModal.type === "payment" ? "payment" : "work"}
                </span>{" "}
                status to{" "}
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold text-xs mt-1">
                  {confirmModal.newValue}
                </span>
                ?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={cancelListStatusChange}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmListStatusChange}
                  className="flex-1 px-4 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

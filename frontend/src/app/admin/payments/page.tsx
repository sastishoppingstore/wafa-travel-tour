'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck, HiX, HiEye, HiClock, HiCheckCircle, HiXCircle } from 'react-icons/hi';

interface Payment {
  id: number;
  ref: string;
  customer: string;
  email: string;
  bookingRef: string;
  service: string;
  amount: number;
  method: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  note: string;
}

const initialPayments: Payment[] = [
  { id: 1, ref: 'PAY-2026-001', customer: 'Ahmed Khan', email: 'ahmed@email.com', bookingRef: 'WAFA-2026-A7K3P', service: 'Dubai Tour Package', amount: 125000, method: 'JazzCash', status: 'pending', date: '2026-10-05', note: 'Transaction ID: 987654321' },
  { id: 2, ref: 'PAY-2026-002', customer: 'Fatima Ali', email: 'fatima@email.com', bookingRef: 'WAFA-2026-M2N8Q', service: 'Umrah Standard Package', amount: 395000, method: 'Bank Transfer', status: 'pending', date: '2026-10-04', note: 'Deposited in HBL account ****3456' },
  { id: 3, ref: 'PAY-2026-003', customer: 'Muhammad Ali', email: 'ali@email.com', bookingRef: 'WAFA-2026-J5R2T', service: 'Flight LHE-DXB', amount: 68000, method: 'Easypaisa', status: 'pending', date: '2026-10-04', note: 'Sent to 0300-1234567' },
  { id: 4, ref: 'PAY-2026-004', customer: 'Sara Bibi', email: 'sara@email.com', bookingRef: 'WAFA-2026-K8L4W', service: 'Turkey Tour', amount: 185000, method: 'Bank Transfer', status: 'approved', date: '2026-10-03', note: 'Verified via bank statement' },
  { id: 5, ref: 'PAY-2026-005', customer: 'Usman Ghani', email: 'usman@email.com', bookingRef: 'WAFA-2026-P3N7X', service: 'Hajj Premium', amount: 850000, method: 'JazzCash', status: 'approved', date: '2026-10-02', note: 'Payment confirmed' },
  { id: 6, ref: 'PAY-2026-006', customer: 'Ali Hassan', email: 'hassan@email.com', bookingRef: 'WAFA-2026-Q9M3R', service: 'Visa UAE', amount: 15000, method: 'Easypaisa', status: 'rejected', date: '2026-10-01', note: 'Insufficient amount' },
];

const statusColors = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filtered = filter === 'all' ? payments : payments.filter(p => p.status === filter);
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const totalPending = payments.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const totalApproved = payments.filter(p => p.status === 'approved').reduce((s, p) => s + p.amount, 0);

  const approvePayment = (id: number) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' as const } : p));
  };

  const rejectPayment = (id: number) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' as const } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Management</h1>
          <p className="text-sm text-gray-500">Review and approve customer payments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800/30">
          <div className="flex items-center gap-2 mb-1"><HiClock className="w-5 h-5 text-amber-500" /><span className="text-sm text-amber-700 dark:text-amber-400">Pending</span></div>
          <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{pendingCount}</p>
          <p className="text-sm text-amber-600">PKR {totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800/30">
          <div className="flex items-center gap-2 mb-1"><HiCheckCircle className="w-5 h-5 text-green-500" /><span className="text-sm text-green-700 dark:text-green-400">Approved</span></div>
          <p className="text-2xl font-bold text-green-700 dark:text-green-400">{payments.filter(p => p.status === 'approved').length}</p>
          <p className="text-sm text-green-600">PKR {totalApproved.toLocaleString()}</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800/30">
          <div className="flex items-center gap-2 mb-1"><HiXCircle className="w-5 h-5 text-red-500" /><span className="text-sm text-red-700 dark:text-red-400">Rejected</span></div>
          <p className="text-2xl font-bold text-red-700 dark:text-red-400">{payments.filter(p => p.status === 'rejected').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              filter === f ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >{f} {f !== 'all' && `(${payments.filter(p => p.status === f).length})`}</button>
        ))}
      </div>

      {/* Payments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Payment Ref</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Method</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-4 font-mono text-xs text-gray-600 dark:text-gray-400">{p.ref}</td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900 dark:text-white">{p.customer}</p>
                    <p className="text-xs text-gray-500">{p.email}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{p.service}</td>
                  <td className="px-5 py-4 font-bold text-gray-900 dark:text-white">PKR {p.amount.toLocaleString()}</td>
                  <td className="px-5 py-4"><span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300">{p.method}</span></td>
                  <td className="px-5 py-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => { setSelectedPayment(p); setShowDetail(true); }}
                        className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600" title="View Details">
                        <HiEye className="w-4 h-4" />
                      </button>
                      {p.status === 'pending' && (
                        <>
                          <button onClick={() => approvePayment(p.id)}
                            className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200" title="Approve">
                            <HiCheck className="w-4 h-4" />
                          </button>
                          <button onClick={() => rejectPayment(p.id)}
                            className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 hover:bg-red-200" title="Reject">
                            <HiX className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && selectedPayment && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDetail(false)}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Payment Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Reference:</span><span className="font-mono text-gray-900 dark:text-white">{selectedPayment.ref}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Customer:</span><span className="text-gray-900 dark:text-white">{selectedPayment.customer}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="text-gray-900 dark:text-white">{selectedPayment.email}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Booking:</span><span className="font-mono text-gray-900 dark:text-white">{selectedPayment.bookingRef}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Service:</span><span className="text-gray-900 dark:text-white">{selectedPayment.service}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className="font-bold text-lg text-emerald-600">PKR {selectedPayment.amount.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Method:</span><span className="text-gray-900 dark:text-white">{selectedPayment.method}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Date:</span><span className="text-gray-900 dark:text-white">{selectedPayment.date}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Note:</span><span className="text-gray-900 dark:text-white">{selectedPayment.note}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Status:</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedPayment.status]}`}>{selectedPayment.status}</span></div>
              </div>
              {selectedPayment.status === 'pending' && (
                <div className="flex gap-2 mt-6">
                  <button onClick={() => { approvePayment(selectedPayment.id); setShowDetail(false); }}
                    className="flex-1 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 flex items-center justify-center gap-2">
                    <HiCheck className="w-4 h-4" /> Approve Payment
                  </button>
                  <button onClick={() => { rejectPayment(selectedPayment.id); setShowDetail(false); }}
                    className="flex-1 py-2.5 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 flex items-center justify-center gap-2">
                    <HiX className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
              <button onClick={() => setShowDetail(false)} className="w-full mt-2 py-2 text-gray-500 text-sm hover:text-gray-700">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

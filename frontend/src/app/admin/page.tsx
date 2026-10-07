'use client';

import { motion } from 'framer-motion';
import { HiTrendingUp, HiUsers, HiClipboardList, HiBriefcase, HiCreditCard, HiClock, HiCheckCircle } from 'react-icons/hi';

const stats = [
  { label: 'Total Revenue', value: 'PKR 12.5M', change: '+23%', icon: HiTrendingUp, color: 'from-emerald-500 to-emerald-600' },
  { label: 'Total Users', value: '2,847', change: '+12%', icon: HiUsers, color: 'from-blue-500 to-blue-600' },
  { label: 'Bookings', value: '156', change: '+8%', icon: HiClipboardList, color: 'from-purple-500 to-purple-600' },
  { label: 'Job Applications', value: '89', change: '+15%', icon: HiBriefcase, color: 'from-amber-500 to-amber-600' },
];

const recentBookings = [
  { ref: 'WAFA-2026-A7K3P', customer: 'Ahmed Khan', service: 'Dubai Tour', amount: 125000, status: 'confirmed', date: 'Oct 5' },
  { ref: 'WAFA-2026-M2N8Q', customer: 'Fatima Ali', service: 'Umrah Standard', amount: 395000, status: 'pending', date: 'Oct 4' },
  { ref: 'WAFA-2026-J5R2T', customer: 'Usman Ghani', service: 'Flight LHE-DXB', amount: 68000, status: 'payment_pending', date: 'Oct 4' },
  { ref: 'WAFA-2026-K8L4W', customer: 'Sara Bibi', service: 'Turkey Tour', amount: 185000, status: 'confirmed', date: 'Oct 3' },
  { ref: 'WAFA-2026-P3N7X', customer: 'Ali Hassan', service: 'Hunza Tour', amount: 45000, status: 'cancelled', date: 'Oct 3' },
];

const pendingPayments = [
  { ref: 'PAY-2026-001', customer: 'Ahmed Khan', amount: 125000, method: 'JazzCash', date: 'Oct 5', status: 'pending' },
  { ref: 'PAY-2026-002', customer: 'Fatima Ali', amount: 395000, method: 'Bank Transfer', date: 'Oct 4', status: 'pending' },
  { ref: 'PAY-2026-003', customer: 'Muhammad Ali', amount: 68000, method: 'Easypaisa', date: 'Oct 4', status: 'pending' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  payment_pending: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 dark:text-white">Recent Bookings</h2>
            <a href="/admin/bookings" className="text-sm text-emerald-600 hover:underline">View All →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Ref</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr></thead>
              <tbody>
                {recentBookings.map((b, i) => (
                  <tr key={i} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-5 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{b.ref}</td>
                    <td className="px-5 py-3 text-gray-900 dark:text-white">{b.customer}</td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{b.service}</td>
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">PKR {b.amount.toLocaleString()}</td>
                    <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[b.status]}`}>{b.status.replace('_', ' ')}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HiCreditCard className="w-5 h-5 text-amber-500" /> Pending Payments
            </h2>
            <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full">{pendingPayments.length}</span>
          </div>
          <div className="p-4 space-y-3">
            {pendingPayments.map((p, i) => (
              <div key={i} className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-900 dark:text-white">{p.customer}</span>
                  <span className="text-xs text-amber-600">{p.method}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-700 dark:text-amber-400">PKR {p.amount.toLocaleString()}</span>
                  <div className="flex gap-1">
                    <button className="px-2.5 py-1 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600">✓ Approve</button>
                    <button className="px-2.5 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600">✕ Reject</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

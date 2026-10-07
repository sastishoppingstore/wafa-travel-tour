'use client';
import { useState } from 'react';
import { HiCheck, HiX, HiEye } from 'react-icons/hi';

const initialBookings = [
  { ref: 'WAFA-2026-A7K3P', customer: 'Ahmed Khan', email: 'ahmed@email.com', phone: '+92-300-1234567', service: 'Dubai Tour Package', amount: 125000, status: 'confirmed', date: '2026-10-05', paymentStatus: 'paid' },
  { ref: 'WAFA-2026-M2N8Q', customer: 'Fatima Ali', email: 'fatima@email.com', phone: '+92-321-9876543', service: 'Umrah Standard', amount: 395000, status: 'pending', date: '2026-10-04', paymentStatus: 'paid' },
  { ref: 'WAFA-2026-J5R2T', customer: 'Usman Ghani', email: 'usman@email.com', phone: '+92-333-5556789', service: 'Flight LHE-DXB', amount: 68000, status: 'pending', date: '2026-10-04', paymentStatus: 'pending' },
  { ref: 'WAFA-2026-K8L4W', customer: 'Sara Bibi', email: 'sara@email.com', phone: '+92-345-1112233', service: 'Turkey Tour', amount: 185000, status: 'confirmed', date: '2026-10-03', paymentStatus: 'paid' },
  { ref: 'WAFA-2026-P3N7X', customer: 'Ali Hassan', email: 'ali@email.com', phone: '+92-312-4445566', service: 'Hunza Tour', amount: 45000, status: 'cancelled', date: '2026-10-03', paymentStatus: 'refunded' },
  { ref: 'WAFA-2026-Q9M3R', customer: 'Muhammad Ali', email: 'mali@email.com', phone: '+92-301-7778899', service: 'Hajj Premium', amount: 850000, status: 'confirmed', date: '2026-10-01', paymentStatus: 'paid' },
];

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);

  const updateStatus = (ref: string, status: string) => {
    setBookings(prev => prev.map(b => b.ref === ref ? { ...b, status } : b));
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bookings Management</h1><p className="text-sm text-gray-500">Manage all customer bookings</p></div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Reference</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.ref} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-5 py-4 font-mono text-xs text-gray-600 dark:text-gray-400">{b.ref}</td>
                  <td className="px-5 py-4"><p className="font-medium text-gray-900 dark:text-white">{b.customer}</p><p className="text-xs text-gray-500">{b.email}</p></td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{b.service}</td>
                  <td className="px-5 py-4 font-bold text-gray-900 dark:text-white">PKR {b.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{b.date}</td>
                  <td className="px-5 py-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[b.status]}`}>{b.status}</span></td>
                  <td className="px-5 py-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : b.paymentStatus === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{b.paymentStatus}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      {b.status === 'pending' && (<>
                        <button onClick={() => updateStatus(b.ref, 'confirmed')} className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200" title="Confirm"><HiCheck className="w-4 h-4" /></button>
                        <button onClick={() => updateStatus(b.ref, 'cancelled')} className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200" title="Cancel"><HiX className="w-4 h-4" /></button>
                      </>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

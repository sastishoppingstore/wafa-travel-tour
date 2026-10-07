'use client';
import { useState } from 'react';

const applications = [
  { id: 1, name: 'Ahmed Khan', job: 'Construction Worker', country: 'Saudi Arabia', age: 28, cnic: '35201-1234567-1', phone: '+92-300-1111111', status: 'documents_verified', appliedDate: '2026-09-15' },
  { id: 2, name: 'Muhammad Ali', job: 'Electrician', country: 'Kuwait', age: 32, cnic: '35201-2345678-2', phone: '+92-321-2222222', status: 'interview_scheduled', appliedDate: '2026-09-20' },
  { id: 3, name: 'Usman Ghani', job: 'Driver', country: 'Qatar', age: 35, cnic: '35201-3456789-3', phone: '+92-333-3333333', status: 'medical_passed', appliedDate: '2026-09-22' },
  { id: 4, name: 'Bilal Ahmad', job: 'Security Guard', country: 'Oman', age: 26, cnic: '35201-4567890-4', phone: '+92-345-4444444', status: 'pending', appliedDate: '2026-10-01' },
  { id: 5, name: 'Hassan Raza', job: 'Cleaner', country: 'Bahrain', age: 24, cnic: '35201-5678901-5', phone: '+92-312-5555555', status: 'visa_processing', appliedDate: '2026-09-10' },
  { id: 6, name: 'Faisal Mehmood', job: 'Chef', country: 'UAE', age: 30, cnic: '35201-6789012-6', phone: '+92-301-6666666', status: 'deployed', appliedDate: '2026-08-15' },
];

const statusSteps = ['pending', 'under_review', 'documents_verified', 'interview_scheduled', 'medical_passed', 'visa_processing', 'protector_issued', 'flight_booked', 'deployed'];
const statusLabels: Record<string, string> = { pending: 'Pending', under_review: 'Under Review', documents_verified: 'Docs Verified', interview_scheduled: 'Interview', medical_passed: 'Medical Passed', visa_processing: 'Visa Processing', protector_issued: 'Protector', flight_booked: 'Flight Booked', deployed: 'Deployed' };
const statusColors: Record<string, string> = { pending: 'bg-gray-100 text-gray-700', under_review: 'bg-blue-100 text-blue-700', documents_verified: 'bg-indigo-100 text-indigo-700', interview_scheduled: 'bg-purple-100 text-purple-700', medical_passed: 'bg-teal-100 text-teal-700', visa_processing: 'bg-amber-100 text-amber-700', protector_issued: 'bg-orange-100 text-orange-700', flight_booked: 'bg-cyan-100 text-cyan-700', deployed: 'bg-green-100 text-green-700' };

export default function JobsPage() {
  const [apps, setApps] = useState(applications);

  const advanceStatus = (id: number) => {
    setApps(prev => prev.map(a => {
      if (a.id !== id) return a;
      const idx = statusSteps.indexOf(a.status);
      if (idx < statusSteps.length - 1) return { ...a, status: statusSteps[idx + 1] };
      return a;
    }));
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Applications</h1><p className="text-sm text-gray-500">Track and manage overseas employment applications</p></div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Applicant</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Job</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Country</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Applied</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Progress</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {apps.map(a => {
                const currentStep = statusSteps.indexOf(a.status);
                const progress = ((currentStep + 1) / statusSteps.length) * 100;
                return (
                  <tr key={a.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-5 py-4"><p className="font-medium text-gray-900 dark:text-white">{a.name}</p><p className="text-xs text-gray-500">{a.phone}</p></td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{a.job}</td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{a.country}</td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{a.appliedDate}</td>
                    <td className="px-5 py-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[a.status]}`}>{statusLabels[a.status]}</span></td>
                    <td className="px-5 py-4"><div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-500 to-gold-400 rounded-full transition-all" style={{ width: `${progress}%` }} /></div></td>
                    <td className="px-5 py-4"><button onClick={() => advanceStatus(a.id)} disabled={a.status === 'deployed'} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed">Advance →</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

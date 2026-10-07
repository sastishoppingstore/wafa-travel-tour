'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { HiClipboardList, HiBriefcase, HiUser, HiClock, HiCheckCircle, HiXCircle, HiChevronRight } from 'react-icons/hi';

const mockBookings = [
  { ref: 'WAFA-2026-A7K3P', service: 'Dubai Tour Package', date: 'Oct 15, 2026', status: 'confirmed', amount: 125000, statusSteps: ['Booked', 'Payment Verified', 'Confirmed', 'Travel Date', 'Completed'], currentStep: 2 },
  { ref: 'WAFA-2026-M2N8Q', service: 'Flight: LHE → DXB (Emirates)', date: 'Nov 1, 2026', status: 'pending', amount: 68000, statusSteps: ['Booked', 'Payment Verification', 'Ticket Issued', 'Travel Date', 'Completed'], currentStep: 1 },
  { ref: 'WAFA-2026-J5R2T', service: 'Umrah Standard Package', date: 'Dec 20, 2026', status: 'confirmed', amount: 395000, statusSteps: ['Booked', 'Payment Verified', 'Documents Submitted', 'Visa Processing', 'Confirmed', 'Travel Date'], currentStep: 3 },
];

const mockApplications = [
  { id: 1, job: 'Construction Worker', country: 'Saudi Arabia', appliedDate: 'Aug 10, 2026', status: 'medical_passed', steps: ['Applied', 'Under Review', 'Documents Verified', 'Interview', 'Medical', 'Visa Processing', 'Protector', 'Flight Booked', 'Deployed'], currentStep: 4 },
  { id: 2, job: 'Electrician', country: 'Kuwait', appliedDate: 'Sep 5, 2026', status: 'interview_passed', steps: ['Applied', 'Under Review', 'Documents Verified', 'Interview', 'Medical', 'Visa Processing', 'Protector', 'Flight Booked', 'Deployed'], currentStep: 3 },
];

const statusColor = (s: string) => {
  if (s === 'confirmed' || s === 'deployed' || s === 'medical_passed' || s === 'interview_passed') return 'text-green-500 bg-green-50 dark:bg-green-900/20';
  if (s === 'pending' || s === 'under_review') return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
  return 'text-red-500 bg-red-50 dark:bg-red-900/20';
};

export default function DashboardPage() {
  const [tab, setTab] = useState<'bookings' | 'applications' | 'profile'>('bookings');

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-serif font-bold text-[var(--color-text)] mb-2">My Dashboard</h1>
          <p className="text-[var(--color-text-muted)]">Manage your bookings, applications, and profile</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mt-8 mb-8 border-b border-[var(--color-border)]">
          {[
            { key: 'bookings', label: 'My Bookings', icon: HiClipboardList },
            { key: 'applications', label: 'Job Applications', icon: HiBriefcase },
            { key: 'profile', label: 'Profile', icon: HiUser },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                tab === t.key ? 'border-primary-500 text-primary-500' : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'bookings' && (
            <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
                {mockBookings.map(b => (
                  <motion.div key={b.ref} variants={staggerChild} className="glass-card p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-[var(--color-text)]">{b.service}</h3>
                        <p className="text-sm text-[var(--color-text-muted)]">Ref: {b.ref} • {b.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary-600 dark:text-gold-400">PKR {b.amount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(b.status)}`}>{b.status}</span>
                      </div>
                    </div>
                    {/* Status Stepper */}
                    <div className="flex items-center gap-1 mt-4 overflow-x-auto pb-2">
                      {b.statusSteps.map((step, i) => (
                        <div key={i} className="flex items-center shrink-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            i <= b.currentStep ? 'bg-gradient-to-br from-primary-500 to-gold-500 text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
                          }`}>
                            {i <= b.currentStep ? <HiCheckCircle className="w-4 h-4" /> : i + 1}
                          </div>
                          <span className={`text-xs ml-1 mr-2 ${i <= b.currentStep ? 'text-[var(--color-text)] font-medium' : 'text-[var(--color-text-muted)]'}`}>{step}</span>
                          {i < b.statusSteps.length - 1 && <div className={`w-6 h-0.5 mx-1 ${i < b.currentStep ? 'bg-primary-500' : 'bg-[var(--color-border)]'}`} />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {tab === 'applications' && (
            <motion.div key="applications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
                {mockApplications.map(a => (
                  <motion.div key={a.id} variants={staggerChild} className="glass-card p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-[var(--color-text)]">{a.job}</h3>
                        <p className="text-sm text-[var(--color-text-muted)]">🏳️ {a.country} • Applied: {a.appliedDate}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor(a.status)}`}>{a.status.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-4 overflow-x-auto pb-2">
                      {a.steps.map((step, i) => (
                        <div key={i} className="flex items-center shrink-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            i <= a.currentStep ? 'bg-gradient-to-br from-primary-500 to-gold-500 text-white' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
                          }`}>
                            {i <= a.currentStep ? <HiCheckCircle className="w-4 h-4" /> : i + 1}
                          </div>
                          <span className={`text-xs ml-1 mr-2 whitespace-nowrap ${i <= a.currentStep ? 'text-[var(--color-text)] font-medium' : 'text-[var(--color-text-muted)]'}`}>{step}</span>
                          {i < a.steps.length - 1 && <div className={`w-4 h-0.5 mx-0.5 ${i < a.currentStep ? 'bg-primary-500' : 'bg-[var(--color-border)]'}`} />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {tab === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="glass-card p-8 max-w-xl"
            >
              <h3 className="font-serif font-bold text-xl text-[var(--color-text)] mb-6">My Profile</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-[var(--color-text-muted)] block mb-1">Full Name</label><input defaultValue="Ahmed Khan" className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)]" /></div>
                  <div><label className="text-xs text-[var(--color-text-muted)] block mb-1">Phone</label><input defaultValue="+92-321-9876543" className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)]" /></div>
                </div>
                <div><label className="text-xs text-[var(--color-text-muted)] block mb-1">Email</label><input defaultValue="user@example.com" className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)]" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs text-[var(--color-text-muted)] block mb-1">CNIC</label><input placeholder="XXXXX-XXXXXXX-X" className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)]" /></div>
                  <div><label className="text-xs text-[var(--color-text-muted)] block mb-1">Passport No.</label><input placeholder="AB1234567" className="w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)]" /></div>
                </div>
                <button type="button" className="btn-primary !py-3 !text-sm">Update Profile</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

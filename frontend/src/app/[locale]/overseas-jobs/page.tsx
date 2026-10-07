'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, staggerChild, fadeInUp } from '@/components/animations/variants';
import { HiLocationMarker, HiBriefcase, HiSearch, HiX, HiCheckCircle } from 'react-icons/hi';
import { FaBriefcase, FaPassport, FaUserCheck } from 'react-icons/fa';

const countries = [
  { name: 'Saudi Arabia', flag: '🇸🇦', jobs: 45 },
  { name: 'UAE', flag: '🇦🇪', jobs: 32 },
  { name: 'Qatar', flag: '🇶🇦', jobs: 18 },
  { name: 'Kuwait', flag: '🇰🇼', jobs: 24 },
  { name: 'Oman', flag: '🇴🇲', jobs: 15 },
  { name: 'Bahrain', flag: '🇧🇭', jobs: 8 },
  { name: 'Malaysia', flag: '🇲🇾', jobs: 12 },
  { name: 'Romania', flag: '🇷🇴', jobs: 20 },
];

const categories = ['All', 'Construction', 'Hospitality', 'Drivers', 'Technicians', 'Healthcare', 'Security', 'Office/IT', 'Labor'];

const jobs = [
  { id: 1, title: 'Construction Worker', country: 'Saudi Arabia', flag: '🇸🇦', category: 'Construction', salary: '600-900', positions: 50, exp: '1+ year' },
  { id: 2, title: 'Hotel Receptionist', country: 'UAE', flag: '🇦🇪', category: 'Hospitality', salary: '800-1200', positions: 10, exp: '2+ years' },
  { id: 3, title: 'Heavy Driver', country: 'Qatar', flag: '🇶🇦', category: 'Drivers', salary: '700-1000', positions: 20, exp: '3+ years' },
  { id: 4, title: 'Electrician', country: 'Kuwait', flag: '🇰🇼', category: 'Technicians', salary: '500-800', positions: 15, exp: '2+ years' },
  { id: 5, title: 'Security Guard', country: 'Oman', flag: '🇴🇲', category: 'Security', salary: '400-600', positions: 30, exp: '1+ year' },
  { id: 6, title: 'Office Assistant', country: 'Malaysia', flag: '🇲🇾', category: 'Office/IT', salary: '500-700', positions: 5, exp: '1+ year' },
  { id: 7, title: 'Cleaner / Housekeeping', country: 'Bahrain', flag: '🇧🇭', category: 'Hospitality', salary: '350-500', positions: 40, exp: 'No exp required' },
  { id: 8, title: 'Nurse (Female)', country: 'Saudi Arabia', flag: '🇸🇦', category: 'Healthcare', salary: '1200-2000', positions: 8, exp: '3+ years' },
  { id: 9, title: 'Welder / Fabricator', country: 'Saudi Arabia', flag: '🇸🇦', category: 'Construction', salary: '700-1100', positions: 25, exp: '2+ years' },
  { id: 10, title: 'AC Technician', country: 'UAE', flag: '🇦🇪', category: 'Technicians', salary: '600-900', positions: 12, exp: '2+ years' },
  { id: 11, title: 'Chef / Cook', country: 'Qatar', flag: '🇶🇦', category: 'Hospitality', salary: '800-1500', positions: 6, exp: '3+ years' },
  { id: 12, title: 'Construction Labor', country: 'Romania', flag: '🇷🇴', category: 'Labor', salary: '600-800', positions: 35, exp: 'No exp required' },
];

const processSteps = [
  { icon: FaBriefcase, title: 'Registration', desc: 'Submit application with documents' },
  { icon: FaPassport, title: 'Document Verification', desc: 'CV, passport, CNIC verified' },
  { icon: FaUserCheck, title: 'Interview & Selection', desc: 'Employer interview (in-person/online)' },
  { icon: HiCheckCircle, title: 'Medical & Visa', desc: 'Medical test, visa stamping' },
  { icon: FaPassport, title: 'Protector / Emigration', desc: 'Emigration clearance from Bureau' },
  { icon: FaBriefcase, title: 'Deployment', desc: 'Flight booking & travel to destination' },
];

export default function OverseasJobsPage() {
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const filtered = jobs.filter(j => {
    const matchCountry = selectedCountry === 'All' || j.country === selectedCountry;
    const matchCategory = selectedCategory === 'All' || j.category === selectedCategory;
    const matchSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCountry && matchCategory && matchSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-6xl mb-4 block">💼</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Build Your Career Abroad with WAFA</h1>
            <p className="text-lg text-primary-100/80 max-w-2xl mx-auto mb-8">
              Government-licensed overseas employment agency. We connect skilled workers with top employers across the Gulf, Europe, and Asia.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-400 text-sm">
              <HiCheckCircle className="w-4 h-4" /> Registered with Bureau of Emigration & Overseas Employment | License No. [XXXX]
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16 px-4 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Countries We Recruit For" subtitle="Explore opportunities across the globe" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {countries.map(c => (
              <motion.button key={c.name} variants={staggerChild} whileHover={{ y: -4, scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCountry(c.name)}
                className={`glass-card p-5 text-center transition-all ${selectedCountry === c.name ? '!border-gold-400 !shadow-gold-400/20' : ''}`}
              >
                <span className="text-3xl block mb-2">{c.flag}</span>
                <p className="font-semibold text-sm text-[var(--color-text)]">{c.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{c.jobs} openings</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Available Positions" subtitle="Find your perfect job opportunity" />

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search jobs..." className="w-full pl-12 pr-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:border-primary-400 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]" />
            </div>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)]">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-4">
            {filtered.map(job => (
              <motion.div key={job.id} variants={staggerChild} layout whileHover={{ scale: 1.01 }}
                className="glass-card p-5 cursor-pointer" onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[var(--color-text)] mb-1">{job.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                      <span className="flex items-center gap-1"><span>{job.flag}</span> {job.country}</span>
                      <span className="flex items-center gap-1"><HiBriefcase className="w-3.5 h-3.5" /> {job.category}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-xs font-medium rounded-full">
                    {job.positions} positions
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-[var(--color-text-muted)]">Salary: </span>
                    <span className="font-semibold text-[var(--color-text)]">${job.salary}/month</span>
                  </div>
                  <span className="text-sm text-[var(--color-text-muted)]">Exp: {job.exp}</span>
                </div>
                <button className="mt-4 w-full btn-primary !py-2.5 !text-sm" onClick={e => { e.stopPropagation(); setSelectedJob(job); setShowApplyForm(true); }}>
                  Apply Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 px-4 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Our Recruitment Process" subtitle="Transparent, step-by-step process from application to deployment" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {processSteps.map((step, i) => (
              <motion.div key={i} variants={staggerChild} className="glass-card p-5 text-center relative">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-500 to-gold-500 flex items-center justify-center text-white font-bold">{i + 1}</div>
                <step.icon className="w-6 h-6 mx-auto mb-2 text-primary-500" />
                <h4 className="font-semibold text-sm text-[var(--color-text)] mb-1">{step.title}</h4>
                <p className="text-xs text-[var(--color-text-muted)]">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {showApplyForm && selectedJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowApplyForm(false)}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif font-bold text-xl text-[var(--color-text)]">Apply: {selectedJob.title}</h3>
                <button onClick={() => setShowApplyForm(false)} className="p-2 hover:bg-[var(--color-surface)] rounded-lg"><HiX className="w-5 h-5" /></button>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Full Name *" required className="input-field" />
                  <input placeholder="Age *" type="number" required className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="CNIC (13 digits) *" required className="input-field" />
                  <input placeholder="Phone / WhatsApp *" required className="input-field" />
                </div>
                <input placeholder="Email Address" type="email" className="input-field" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Passport Number" className="input-field" />
                  <select className="input-field"><option value="">Passport Status</option><option>Valid</option><option>Expired</option><option>Not Available</option></select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Experience (years)" type="number" className="input-field" />
                  <textarea placeholder="Experience details..." className="input-field" rows={1} />
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--color-text)] block mb-2">Upload CV / Resume *</label>
                  <input type="file" accept=".pdf,.doc,.docx" className="w-full text-sm text-[var(--color-text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary-500 file:text-white file:font-medium hover:file:bg-primary-600" />
                </div>
                <button type="submit" className="w-full btn-gold !py-3">Submit Application</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .input-field {
          width: 100%; padding: 0.75rem 1rem; background: rgba(255,255,255,0.5);
          border: 1px solid var(--color-border); border-radius: 0.75rem;
          font-size: 0.875rem; color: var(--color-text); outline: none;
        }
        .dark .input-field { background: rgba(0,0,0,0.2); }
        .input-field:focus { border-color: #0d7c3e; }
        .input-field::placeholder { color: var(--color-text-muted); }
      `}</style>
    </div>
  );
}

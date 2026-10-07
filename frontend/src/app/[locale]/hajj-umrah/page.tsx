'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { staggerContainer, staggerChild, fadeInUp } from '@/components/animations/variants';
import SectionHeader from '@/components/ui/SectionHeader';
import { HiStar, HiLocationMarker, HiClock, HiCheckCircle } from 'react-icons/hi';
import { FaKaaba, FaPlane, FaHotel, FaBus, FaPassport, FaMapMarkedAlt } from 'react-icons/fa';

const hajjPackages = [
  {
    id: 1, title: 'Hajj Economy Package 2026', tier: 'Economy', price: 750000, days: 21,
    hotel: 'Al Ebaar Jabal Omar (5km)', features: ['Flights', 'Visa', 'Hotel', 'Transport', 'Meals (Buffet)', 'Mutawwif', 'Ziyarat'],
  },
  {
    id: 2, title: 'Hajj Standard Package 2026', tier: 'Standard', price: 950000, days: 21,
    hotel: 'Pullman Zamzam (1.5km)', features: ['Flights', 'Visa', '5★ Hotel', 'VIP Transport', 'Full Board Meals', 'Mutawwif', 'Ziyarat', 'Laundry'],
  },
  {
    id: 3, title: 'Hajj Premium Package 2026', tier: 'Premium', price: 1350000, days: 21,
    hotel: 'Hilton Suites (350m)', features: ['Business Class Flights', 'Visa', '5★ Hotel', 'Private Transport', 'Gourmet Meals', 'Senior Mutawwif', 'Ziyarat', 'Laundry', '24/7 Support'],
  },
];

const umrahPackages = [
  {
    id: 4, title: 'Umrah Economy — Ramadan Special', tier: 'Economy', price: 325000, days: 14,
    hotel: 'Dar Al Iman (2km)', features: ['Return Flights', 'Umrah Visa', 'Hotel', 'Transport', 'Guidance'],
  },
  {
    id: 5, title: 'Umrah Standard Package', tier: 'Standard', price: 395000, days: 14,
    hotel: 'Shadco Hotel (800m)', features: ['Return Flights', 'Umrah Visa', '4★ Hotel', 'AC Transport', 'Ziyarat', 'Guidance'],
  },
  {
    id: 6, title: 'Umrah Premium Package', tier: 'Premium', price: 550000, days: 14,
    hotel: 'Swissotel Al Maqam (200m)', features: ['Return Flights', 'Premium Visa', '5★ Hotel', 'Private Transport', 'Full Ziyarat', 'VIP Guidance', 'Laundry'],
  },
  {
    id: 7, title: 'Umrah Family Package (4 Persons)', tier: 'Standard', price: 1450000, days: 12,
    hotel: 'Elaf Kindah (500m)', features: ['Return Flights (x4)', 'Umrah Visa (x4)', 'Family Suite', 'Transport', 'Ziyarat', 'Kids Care'],
  },
];

const timeline = [
  { step: 1, title: 'Registration', desc: 'Submit enquiry and select your package' },
  { step: 2, title: 'Documentation', desc: 'Submit passport, photos, and required documents' },
  { step: 3, title: 'Visa Processing', desc: 'We handle complete visa application' },
  { step: 4, title: 'Flights Confirmation', desc: 'Confirmed flight tickets issued' },
  { step: 5, title: 'Pre-Departure Briefing', desc: 'Detailed guidance session on rituals' },
  { step: 6, title: 'Sacred Journey', desc: 'Perform Hajj/Umrah with our full support' },
  { step: 7, title: 'Safe Return', desc: 'Return home with blessed memories' },
];

export default function HajjUmrahPage() {
  const [activeTab, setActiveTab] = useState<'hajj' | 'umrah'>('umrah');
  const packages = activeTab === 'hajj' ? hajjPackages : umrahPackages;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-6xl mb-6 block">🕋</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
              Hajj & Umrah Packages
            </h1>
            <p className="text-xl text-primary-100/80 max-w-2xl mx-auto mb-8">
              Embark on a sacred journey with complete peace of mind. WAFA Travel handles everything — visa, flights, accommodation near Haram, transport, Ziyarat, and experienced Mutawwif guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#packages" className="btn-gold">View Packages</a>
              <a href="#enquiry" className="btn-outline !border-white/30 !text-white hover:!bg-white/10">Submit Enquiry</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Your Sacred Journey — Step by Step" subtitle="From registration to safe return, we guide you through every stage" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-gold-400 to-primary-500" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.step}
                variants={staggerChild}
                className={`relative flex items-center gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}>
                  <div className="glass-card p-4 inline-block">
                    <h4 className="font-serif font-bold text-[var(--color-text)]">{item.title}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                  </div>
                </div>
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-gold-500 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/30">
                  {item.step}
                </div>
                <div className="flex-1 md:hidden">
                  <div className="glass-card p-4">
                    <h4 className="font-serif font-bold text-[var(--color-text)]">{item.title}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                  </div>
                </div>
                <div className={`flex-1 hidden md:block ${i % 2 !== 0 ? '' : ''}`} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4" id="packages">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Our Packages" subtitle="Choose the package that suits your needs and budget" />

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveTab('umrah')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'umrah' ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
              }`}
            >
              🕋 Umrah Packages
            </button>
            <button
              onClick={() => setActiveTab('hajj')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'hajj' ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
              }`}
            >
              🕌 Hajj Packages
            </button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={staggerChild}
                whileHover={{ y: -8 }}
                className="glass-card overflow-hidden"
              >
                <div className={`p-4 text-center ${
                  pkg.tier === 'Premium' ? 'bg-gradient-to-r from-gold-500 to-gold-400' :
                  pkg.tier === 'Standard' ? 'bg-gradient-to-r from-primary-500 to-primary-400' :
                  'bg-gradient-to-r from-primary-700 to-primary-600'
                }`}>
                  <span className={`text-sm font-bold uppercase tracking-wider ${pkg.tier === 'Premium' ? 'text-primary-900' : 'text-white'}`}>
                    {pkg.tier}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-lg mb-3 text-[var(--color-text)]">{pkg.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-4">
                    <HiClock className="w-4 h-4" />
                    {pkg.days} Days
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-4">
                    <HiLocationMarker className="w-4 h-4" />
                    {pkg.hotel}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                        <HiCheckCircle className="w-4 h-4 text-primary-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-[var(--color-border)] pt-4">
                    <span className="text-xs text-[var(--color-text-muted)]">Starting from</span>
                    <p className="text-2xl font-bold text-primary-600 dark:text-gold-400">
                      PKR {pkg.price.toLocaleString()}
                    </p>
                    <span className="text-xs text-[var(--color-text-muted)]">per person</span>
                  </div>
                  <a href="#enquiry" className="block w-full text-center mt-4 btn-primary !py-3 !text-sm">
                    Book Now / Enquire
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 px-4 bg-[var(--color-surface)]" id="enquiry">
        <div className="max-w-2xl mx-auto">
          <SectionHeader title="Submit Your Enquiry" subtitle="Fill in the form below and our team will contact you within 24 hours" />
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Full Name *" className="input-field" required />
              <input placeholder="Phone / WhatsApp *" className="input-field" required />
            </div>
            <input placeholder="Email Address" className="input-field" type="email" />
            <div className="grid md:grid-cols-2 gap-4">
              <select className="input-field" defaultValue="">
                <option value="" disabled>Select Package *</option>
                <option>Umrah Economy</option>
                <option>Umrah Standard</option>
                <option>Umrah Premium</option>
                <option>Hajj Economy</option>
                <option>Hajj Standard</option>
                <option>Hajj Premium</option>
              </select>
              <select className="input-field" defaultValue="">
                <option value="" disabled>Number of Travelers</option>
                <option>1 Person</option>
                <option>2 Persons</option>
                <option>3-5 Persons</option>
                <option>6+ (Group)</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input type="date" placeholder="Preferred Departure" className="input-field" />
              <input placeholder="City of Departure" className="input-field" />
            </div>
            <textarea placeholder="Any special requirements or questions..." className="input-field min-h-[120px]" rows={4} />
            <button type="submit" className="w-full btn-gold !py-4">
              Submit Enquiry
            </button>
          </motion.form>
        </div>
      </section>

      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(255,255,255,0.5);
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          font-size: 0.875rem;
          color: var(--color-text);
          transition: border-color 0.2s;
          outline: none;
        }
        .dark .input-field {
          background: rgba(0,0,0,0.2);
        }
        .input-field:focus {
          border-color: #0d7c3e;
        }
        .input-field::placeholder {
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { HiCheckCircle, HiClock, HiDocumentText } from 'react-icons/hi';

const visaServices = [
  { country: '🇦🇪 UAE', type: 'Tourist Visa', time: '3-5 days', fee: 'PKR 15,000', docs: ['Passport (6+ months validity)', 'CNIC copy', 'Passport-size photograph', 'Bank statement (3 months)', 'Hotel booking confirmation'] },
  { country: '🇸🇦 Saudi Arabia', type: 'Umrah Visa', time: '5-7 days', fee: 'PKR 25,000', docs: ['Passport (6+ months)', 'CNIC copy', 'Passport photographs (4)', 'Vaccination certificates', 'Mahram proof (women applicants)', 'Return ticket booking'] },
  { country: '🇹🇷 Turkey', type: 'E-Visa', time: '1-2 days', fee: 'PKR 12,000', docs: ['Passport (6+ months)', 'CNIC copy', 'Photograph', 'Hotel reservation', 'Return flight ticket'] },
  { country: '🇲🇾 Malaysia', type: 'eVISA / ENTRI', time: '3-5 days', fee: 'PKR 10,000', docs: ['Passport (6+ months)', 'CNIC copy', 'Photograph', 'Hotel booking', 'Flight itinerary', 'Bank statement'] },
  { country: '🇬🇧 United Kingdom', type: 'Tourist Visa', time: '15-20 days', fee: 'PKR 35,000', docs: ['Passport', 'CNIC', 'Bank statements (6 months)', 'Employment letter', 'Hotel booking', 'Travel itinerary', 'Cover letter'] },
  { country: '🇹🇭 Thailand', type: 'Visa on Arrival / E-Visa', time: '2-3 days', fee: 'PKR 8,000', docs: ['Passport (6+ months)', 'CNIC copy', 'Photograph', 'Hotel booking', 'Return ticket'] },
  { country: '🇨🇳 China', type: 'Business / Tourist Visa', time: '7-10 days', fee: 'PKR 20,000', docs: ['Passport (6+ months)', 'CNIC', 'Photographs (2)', 'Invitation letter', 'Hotel booking', 'Flight reservation'] },
  { country: '🇪🇺 Schengen (Europe)', type: 'Tourist Visa', time: '15-30 days', fee: 'PKR 40,000', docs: ['Passport', 'CNIC', 'Travel insurance (€30,000)', 'Bank statements (6 months)', 'Employment letter', 'Hotel bookings', 'Day-wise itinerary', 'Flight reservations'] },
];

export default function VisaPage() {
  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Visa Services</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary-100/80 text-lg">Expert visa assistance with high approval rates</motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Visa Services by Country" subtitle="We handle complete visa processing — documentation, application, and follow-up" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {visaServices.map((v, i) => (
              <motion.div key={i} variants={staggerChild} whileHover={{ y: -4 }} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-xl text-[var(--color-text)]">{v.country}</h3>
                  <span className="text-sm px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-full">{v.type}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-4">
                  <span className="flex items-center gap-1"><HiClock className="w-4 h-4" /> {v.time}</span>
                  <span className="font-semibold text-primary-600 dark:text-gold-400">{v.fee}</span>
                </div>
                <div className="border-t border-[var(--color-border)] pt-3">
                  <p className="text-sm font-semibold text-[var(--color-text)] mb-2 flex items-center gap-1"><HiDocumentText className="w-4 h-4 text-primary-500" /> Required Documents:</p>
                  <ul className="space-y-1">
                    {v.docs.map((d, j) => (
                      <li key={j} className="text-sm text-[var(--color-text-muted)] flex items-center gap-2"><HiCheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />{d}</li>
                    ))}
                  </ul>
                </div>
                <button className="mt-4 w-full btn-primary !py-2.5 !text-sm">Apply Now</button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

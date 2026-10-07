'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { HiStar, HiLocationMarker } from 'react-icons/hi';

const hotels = [
  { name: 'Swissôtel Al Maqam', city: 'Makkah', country: 'Saudi Arabia', stars: 5, price: 45000, emoji: '🕌' },
  { name: 'Oberoi Madinah', city: 'Madinah', country: 'Saudi Arabia', stars: 5, price: 38000, emoji: '🏛️' },
  { name: 'Burj Al Arab', city: 'Dubai', country: 'UAE', stars: 5, price: 120000, emoji: '🏙️' },
  { name: 'Hilton Istanbul Bosphorus', city: 'Istanbul', country: 'Turkey', stars: 5, price: 28000, emoji: '🇹🇷' },
  { name: 'Serena Hotel', city: 'Islamabad', country: 'Pakistan', stars: 5, price: 22000, emoji: '🌳' },
  { name: 'Pearl Continental', city: 'Lahore', country: 'Pakistan', stars: 5, price: 18000, emoji: '🏨' },
  { name: 'Marina Bay Sands', city: 'Singapore', country: 'Singapore', stars: 5, price: 85000, emoji: '🇸🇬' },
  { name: 'Shangri-La', city: 'Kuala Lumpur', country: 'Malaysia', stars: 5, price: 25000, emoji: '🇲🇾' },
];

export default function HotelsPage() {
  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Hotel Bookings</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary-100/80 text-lg">Worldwide hotels at exclusive rates</motion.p>
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Featured Hotels" subtitle="Handpicked properties for comfort and luxury" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotels.map((h, i) => (
              <motion.div key={i} variants={staggerChild} whileHover={{ y: -8 }} className="glass-card overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-primary-100 to-cream-100 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                  <span className="text-5xl">{h.emoji}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-[var(--color-text)]">{h.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-1"><HiLocationMarker className="w-3.5 h-3.5" />{h.city}, {h.country}</p>
                  <div className="flex items-center gap-0.5 my-2">{[...Array(h.stars)].map((_, j) => <HiStar key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />)}</div>
                  <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3 mt-2">
                    <div><span className="text-xs text-[var(--color-text-muted)]">From</span><p className="text-lg font-bold text-primary-600 dark:text-gold-400">PKR {h.price.toLocaleString()}</p><span className="text-xs text-[var(--color-text-muted)]">/night</span></div>
                    <button className="px-4 py-2 bg-primary-500 text-white text-sm rounded-xl">Enquire</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

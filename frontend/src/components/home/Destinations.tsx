'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { staggerContainer, staggerChild } from '@/components/animations/variants';

const destinations = [
  { key: 'makkah', emoji: '🕋', color: 'from-emerald-400 to-emerald-600' },
  { key: 'madinah', emoji: '🕌', color: 'from-green-400 to-green-600' },
  { key: 'dubai', emoji: '🏙️', color: 'from-amber-400 to-amber-600' },
  { key: 'turkey', emoji: '🇹🇷', color: 'from-red-400 to-red-600' },
  { key: 'malaysia', emoji: '🇲🇾', color: 'from-blue-400 to-blue-600' },
  { key: 'thailand', emoji: '🇹🇭', color: 'from-purple-400 to-purple-600' },
  { key: 'hunza', emoji: '🏔️', color: 'from-cyan-400 to-cyan-600' },
  { key: 'skardu', emoji: '⛰️', color: 'from-teal-400 to-teal-600' },
  { key: 'swat', emoji: '🌊', color: 'from-indigo-400 to-indigo-600' },
  { key: 'murree', emoji: '🌲', color: 'from-lime-400 to-lime-600' },
];

export default function Destinations() {
  const t = useTranslations('destinations');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]" id="destinations">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.key}
              variants={staggerChild}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card p-5 text-center group cursor-pointer overflow-hidden relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${dest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <span className="text-4xl mb-3 block group-hover:scale-125 transition-transform duration-300">
                {dest.emoji}
              </span>
              <h3 className="font-serif font-bold text-sm group-hover:text-primary-500 dark:group-hover:text-gold-400 transition-colors">
                {t(dest.key)}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

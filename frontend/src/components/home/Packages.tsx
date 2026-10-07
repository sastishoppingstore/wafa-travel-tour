'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { HiLocationMarker, HiClock, HiStar } from 'react-icons/hi';

const mockPackages = [
  {
    id: 1,
    title: 'Umrah Economy Package',
    category: 'umrah',
    image: '🕋',
    days: 14,
    nights: 12,
    price: 285000,
    rating: 4.8,
    location: 'Makkah & Madinah',
  },
  {
    id: 2,
    title: 'Hajj Premium Package',
    category: 'hajj',
    image: '🕌',
    days: 21,
    nights: 20,
    price: 850000,
    rating: 4.9,
    location: 'Makkah, Madinah & Mina',
  },
  {
    id: 3,
    title: 'Dubai Adventure',
    category: 'international',
    image: '🏙️',
    days: 5,
    nights: 4,
    price: 125000,
    rating: 4.7,
    location: 'Dubai, UAE',
  },
  {
    id: 4,
    title: 'Turkey Explorer',
    category: 'international',
    image: '🇹🇷',
    days: 7,
    nights: 6,
    price: 185000,
    rating: 4.8,
    location: 'Istanbul & Cappadocia',
  },
  {
    id: 5,
    title: 'Hunza Valley Tour',
    category: 'domestic',
    image: '🏔️',
    days: 5,
    nights: 4,
    price: 45000,
    rating: 4.9,
    location: 'Hunza, Pakistan',
  },
  {
    id: 6,
    title: 'Malaysia Getaway',
    category: 'international',
    image: '🇲🇾',
    days: 6,
    nights: 5,
    price: 165000,
    rating: 4.6,
    location: 'Kuala Lumpur & Langkawi',
  },
  {
    id: 7,
    title: 'Skardu Expedition',
    category: 'domestic',
    image: '🏔️',
    days: 6,
    nights: 5,
    price: 55000,
    rating: 4.8,
    location: 'Skardu, Pakistan',
  },
  {
    id: 8,
    title: 'Umrah Standard Package',
    category: 'umrah',
    image: '🕋',
    days: 10,
    nights: 9,
    price: 395000,
    rating: 4.7,
    location: 'Makkah & Madinah',
  },
];

const filters = ['all', 'hajj', 'umrah', 'international', 'domestic'];

export default function Packages() {
  const t = useTranslations('packages');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? mockPackages
    : mockPackages.filter((p) => p.category === activeFilter);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="packages">
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-primary-50 dark:hover:bg-primary-900/20'
              }`}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </motion.div>

        {/* Package Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={staggerChild}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                {/* Image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-cream-100 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center overflow-hidden">
                  <span className="text-6xl group-hover:scale-125 transition-transform duration-500">
                    {pkg.image}
                  </span>
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 dark:bg-black/60 rounded-lg text-xs font-medium">
                    <span className="text-gold-500">★</span> {pkg.rating}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-primary-500 dark:group-hover:text-gold-400 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] mb-3">
                    <HiLocationMarker className="w-4 h-4" />
                    {pkg.location}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mb-4">
                    <span className="flex items-center gap-1">
                      <HiClock className="w-3.5 h-3.5" />
                      {pkg.days} {t('days')} / {pkg.nights} {t('nights')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[var(--color-text-muted)]">{t('from')}</span>
                      <p className="text-xl font-bold text-primary-600 dark:text-gold-400">
                        PKR {pkg.price.toLocaleString()}
                      </p>
                      <span className="text-xs text-[var(--color-text-muted)]">{t('perPerson')}</span>
                    </div>
                    <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-xl transition-colors">
                      {t('viewDetails')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

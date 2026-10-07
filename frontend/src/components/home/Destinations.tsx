'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { staggerContainer, staggerChild } from '@/components/animations/variants';

const destinations = [
  { key: 'makkah', image: '/images/destinations/makkah.jpg' },
  { key: 'madinah', image: '/images/destinations/madinah.jpg' },
  { key: 'dubai', image: '/images/destinations/dubai.jpg' },
  { key: 'turkey', image: '/images/destinations/turkey.jpg' },
  { key: 'malaysia', image: '/images/destinations/malaysia.jpg' },
  { key: 'thailand', image: '/images/destinations/thailand.jpg' },
  { key: 'hunza', image: '/images/destinations/hunza.jpg' },
  { key: 'skardu', image: '/images/destinations/skardu.jpg' },
  { key: 'swat', image: '/images/destinations/hunza.jpg' },
  { key: 'murree', image: '/images/destinations/skardu.jpg' },
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
              className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={dest.image}
                alt={t(dest.key)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-serif font-bold text-sm text-white">
                  {t(dest.key)}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

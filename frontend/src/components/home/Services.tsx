'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { FaPlane, FaHotel, FaPassport, FaUserTie, FaBuilding, FaKaaba } from 'react-icons/fa';
import { HiMap } from 'react-icons/hi';

const services = [
  { key: 'hajjUmrah', icon: FaKaaba, href: '/hajj-umrah', color: 'from-emerald-500 to-emerald-700' },
  { key: 'flights', icon: FaPlane, href: '/flights', color: 'from-blue-500 to-blue-700' },
  { key: 'tours', icon: HiMap, href: '/tours', color: 'from-purple-500 to-purple-700' },
  { key: 'visa', icon: FaPassport, href: '/visa', color: 'from-amber-500 to-amber-700' },
  { key: 'hotels', icon: FaHotel, href: '/hotels', color: 'from-rose-500 to-rose-700' },
  { key: 'employment', icon: FaUserTie, href: '/overseas-jobs', color: 'from-teal-500 to-teal-700' },
  { key: 'corporate', icon: FaBuilding, href: '/contact', color: 'from-indigo-500 to-indigo-700' },
];

export default function Services() {
  const t = useTranslations('services');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]" id="services">
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
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.a
              key={service.key}
              href={service.href}
              variants={staggerChild}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card p-6 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[var(--color-text)] mb-2 group-hover:text-primary-500 dark:group-hover:text-gold-400 transition-colors">
                {t(`${service.key}.title`)}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {t(`${service.key}.desc`)}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { FaShieldAlt, FaAward, FaLock, FaHeadset, FaHandshake } from 'react-icons/fa';

const stats = [
  { value: 15, suffix: '+', label: 'years' },
  { value: 50000, suffix: '+', label: 'travelers' },
  { value: 24, suffix: '/7', label: 'support' },
  { value: 100, suffix: '%', label: 'price' },
];

const badges = ['badge1', 'badge2', 'badge3', 'badge4'];

export default function WhyChoose() {
  const t = useTranslations('whyChoose');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="why-choose">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-400 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </motion.div>

        {/* Stats Counters */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              className="glass-card text-center p-8"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    separator=","
                  />
                ) : (
                  '0'
                )}
              </div>
              <p className="text-[var(--color-text-muted)] font-medium">
                {t(stat.label)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {badges.map((badge, i) => {
            const Icon = [FaShieldAlt, FaAward, FaLock, FaHeadset][i];
            return (
              <motion.div
                key={badge}
                variants={staggerChild}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-card p-6 text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {t(badge)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

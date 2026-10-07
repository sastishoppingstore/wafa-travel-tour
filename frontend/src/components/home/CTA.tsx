'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

export default function CTA() {
  const t = useTranslations('cta');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-700 to-primary-900" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-300 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-primary-100/80 mb-10 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-2xl hover:bg-cream-100 shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <FaPhoneAlt className="w-5 h-5" />
            {t('button')}
          </a>
          <a
            href="https://wa.me/92XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 shadow-xl shadow-green-500/30 hover:-translate-y-1 transition-all duration-300"
          >
            <FaWhatsapp className="w-5 h-5" />
            {t('whatsapp')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

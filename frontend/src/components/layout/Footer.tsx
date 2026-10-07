'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const services = [
    { key: 'hajjUmrah', href: '/hajj-umrah' },
    { key: 'flights', href: '/flights' },
    { key: 'tours', href: '/tours' },
    { key: 'visa', href: '/visa' },
    { key: 'hotels', href: '/hotels' },
    { key: 'overseasJobs', href: '/overseas-jobs' },
  ];

  const quickLinks = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'blog', href: '/blog' },
    { key: 'contact', href: '/contact' },
  ];

  const socials = [
    { icon: FaFacebookF, href: '#', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
    { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-primary-900 to-primary-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <motion.div variants={staggerChild} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-primary-900 font-bold text-xl">W</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold">WAFA</h3>
                <p className="text-xs text-primary-300">Travel & Tour</p>
              </div>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed mb-4">
              {t('tagline')}
            </p>
            <div className="flex gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerChild}>
            <h4 className="text-gold-400 font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-primary-200 hover:text-gold-400 text-sm transition-colors"
                  >
                    {tNav(link.key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={staggerChild}>
            <h4 className="text-gold-400 font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('ourServices')}
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.key}>
                  <Link
                    href={s.href}
                    className="text-primary-200 hover:text-gold-400 text-sm transition-colors"
                  >
                    {tNav(s.key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div variants={staggerChild}>
            <h4 className="text-gold-400 font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('contactUs')}
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-primary-200">
                <HiLocationMarker className="w-5 h-5 text-gold-400 mt-0.5 shrink-0" />
                {t('address')}
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-200">
                <HiPhone className="w-5 h-5 text-gold-400 shrink-0" />
                {t('phone')}
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-200">
                <HiMail className="w-5 h-5 text-gold-400 shrink-0" />
                {t('email')}
              </li>
            </ul>

            <h4 className="text-gold-400 font-semibold mb-2 text-sm uppercase tracking-wider">
              {t('newsletter')}
            </h4>
            <p className="text-primary-200 text-xs mb-3">{t('newsletterDesc')}</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="flex-1 px-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder:text-primary-300 focus:outline-none focus:border-gold-400 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gradient-to-r from-gold-500 to-gold-400 text-primary-900 font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all"
              >
                {t('subscribe')}
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-300 text-sm">
            © {new Date().getFullYear()} WAFA Travel & Tour. {t('rights')}
          </p>
          <p className="text-primary-400 text-xs">
            {t('license')}
          </p>
        </div>
      </div>
    </footer>
  );
}

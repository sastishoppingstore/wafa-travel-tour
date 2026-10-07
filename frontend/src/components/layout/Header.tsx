'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/lib/store';
import { HiMenu, HiX, HiSun, HiMoon, HiGlobe, HiPhone } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'hajjUmrah', href: '/hajj-umrah' },
  { key: 'flights', href: '/flights' },
  { key: 'tours', href: '/tours' },
  { key: 'overseasJobs', href: '/overseas-jobs' },
  { key: 'visa', href: '/visa' },
  { key: 'hotels', href: '/hotels' },
  { key: 'about', href: '/about' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
];

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const { isDark, toggleTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const path = window.location.pathname;
    const newPath = path.replace(/^\/(en|ur)/, `/${newLocale}`);
    window.location.href = newPath;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-card !rounded-none border-x-0 border-t-0 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-serif font-bold text-primary-600 dark:text-primary-400">
                WAFA
              </h1>
              <p className="text-xs text-[var(--color-text-muted)] -mt-1">Travel & Tour</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 7).map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:text-primary-500 dark:hover:text-gold-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
              >
                {t(item.key as any)}
              </Link>
            ))}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-[var(--color-text)] hover:text-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200">
                More ▾
              </button>
              <div className="absolute top-full right-0 mt-1 w-48 glass-card !rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                {navItems.slice(7).map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="block px-3 py-2 text-sm text-[var(--color-text)] hover:text-primary-500 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                  >
                    {t(item.key as any)}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => switchLocale(locale === 'en' ? 'ur' : 'en')}
              className="p-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              title="Switch Language"
            >
              <HiGlobe className="w-5 h-5 text-[var(--color-text)]" />
            </button>

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9, rotate: 180 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              {isDark ? (
                <HiSun className="w-5 h-5 text-gold-400" />
              ) : (
                <HiMoon className="w-5 h-5 text-primary-600" />
              )}
            </motion.button>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 btn-primary !px-5 !py-2.5 text-sm"
            >
              <HiPhone className="w-4 h-4" />
              {t('contact')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20"
            >
              {isOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-card !rounded-none border-x-0 border-t-0 mt-2"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:text-primary-500 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                >
                  {t(item.key as any)}
                </Link>
              ))}
              <div className="pt-2 border-t border-[var(--color-border)]">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center btn-primary !py-3 text-sm"
                >
                  {t('contact')}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

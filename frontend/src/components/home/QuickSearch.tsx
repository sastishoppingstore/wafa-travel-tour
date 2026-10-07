'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { HiSearch, HiLocationMarker, HiCalendar, HiUserGroup } from 'react-icons/hi';
import { FaPlane, FaKaaba, FaMapMarkedAlt, FaBriefcase } from 'react-icons/fa';

const tabKeys = ['flights', 'umrahHajj', 'tours', 'jobs'] as const;
type Tab = (typeof tabKeys)[number];

export default function QuickSearch() {
  const t = useTranslations('quickSearch');
  const [activeTab, setActiveTab] = useState<Tab>('flights');

  const tabs: { key: Tab; icon: React.ComponentType<{className?: string}>; label: string }[] = [
    { key: 'flights', icon: FaPlane, label: t('flights') },
    { key: 'umrahHajj', icon: FaKaaba, label: t('umrahHajj') },
    { key: 'tours', icon: FaMapMarkedAlt, label: t('tours') },
    { key: 'jobs', icon: FaBriefcase, label: t('jobs') },
  ];

  return (
    <div className="glass-card !rounded-2xl p-2 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-1 mb-3 p-1 bg-white/5 dark:bg-black/20 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search Form */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-3"
        >
          {activeTab === 'flights' && <FlightSearch />}
          {activeTab === 'umrahHajj' && <UmrahSearch />}
          {activeTab === 'tours' && <ToursSearch />}
          {activeTab === 'jobs' && <JobsSearch />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FlightSearch() {
  const t = useTranslations('quickSearch');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      <SearchInput icon={HiLocationMarker} placeholder={t('from')} />
      <SearchInput icon={HiLocationMarker} placeholder={t('to')} />
      <SearchInput icon={HiCalendar} placeholder={t('depart')} type="date" />
      <SearchInput icon={HiUserGroup} placeholder={t('passengers')} />
      <button className="btn-gold !rounded-xl flex items-center justify-center gap-2">
        <HiSearch className="w-5 h-5" />
        {t('search')}
      </button>
    </div>
  );
}

function UmrahSearch() {
  const t = useTranslations('quickSearch');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <SearchInput icon={HiCalendar} placeholder={t('depart')} type="date" />
      <SearchInput icon={HiUserGroup} placeholder={t('passengers')} />
      <SearchInput icon={HiLocationMarker} placeholder={t('duration')} />
      <button className="btn-gold !rounded-xl flex items-center justify-center gap-2">
        <HiSearch className="w-5 h-5" />
        {t('search')}
      </button>
    </div>
  );
}

function ToursSearch() {
  const t = useTranslations('quickSearch');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <SearchInput icon={HiLocationMarker} placeholder={t('destination')} />
      <SearchInput icon={HiCalendar} placeholder={t('depart')} type="date" />
      <SearchInput icon={HiUserGroup} placeholder={t('budget')} />
      <button className="btn-gold !rounded-xl flex items-center justify-center gap-2">
        <HiSearch className="w-5 h-5" />
        {t('search')}
      </button>
    </div>
  );
}

function JobsSearch() {
  const t = useTranslations('quickSearch');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <SearchInput icon={HiLocationMarker} placeholder={t('country')} />
      <SearchInput icon={HiLocationMarker} placeholder={t('category')} />
      <SearchInput icon={HiUserGroup} placeholder="Experience" />
      <button className="btn-gold !rounded-xl flex items-center justify-center gap-2">
        <HiSearch className="w-5 h-5" />
        {t('search')}
      </button>
    </div>
  );
}

function SearchInput({
  icon: Icon,
  placeholder,
  type = 'text',
}: {
  icon: React.ComponentType<{className?: string}>;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-white/10 dark:bg-black/20 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-primary-400 transition-colors"
      />
    </div>
  );
}

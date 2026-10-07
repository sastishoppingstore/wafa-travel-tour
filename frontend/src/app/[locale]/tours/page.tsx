'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { HiLocationMarker, HiClock, HiSearch } from 'react-icons/hi';

const tourCategories = ['All', 'International', 'Domestic', 'Northern Areas'];

const tours = [
  { id: 1, title: 'Dubai Adventure', category: 'International', destination: 'Dubai, UAE', days: 5, nights: 4, price: 125000, emoji: '🏙️', highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Marina Cruise'] },
  { id: 2, title: 'Turkey Explorer', category: 'International', destination: 'Istanbul & Cappadocia', days: 7, nights: 6, price: 185000, emoji: '🇹🇷', highlights: ['Blue Mosque', 'Bosphorus Cruise', 'Hot Air Balloon', 'Grand Bazaar'] },
  { id: 3, title: 'Malaysia Getaway', category: 'International', destination: 'KL & Langkawi', days: 6, nights: 5, price: 165000, emoji: '🇲🇾', highlights: ['Twin Towers', 'Genting', 'Langkawi Cable Car', 'Batu Caves'] },
  { id: 4, title: 'Thailand Paradise', category: 'International', destination: 'Bangkok & Pattaya', days: 6, nights: 5, price: 145000, emoji: '🇹🇭', highlights: ['Grand Palace', 'Floating Market', 'Island Tour', 'Alcazar Show'] },
  { id: 5, title: 'Azerbaijan Tour', category: 'International', destination: 'Baku', days: 5, nights: 4, price: 155000, emoji: '🇦🇿', highlights: ['Flame Towers', 'Old City', 'Mud Volcanoes', 'Mall of Baku'] },
  { id: 6, title: 'Hunza Valley', category: 'Northern Areas', destination: 'Hunza, Pakistan', days: 5, nights: 4, price: 45000, emoji: '🏔️', highlights: ['Attabad Lake', 'Altit Fort', 'Khunjerab Pass', 'Eagle\'s Nest'] },
  { id: 7, title: 'Skardu Expedition', category: 'Northern Areas', destination: 'Skardu, Pakistan', days: 6, nights: 5, price: 55000, emoji: '⛰️', highlights: ['Shangrila Resort', 'Deosai Plains', 'Shigar Fort', 'Cold Desert'] },
  { id: 8, title: 'Swat & Kalam', category: 'Northern Areas', destination: 'Swat, Pakistan', days: 4, nights: 3, price: 32000, emoji: '🌊', highlights: ['Mahodand Lake', 'Kalam Valley', 'Bahrain', 'Ushu Forest'] },
  { id: 9, title: 'Murree & Ayubia', category: 'Domestic', destination: 'Murree, Pakistan', days: 3, nights: 2, price: 18000, emoji: '🌲', highlights: ['Mall Road', 'Patriata', 'Ayubia Pipeline', 'Bhurban'] },
  { id: 10, title: 'Naran & Kaghan', category: 'Northern Areas', destination: 'Naran, Pakistan', days: 5, nights: 4, price: 38000, emoji: '🏞️', highlights: ['Saif ul Malook', 'Lalazar', 'Babusar Top', 'Lake Saif'] },
  { id: 11, title: 'Baku & Tbilisi Combo', category: 'International', destination: 'Azerbaijan & Georgia', days: 8, nights: 7, price: 225000, emoji: '🌍', highlights: ['Baku', 'Gobustan', 'Tbilisi Old Town', 'Kazbegi'] },
  { id: 12, title: 'Chitral & Kalash', category: 'Domestic', destination: 'Chitral, Pakistan', days: 5, nights: 4, price: 42000, emoji: '🏕️', highlights: ['Kalash Valley', 'Shandur Pass', 'Chitral Fort', 'Garam Chashma'] },
];

export default function ToursPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = tours.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Explore the World</h1>
            <p className="text-xl text-primary-100/80 mb-8">From the peaks of Karakoram to the wonders of the world — curated tours for every traveler</p>
            <div className="relative max-w-md mx-auto">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
              <input
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search destinations..." className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-primary-200/50 focus:outline-none focus:border-gold-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {tourCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }`}>{cat}</button>
            ))}
          </div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(tour => (
              <motion.div key={tour.id} variants={staggerChild} layout whileHover={{ y: -8 }} className="glass-card overflow-hidden cursor-pointer group">
                <div className="h-40 bg-gradient-to-br from-primary-100 to-cream-100 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center relative">
                  <span className="text-6xl group-hover:scale-125 transition-transform duration-500">{tour.emoji}</span>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-primary-500/90 text-white text-xs rounded-lg font-medium">{tour.category}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-lg mb-1 group-hover:text-primary-500 dark:group-hover:text-gold-400 transition-colors">{tour.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] mb-3">
                    <HiLocationMarker className="w-4 h-4" /> {tour.destination}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] mb-3">
                    <HiClock className="w-4 h-4" /> {tour.days} Days / {tour.nights} Nights
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tour.highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-full">{h}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3">
                    <div>
                      <span className="text-xs text-[var(--color-text-muted)]">From</span>
                      <p className="text-xl font-bold text-primary-600 dark:text-gold-400">PKR {tour.price.toLocaleString()}</p>
                    </div>
                    <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-xl transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl block mb-4">🔍</span>
              <p className="text-xl text-[var(--color-text-muted)]">No tours found matching your search</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

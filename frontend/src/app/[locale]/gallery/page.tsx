'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { HiX } from 'react-icons/hi';

const images = [
  { id: 1, title: 'Makkah — Masjid al-Haram', category: 'Hajj & Umrah', emoji: '🕋', color: 'from-emerald-400 to-emerald-700' },
  { id: 2, title: 'Madinah — Masjid an-Nabawi', category: 'Hajj & Umrah', emoji: '🕌', color: 'from-green-400 to-green-700' },
  { id: 3, title: 'Burj Khalifa, Dubai', category: 'International Tours', emoji: '🏙️', color: 'from-blue-400 to-blue-700' },
  { id: 4, title: 'Hunza Valley, Pakistan', category: 'Domestic Tours', emoji: '🏔️', color: 'from-cyan-400 to-cyan-700' },
  { id: 5, title: 'Cappadocia Hot Air Balloons', category: 'International Tours', emoji: '🎈', color: 'from-orange-400 to-orange-700' },
  { id: 6, title: 'Skardu — Shangrila Resort', category: 'Domestic Tours', emoji: '🏞️', color: 'from-teal-400 to-teal-700' },
  { id: 7, title: 'Istanbul — Blue Mosque', category: 'International Tours', emoji: '🇹🇷', color: 'from-red-400 to-red-700' },
  { id: 8, title: 'Malaysia — Petronas Towers', category: 'International Tours', emoji: '🇲🇾', color: 'from-indigo-400 to-indigo-700' },
  { id: 9, title: 'Swat Valley', category: 'Domestic Tours', emoji: '🌊', color: 'from-sky-400 to-sky-700' },
  { id: 10, title: 'Our Happy Travelers Group', category: 'Group Travel', emoji: '👨‍👩‍👧‍👦', color: 'from-purple-400 to-purple-700' },
  { id: 11, title: 'Desert Safari Dubai', category: 'International Tours', emoji: '🐪', color: 'from-amber-400 to-amber-700' },
  { id: 12, title: 'Northern Pakistan Road Trip', category: 'Domestic Tours', emoji: '🚙', color: 'from-lime-400 to-lime-700' },
];

const categories = ['All', 'Hajj & Umrah', 'International Tours', 'Domestic Tours', 'Group Travel'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);
  const filtered = activeCategory === 'All' ? images : images.filter(i => i.category === activeCategory);

  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Gallery</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary-100/80 text-lg">Moments captured from our journeys around the world</motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === c ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)]'}`}>{c}</button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map(img => (
                <motion.div key={img.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${img.color} flex items-center justify-center group`}
                >
                  <span className="text-5xl group-hover:scale-125 transition-transform duration-500">{img.emoji}</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-3">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">{img.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className={`w-full max-w-lg aspect-square rounded-3xl bg-gradient-to-br ${selectedImage.color} flex flex-col items-center justify-center p-8`}
              onClick={e => e.stopPropagation()}
            >
              <span className="text-8xl mb-6">{selectedImage.emoji}</span>
              <h3 className="text-2xl font-serif font-bold text-white">{selectedImage.title}</h3>
              <p className="text-white/80 mt-2">{selectedImage.category}</p>
              <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40">
                <HiX className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

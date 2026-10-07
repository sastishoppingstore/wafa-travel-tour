'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { HiClock, HiUser } from 'react-icons/hi';

const posts = [
  { id: 1, title: 'Complete Guide to Umrah 2026', excerpt: 'Everything you need to know before performing Umrah — visa, hotels, rituals, and tips.', category: 'Hajj & Umrah', date: 'Sep 15, 2026', readTime: '8 min', emoji: '🕋' },
  { id: 2, title: 'Top 10 Places to Visit in Turkey', excerpt: 'From Istanbul\'s Blue Mosque to Cappadocia\'s hot air balloons — discover Turkey\'s magic.', category: 'Travel Guide', date: 'Sep 10, 2026', readTime: '6 min', emoji: '🇹🇷' },
  { id: 3, title: 'Working in the Gulf: Complete Guide', excerpt: 'A comprehensive guide for Pakistani workers planning overseas employment.', category: 'Employment', date: 'Sep 5, 2026', readTime: '10 min', emoji: '💼' },
  { id: 4, title: 'Hunza Valley: Paradise on Earth', excerpt: 'Why Hunza should be on every Pakistani traveler\'s bucket list.', category: 'Travel Guide', date: 'Aug 28, 2026', readTime: '5 min', emoji: '🏔️' },
  { id: 5, title: 'Dubai on a Budget: Tips & Tricks', excerpt: 'How to enjoy Dubai without breaking the bank — save up to 40%.', category: 'Travel Guide', date: 'Aug 20, 2026', readTime: '7 min', emoji: '🏙️' },
  { id: 6, title: 'Visa Requirements for Europeans 2026', excerpt: 'Updated list of visa requirements for Pakistani citizens traveling to Europe.', category: 'Visa Guide', date: 'Aug 15, 2026', readTime: '6 min', emoji: '🇪🇺' },
];

const categories = ['All', 'Hajj & Umrah', 'Travel Guide', 'Employment', 'Visa Guide'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Travel Blog & Guides</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-primary-100/80 text-lg">Expert tips, destination guides, and travel insights</motion.p>
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
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <motion.article key={post.id} variants={staggerChild} layout whileHover={{ y: -8 }} className="glass-card overflow-hidden cursor-pointer group">
                <div className="h-44 bg-gradient-to-br from-primary-100 to-cream-100 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-125 transition-transform duration-500">{post.emoji}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] mb-2">
                    <span className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 rounded-full">{post.category}</span>
                    <span className="flex items-center gap-1"><HiClock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[var(--color-text)] group-hover:text-primary-500 dark:group-hover:text-gold-400 transition-colors mb-2">{post.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{post.excerpt}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-3">{post.date}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

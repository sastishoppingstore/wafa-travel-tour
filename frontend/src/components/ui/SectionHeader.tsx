'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  badge?: string;
}

export default function SectionHeader({ title, subtitle, align = 'center', badge }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={align === 'center' ? 'text-center mb-12' : 'mb-12'}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 bg-gold-400/10 border border-gold-400/30 rounded-full text-gold-500 text-sm font-medium mb-4">
          {badge}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </motion.div>
  );
}

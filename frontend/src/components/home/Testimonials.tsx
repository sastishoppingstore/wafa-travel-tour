'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const testimonials = [
  {
    name: 'Ahmed Khan',
    location: 'Lahore',
    text: 'WAFA Travel made our Umrah journey truly memorable. From visa processing to hotel arrangements near Haram, everything was perfect. Highly recommended!',
    rating: 5,
    service: 'Umrah Package',
  },
  {
    name: 'Fatima Zahra',
    location: 'Karachi',
    text: 'Our family trip to Turkey was flawlessly organized. The itinerary was well-planned, hotels were excellent, and the tour guide was knowledgeable.',
    rating: 5,
    service: 'Turkey Tour',
  },
  {
    name: 'Muhammad Ali',
    location: 'Islamabad',
    text: 'Got my Dubai visa in just 3 days! The team is professional and responsive. Their prices are much better than other agencies I checked.',
    rating: 5,
    service: 'Visa Service',
  },
  {
    name: 'Saira Bibi',
    location: 'Faisalabad',
    text: 'I applied for overseas employment through WAFA and they handled everything from documentation to visa. Now working in Dubai, Alhamdulillah!',
    rating: 5,
    service: 'Overseas Employment',
  },
  {
    name: 'Usman Sheikh',
    location: 'Rawalpindi',
    text: 'Booked my Hajj package with WAFA. The accommodations were close to Haram, transport was comfortable, and the guidance was excellent.',
    rating: 5,
    service: 'Hajj Package',
  },
];

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-surface)]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-subtitle">{t('subtitle')}</p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 md:p-12 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <HiStar key={i} className="w-6 h-6 text-gold-400 fill-gold-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg md:text-xl text-[var(--color-text)] leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              {/* Author */}
              <div>
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xl font-bold">
                  {testimonials[current].name[0]}
                </div>
                <h4 className="font-serif font-bold text-[var(--color-text)]">
                  {testimonials[current].name}
                </h4>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {testimonials[current].location} • {testimonials[current].service}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 bg-gradient-to-r from-primary-500 to-gold-400'
                      : 'bg-[var(--color-border)]'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

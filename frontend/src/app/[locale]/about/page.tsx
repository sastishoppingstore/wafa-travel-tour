'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { HiShieldCheck, HiUserGroup, HiStar } from 'react-icons/hi';
import { FaAward } from 'react-icons/fa';

const timeline = [
  { year: '2010', title: 'Founded', desc: 'WAFA Travel started as a small travel consultancy in Lahore.' },
  { year: '2013', title: 'IATA Membership', desc: 'Became a certified IATA member travel agency.' },
  { year: '2015', title: 'Overseas Employment License', desc: 'Received Bureau of Emigration license for manpower services.' },
  { year: '2018', title: '10,000+ Happy Travelers', desc: 'Crossed the milestone of serving over 10,000 customers.' },
  { year: '2021', title: 'Digital Transformation', desc: 'Launched online booking platform for flights, tours, and visa services.' },
  { year: '2024', title: '50,000+ Customers', desc: 'Now serving 50,000+ happy travelers with offices in major cities.' },
];

const team = [
  { name: 'Muhammad Waseem', role: 'CEO & Founder', emoji: '👨‍💼' },
  { name: 'Ahmed Raza', role: 'Operations Director', emoji: '👨‍💻' },
  { name: 'Fatima Noor', role: 'Hajj & Umrah Head', emoji: '👩‍💼' },
  { name: 'Ali Hassan', role: 'Flight Booking Manager', emoji: '🧑‍💼' },
  { name: 'Sara Khan', role: 'Visa Consultant', emoji: '👩‍💻' },
  { name: 'Usman Ghani', role: 'Overseas Employment Head', emoji: '👨‍🏫' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">About WAFA Travel</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-primary-100/80">Your Trusted Journey Partner since 2010</motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader title="Our Story" subtitle="From a small office in Lahore to Pakistan's most trusted travel agency" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-[var(--color-text-muted)] leading-relaxed text-lg">
            WAFA Travel & Tour was established in 2010 with a vision to provide honest, reliable, and premium travel services to the people of Pakistan. Over 15 years, we have grown into a full-service travel agency offering Hajj & Umrah packages, international and domestic tours, flight bookings, visa services, hotel reservations, and overseas employment solutions. Our commitment to transparency, competitive pricing, and exceptional customer service has earned us the trust of over 50,000 travelers across Pakistan.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-[var(--color-surface)]">
        <div className="max-w-3xl mx-auto">
          <SectionHeader title="Our Journey" />
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-gold-400" />
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {timeline.map((item, i) => (
                <motion.div key={i} variants={staggerChild} className="relative flex gap-6 mb-8 pl-14">
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-gold-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    {item.year}
                  </div>
                  <div className="glass-card p-4 flex-1">
                    <h4 className="font-serif font-bold text-[var(--color-text)]">{item.title}</h4>
                    <p className="text-sm text-[var(--color-text-muted)]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Meet Our Team" subtitle="Dedicated professionals working to make your journey perfect" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {team.map((member, i) => (
              <motion.div key={i} variants={staggerChild} whileHover={{ y: -8, rotateY: 5 }} className="glass-card p-6 text-center group">
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{member.emoji}</span>
                <h3 className="font-serif font-bold text-[var(--color-text)]">{member.name}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4 bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Licenses & Certifications" />
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
          >
            {[
              { icon: HiShieldCheck, title: 'Bureau of Emigration License', desc: 'License No. [BEOE-LHR-2024-XXXX]' },
              { icon: FaAward, title: 'IATA Certified Agency', desc: 'IATA accreditation for flight bookings' },
              { icon: HiUserGroup, title: 'Saudi Ministry of Tourism', desc: 'Authorized Hajj & Umrah service provider' },
              { icon: HiStar, title: 'Government of Pakistan', desc: 'Registered with Ministry of Tourism' },
            ].map((cert, i) => (
              <motion.div key={i} variants={staggerChild} className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white shrink-0">
                  <cert.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text)]">{cert.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)]">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

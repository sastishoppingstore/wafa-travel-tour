'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, staggerChild, fadeInUp } from '@/components/animations/variants';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-primary-100/80 text-lg">We&apos;re here to help. Reach out anytime!</motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            {[
              { icon: HiLocationMarker, title: 'Our Office', lines: ['[123 Main Boulevard]', 'Gulberg III, Lahore, Pakistan]'] },
              { icon: HiPhone, title: 'Phone', lines: ['[+92-300-1234567]', '[+92-42-35761234]'] },
              { icon: HiMail, title: 'Email', lines: ['[info@wafatravel.com]', '[bookings@wafatravel.com]'] },
              { icon: FaWhatsapp, title: 'WhatsApp', lines: ['[+92-300-1234567]', 'Chat anytime 24/7'] },
            ].map((item, i) => (
              <motion.div key={i} variants={staggerChild} className="glass-card p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text)]">{item.title}</h3>
                  {item.lines.map((l, j) => <p key={j} className="text-sm text-[var(--color-text-muted)]">{l}</p>)}
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <div className="glass-card p-5">
              <h3 className="font-semibold text-[var(--color-text)] mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-lg bg-[var(--color-surface)] hover:bg-primary-500 hover:text-white flex items-center justify-center transition-all text-[var(--color-text-muted)]">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 glass-card p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-[var(--color-text)] mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Your Name *" required className="input-field" />
                <input placeholder="Your Email *" type="email" required className="input-field" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input placeholder="Phone Number" className="input-field" />
                <select className="input-field"><option value="">Select Service</option><option>Hajj & Umrah</option><option>Flight Booking</option><option>Tour Packages</option><option>Visa Services</option><option>Overseas Employment</option><option>Hotel Booking</option><option>Other</option></select>
              </div>
              <input placeholder="Subject" className="input-field" />
              <textarea placeholder="Your Message *" rows={5} required className="input-field" />
              <button type="submit" className="btn-gold w-full !py-4">Send Message</button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card overflow-hidden h-80 bg-gradient-to-br from-primary-50 to-cream-50 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
            <div className="text-center">
              <HiLocationMarker className="w-12 h-12 mx-auto mb-2 text-primary-500" />
              <p className="text-[var(--color-text-muted)]">[Google Maps Embed — Replace with your API key]</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .input-field { width: 100%; padding: 0.875rem 1rem; background: rgba(255,255,255,0.5); border: 1px solid var(--color-border); border-radius: 0.75rem; font-size: 0.875rem; color: var(--color-text); outline: none; }
        .dark .input-field { background: rgba(0,0,0,0.2); }
        .input-field:focus { border-color: #0d7c3e; }
        .input-field::placeholder { color: var(--color-text-muted); }
      `}</style>
    </div>
  );
}

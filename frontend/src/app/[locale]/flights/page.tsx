'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, staggerChild } from '@/components/animations/variants';
import { HiSearch, HiLocationMarker, HiCalendar, HiUserGroup, HiFilter } from 'react-icons/hi';
import { FaPlane, FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

const airlines = ['PIA', 'Emirates', 'Qatar Airways', 'Saudia', 'Turkish Airlines', 'FlyDubai', 'Etihad'];

const mockResults = [
  { id: 1, airline: 'PIA', flightNo: 'PK-752', depart: '06:30', arrive: '09:45', duration: '3h 15m', stops: 0, price: 42000, logo: '✈️' },
  { id: 2, airline: 'Emirates', flightNo: 'EK-612', depart: '03:15', arrive: '05:30', duration: '2h 15m', stops: 0, price: 68000, logo: '🔴' },
  { id: 3, airline: 'Qatar Airways', flightNo: 'QR-614', depart: '04:00', arrive: '07:45', duration: '3h 45m', stops: 1, price: 55000, logo: '🟤' },
  { id: 4, airline: 'Turkish Airlines', flightNo: 'TK-756', depart: '11:30', arrive: '18:00', duration: '6h 30m', stops: 1, price: 48000, logo: '🔵' },
  { id: 5, airline: 'Saudia', flightNo: 'SV-742', depart: '22:00', arrive: '01:30', duration: '3h 30m', stops: 0, price: 38000, logo: '🟢' },
  { id: 6, airline: 'FlyDubai', flightNo: 'FZ-338', depart: '14:45', arrive: '17:15', duration: '2h 30m', stops: 0, price: 35000, logo: '🟠' },
];

export default function FlightsPage() {
  const [tripType, setTripType] = useState('one-way');
  const [showResults, setShowResults] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [filterAirline, setFilterAirline] = useState('all');

  const filtered = filterAirline === 'all' ? mockResults : mockResults.filter(f => f.airline === filterAirline);
  const sorted = [...filtered].sort((a, b) => sortBy === 'price' ? a.price - b.price : sortBy === 'duration' ? a.duration.localeCompare(b.duration) : a.stops - b.stops);

  return (
    <div className="pt-20">
      {/* Hero / Search */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Book Your Flight</h1>
            <p className="text-primary-100/80">Best prices on domestic & international flights</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            {/* Trip Type */}
            <div className="flex gap-4 mb-6">
              {['one-way', 'round-trip', 'multi-city'].map(type => (
                <button key={type} onClick={() => setTripType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    tripType === type ? 'bg-primary-500 text-white' : 'text-[var(--color-text-muted)] hover:bg-primary-50 dark:hover:bg-primary-900/20'
                  }`}
                >{type.replace('-', ' ')}</button>
              ))}
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
              <div className="relative">
                <FaPlaneDeparture className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
                <input placeholder="From (e.g. Lahore)" className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:border-primary-400 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]" />
              </div>
              <div className="relative">
                <FaPlaneArrival className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
                <input placeholder="To (e.g. Dubai)" className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:border-primary-400 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]" />
              </div>
              <div className="relative">
                <HiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
                <input type="date" className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:border-primary-400 text-[var(--color-text)]" />
              </div>
              {tripType === 'round-trip' && (
                <div className="relative">
                  <HiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
                  <input type="date" placeholder="Return" className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:border-primary-400 text-[var(--color-text)]" />
                </div>
              )}
              <div className="relative">
                <HiUserGroup className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
                <select className="w-full pl-10 pr-4 py-3 bg-white/10 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:border-primary-400 text-[var(--color-text)]">
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3 Passengers</option>
                  <option>4+ Passengers</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <select className="px-4 py-3 bg-white/10 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)]">
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
              <button onClick={() => setShowResults(true)} className="flex-1 btn-gold !py-3 flex items-center justify-center gap-2">
                <HiSearch className="w-5 h-5" /> Search Flights
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 px-4">
            <div className="max-w-5xl mx-auto">
              {/* Filters bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h3 className="font-serif font-bold text-xl text-[var(--color-text)]">
                  {sorted.length} Flights Found
                </h3>
                <div className="flex gap-3">
                  <select value={filterAirline} onChange={e => setFilterAirline(e.target.value)}
                    className="px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)]">
                    <option value="all">All Airlines</option>
                    {airlines.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text)]">
                    <option value="price">Sort by Price</option>
                    <option value="duration">Sort by Duration</option>
                    <option value="stops">Sort by Stops</option>
                  </select>
                </div>
              </div>

              {/* Flight Cards */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
                {sorted.map(flight => (
                  <motion.div key={flight.id} variants={staggerChild} layout
                    whileHover={{ scale: 1.01 }}
                    className="glass-card p-5 flex flex-col md:flex-row items-center gap-4"
                  >
                    <div className="flex items-center gap-3 md:w-1/4">
                      <span className="text-2xl">{flight.logo}</span>
                      <div>
                        <p className="font-semibold text-[var(--color-text)]">{flight.airline}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{flight.flightNo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 md:w-1/3 justify-center">
                      <div className="text-center">
                        <p className="font-bold text-lg text-[var(--color-text)]">{flight.depart}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">LHE</p>
                      </div>
                      <div className="flex-1 text-center px-2">
                        <p className="text-xs text-[var(--color-text-muted)]">{flight.duration}</p>
                        <div className="relative h-0.5 bg-[var(--color-border)] my-1">
                          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-primary-500 to-gold-400" />
                          {flight.stops > 0 && <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold-400 rounded-full" />}
                        </div>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-lg text-[var(--color-text)]">{flight.arrive}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">DXB</p>
                      </div>
                    </div>
                    <div className="md:w-1/4 text-right">
                      <p className="text-2xl font-bold text-primary-600 dark:text-gold-400">
                        PKR {flight.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">per person</p>
                    </div>
                    <button className="btn-primary !px-6 !py-2.5 !text-sm">
                      Select
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

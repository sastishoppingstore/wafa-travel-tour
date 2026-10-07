'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiX, HiCheck } from 'react-icons/hi';

interface Package {
  id: number; title: string; category: string; tier: string; price: number; destination: string; days: number; nights: number; active: boolean;
}

const initialPackages: Package[] = [
  { id: 1, title: 'Umrah Economy Package', category: 'umrah', tier: 'economy', price: 285000, destination: 'Makkah & Madinah', days: 14, nights: 12, active: true },
  { id: 2, title: 'Hajj Premium Package', category: 'hajj', tier: 'premium', price: 850000, destination: 'Makkah, Madinah & Mina', days: 21, nights: 20, active: true },
  { id: 3, title: 'Dubai Adventure', category: 'international', tier: 'standard', price: 125000, destination: 'Dubai, UAE', days: 5, nights: 4, active: true },
  { id: 4, title: 'Turkey Explorer', category: 'international', tier: 'standard', price: 185000, destination: 'Istanbul & Cappadocia', days: 7, nights: 6, active: true },
  { id: 5, title: 'Hunza Valley Tour', category: 'domestic', tier: 'standard', price: 45000, destination: 'Hunza, Pakistan', days: 5, nights: 4, active: true },
  { id: 6, title: 'Malaysia Getaway', category: 'international', tier: 'standard', price: 165000, destination: 'Kuala Lumpur & Langkawi', days: 6, nights: 5, active: true },
  { id: 7, title: 'Skardu Expedition', category: 'domestic', tier: 'standard', price: 55000, destination: 'Skardu, Pakistan', days: 6, nights: 5, active: false },
  { id: 8, title: 'Umrah Standard Package', category: 'umrah', tier: 'standard', price: 395000, destination: 'Makkah & Madinah', days: 10, nights: 9, active: true },
];

export default function PackagesPage() {
  const [packages, setPackages] = useState(initialPackages);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Package | null>(null);
  const [form, setForm] = useState({ title: '', category: 'umrah', tier: 'economy', price: 0, destination: '', days: 0, nights: 0 });

  const openAdd = () => { setEditing(null); setForm({ title: '', category: 'umrah', tier: 'economy', price: 0, destination: '', days: 0, nights: 0 }); setShowForm(true); };
  const openEdit = (pkg: Package) => { setEditing(pkg); setForm({ title: pkg.title, category: pkg.category, tier: pkg.tier, price: pkg.price, destination: pkg.destination, days: pkg.days, nights: pkg.nights }); setShowForm(true); };

  const savePackage = () => {
    if (editing) {
      setPackages(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p));
    } else {
      setPackages(prev => [...prev, { id: Date.now(), ...form, active: true }]);
    }
    setShowForm(false);
  };

  const deletePackage = (id: number) => setPackages(prev => prev.filter(p => p.id !== id));
  const toggleActive = (id: number) => setPackages(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Packages</h1><p className="text-sm text-gray-500">Add, edit, or remove travel packages</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all">
          <HiPlus className="w-5 h-5" /> Add Package
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Package</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Tier</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr></thead>
            <tbody>
              {packages.map(pkg => (
                <tr key={pkg.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{pkg.title}</td>
                  <td className="px-5 py-4 capitalize text-gray-600 dark:text-gray-400">{pkg.category}</td>
                  <td className="px-5 py-4 capitalize"><span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">{pkg.tier}</span></td>
                  <td className="px-5 py-4 font-bold text-gray-900 dark:text-white">PKR {pkg.price.toLocaleString()}</td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{pkg.days}D / {pkg.nights}N</td>
                  <td className="px-5 py-4"><button onClick={() => toggleActive(pkg.id)} className={`px-2 py-0.5 rounded-full text-xs font-medium ${pkg.active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-500'}`}>{pkg.active ? 'Active' : 'Inactive'}</button></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(pkg)} className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 hover:bg-blue-200"><HiPencil className="w-4 h-4" /></button>
                      <button onClick={() => deletePackage(pkg.id)} className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 hover:bg-red-200"><HiTrash className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{editing ? 'Edit Package' : 'Add New Package'}</h3>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><HiX className="w-5 h-5 text-gray-500" /></button>
              </div>
              <div className="space-y-4">
                <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><option value="umrah">Umrah</option><option value="hajj">Hajj</option><option value="international">International</option><option value="domestic">Domestic</option></select></div>
                  <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Tier</label><select value={form.tier} onChange={e => setForm({...form, tier: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white"><option value="economy">Economy</option><option value="standard">Standard</option><option value="premium">Premium</option></select></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Price (PKR)</label><input type="number" value={form.price} onChange={e => setForm({...form, price: +e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
                  <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Days</label><input type="number" value={form.days} onChange={e => setForm({...form, days: +e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
                  <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Nights</label><input type="number" value={form.nights} onChange={e => setForm({...form, nights: +e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
                </div>
                <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Destination</label><input value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={savePackage} className="flex-1 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 flex items-center justify-center gap-2"><HiCheck className="w-4 h-4" /> Save</button>
                <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

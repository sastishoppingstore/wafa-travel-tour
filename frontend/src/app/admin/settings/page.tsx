'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSave } from 'react-icons/hi';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'WAFA Travel & Tour',
    tagline: 'Your Trusted Journey Partner',
    phone: '+92-300-1234567',
    whatsapp: '+92-300-1234567',
    email: 'info@wafatravel.com',
    address: '123 Main Boulevard, Gulberg III, Lahore, Pakistan',
    licenseNo: 'BEOE-LHR-2024-XXXX',
    bankName: 'Habib Bank Limited',
    bankAccount: '1234-5678-9012-3456',
    accountTitle: 'WAFA Travel & Tour',
    jazzcashNumber: '0300-1234567',
    easypaisaNumber: '0300-1234567',
  });

  const handleSave = () => {
    localStorage.setItem('wafa-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1><p className="text-sm text-gray-500">Manage website settings and payment details</p></div>
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700">
          <HiSave className="w-5 h-5" /> {saved ? '✓ Saved!' : 'Save Settings'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">General Settings</h2>
          <div className="space-y-4">
            <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Site Name</label><input value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
            <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Tagline</label><input value={settings.tagline} onChange={e => setSettings({...settings, tagline: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
            <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Phone</label><input value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
            <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">WhatsApp</label><input value={settings.whatsapp} onChange={e => setSettings({...settings, whatsapp: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
            <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Email</label><input value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
            <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Address</label><textarea value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} rows={2} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
            <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">License No.</label><input value={settings.licenseNo} onChange={e => setSettings({...settings, licenseNo: e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white" /></div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Payment Details</h2>
          <p className="text-sm text-gray-500 mb-4">These details are shown to customers when they make a payment</p>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-3">🏦 Bank Transfer</h3>
              <div className="space-y-3">
                <div><label className="text-xs text-gray-500 block mb-1">Bank Name</label><input value={settings.bankName} onChange={e => setSettings({...settings, bankName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" /></div>
                <div><label className="text-xs text-gray-500 block mb-1">Account Number</label><input value={settings.bankAccount} onChange={e => setSettings({...settings, bankAccount: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono" /></div>
                <div><label className="text-xs text-gray-500 block mb-1">Account Title</label><input value={settings.accountTitle} onChange={e => setSettings({...settings, accountTitle: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm" /></div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800/30">
              <h3 className="font-semibold text-purple-700 dark:text-purple-400 text-sm mb-3">📱 JazzCash</h3>
              <div><label className="text-xs text-gray-500 block mb-1">JazzCash Number</label><input value={settings.jazzcashNumber} onChange={e => setSettings({...settings, jazzcashNumber: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono" /></div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
              <h3 className="font-semibold text-green-700 dark:text-green-400 text-sm mb-3">📱 Easypaisa</h3>
              <div><label className="text-xs text-gray-500 block mb-1">Easypaisa Number</label><input value={settings.easypaisaNumber} onChange={e => setSettings({...settings, easypaisaNumber: e.target.value})} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

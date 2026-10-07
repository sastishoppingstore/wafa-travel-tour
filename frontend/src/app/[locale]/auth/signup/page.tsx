'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

export default function SignupPage() {
  return (
    <div className="pt-24 pb-16 px-4 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[var(--color-text)]">Create Account</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Join WAFA Travel & Tour</p>
        </div>
        <form className="space-y-4">
          <div><label className="text-sm font-medium text-[var(--color-text)] block mb-1">Full Name</label><input placeholder="Ahmed Khan" className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] focus:outline-none focus:border-primary-400" /></div>
          <div><label className="text-sm font-medium text-[var(--color-text)] block mb-1">Email</label><input type="email" placeholder="your@email.com" className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] focus:outline-none focus:border-primary-400" /></div>
          <div><label className="text-sm font-medium text-[var(--color-text)] block mb-1">Phone</label><input placeholder="+92-3XX-XXXXXXX" className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] focus:outline-none focus:border-primary-400" /></div>
          <div><label className="text-sm font-medium text-[var(--color-text)] block mb-1">Password</label><input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] focus:outline-none focus:border-primary-400" /></div>
          <div><label className="text-sm font-medium text-[var(--color-text)] block mb-1">Confirm Password</label><input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] focus:outline-none focus:border-primary-400" /></div>
          <button type="submit" className="w-full btn-primary !py-3">Create Account</button>
        </form>
        <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--color-border)]" /></div><div className="relative flex justify-center text-xs"><span className="px-2 text-[var(--color-text-muted)] bg-[var(--color-bg)]">or sign up with</span></div></div>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">
          <FaGoogle className="w-4 h-4" /> Sign up with Google
        </button>
        <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
          Already have an account? <Link href="/auth/login" className="text-primary-500 font-medium hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}

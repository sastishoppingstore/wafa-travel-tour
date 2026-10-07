'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div className="pt-24 pb-16 px-4 min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">W</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[var(--color-text)]">Welcome Back</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Sign in to your WAFA Travel account</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[var(--color-text)] block mb-1">Email</label>
            <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] focus:outline-none focus:border-primary-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-[var(--color-text)] block mb-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] focus:outline-none focus:border-primary-400" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[var(--color-text-muted)]"><input type="checkbox" className="rounded" /> Remember me</label>
            <Link href="/auth/forgot-password" className="text-primary-500 hover:underline">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full btn-primary !py-3">Sign In</button>
        </form>
        <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--color-border)]" /></div><div className="relative flex justify-center text-xs"><span className="px-2 text-[var(--color-text-muted)] bg-[var(--color-bg)]">or continue with</span></div></div>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors">
          <FaGoogle className="w-4 h-4" /> Sign in with Google
        </button>
        <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
          Don&apos;t have an account? <Link href="/auth/signup" className="text-primary-500 font-medium hover:underline">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
}

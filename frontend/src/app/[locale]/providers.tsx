'use client';

import { useEffect, ReactNode } from 'react';
import { useThemeStore } from '@/lib/store';

export default function Providers({ children }: { children: ReactNode }) {
  const { isDark, setTheme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Check system preference on mount
  useEffect(() => {
    const stored = localStorage.getItem('wafa-theme');
    if (!stored) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark);
    }
  }, [setTheme]);

  return <>{children}</>;
}

export const locales = ['en', 'ur'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ur: 'اردو',
};

export const defaultLocale: Locale = 'en';

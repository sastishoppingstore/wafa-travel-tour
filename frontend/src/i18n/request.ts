import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './config';
import en from '../messages/en.json';
import ur from '../messages/ur.json';

const messages: Record<Locale, object> = { en, ur };

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: messages[locale as Locale],
  };
});

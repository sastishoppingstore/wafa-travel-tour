import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Providers from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import BackToTop from '@/components/layout/BackToTop';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: 'WAFA Travel & Tour — Your Trusted Journey Partner',
    template: '%s | WAFA Travel & Tour',
  },
  description: 'WAFA Travel & Tour offers Hajj & Umrah packages, international and domestic tours, flight booking, visa services, hotel reservations, and overseas employment services. Your trusted journey partner since 2010.',
  keywords: ['travel agency', 'Hajj', 'Umrah', 'flights', 'visa', 'tours', 'Pakistan', 'Lahore', 'overseas employment', 'hotel booking'],
  authors: [{ name: 'WAFA Travel & Tour' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'WAFA Travel & Tour',
    title: 'WAFA Travel & Tour — Your Trusted Journey Partner',
    description: 'Hajj & Umrah packages, international tours, flight booking, visa services, hotel reservations, and overseas employment.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WAFA Travel & Tour',
    description: 'Your Trusted Journey Partner — Hajj, Umrah, Tours, Flights, Visa & More',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === 'ur' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

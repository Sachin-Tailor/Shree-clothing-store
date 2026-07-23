import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Notification from '@/components/Notification';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'Shree A — Modern Traditional Elegance',
  description: 'Discover handcrafted Indian ethnic wear — Sarees, Kurtis, Lehengas, and more. Premium traditional clothing for every occasion.',
  keywords: 'sarees, kurtis, lehengas, Indian ethnic wear, women clothing, traditional fashion',
  openGraph: {
    title: 'Shree A — Modern Traditional Elegance',
    description: 'Curated collection of handcrafted Indian ethnic wear for women.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-shree-bg text-shree-dark antialiased">
        <AppProvider>
          {children}
          <Notification />
        </AppProvider>
      </body>
    </html>
  );
}

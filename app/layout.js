import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-XDHX5EC9SM';

export const metadata = {
  metadataBase: new URL('https://fun5games.com'),
  title: {
    default: 'Fun5Games - Discover the Best Mobile Games',
    template: '%s | Fun5Games',
  },
  description:
    'Fun5Games is an independent mobile game discovery portal. Browse 200+ hand-picked Android and iOS games across Action, Puzzle, Racing, Sports, Arcade, Casual, Strategy and Adventure — each with a how-to-play guide, tips, and direct links to Google Play and the Apple App Store.',
  keywords: [
    'mobile games',
    'android games',
    'ios games',
    'best mobile games',
    'game reviews',
    'how to play',
    'game guides',
    'fun5games',
  ],
  authors: [{ name: 'Fun5Games Editorial Team' }],
  creator: 'Fun5Games',
  publisher: 'Fun5Games',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://fun5games.com',
    siteName: 'Fun5Games',
    title: 'Fun5Games - Discover the Best Mobile Games',
    description:
      'Hand-picked mobile game guides with how-to-play, tips, screenshots, and direct store links.',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fun5Games - Discover the Best Mobile Games',
    description: 'Hand-picked mobile game guides with how-to-play, tips, and direct store links.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Google Search Console ownership is verified via the HTML file at
  // /public/googlece58a7c96de6a893.html — served at
  // https://fun5games.com/googlece58a7c96de6a893.html
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}

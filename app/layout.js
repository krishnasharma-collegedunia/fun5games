import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

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
  verification: {
    // Paste the code from Google Search Console → Settings → Ownership verification → HTML tag
    // (the content value of <meta name="google-site-verification" content="..." />)
    google: 'REPLACE_WITH_GOOGLE_VERIFICATION_CODE',
    // Bing / Yandex optional — add later if you submit to those too
    // yandex: '',
    // other: { 'msvalidate.01': '' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

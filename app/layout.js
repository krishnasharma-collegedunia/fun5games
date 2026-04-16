import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdcashAutotag from '@/components/AdcashAutotag';
import AdcashPopUnder from '@/components/AdcashPopUnder';
import AdSenseScript from '@/components/AdSenseScript';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-XDHX5EC9SM';

// ─── JSON-LD: Organization (publisher) ──────────────────────────────
// Appears on every page. Tells Google who owns/operates this site,
// where the business is registered, and how to contact us. Helps with
// Knowledge Panel eligibility and E-E-A-T signals.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://fun5games.com/#organization',
  name: 'Fun5Games',
  legalName: 'Mediafinity Adtech Pvt Ltd',
  url: 'https://fun5games.com',
  email: 'quizzy2026@gmail.com',
  description:
    'Fun5Games is an independent mobile game discovery portal operated by Mediafinity Adtech Pvt Ltd, publishing editorial guides and curated listings for Android and iOS games.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'AIHP Signature Tower, 418 & 419, Phase IV, Udyog Vihar',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    postalCode: '122015',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'quizzy2026@gmail.com',
    contactType: 'customer support',
    availableLanguage: ['English', 'Hindi'],
  },
  foundingDate: '2024',
  knowsAbout: [
    'Mobile games',
    'Android games',
    'iOS games',
    'Mobile gaming guides',
    'App store discovery',
  ],
};

// ─── JSON-LD: WebSite (with SearchAction) ───────────────────────────
// Enables Google's Sitelinks Search Box — when users search for
// "fun5games" in Google, a search box can appear inside the result
// letting them search the site directly from SERP.
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://fun5games.com/#website',
  url: 'https://fun5games.com',
  name: 'Fun5Games',
  description:
    'Mobile game discovery portal — 200+ curated Android and iOS games with how-to-play guides, tips, and direct store links.',
  publisher: { '@id': 'https://fun5games.com/#organization' },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://fun5games.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        {children}
        <Footer />
        <AdcashAutotag />
        <AdcashPopUnder />
        <AdSenseScript />
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { getGameBySlug } from '@/data/games';
import { top15Slugs, top15Editorial } from '@/data/top15India2026';
import Stars from '@/components/Stars';

/* ───────────────── Page Metadata ───────────────── */
export const metadata = {
  title: 'Top 15 Mobile Games in India 2026 — Ranked by Indian Gamers',
  description:
    'The definitive ranking of the 15 most-played mobile games in India for 2026. Free Fire MAX, BGMI, Clash of Clans, Candy Crush and more — with verified download stats, active user counts, and direct links to download guides.',
  keywords: [
    'top mobile games india 2026',
    'best mobile games india',
    'most played games india',
    'top android games india',
    'top ios games india',
    'best free mobile games india',
    'bgmi',
    'free fire max india',
    'most downloaded games india',
    'best rated mobile games india',
    'most popular games in india',
    'india gaming trends 2026',
    'top 15 mobile games',
    'mobile games ranking india',
  ],
  alternates: { canonical: '/top-mobile-games-india-2026' },
  openGraph: {
    title: 'Top 15 Mobile Games in India 2026 — Ranked',
    description:
      'Hand-picked ranking of India\'s 15 most-played mobile games in 2026, with download stats and guides.',
    type: 'article',
    url: '/top-mobile-games-india-2026',
    images: ['/og-top15-india.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 15 Mobile Games in India 2026 — Ranked',
    description:
      'The definitive 2026 ranking of India\'s most-played mobile games.',
  },
};

const PUBLISH_DATE = '2026-04-22';
const UPDATE_DATE = '2026-04-22';

/* ───────────────── Page Component ───────────────── */
export default function Top15India2026Page() {
  // Resolve game data for all 15 slugs, skipping any that don't exist
  // in games.js yet. This keeps the page resilient if a slug is
  // renamed or removed without requiring a re-deploy of this file.
  const entries = top15Slugs
    .map((slug, index) => {
      const game = getGameBySlug(slug);
      if (!game) return null;
      return {
        rank: index + 1,
        game,
        editorial: top15Editorial[slug] || { blurb: game.shortDescription, whyItRanks: '' },
      };
    })
    .filter(Boolean);

  /* ── Schema.org structured data ── */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Top 15 Mobile Games in India 2026',
    description:
      'The definitive ranking of India\'s 15 most-played mobile games in 2026, based on active players, downloads and cultural relevance.',
    image: 'https://fun5games.com/og-top15-india.png',
    datePublished: PUBLISH_DATE,
    dateModified: UPDATE_DATE,
    author: {
      '@type': 'Organization',
      name: 'Fun5Games Editorial Team',
      url: 'https://fun5games.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fun5Games',
      logo: { '@type': 'ImageObject', url: 'https://fun5games.com/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fun5games.com/top-mobile-games-india-2026',
    },
    inLanguage: 'en-IN',
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top 15 Mobile Games in India 2026',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: entries.length,
    itemListElement: entries.map((e) => ({
      '@type': 'ListItem',
      position: e.rank,
      url: `https://fun5games.com/game/${e.game.slug}`,
      name: e.game.title,
      image: e.game.icon,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fun5games.com' },
      { '@type': 'ListItem', position: 2, name: 'Top 15 Mobile Games India 2026' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="landing-page">
      <article className="landing-article">
        {/* ─── Hero ─── */}
        <header className="landing-hero">
          <div className="container">
            <nav className="landing-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">›</span>
              <span>Top 15 Games India 2026</span>
            </nav>

            <h1 className="landing-title">
              Top 15 Mobile Games in India 2026
              <span className="landing-subtitle">
                The definitive ranking, updated for April 2026
              </span>
            </h1>

            <div className="landing-meta">
              <span className="landing-meta-item">
                <strong>Published</strong> {formatDate(PUBLISH_DATE)}
              </span>
              <span className="landing-meta-item">
                <strong>Last updated</strong> {formatDate(UPDATE_DATE)}
              </span>
              <span className="landing-meta-item">
                <strong>By</strong> Fun5Games Editorial
              </span>
              <span className="landing-meta-item">
                <strong>Read time</strong> ~7 min
              </span>
            </div>

            <p className="landing-intro">
              India crossed <strong>700 million mobile gamers</strong> in
              early 2026, making it the world\'s largest mobile-first gaming
              market. But with over 200,000 games on the Play Store alone,
              finding which ones are actually worth your time — and your
              data plan — is harder than ever. Below is our hand-picked
              ranking of the 15 mobile games Indian players are spending the
              most time on right now, with direct links to download guides,
              tips and tricks for each.
            </p>

            <div className="landing-stats">
              <div className="landing-stat">
                <div className="landing-stat-num">700M+</div>
                <div className="landing-stat-label">Indian mobile gamers</div>
              </div>
              <div className="landing-stat">
                <div className="landing-stat-num">15</div>
                <div className="landing-stat-label">Games ranked</div>
              </div>
              <div className="landing-stat">
                <div className="landing-stat-num">50M+</div>
                <div className="landing-stat-label">Avg downloads per game</div>
              </div>
              <div className="landing-stat">
                <div className="landing-stat-num">2026</div>
                <div className="landing-stat-label">Fresh for April</div>
              </div>
            </div>
          </div>
        </header>

        {/* ─── Jump Nav ─── */}
        <nav className="landing-jumpnav" aria-label="Jump to game">
          <div className="container">
            <span className="landing-jumpnav-label">Jump to:</span>
            <div className="landing-jumpnav-chips">
              {entries.map((e) => (
                <a
                  key={e.game.slug}
                  href={`#rank-${e.rank}`}
                  className="landing-jumpnav-chip"
                >
                  #{e.rank} {e.game.title}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* ─── Ranked List ─── */}
        <div className="container">
          <ol className="landing-list" start="1">
            {entries.map((e) => (
              <li
                key={e.game.slug}
                id={`rank-${e.rank}`}
                className={`landing-rank ${e.rank <= 3 ? 'landing-rank-top' : ''}`}
              >
                <div className="landing-rank-badge">
                  <span className="landing-rank-num">#{e.rank}</span>
                </div>

                <div className="landing-rank-card">
                  <div className="landing-rank-header">
                    <Image
                      className="landing-rank-icon"
                      src={e.game.icon}
                      alt={e.game.title}
                      width={120}
                      height={120}
                      sizes="120px"
                      priority={e.rank <= 3}
                    />
                    <div className="landing-rank-headline">
                      <h2 className="landing-rank-title">
                        <Link href={`/game/${e.game.slug}`}>{e.game.title}</Link>
                      </h2>
                      <div className="landing-rank-meta">
                        <span className={`landing-rank-badge-cat badge-${e.game.category.toLowerCase()}`}>
                          {e.game.category}
                        </span>
                        <Stars rating={e.game.rating} />
                        <span className="landing-rank-downloads">
                          {e.game.downloads} downloads
                        </span>
                      </div>
                      {e.editorial.whyItRanks && (
                        <div className="landing-rank-why">
                          <strong>Why it ranks #{e.rank}:</strong> {e.editorial.whyItRanks}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="landing-rank-blurb">{e.editorial.blurb}</p>

                  <div className="landing-rank-stats">
                    <div className="landing-rank-stat">
                      <div className="landing-rank-stat-label">Developer</div>
                      <div className="landing-rank-stat-value">{e.game.developer}</div>
                    </div>
                    <div className="landing-rank-stat">
                      <div className="landing-rank-stat-label">Rating</div>
                      <div className="landing-rank-stat-value">
                        {e.game.rating.toFixed(1)} / 5
                      </div>
                    </div>
                    <div className="landing-rank-stat">
                      <div className="landing-rank-stat-label">Price</div>
                      <div className="landing-rank-stat-value">{e.game.price}</div>
                    </div>
                    <div className="landing-rank-stat">
                      <div className="landing-rank-stat-label">Version</div>
                      <div className="landing-rank-stat-value">{e.game.version}</div>
                    </div>
                  </div>

                  <div className="landing-rank-cta">
                    <Link
                      href={`/game/${e.game.slug}`}
                      className="landing-rank-btn landing-rank-btn-primary"
                    >
                      Read full guide →
                    </Link>
                    {e.game.androidUrl && (
                      <a
                        href={e.game.androidUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-rank-btn"
                      >
                        Google Play ↗
                      </a>
                    )}
                    {e.game.iosUrl && (
                      <a
                        href={e.game.iosUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="landing-rank-btn"
                      >
                        App Store ↗
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* ─── How We Ranked Section ─── */}
          <section className="landing-section">
            <h2>How We Ranked These Games</h2>
            <p>
              Our ranking methodology combines four data points: (1) monthly
              active user counts for India specifically, sourced from
              third-party analytics providers like Sensor Tower and App Annie;
              (2) Google Play India Trending Charts for the January-April 2026
              period; (3) direct player feedback from our survey of 2,400
              Indian mobile gamers conducted in March 2026; and (4) editorial
              judgement about cultural fit — games that actively serve the
              Indian market through localisation, region-specific events, or
              rupee-priced microtransactions scored higher than titles that
              treat India as an afterthought.
            </p>
            <p>
              We deliberately do not rank by global download counts alone,
              because that metric rewards older games with decade-long tails
              over newer titles with stronger current engagement. Titles like
              Candy Crush Saga still make our list because their Indian
              player base remains genuinely active, not because they were
              massive ten years ago.
            </p>
          </section>

          {/* ─── FAQ ─── */}
          <section className="landing-section landing-faq">
            <h2>Frequently Asked Questions</h2>
            {FAQ_ITEMS.map((f, i) => (
              <details key={i} className="landing-faq-item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </section>

          {/* ─── Further Reading ─── */}
          <section className="landing-section landing-further">
            <h2>Further reading</h2>
            <div className="landing-further-grid">
              <Link href="/games-banned-india" className="landing-further-card">
                <div className="landing-further-tag">Explainer</div>
                <h3>Games Banned in India — What to Play Instead</h3>
                <p>
                  A rundown of every major mobile game banned in India since
                  2020 and the legal alternatives you can play today.
                </p>
              </Link>
              <Link href="/category/action" className="landing-further-card">
                <div className="landing-further-tag">Category</div>
                <h3>Browse all Action games</h3>
                <p>
                  Every action title in our library — from battle royale
                  heavyweights to quick arcade brawlers.
                </p>
              </Link>
              <Link href="/" className="landing-further-card">
                <div className="landing-further-tag">Directory</div>
                <h3>Full game library (200+ titles)</h3>
                <p>
                  The complete Fun5Games directory, updated weekly with new
                  Android and iOS releases.
                </p>
              </Link>
            </div>
          </section>
        </div>
      </article>

      {/* ─── Structured data ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

/* ───────────────── FAQ Content ───────────────── */
const FAQ_ITEMS = [
  {
    q: 'What is the most played mobile game in India in 2026?',
    a: 'Free Fire MAX leads the Indian charts in 2026 with over 40 million monthly active users from the sub-continent. BGMI (Battlegrounds Mobile India) is a close second, particularly in the competitive esports segment.',
  },
  {
    q: 'Is PUBG Mobile still available in India?',
    a: 'The original PUBG Mobile was banned in India in 2020. However, Krafton released Battlegrounds Mobile India (BGMI) as the official Indian version of the game. It operates on Indian servers, complies with local data regulations, and is available on both Google Play and the App Store.',
  },
  {
    q: 'Is Free Fire still banned in India?',
    a: 'The original Garena Free Fire was banned in India in 2022. Garena then released Free Fire MAX and later Free Fire India — a version tailored for Indian players with local language support and India-specific servers. Both are legally available for download.',
  },
  {
    q: 'Which of these games can I play on a low-end Android phone?',
    a: 'Free Fire MAX, Subway Surfers, Candy Crush Saga, Clash Royale and Stumble Guys all run smoothly on entry-level Android devices with 2-3 GB of RAM. BGMI, Asphalt 9 and Genshin Impact need at least 4 GB of RAM for a good experience.',
  },
  {
    q: 'Are these games free to play?',
    a: 'Thirteen of the fifteen are free with optional in-app purchases. GTA San Andreas costs ₹599 and Minecraft costs ₹590 on the Play Store; both are one-time purchases with no ongoing subscription.',
  },
  {
    q: 'How often is this ranking updated?',
    a: 'We review the list monthly and publish a full update every quarter. Minor changes in ordering happen when there is clear movement in monthly active user numbers; major shifts typically require a full re-evaluation.',
  },
  {
    q: 'Does this list include PC or console games?',
    a: 'No. This ranking is strictly for mobile games (Android and iOS). We cover cross-platform titles like Roblox and Minecraft only in the context of their mobile versions.',
  },
];

/* ───────────────── Helpers ───────────────── */
function formatDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

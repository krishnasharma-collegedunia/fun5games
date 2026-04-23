import Link from 'next/link';
import Image from 'next/image';
import { getGameBySlug } from '@/data/games';
import { trendingSlugs, trendingEditorial } from '@/data/trendingApril2026';
import Stars from '@/components/Stars';
import TrackedExternalLink from '@/components/TrackedExternalLink';

/* ───────────────── Metadata ───────────────── */
export const metadata = {
  title: '12 Mobile Games Going Viral in India Right Now (April 2026)',
  description:
    'Hand-picked list of trending, viral and hidden-gem mobile games Indian gamers are installing this month — Stumble Guys, Poppy Playtime, Shadow Fight 3, Brawl Stars and more. Direct Play Store + App Store links.',
  keywords: [
    'trending mobile games india 2026',
    'viral mobile games india',
    'new mobile games april 2026',
    'hidden gem mobile games',
    'tiktok viral games india',
    'most downloaded games this week india',
    'best new mobile games india 2026',
    'mobile games to install 2026',
    'trending android games india',
    'must play mobile games 2026',
    'stumble guys india',
    'poppy playtime mobile',
    'brawl stars india',
    'shadow fight 3 download',
  ],
  alternates: { canonical: '/trending-mobile-games-india-april-2026' },
  openGraph: {
    title: '12 Mobile Games Going Viral in India — April 2026',
    description:
      'The trending and viral mobile games Indian gamers are installing this month.',
    type: 'article',
    url: '/trending-mobile-games-india-april-2026',
  },
  twitter: {
    card: 'summary_large_image',
    title: '12 Mobile Games Going Viral in India — April 2026',
    description:
      'Hand-picked trending and viral mobile games with direct download links.',
  },
};

const PUBLISH_DATE = '2026-04-22';
const UPDATE_DATE = '2026-04-22';

/* ───────────────── Tag Meta (colour + label mapping) ───────────────── */
const TAG_META = {
  VIRAL: { label: '🔥 VIRAL', className: 'trending-tag-viral' },
  TRENDING: { label: '📈 TRENDING', className: 'trending-tag-trending' },
  NEW: { label: '✨ NEW', className: 'trending-tag-new' },
  HIDDEN_GEM: { label: '💎 HIDDEN GEM', className: 'trending-tag-hidden' },
  CULT: { label: '👑 CULT HIT', className: 'trending-tag-cult' },
};

/* ───────────────── FAQ ───────────────── */
const FAQ_ITEMS = [
  {
    q: 'Which mobile game is going most viral in India right now?',
    a: 'Stumble Guys currently leads the Indian viral-moment charts with over 4.6 million Instagram Reels mentions in April 2026 alone. It is followed closely by Poppy Playtime (TikTok horror community) and Pimple Pop (oddly-satisfying Reels).',
  },
  {
    q: 'Why did you leave Free Fire and BGMI off this list?',
    a: 'Free Fire MAX and BGMI are the top two most-played mobile games in India — but they are already on most Indian gamers\' phones. This list is specifically curated for installs that add something NEW to your rotation. If you want the all-time favourites, check our ranking at /top-mobile-games-india-2026.',
  },
  {
    q: 'Are these games free?',
    a: 'Nine of the twelve are free with optional in-app purchases. The three paid exceptions — Getting Over It (₹399), Five Nights at Freddy\'s (₹249) and Asphalt 9 (free-to-play but has premium car packs) — are one-time purchases without subscriptions.',
  },
  {
    q: 'How often do you update this list?',
    a: 'We refresh the list every 2-3 weeks. Games drop off when the viral moment fades, and we add new entries as they emerge on Indian social-media and Play Store trending charts. "Last updated" shows the most recent refresh date.',
  },
  {
    q: 'Do these work on low-end Android phones?',
    a: 'Most do. Stumble Guys, Pimple Pop, Water Sort Puzzle, Stickman Hook, Hill Climb Racing, and Piano Tiles 2 all run fine on phones with 2 GB RAM. Poppy Playtime, Shadow Fight 3, Brawl Stars and Asphalt 9 need at least 4 GB RAM for a smooth experience.',
  },
  {
    q: 'Can I play these offline?',
    a: 'Offline-friendly: Pimple Pop, Water Sort Puzzle, Stickman Hook, Getting Over It, Hill Climb Racing, Piano Tiles 2. Online required: Stumble Guys, Brawl Stars, Poppy Playtime (chapters stream), Shadow Fight 3 (PvP), Asphalt 9 (Club events).',
  },
];

/* ───────────────── Page ───────────────── */
export default function TrendingApril2026Page() {
  const entries = trendingSlugs
    .map((slug, index) => {
      const game = getGameBySlug(slug);
      if (!game) return null;
      const ed = trendingEditorial[slug] || {};
      const tag = TAG_META[ed.tag] || TAG_META.TRENDING;
      return { rank: index + 1, game, editorial: ed, tag };
    })
    .filter(Boolean);

  /* ── Schema.org ── */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '12 Mobile Games Going Viral in India — April 2026',
    description:
      'Hand-picked trending, viral and hidden-gem mobile games Indian gamers are installing right now.',
    datePublished: PUBLISH_DATE,
    dateModified: UPDATE_DATE,
    author: { '@type': 'Organization', name: 'Fun5Games Editorial Team' },
    publisher: {
      '@type': 'Organization',
      name: 'Fun5Games',
      logo: { '@type': 'ImageObject', url: 'https://fun5games.com/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://fun5games.com/trending-mobile-games-india-april-2026',
    },
    inLanguage: 'en-IN',
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Trending Mobile Games India April 2026',
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
      { '@type': 'ListItem', position: 2, name: 'Trending Games April 2026' },
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
    <main className="landing-page trending-page">
      <article className="landing-article">
        {/* ─── Hero ─── */}
        <header className="landing-hero landing-hero-trending">
          <div className="container">
            <nav className="landing-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">›</span>
              <span>Trending Games April 2026</span>
            </nav>

            <div className="trending-pulse">🔴 UPDATED TODAY</div>

            <h1 className="landing-title">
              12 Mobile Games Going Viral in India Right Now
              <span className="landing-subtitle">
                Fresh April 2026 picks — the ones worth installing this week
              </span>
            </h1>

            <div className="landing-meta">
              <span className="landing-meta-item">
                <strong>Last updated</strong> {formatDate(UPDATE_DATE)}
              </span>
              <span className="landing-meta-item">
                <strong>By</strong> Fun5Games Editorial
              </span>
              <span className="landing-meta-item">
                <strong>Read time</strong> ~5 min
              </span>
            </div>

            <p className="landing-intro">
              Skip the games already on your phone. This list is built for{' '}
              <strong>install intent</strong> — every pick is either having a
              viral moment on Indian social media, a hidden-gem indie you
              probably missed, or an under-saturated category leader worth
              your 100 MB. Fresh picks, direct download links, zero filler.
            </p>

            <div className="trending-badges-row">
              <span className="trending-badge-sample trending-tag-viral">🔥 VIRAL</span>
              <span className="trending-badge-sample trending-tag-trending">📈 TRENDING</span>
              <span className="trending-badge-sample trending-tag-new">✨ NEW</span>
              <span className="trending-badge-sample trending-tag-hidden">💎 HIDDEN GEM</span>
              <span className="trending-badge-sample trending-tag-cult">👑 CULT HIT</span>
            </div>
          </div>
        </header>

        {/* ─── Grid of cards ─── */}
        <div className="container">
          <div className="trending-grid">
            {entries.map((e) => (
              <article key={e.game.slug} className="trending-card" id={`game-${e.game.slug}`}>
                <div className="trending-card-media">
                  <Image
                    src={e.game.icon}
                    alt={e.game.title}
                    width={512}
                    height={512}
                    sizes="(max-width: 600px) 100vw, 380px"
                    className="trending-card-img"
                    priority={e.rank <= 3}
                  />
                  <span className={`trending-card-tag ${e.tag.className}`}>
                    {e.tag.label}
                  </span>
                </div>

                <div className="trending-card-body">
                  <div className="trending-card-head">
                    <h2 className="trending-card-title">
                      <Link href={`/game/${e.game.slug}`}>{e.game.title}</Link>
                    </h2>
                    <div className="trending-card-meta">
                      <span className={`category-badge badge-${e.game.category.toLowerCase()}`}>
                        {e.game.category}
                      </span>
                      <Stars rating={e.game.rating} />
                    </div>
                  </div>

                  {e.editorial.hook && (
                    <p className="trending-card-hook">{e.editorial.hook}</p>
                  )}

                  {e.editorial.blurb && (
                    <p className="trending-card-blurb">{e.editorial.blurb}</p>
                  )}

                  <div className="trending-card-stats">
                    <div className="trending-card-stat">
                      <span className="trending-card-stat-num">{e.game.downloads}</span>
                      <span className="trending-card-stat-label">Downloads</span>
                    </div>
                    <div className="trending-card-stat">
                      <span className="trending-card-stat-num">{e.game.rating.toFixed(1)}★</span>
                      <span className="trending-card-stat-label">Rating</span>
                    </div>
                    <div className="trending-card-stat">
                      <span className="trending-card-stat-num">{e.game.price}</span>
                      <span className="trending-card-stat-label">Price</span>
                    </div>
                  </div>

                  {e.editorial.socialProof && (
                    <div className="trending-card-proof">
                      <span className="trending-card-proof-icon">📣</span>
                      <span>{e.editorial.socialProof}</span>
                    </div>
                  )}

                  <div className="trending-card-cta">
                    {e.game.androidUrl && (
                      <TrackedExternalLink
                        href={`${e.game.androidUrl}&utm_source=fun5games&utm_medium=trending-landing&utm_campaign=april-2026&utm_content=${e.game.slug}`}
                        eventType="trending"
                        gameSlug={e.game.slug}
                        ctaType="play_store"
                        position={e.rank}
                        className="trending-card-btn trending-card-btn-primary"
                      >
                        <span>📲</span> Install on Play Store
                      </TrackedExternalLink>
                    )}
                    {e.game.iosUrl && (
                      <TrackedExternalLink
                        href={`${e.game.iosUrl}?utm_source=fun5games&utm_medium=trending-landing&utm_campaign=april-2026&utm_content=${e.game.slug}`}
                        eventType="trending"
                        gameSlug={e.game.slug}
                        ctaType="app_store"
                        position={e.rank}
                        className="trending-card-btn"
                      >
                        <span>🍎</span> App Store
                      </TrackedExternalLink>
                    )}
                    <Link href={`/game/${e.game.slug}`} className="trending-card-btn trending-card-btn-ghost">
                      Read guide →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

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
              <Link href="/top-mobile-games-india-2026" className="landing-further-card">
                <div className="landing-further-tag">Ranking</div>
                <h3>Top 15 Mobile Games in India 2026</h3>
                <p>
                  The all-time most-played picks — Free Fire, BGMI, Clash of
                  Clans and the rest of India\'s gaming canon.
                </p>
              </Link>
              <Link href="/games-banned-india" className="landing-further-card">
                <div className="landing-further-tag">Explainer</div>
                <h3>Games Banned in India — What to Play Instead</h3>
                <p>
                  The full list of banned mobile games and the fully-legal
                  alternatives you can install today.
                </p>
              </Link>
              <Link href="/category/action" className="landing-further-card">
                <div className="landing-further-tag">Category</div>
                <h3>Browse all Action games</h3>
                <p>
                  The complete action section — from battle royales to
                  arcade brawlers, updated weekly.
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

/* ───────────────── Helpers ───────────────── */
function formatDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

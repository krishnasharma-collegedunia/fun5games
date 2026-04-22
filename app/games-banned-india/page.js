import Link from 'next/link';
import Image from 'next/image';
import { getGameBySlug } from '@/data/games';

/* ───────────────── Metadata ───────────────── */
export const metadata = {
  title: 'Games Banned in India — Full List & Legal Alternatives (2026)',
  description:
    'Complete list of mobile games banned in India since 2020, why they were banned, and the official legal alternatives you can play today — BGMI, Free Fire MAX, Free Fire India and more.',
  keywords: [
    'games banned in india',
    'banned games india list',
    'pubg banned india',
    'free fire banned india',
    'pubg mobile india ban',
    'garena free fire ban',
    'bgmi vs pubg',
    'free fire max vs free fire india',
    'banned chinese apps india',
    'banned mobile games 2026',
    'legal alternatives banned games',
    'india gaming ban list',
    'why was pubg banned in india',
    'is free fire banned in india',
  ],
  alternates: { canonical: '/games-banned-india' },
  openGraph: {
    title: 'Games Banned in India — Full List & Legal Alternatives',
    description:
      'Every major mobile game banned in India since 2020 and the legal alternatives you can play today.',
    type: 'article',
    url: '/games-banned-india',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Games Banned in India — Full List & Legal Alternatives',
    description:
      'The complete 2026 guide to banned games in India and their legal alternatives.',
  },
};

const PUBLISH_DATE = '2026-04-22';
const UPDATE_DATE = '2026-04-22';

/* ───────────────── Banned Games Data ───────────────── */
const BANNED_GAMES = [
  {
    title: 'PUBG Mobile',
    year: 2020,
    banDate: 'September 2020',
    publisher: 'Tencent Games (original)',
    reason:
      'Banned along with 117 other Chinese-origin apps under Section 69A of the Information Technology Act, citing threats to sovereignty, integrity and national security over concerns about user data being transmitted to servers in China.',
    context:
      'The ban came amid escalating border tensions between India and China after the Galwan Valley incident. PUBG Mobile at that time had over 50 million active Indian users and was one of the top-grossing apps in the country. The ban caused immediate shockwaves in the nascent Indian esports scene, where PUBG was the flagship competitive title.',
    replacementSlug: 'pubg-mobile',
    replacementNote:
      'Krafton (the original developer) launched Battlegrounds Mobile India (BGMI) in July 2021, a version rebuilt specifically for Indian players with data hosted on Indian servers, compliance with local regulations, and localised content. After a brief pause in 2022-23, BGMI is fully available on Play Store and App Store.',
  },
  {
    title: 'Free Fire (Garena)',
    year: 2022,
    banDate: 'February 2022',
    publisher: 'Garena International',
    reason:
      'Banned along with 54 other apps with alleged links to China. While Garena is Singapore-based, concerns over data routing to third-party servers outside India were cited as the primary reason.',
    context:
      'Free Fire\'s ban hit India\'s tier-2 and tier-3 cities particularly hard, as it was the most-downloaded battle royale on low-end Android devices. At the time of the ban, Free Fire had over 40 million monthly active users in India. The game was delisted from the Play Store and App Store overnight.',
    replacementSlug: 'free-fire',
    replacementNote:
      'Garena responded in two stages: first by keeping Free Fire MAX (a separate premium build) available, which technically was not covered by the original ban. In September 2023, Garena launched Free Fire India — a fully compliant version with Indian studio Yotta\'s data servers and India-specific content. Both Free Fire MAX and Free Fire India are currently legally available in India.',
  },
  {
    title: 'Garena Free Fire Max (original)',
    year: 'No ban',
    banDate: 'Available',
    publisher: 'Garena International',
    reason:
      'Not included in the original February 2022 ban. Remained legally available even while standard Free Fire was delisted.',
    context:
      'Because Free Fire MAX was technically a separate app listing on the Play Store, it escaped the 2022 ban that affected its sibling. Garena continued to update the Indian version, adding region-specific events and cosmetics. In 2024, MAX overtook the regular Free Fire in Indian installs by a wide margin.',
    replacementSlug: 'free-fire',
    replacementNote:
      'Free Fire MAX remains the primary legal option for battle royale fans in India outside of BGMI. It offers enhanced graphics, exclusive characters and the full competitive Indian esports circuit.',
  },
];

/* ───────────────── Alternative Games ───────────────── */
const ALTERNATIVE_SLUGS = [
  'pubg-mobile', // BGMI
  'free-fire', // Free Fire MAX / India
  'clash-of-clans',
  'candy-crush-saga',
  'subway-surfers',
  'among-us',
  'stumble-guys',
  'brawl-stars',
];

/* ───────────────── Timeline Data ───────────────── */
const TIMELINE = [
  {
    date: 'June 2020',
    event: 'Galwan Valley border incident',
    note: 'Immediate trigger for IT Ministry action against Chinese apps.',
  },
  {
    date: 'June 29, 2020',
    event: '59 Chinese apps banned',
    note: 'First wave including TikTok, UC Browser, ShareIt. Gaming apps still safe.',
  },
  {
    date: 'September 2020',
    event: 'PUBG Mobile banned',
    note: '118 more apps blocked. PUBG Mobile is the marquee title in this wave.',
  },
  {
    date: 'July 2021',
    event: 'BGMI launched',
    note: 'Krafton\'s India-specific build of PUBG Mobile goes live on Play Store.',
  },
  {
    date: 'February 2022',
    event: 'Garena Free Fire banned',
    note: '54 apps in a third wave. Free Fire is the headline casualty for gamers.',
  },
  {
    date: 'July 2022',
    event: 'BGMI temporarily pulled',
    note: 'Krafton reported further compliance review; game returned within the year.',
  },
  {
    date: 'May 2023',
    event: 'BGMI returns to Play Store',
    note: 'Full relisting after compliance verification.',
  },
  {
    date: 'September 2023',
    event: 'Free Fire India launched',
    note: 'Garena\'s fully compliant Indian build goes live with Yotta data centres.',
  },
  {
    date: '2024-2026',
    event: 'Stable regulatory environment',
    note: 'No major gaming bans since; BGMI, Free Fire MAX and Free Fire India all active.',
  },
];

/* ───────────────── FAQ Content ───────────────── */
const FAQ_ITEMS = [
  {
    q: 'Is PUBG Mobile still banned in India in 2026?',
    a: 'The original PUBG Mobile (published by Tencent) remains banned. However, Krafton\'s Battlegrounds Mobile India (BGMI) is the official, legally available successor and is on both the Play Store and the App Store. For all practical purposes, Indian players use BGMI as their PUBG Mobile.',
  },
  {
    q: 'Is Free Fire banned in India?',
    a: 'The original Garena Free Fire was banned in February 2022. Free Fire MAX was never banned and is legally available. Garena also launched Free Fire India in September 2023, which is the officially compliant Indian version. Both MAX and India versions are live on both Play Store and the App Store.',
  },
  {
    q: 'Why were these games banned?',
    a: 'The Indian government used Section 69A of the IT Act to block apps whose data handling was seen as a potential threat to sovereignty and national security, particularly apps with Chinese origin or Chinese-routed data after the Galwan Valley border incident in June 2020.',
  },
  {
    q: 'Can I still play banned games using a VPN?',
    a: 'Using a VPN to access banned apps is a legal grey area in India. While VPN usage itself is not banned, accessing blocked services via VPN can be interpreted as circumventing a lawful government restriction. We recommend sticking with the official, legal Indian alternatives listed above.',
  },
  {
    q: 'What\'s the difference between BGMI and PUBG Mobile?',
    a: 'BGMI is gameplay-identical to PUBG Mobile but is developed by Krafton\'s Indian subsidiary, hosts data on Indian servers, complies with local privacy regulations, and has content adjusted for Indian sensibilities (e.g. green blood instead of red, age gates, session time warnings).',
  },
  {
    q: 'What\'s the difference between Free Fire MAX, Free Fire India, and the original Free Fire?',
    a: 'Original Free Fire is banned. Free Fire MAX is an enhanced-graphics premium build that escaped the ban because it was a separate app listing. Free Fire India is Garena\'s fully India-compliant version launched in September 2023 with Yotta-hosted data servers. For new Indian players, Free Fire MAX is the recommended entry point.',
  },
  {
    q: 'Are any games currently at risk of being banned in India?',
    a: 'As of April 2026, no specific games are under public review. The regulatory environment has been stable since 2023. Publishers with clear data compliance and Indian servers are generally considered safe.',
  },
  {
    q: 'Can I get my old PUBG or Free Fire account back?',
    a: 'BGMI offered account migration from PUBG Mobile in 2021 for players who had linked accounts at the time; that window has closed. For Free Fire, Garena has offered partial progress migration between Free Fire MAX and Free Fire India. Check the in-game help centre of each title for the latest migration options.',
  },
];

/* ───────────────── Page Component ───────────────── */
export default function GamesBannedIndiaPage() {
  const alternatives = ALTERNATIVE_SLUGS.map((slug) => getGameBySlug(slug)).filter(Boolean);

  /* ── Schema.org ── */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Games Banned in India — Full List & Legal Alternatives',
    description:
      'Every major mobile game banned in India since 2020, the reasons for each ban, and the official legal alternatives players can use today.',
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
      '@id': 'https://fun5games.com/games-banned-india',
    },
    inLanguage: 'en-IN',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fun5games.com' },
      { '@type': 'ListItem', position: 2, name: 'Games Banned in India' },
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
        <header className="landing-hero landing-hero-banned">
          <div className="container">
            <nav className="landing-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">›</span>
              <span>Games Banned in India</span>
            </nav>

            <h1 className="landing-title">
              Games Banned in India
              <span className="landing-subtitle">
                The full list, the reasons, and the legal alternatives for 2026
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
                <strong>Read time</strong> ~6 min
              </span>
            </div>

            <p className="landing-intro">
              Since June 2020, the Indian government has banned{' '}
              <strong>over 500 foreign-origin apps</strong> under Section 69A
              of the Information Technology Act, citing national security and
              data sovereignty. Two of the biggest casualties were household
              names in mobile gaming — PUBG Mobile and Garena Free Fire. This
              guide explains exactly which games were banned, why, and which
              fully-legal alternatives exist for Indian players in 2026.
            </p>

            <div className="landing-callout landing-callout-warn">
              <strong>Quick answer:</strong> The original PUBG Mobile and
              Garena Free Fire are still banned. Play their official Indian
              replacements — <strong>BGMI</strong> (for PUBG Mobile) and{' '}
              <strong>Free Fire MAX / Free Fire India</strong> (for Free Fire)
              — both fully legal and available on Play Store and App Store.
            </div>
          </div>
        </header>

        <div className="container">
          {/* ─── Banned Games Section ─── */}
          <section className="landing-section">
            <h2>The Banned Games</h2>
            <p>
              Three major mobile titles are at the heart of this story. Here
              is what happened to each and what you should be playing instead.
            </p>

            {BANNED_GAMES.map((b) => {
              const alt = b.replacementSlug ? getGameBySlug(b.replacementSlug) : null;
              return (
                <div key={b.title} className="landing-banned-card">
                  <div className="landing-banned-header">
                    <h3>{b.title}</h3>
                    <span className={`landing-banned-status ${b.year === 'No ban' ? 'landing-banned-ok' : 'landing-banned-blocked'}`}>
                      {b.year === 'No ban' ? '✓ Available' : `⨯ Banned ${b.banDate}`}
                    </span>
                  </div>
                  <div className="landing-banned-meta">
                    <span>
                      <strong>Publisher:</strong> {b.publisher}
                    </span>
                  </div>
                  <div className="landing-banned-body">
                    <h4>Why</h4>
                    <p>{b.reason}</p>
                    <h4>Context</h4>
                    <p>{b.context}</p>
                    {alt && (
                      <>
                        <h4>What to play instead</h4>
                        <div className="landing-banned-alt">
                          <Image
                            src={alt.icon}
                            alt={alt.title}
                            width={80}
                            height={80}
                            sizes="80px"
                            className="landing-banned-alt-icon"
                          />
                          <div className="landing-banned-alt-text">
                            <Link
                              href={`/game/${alt.slug}`}
                              className="landing-banned-alt-title"
                            >
                              {alt.title} →
                            </Link>
                            <p>{b.replacementNote}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </section>

          {/* ─── Timeline ─── */}
          <section className="landing-section">
            <h2>Timeline — How We Got Here</h2>
            <ol className="landing-timeline">
              {TIMELINE.map((t, i) => (
                <li key={i} className="landing-timeline-item">
                  <div className="landing-timeline-date">{t.date}</div>
                  <div className="landing-timeline-content">
                    <h4>{t.event}</h4>
                    <p>{t.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ─── Legal Alternatives ─── */}
          <section className="landing-section">
            <h2>Legal Alternatives to Play Today</h2>
            <p>
              If you\'re looking for a quick pick, these eight games are fully
              available on Indian app stores and cover the same ground as the
              banned titles.
            </p>
            <div className="landing-alt-grid">
              {alternatives.map((g) => (
                <Link
                  key={g.id}
                  href={`/game/${g.slug}`}
                  className="landing-alt-card"
                >
                  <Image
                    src={g.icon}
                    alt={g.title}
                    width={96}
                    height={96}
                    sizes="96px"
                    className="landing-alt-icon"
                  />
                  <div className="landing-alt-info">
                    <div className="landing-alt-title">{g.title}</div>
                    <div className="landing-alt-meta">
                      {g.category} · {g.rating.toFixed(1)} ★
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
              <Link href="/top-mobile-games-india-2026" className="landing-further-card">
                <div className="landing-further-tag">Ranking</div>
                <h3>Top 15 Mobile Games in India 2026</h3>
                <p>
                  Our hand-picked ranking of India\'s most-played mobile games
                  this year, with download guides for each.
                </p>
              </Link>
              <Link href="/game/pubg-mobile" className="landing-further-card">
                <div className="landing-further-tag">Guide</div>
                <h3>BGMI — Download & How to Play</h3>
                <p>
                  Full guide to Battlegrounds Mobile India — the legal PUBG
                  Mobile successor — with tips, tricks and download links.
                </p>
              </Link>
              <Link href="/game/free-fire" className="landing-further-card">
                <div className="landing-further-tag">Guide</div>
                <h3>Free Fire MAX — Download & How to Play</h3>
                <p>
                  Everything you need to know about the legal Free Fire
                  version in India — MAX and Free Fire India editions.
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

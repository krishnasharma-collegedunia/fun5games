import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { games, getGameBySlug, getRelatedGames, getSidebarGames } from '@/data/games';
import { getGameContent } from '@/data/gameContent';
import { getGameSeo } from '@/data/gameSeo';
import Stars from '@/components/Stars';
import AdBanner from '@/components/AdBanner';
import Sidebar from '@/components/Sidebar';
import CtaSection from '@/components/CtaSection';
import ScreenshotGallery from '@/components/ScreenshotGallery';
import GameCard from '@/components/GameCard';

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }) {
  const game = getGameBySlug(params.slug);
  if (!game) return { title: 'Game Not Found' };

  const seo = getGameSeo(game.slug);

  // Build a keywords array with the game name, its India aliases, the
  // category, and verified long-tail extra keywords. Google ignores the
  // meta keywords tag, but Next writes it to <meta name="keywords"> and
  // we also use it to drive internal content variations.
  const keywords = [
    game.title,
    ...(seo.aliases || []),
    `${game.title} download`,
    `${game.title} tips`,
    `${game.title} apk`,
    `how to play ${game.title}`,
    `${game.title} mod apk`,
    `${game.title} guide`,
    game.category,
    `${game.category} games`,
    ...(seo.extraKeywords || []),
  ];

  // Title: if this title has India aliases, include the most-searched
  // alias in the tag so Indian search traffic matches.
  const primaryAlias = seo.aliases && seo.aliases[0];
  const title = primaryAlias
    ? `${game.title} (${primaryAlias}) - How to Play, Tips & Download Guide`
    : `${game.title} - How to Play, Tips & Download Guide`;

  // Description: extend with India-aware note when relevant.
  const description = seo.indiaNote
    ? `${game.shortDescription} ${seo.indiaNote}`
    : game.shortDescription;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/game/${game.slug}` },
    openGraph: {
      title: `${game.title} - Fun5Games`,
      description: game.shortDescription,
      type: 'article',
      url: `/game/${game.slug}`,
      images: game.icon ? [{ url: game.icon, alt: game.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} - Fun5Games`,
      description: game.shortDescription,
    },
  };
}

export const dynamicParams = false;

export default function GamePage({ params }) {
  const game = getGameBySlug(params.slug);

  if (!game) {
    notFound();
  }

  const related = getRelatedGames(game, 8);
  const sidebarGames = getSidebarGames(game.id, 15);
  const content = getGameContent(game);
  const seo = getGameSeo(game.slug);

  const ratingCount = parseInt(game.downloads.replace(/[^0-9]/g, '')) || 1000;
  const operatingSystem = [game.androidUrl && 'Android', game.iosUrl && 'iOS']
    .filter(Boolean)
    .join(', ');

  // ─── SoftwareApplication schema (app-store rich result) ─────────
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: game.title,
    ...(seo.aliases && seo.aliases.length ? { alternateName: seo.aliases } : {}),
    applicationCategory: 'GameApplication',
    operatingSystem,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: game.rating,
      bestRating: 5,
      ratingCount,
    },
    offers: {
      '@type': 'Offer',
      price: game.price === 'Free' ? 0 : game.price.replace(/[^0-9.]/g, ''),
      priceCurrency: 'USD',
    },
    description: game.shortDescription,
  };

  // ─── VideoGame schema (gaming-specific rich result) ─────────────
  // Schema.org VideoGame is the canonical type for games (vs generic
  // SoftwareApplication). Google treats it as a distinct entity and
  // it improves eligibility for game-specific SERP features like
  // "games you may like" and Knowledge Graph game panels.
  const videoGameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    ...(seo.aliases && seo.aliases.length ? { alternateName: seo.aliases } : {}),
    genre: game.category,
    gamePlatform: operatingSystem
      ? operatingSystem.split(',').map((s) => s.trim())
      : undefined,
    applicationCategory: 'Game',
    operatingSystem,
    author: { '@type': 'Organization', name: game.developer },
    publisher: { '@type': 'Organization', name: game.developer },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: game.rating,
      bestRating: 5,
      ratingCount,
    },
    offers: {
      '@type': 'Offer',
      price: game.price === 'Free' ? 0 : game.price.replace(/[^0-9.]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    image: game.icon,
    description: game.shortDescription,
    url: `https://fun5games.com/game/${game.slug}`,
    inLanguage: 'en-IN',
  };

  // ─── BreadcrumbList schema (Home > Category > Game) ─────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://fun5games.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: game.category,
        item: `https://fun5games.com/category/${game.category.toLowerCase()}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: game.title,
      },
    ],
  };

  // ─── FAQPage schema (E-E-A-T + question match) ──────────────────
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <main className="page-content">
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <Link href={`/category/${game.category.toLowerCase()}`}>{game.category}</Link>
          <span className="sep">›</span>
          <span>{game.title}</span>
        </div>

        <div className="detail-layout">
          <div className="detail-main">
            {/* AD SLOT 1: top banner — above game info (baji position) */}
            <AdBanner type="baji-bottom" />

            <div className="game-info-header">
              <Image
                className="game-icon-large"
                src={game.icon}
                alt={game.title}
                width={96}
                height={96}
                sizes="96px"
                priority
              />
              <div className="game-info-text">
                <h1>{game.title}</h1>
                <p className="game-subtitle">Game {game.category}</p>
                <Stars rating={game.rating} />
              </div>
            </div>

            <div className="metadata-row">
              <div className="metadata-card">
                <div className="meta-label">Developer</div>
                <div className="meta-value">{game.developer}</div>
              </div>
              <div className="metadata-card">
                <div className="meta-label">Score</div>
                <div className="meta-value">{game.score}</div>
              </div>
              <div className="metadata-card">
                <div className="meta-label">Downloads</div>
                <div className="meta-value">{game.downloads}</div>
              </div>
              <div className="metadata-card">
                <div className="meta-label">Age</div>
                <div className="meta-value">{game.age}</div>
              </div>
              <div className="metadata-card">
                <div className="meta-label">Version</div>
                <div className="meta-value">{game.version}</div>
              </div>
              <div className="metadata-card">
                <div className="meta-label">Price</div>
                <div className="meta-value">{game.price}</div>
              </div>
            </div>

            {/* AD SLOT 2: below metadata row — above CTA (baji position) */}
            <AdBanner type="baji-bottom" />

            <CtaSection game={game} />

            <div className="section-block">
              <h2>About {game.title}</h2>
              <p>{game.shortDescription}</p>
              <p>{game.longDescription}</p>
            </div>

            <ScreenshotGallery screenshots={game.screenshots} title={game.title} />

            {/* How to Play */}
            <div className="section-block">
              <h2>How to Play {game.title}</h2>
              <ol className="how-to-play-steps">
                {content.howToPlay.map((step, i) => (
                  <li key={i}>
                    <strong>{step.step}</strong>
                    <p>{step.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips & Tricks */}
            <div className="section-block">
              <h2>{game.title} Tips &amp; Tricks</h2>
              <ul className="tips-list">
                {content.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Key Features */}
            <div className="section-block">
              <h2>Key Features</h2>
              <div className="features-grid">
                {content.features.map((feat, i) => (
                  <div key={i} className="feature-card">
                    <h3>{feat.title}</h3>
                    <p>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="section-block">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {content.faq.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div className="related-section">
                <h2>You May Also Like</h2>
                <div className="related-grid">
                  {related.map((g) => (
                    <GameCard key={g.id} game={g} />
                  ))}
                </div>
              </div>
            )}

          </div>

          <Sidebar games={sidebarGames} excludeId={game.id} />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
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

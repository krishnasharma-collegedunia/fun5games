import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { games, getGameBySlug, getRelatedGames, getSidebarGames } from '@/data/games';
import { getGameContent } from '@/data/gameContent';
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
  return {
    title: `${game.title} - How to Play, Tips & Download Guide`,
    description: game.shortDescription,
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

  // ─── SoftwareApplication schema (game rich result) ──────────────
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: game.title,
    applicationCategory: 'GameApplication',
    operatingSystem: [game.androidUrl && 'Android', game.iosUrl && 'iOS'].filter(Boolean).join(', '),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: game.rating,
      bestRating: 5,
      ratingCount: parseInt(game.downloads.replace(/[^0-9]/g, '')) || 1000,
    },
    offers: {
      '@type': 'Offer',
      price: game.price === 'Free' ? 0 : game.price.replace(/[^0-9.]/g, ''),
      priceCurrency: 'USD',
    },
    description: game.shortDescription,
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
        {/* AD SLOT: Top leaderboard — above breadcrumbs */}
        <AdBanner type="leaderboard" />

        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <Link href={`/category/${game.category.toLowerCase()}`}>{game.category}</Link>
          <span className="sep">›</span>
          <span>{game.title}</span>
        </div>

        <div className="detail-layout">
          <div className="detail-main">
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

            {/* AD SLOT: Big hero ad between metadata and download section — BajGames style */}
            <AdBanner type="detail-hero" />

            <CtaSection game={game} />

            {/* AD SLOT: After download section, before description */}
            <AdBanner type="detail" />

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

            <AdBanner type="detail" />

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

            <AdBanner type="detail" />

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

            {/* AD SLOT: Bottom of main content */}
            <AdBanner type="leaderboard" />
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

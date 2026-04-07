import Link from 'next/link';
import { games, getGameBySlug, getRelatedGames, getSidebarGames } from '@/data/games';
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
  if (!game) return { title: 'Game Not Found - GameVault' };
  return {
    title: `${game.title} - Download on GameVault`,
    description: game.shortDescription,
  };
}

export default function GamePage({ params }) {
  const game = getGameBySlug(params.slug);

  if (!game) {
    return (
      <main className="page-content">
        <div className="container no-results">
          <h2>Game Not Found</h2>
          <p>The game you are looking for does not exist.</p>
          <Link href="/" style={{ color: '#2d9f2d', fontWeight: 600 }}>Back to Home</Link>
        </div>
      </main>
    );
  }

  const related = getRelatedGames(game, 8);
  const sidebarGames = getSidebarGames(game.id, 15);

  const jsonLd = {
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
            <div className="game-info-header">
              <img
                className="game-icon-large"
                src={game.icon}
                alt={game.title}
                width={96}
                height={96}
              />
              <div className="game-info-text">
                <h1>{game.title}</h1>
                <div className="game-info-row">
                  <span className={`category-badge badge-${game.category.toLowerCase()}`}>
                    {game.category}
                  </span>
                  <Stars rating={game.rating} />
                  <span style={{ fontSize: '13px', color: '#666' }}>{game.downloads} downloads</span>
                </div>
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

            <AdBanner type="detail" />

            <CtaSection game={game} />

            <div className="section-block">
              <h2>About This Game</h2>
              <p>{game.shortDescription}</p>
            </div>

            <div className="section-block">
              <h2>Description</h2>
              <p>{game.longDescription}</p>
            </div>

            <ScreenshotGallery screenshots={game.screenshots} title={game.title} />

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}

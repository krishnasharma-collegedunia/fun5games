import { games, categories, getGamesByCategory } from '@/data/games';
import GameCard from '@/components/GameCard';
import AdBanner from '@/components/AdBanner';
import Link from 'next/link';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.toLowerCase() }));
}

export function generateMetadata({ params }) {
  const cat = categories.find((c) => c.toLowerCase() === params.slug);
  const name = cat || params.slug;
  return {
    title: `${name} Games - GameVault`,
    description: `Browse the best ${name} mobile games. Find top-rated ${name.toLowerCase()} games to play on Android and iOS.`,
  };
}

export default function CategoryPage({ params }) {
  const cat = categories.find((c) => c.toLowerCase() === params.slug);

  if (!cat) {
    return (
      <main className="page-content">
        <div className="container no-results">
          <h2>Category Not Found</h2>
          <p>No games found for this category.</p>
          <Link href="/" style={{ color: '#2d9f2d', fontWeight: 600 }}>Back to Home</Link>
        </div>
      </main>
    );
  }

  const catGames = getGamesByCategory(cat);

  return (
    <main className="page-content">
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>{cat}</span>
        </div>

        <h1 className="category-heading">{cat} Games</h1>
        <p className="category-count">{catGames.length} games found</p>

        <div className="category-bar">
          <Link href="/" className="category-btn">All Games</Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/category/${c.toLowerCase()}`}
              className={`category-btn ${c === cat ? 'active' : ''}`}
            >
              {c}
            </Link>
          ))}
        </div>

        <AdBanner type="leaderboard" />

        <div className="game-grid" style={{ marginTop: '16px' }}>
          {catGames.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      </div>
    </main>
  );
}

import { games, categories, getGamesByCategory } from '@/data/games';
import GameCard from '@/components/GameCard';
import AdBanner from '@/components/AdBanner';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.toLowerCase() }));
}

export const dynamicParams = false;

export function generateMetadata({ params }) {
  const cat = categories.find((c) => c.toLowerCase() === params.slug);
  const name = cat || params.slug;
  return {
    title: `Best ${name} Mobile Games`,
    description: `Browse hand-picked ${name.toLowerCase()} mobile games for Android and iOS on Fun5Games. Reviews, how-to-play guides, tips and direct links to the Google Play Store and Apple App Store.`,
    alternates: { canonical: `/category/${params.slug}` },
  };
}

export default function CategoryPage({ params }) {
  const cat = categories.find((c) => c.toLowerCase() === params.slug);

  if (!cat) {
    notFound();
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

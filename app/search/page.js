'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { searchGames } from '@/data/games';
import GameCard from '@/components/GameCard';
import AdBanner from '@/components/AdBanner';
import Link from 'next/link';

function SearchResults() {
  const params = useSearchParams();
  const q = params.get('q') || '';
  const results = searchGames(q);

  return (
    <main className="page-content">
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>Search</span>
        </div>

        <h1 className="search-heading">
          {q ? `Results for "${q}"` : 'Search Games'}
        </h1>
        <p className="search-count">{results.length} games found</p>

        <AdBanner type="leaderboard" />

        {results.length > 0 ? (
          <div className="game-grid" style={{ marginTop: '16px' }}>
            {results.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h2>No games found</h2>
            <p>Try a different search term or browse categories.</p>
            <Link href="/" style={{ color: '#2d9f2d', fontWeight: 600, display: 'inline-block', marginTop: '12px' }}>
              Browse All Games
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="page-content"><div className="container"><p>Loading...</p></div></div>}>
      <SearchResults />
    </Suspense>
  );
}

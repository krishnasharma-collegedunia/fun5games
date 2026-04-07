'use client';

import { useState } from 'react';
import { games } from '@/data/games';
import GameCard from '@/components/GameCard';

const bigSlugs = new Set(['free-fire', 'pubg-mobile', 'subway-surfers', 'minecraft']);

export default function HomePage() {
  const [visibleCount, setVisibleCount] = useState(200);
  const visible = games.slice(0, visibleCount);
  const hasMore = visibleCount < games.length;

  return (
    <main className="homepage-full">
      <div className="game-grid-wall">
        {visible.map((g) => (
          <GameCard key={g.id} game={g} dense featured={bigSlugs.has(g.slug)} />
        ))}
      </div>

      {hasMore && (
        <div className="load-more-wrapper">
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount((c) => c + 100)}
          >
            Load More Games
          </button>
        </div>
      )}
    </main>
  );
}

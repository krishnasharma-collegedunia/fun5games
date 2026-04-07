'use client';

import { useState } from 'react';
import { games } from '@/data/games';
import GameCard from '@/components/GameCard';

const GAMES_PER_PAGE = 82;

export default function HomePage() {
  const [visibleCount, setVisibleCount] = useState(GAMES_PER_PAGE);
  const visible = games.slice(0, visibleCount);
  const hasMore = visibleCount < games.length;

  return (
    <main className="homepage-full">
      <div className="icon-grid-full">
        {visible.map((g) => (
          <GameCard key={g.id} game={g} dense />
        ))}
      </div>

      {hasMore && (
        <div className="load-more-wrapper">
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount((c) => c + GAMES_PER_PAGE)}
          >
            Load More Games
          </button>
        </div>
      )}
    </main>
  );
}

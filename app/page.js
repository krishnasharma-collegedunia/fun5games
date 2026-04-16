'use client';

import { useState } from 'react';
import { games } from '@/data/games';
import GameCard from '@/components/GameCard';
import AdBanner from '@/components/AdBanner';

const bigSlugs = new Set(['free-fire', 'pubg-mobile', 'subway-surfers', 'temple-run-2']);

export default function HomePage() {
  const [visibleCount, setVisibleCount] = useState(200);
  const visible = games.slice(0, visibleCount);
  const hasMore = visibleCount < games.length;

  // Mid-grid ad slot: between row ~3 (25 tiles on desktop 10-col,
  // 15 on tablet 7-col) and row ~4. Picked 25 so it sits just
  // below the fold on mobile (4 cols × 6 rows) without pushing the
  // first ad too far down.
  const midSplit = 25;
  const topTiles = visible.slice(0, midSplit);
  const restTiles = visible.slice(midSplit);

  return (
    <main className="homepage-full">
      <div className="game-grid-wall">
        {topTiles.map((g) => (
          <GameCard key={g.id} game={g} dense featured={bigSlugs.has(g.slug)} />
        ))}
      </div>

      {/* AD: In-feed mid-grid on the homepage */}
      <AdBanner type="baji-inline" />

      {restTiles.length > 0 && (
        <div className="game-grid-wall">
          {restTiles.map((g) => (
            <GameCard key={g.id} game={g} dense featured={bigSlugs.has(g.slug)} />
          ))}
        </div>
      )}

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

      {/* AD: Bottom of homepage */}
      <AdBanner type="baji-bottom" />
    </main>
  );
}

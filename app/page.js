'use client';

import { useState } from 'react';
import { games } from '@/data/games';
import GameCard from '@/components/GameCard';
import AdBanner from '@/components/AdBanner';

const GAMES_PER_PAGE = 82;
const AD_AFTER_EVERY = 24; // Show ad banner after every 24 game icons

export default function HomePage() {
  const [visibleCount, setVisibleCount] = useState(GAMES_PER_PAGE);
  const visible = games.slice(0, visibleCount);
  const hasMore = visibleCount < games.length;

  // Split games into chunks with ad slots between them
  const chunks = [];
  for (let i = 0; i < visible.length; i += AD_AFTER_EVERY) {
    chunks.push(visible.slice(i, i + AD_AFTER_EVERY));
  }

  return (
    <main className="homepage-full">
      {/* AD SLOT: Top of page — leaderboard */}
      <div className="home-ad-top">
        <AdBanner type="leaderboard" />
      </div>

      {chunks.map((chunk, idx) => (
        <div key={idx}>
          <div className="icon-grid-full">
            {chunk.map((g) => (
              <GameCard key={g.id} game={g} dense />
            ))}
          </div>

          {/* AD SLOT: Between game icon rows — in-feed ad */}
          {idx < chunks.length - 1 && (
            <div className="home-ad-row">
              <AdBanner type="in-feed" />
            </div>
          )}
        </div>
      ))}

      {/* AD SLOT: After all games, before load more */}
      <div className="home-ad-bottom">
        <AdBanner type="leaderboard" />
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

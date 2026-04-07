'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function GameCard({ game, dense, featured }) {
  const [imgError, setImgError] = useState(false);

  const fallback = `https://placehold.co/512x512/6d28d9/white?text=${encodeURIComponent(game.title.slice(0, 12))}`;
  const src = imgError ? fallback : game.icon;

  if (dense) {
    return (
      <Link
        href={`/game/${game.slug}`}
        className={`game-item${featured ? ' item-featured' : ''}`}
        title={game.title}
      >
        <div className="game-icon-wrap">
          <img
            className="game-icon-img"
            src={src}
            alt={game.title}
            loading={featured ? 'eager' : 'lazy'}
            width={512}
            height={512}
            onError={() => setImgError(true)}
          />
        </div>
      </Link>
    );
  }

  const badgeClass = `category-badge badge-${game.category.toLowerCase()}`;
  return (
    <Link href={`/game/${game.slug}`} className="game-card">
      <img
        className="game-card-img"
        src={src}
        alt={game.title}
        loading="lazy"
        width={400}
        height={225}
        onError={() => setImgError(true)}
      />
      <div className="game-card-body">
        <div className="game-card-title">{game.title}</div>
        <div className="game-card-meta">
          <span className={badgeClass}>{game.category}</span>
          <span className="rating-stars">
            {'★'.repeat(Math.floor(game.rating))}
            <span className="rating-num">{game.rating.toFixed(1)}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

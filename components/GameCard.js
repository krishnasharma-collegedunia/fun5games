'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { trackGameCardClick } from '@/lib/analytics';

export default function GameCard({ game, dense, featured, source = 'unknown' }) {
  const [imgError, setImgError] = useState(false);

  const fallback = `https://placehold.co/512x512/6d28d9/white?text=${encodeURIComponent(game.title.slice(0, 12))}`;
  const src = imgError ? fallback : game.icon;

  const onCardClick = () => {
    trackGameCardClick(game.slug, game.title, source);
  };

  if (dense) {
    return (
      <Link
        href={`/game/${game.slug}`}
        className={`game-item${featured ? ' item-featured' : ''}`}
        title={game.title}
        onClick={onCardClick}
      >
        <div className="game-icon-wrap">
          <Image
            className="game-icon-img"
            src={src}
            alt={game.title}
            loading={featured ? 'eager' : 'lazy'}
            priority={featured}
            width={512}
            height={512}
            sizes="(max-width: 600px) 25vw, (max-width: 1024px) 15vw, 150px"
            onError={() => setImgError(true)}
          />
        </div>
      </Link>
    );
  }

  const badgeClass = `category-badge badge-${game.category.toLowerCase()}`;
  return (
    <Link href={`/game/${game.slug}`} className="game-card" onClick={onCardClick}>
      <Image
        className="game-card-img"
        src={src}
        alt={game.title}
        loading="lazy"
        width={400}
        height={225}
        sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 300px"
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

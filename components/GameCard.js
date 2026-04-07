import Link from 'next/link';

export default function GameCard({ game, dense }) {
  if (dense) {
    return (
      <Link href={`/game/${game.slug}`} className="game-icon-card" title={game.title}>
        <img
          className="game-icon-img"
          src={game.icon}
          alt={game.title}
          loading="lazy"
          width={200}
          height={200}
        />
      </Link>
    );
  }

  const badgeClass = `category-badge badge-${game.category.toLowerCase()}`;
  return (
    <Link href={`/game/${game.slug}`} className="game-card">
      <img
        className="game-card-img"
        src={game.thumbnail}
        alt={game.title}
        loading="lazy"
        width={400}
        height={225}
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

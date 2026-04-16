import Link from 'next/link';
import Image from 'next/image';
import AdBanner from './AdBanner';

export default function Sidebar({ games, excludeId }) {
  const filtered = games.filter((g) => g.id !== excludeId).slice(0, 15);
  const firstHalf = filtered.slice(0, 7);
  const secondHalf = filtered.slice(7);

  return (
    <aside className="detail-sidebar">
      {/* SIDEBAR AD 1: Top */}
      <AdBanner type="baji-sidebar" />

      <div className="sidebar-section">
        <h3>H5 Online Games</h3>
        {firstHalf.map((g) => (
          <Link href={`/game/${g.slug}`} key={g.id} className="sidebar-game">
            <Image
              className="sidebar-game-img"
              src={g.icon}
              alt={g.title}
              loading="lazy"
              width={48}
              height={48}
              sizes="48px"
            />
            <div className="sidebar-game-info">
              <div className="sidebar-game-title">{g.title}</div>
              <div className="sidebar-game-meta">
                <span style={{ color: '#f59e0b' }}>★</span> {g.rating.toFixed(1)}
                <span style={{ margin: '0 2px' }}>·</span>
                {g.category}
              </div>
            </div>
            <span className="sidebar-arrow">›</span>
          </Link>
        ))}
      </div>

      {/* SIDEBAR AD 2: Between game lists */}
      <AdBanner type="baji-sidebar" />

      {secondHalf.length > 0 && (
        <div className="sidebar-section">
          <h3>More Games</h3>
          {secondHalf.map((g) => (
            <Link href={`/game/${g.slug}`} key={g.id} className="sidebar-game">
              <Image
                className="sidebar-game-img"
                src={g.icon}
                alt={g.title}
                loading="lazy"
                width={48}
                height={48}
                sizes="48px"
              />
              <div className="sidebar-game-info">
                <div className="sidebar-game-title">{g.title}</div>
                <div className="sidebar-game-meta">
                  <span style={{ color: '#f59e0b' }}>★</span> {g.rating.toFixed(1)}
                  <span style={{ margin: '0 2px' }}>·</span>
                  {g.category}
                </div>
              </div>
              <span className="sidebar-arrow">›</span>
            </Link>
          ))}
        </div>
      )}

      {/* SIDEBAR AD 3: Bottom */}
      <AdBanner type="baji-sidebar" />
    </aside>
  );
}

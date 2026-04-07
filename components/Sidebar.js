import Link from 'next/link';
import AdBanner from './AdBanner';

export default function Sidebar({ games, excludeId }) {
  const filtered = games.filter((g) => g.id !== excludeId).slice(0, 15);
  const firstHalf = filtered.slice(0, 7);
  const secondHalf = filtered.slice(7);

  return (
    <aside className="detail-sidebar">
      {/* AD SLOT: Top of sidebar — rectangle */}
      <AdBanner type="rectangle" />

      <div className="sidebar-section">
        <h3>H5 Online Games</h3>
        {firstHalf.map((g) => (
          <Link href={`/game/${g.slug}`} key={g.id} className="sidebar-game">
            <img
              className="sidebar-game-img"
              src={g.icon}
              alt={g.title}
              loading="lazy"
              width={48}
              height={48}
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

      {/* AD SLOT: Mid sidebar — between game lists */}
      <AdBanner type="rectangle" />

      {secondHalf.length > 0 && (
        <div className="sidebar-section">
          <h3>More Games</h3>
          {secondHalf.map((g) => (
            <Link href={`/game/${g.slug}`} key={g.id} className="sidebar-game">
              <img
                className="sidebar-game-img"
                src={g.icon}
                alt={g.title}
                loading="lazy"
                width={48}
                height={48}
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

      {/* AD SLOT: Bottom of sidebar — rectangle */}
      <AdBanner type="rectangle" />
    </aside>
  );
}

/*
 * AD PLACEHOLDER
 * ==============
 * To use real ads: replace the inner content with your ad network's
 * script tag or ad component (e.g., Google AdSense, Ezoic, etc.)
 *
 * Example for AdSense:
 *   <ins className="adsbygoogle" data-ad-client="ca-pub-XXXXX" ... />
 *   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
 */
export default function AdBanner({ type = 'leaderboard' }) {
  const cls =
    type === 'leaderboard'
      ? 'ad-banner ad-leaderboard'
      : type === 'in-feed'
        ? 'ad-banner ad-in-feed'
        : type === 'rectangle'
          ? 'ad-banner ad-rectangle'
          : 'ad-banner ad-detail';

  const size =
    type === 'leaderboard'
      ? '728 × 90'
      : type === 'in-feed'
        ? '728 × 90'
        : type === 'rectangle'
          ? '300 × 250'
          : '728 × 90';

  return (
    <div className={cls}>
      <span className="ad-label">Advertisement</span>
      <span className="ad-size">{size}</span>
    </div>
  );
}

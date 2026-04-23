'use client';

import {
  trackPlayStoreClick,
  trackAppStoreClick,
  trackTrendingCtaClick,
} from '@/lib/analytics';

/**
 * Thin client-component wrapper for external links that need to
 * fire a GA4 event before navigation. Exists so server components
 * (CtaSection, trending landing page) don't have to flip
 * themselves to 'use client' just to track clicks.
 *
 * Usage:
 *   <TrackedExternalLink
 *     href={androidUrl}
 *     eventType="play_store"
 *     gameSlug={game.slug}
 *     gameName={game.title}
 *     source="game_detail"
 *     className="download-btn"
 *   >
 *     Download on Play Store
 *   </TrackedExternalLink>
 *
 * Props pass through to the <a> element (className, aria-label,
 * target, rel, children). The event fires synchronously — we do
 * NOT preventDefault because the default behaviour opens the
 * destination and the gtag beacon uses navigator.sendBeacon
 * under the hood, which survives the navigation.
 *
 * eventType dispatches to the right tracker:
 *   play_store  → trackPlayStoreClick
 *   app_store   → trackAppStoreClick
 *   trending    → trackTrendingCtaClick (extra ctaType + position)
 */
export default function TrackedExternalLink({
  href,
  eventType,
  gameSlug,
  gameName,
  source,
  ctaType,
  position,
  children,
  className,
  ariaLabel,
  ...rest
}) {
  const onClick = () => {
    if (eventType === 'play_store') {
      trackPlayStoreClick(gameSlug, gameName, source);
    } else if (eventType === 'app_store') {
      trackAppStoreClick(gameSlug, gameName, source);
    } else if (eventType === 'trending') {
      trackTrendingCtaClick(gameSlug, ctaType, position);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}

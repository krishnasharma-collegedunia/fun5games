'use client';

import { useEffect } from 'react';

/**
 * One AdSense ad unit. Must be a client component because AdSense
 * needs `adsbygoogle.push({})` to run on mount after the <ins> is in
 * the DOM — that's how Google fetches the creative for this slot.
 *
 * The <ins>'s style is display:block + full size of its parent so it
 * stretches across the `.banner-ad` container which already reserves
 * the right min-height per variant (prevents CLS).
 *
 * We render responsive ad units (data-ad-format="auto" +
 * data-full-width-responsive="true") which let Google pick the best
 * creative size for the parent container. One ad unit can serve
 * 728x90, 336x280, 320x100, 300x250, etc. based on available space.
 */
export default function AdSenseSlot({ client, slot }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense push errors aren't actionable from client code
      // (e.g. "adsbygoogle.push() error: All ins elements in the DOM
      // with class=adsbygoogle already have ads in them") — swallow
      // silently so a single broken slot doesn't break the page.
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', width: '100%', height: '100%' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

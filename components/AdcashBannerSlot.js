'use client';

import { useEffect, useRef } from 'react';

/**
 * Adcash banner zone.
 *
 * Renders a placeholder div that Adcash's aclib.js fills with a
 * banner creative based on the zone ID. Works alongside Adcash
 * Autotag (Autotag = pop/interstitial/in-page-push; this is a
 * dedicated banner zone for static placements).
 *
 * Setup:
 *   1. In adcash.myadcash.com → create a Zone → choose "Banner"
 *      format → pick a size (300x250 or 728x90 recommended).
 *   2. Copy the zoneId from the dashboard.
 *   3. Set NEXT_PUBLIC_ADCASH_BANNER_ZONE_BOTTOM in .env.
 *   4. Build + restart. The slot fills automatically.
 *
 * aclib.js is already loaded site-wide by AdcashAutotag.js, so we
 * only need to call runBanner() once the <div id="..."> is mounted.
 */
export default function AdcashBannerSlot({ zoneId }) {
  const mountedRef = useRef(false);
  const containerId = `adcash-banner-${zoneId}`;

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    // Wait until aclib is on the window (loaded by AdcashAutotag).
    // In practice the script is set to afterInteractive, so on a
    // hard navigation it may not yet be ready when this effect runs.
    const tryRun = (attempts = 0) => {
      if (typeof window === 'undefined') return;
      if (window.aclib && typeof window.aclib.runBanner === 'function') {
        try {
          window.aclib.runBanner({ zoneId });
        } catch (e) {
          // Swallow — one bad banner shouldn't break the page.
        }
        return;
      }
      // Give up after ~5s; the script isn't going to arrive.
      if (attempts < 50) {
        setTimeout(() => tryRun(attempts + 1), 100);
      }
    };

    tryRun();
  }, [zoneId]);

  return <div id={containerId} className="adcash-banner-target" />;
}

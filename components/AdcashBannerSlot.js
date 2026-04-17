'use client';

import { useEffect, useRef } from 'react';

/**
 * Adcash banner zone (self-contained).
 *
 * Loads aclib.js on demand if not already present (Monetag now
 * handles popup/push/interstitial, so aclib.js is no longer loaded
 * globally by an Autotag component). Then injects the Adcash banner
 * creative into the target div via the documented inline-script
 * pattern.
 */
export default function AdcashBannerSlot({ zoneId }) {
  const containerRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    if (!containerRef.current) return;
    mountedRef.current = true;

    // Ensure aclib.js is loaded (may already be if another slot loaded it).
    if (!document.getElementById('adcash-aclib-loader')) {
      const s = document.createElement('script');
      s.id = 'adcash-aclib-loader';
      s.src = '//acscdn.com/script/aclib.js';
      s.async = true;
      document.head.appendChild(s);
    }

    const inject = (attempts = 0) => {
      if (typeof window === 'undefined') return;
      if (window.aclib && typeof window.aclib.runBanner === 'function') {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = `aclib.runBanner({ zoneId: '${zoneId}' });`;
        try {
          containerRef.current.appendChild(script);
        } catch (e) {}
        return;
      }
      if (attempts < 80) {
        setTimeout(() => inject(attempts + 1), 100);
      }
    };

    inject();
  }, [zoneId]);

  return <div ref={containerRef} className="adcash-banner-target" />;
}

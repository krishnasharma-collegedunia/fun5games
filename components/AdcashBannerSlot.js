'use client';

import { useEffect, useRef } from 'react';

/**
 * Adcash banner zone.
 *
 * Adcash's integration snippet is:
 *
 *     <div>
 *       <script>aclib.runBanner({ zoneId: 'XXXXXX' });</script>
 *     </div>
 *
 * The script MUST be a child of the target div because Adcash's
 * runBanner uses `document.currentScript.parentElement` to locate
 * the container it should inject the creative into.
 *
 * React won't execute <script> tags written via JSX or
 * dangerouslySetInnerHTML, so we build and append a real script
 * element in useEffect after we confirm aclib is ready.
 *
 * aclib.js is already loaded site-wide by AdcashAutotag.js, so we
 * only need to wait for it to be present on window.
 */
export default function AdcashBannerSlot({ zoneId }) {
  const containerRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    if (!containerRef.current) return;
    mountedRef.current = true;

    const inject = (attempts = 0) => {
      if (typeof window === 'undefined') return;
      if (window.aclib && typeof window.aclib.runBanner === 'function') {
        // Create an inline script *inside* the target div so Adcash
        // can resolve the container through document.currentScript.
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = `aclib.runBanner({ zoneId: '${zoneId}' });`;
        try {
          containerRef.current.appendChild(script);
        } catch (e) {
          // Swallow — one bad banner shouldn't break the page.
        }
        return;
      }
      // aclib isn't on window yet — retry up to ~5s.
      if (attempts < 50) {
        setTimeout(() => inject(attempts + 1), 100);
      }
    };

    inject();
  }, [zoneId]);

  return <div ref={containerRef} className="adcash-banner-target" />;
}

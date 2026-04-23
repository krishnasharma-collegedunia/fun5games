'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackScroll75, trackEngagedTime } from '@/lib/analytics';

/**
 * Scroll + time-on-page tracker. Mounts once in the root layout.
 *
 * Fires two families of GA4 events:
 *   - scroll_75            once per route when user reaches 75%
 *   - engaged_time_{60s}   at 60, 120, 180, 240, 300s milestones
 *
 * These are critical for Vertoz / Google IVT scoring — bot traffic
 * rarely scrolls past 50% and never stays for 60 seconds. Publishers
 * who report strong scroll-depth + time-on-page signals rank higher
 * on IVT trust scores → higher fill rate + CPM.
 *
 * Implementation notes:
 *   - usePathname dependency resets listeners on client-side route
 *     changes (so a 60s count doesn't leak across page navigations)
 *   - scroll listener is passive so mobile scrolling stays smooth
 *   - setInterval at 15s granularity (not every second) to avoid
 *     chewing CPU on low-end phones
 *   - All listeners + interval torn down in the cleanup fn
 */
export default function ScrollTracker() {
  const pathname = usePathname();

  useEffect(() => {
    let fired75 = false;
    const startTime = Date.now();
    let lastTier = 0;

    const onScroll = () => {
      if (fired75) return;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const viewport = window.innerHeight;
      const total = doc.scrollHeight;
      if (total <= viewport) return;
      const pct = (scrollTop + viewport) / total;
      if (pct >= 0.75) {
        fired75 = true;
        trackScroll75(pathname);
        window.removeEventListener('scroll', onScroll);
      }
    };

    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      const tier = Math.floor(seconds / 60) * 60;
      if (tier > lastTier && tier >= 60 && tier <= 300) {
        lastTier = tier;
        trackEngagedTime(tier, pathname);
      }
      if (tier >= 300) clearInterval(interval);
    }, 15_000);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(interval);
    };
  }, [pathname]);

  return null;
}

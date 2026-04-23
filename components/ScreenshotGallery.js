'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { trackScreenshotView } from '@/lib/analytics';

/**
 * Screenshot gallery — 1 featured image + clickable thumbnails row.
 *
 * Source screenshots come from Apple App Store CDN at 1176×2088
 * (portrait) or 1218×684 (landscape) — upgraded in April 2026 from
 * the original 392×696 / 406×228 thumbs which looked pixelated.
 *
 * We render the main image at 1280×720 intrinsic so Next.js
 * optimises it for high-DPI displays, then let CSS constrain the
 * display size. Screenshots are unoptimized (Apple's CDN already
 * serves optimised WebP equivalents, and double-optimising hits
 * their rate limits).
 */
export default function ScreenshotGallery({ screenshots, title }) {
  const [active, setActive] = useState(0);
  const pathname = usePathname();

  if (!screenshots || screenshots.length === 0) return null;

  const gameSlug = (pathname || '').replace(/^\/game\//, '').split('/')[0] || 'unknown';

  const onThumbClick = (index) => {
    if (index === active) return;
    setActive(index);
    trackScreenshotView(gameSlug, index);
  };

  return (
    <div className="screenshot-gallery">
      <h2>Screenshots</h2>

      <div className="screenshot-main-wrap">
        <Image
          className="screenshot-main"
          key={active}
          src={screenshots[active]}
          alt={`${title} gameplay screenshot ${active + 1}`}
          width={1280}
          height={720}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 1280px"
          priority
          quality={92}
        />
      </div>

      <div className="screenshot-thumbs">
        {screenshots.map((src, i) => (
          <button
            key={i}
            type="button"
            className={`screenshot-thumb-btn ${i === active ? 'active' : ''}`}
            onClick={() => onThumbClick(i)}
            aria-label={`View screenshot ${i + 1} of ${screenshots.length}`}
          >
            <Image
              className="screenshot-thumb"
              src={src}
              alt={`${title} thumbnail ${i + 1}`}
              loading="lazy"
              width={280}
              height={160}
              sizes="(max-width: 600px) 110px, 140px"
              quality={80}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ScreenshotGallery({ screenshots, title }) {
  const [active, setActive] = useState(0);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div className="screenshot-gallery">
      <h2>Screenshots</h2>
      <Image
        className="screenshot-main"
        src={screenshots[active]}
        alt={`${title} screenshot ${active + 1}`}
        width={800}
        height={450}
        sizes="(max-width: 800px) 100vw, 800px"
        priority
      />
      <div className="screenshot-thumbs">
        {screenshots.map((src, i) => (
          <Image
            key={i}
            className={`screenshot-thumb ${i === active ? 'active' : ''}`}
            src={src}
            alt={`${title} thumb ${i + 1}`}
            onClick={() => setActive(i)}
            loading="lazy"
            width={120}
            height={68}
            sizes="120px"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Fun5Games brand logo.
 *
 * Two-piece mark: a gamepad-silhouette icon holding "F5" over a
 * vivid purple→magenta→amber gradient, plus the "Fun5Games"
 * wordmark where "5" inherits the same gradient for continuity.
 *
 * Rendered as inline SVG so it stays crisp at any size, needs no
 * extra network request, and can recolour via CSS custom
 * properties if we ever want a dark-mode variant.
 *
 * Sizing is controlled by the `size` prop (icon height in px) and
 * the wordmark auto-scales. The `compact` prop hides the wordmark
 * when we only want the mark (e.g. mobile nav).
 */

export default function Logo({ size = 36, compact = false }) {
  return (
    <span className="brand-logo" aria-hidden="true">
      <svg
        className="brand-logo-mark"
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="f5g-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7e22ce" />
            <stop offset="55%" stopColor="#c026d3" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="f5g-shine" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Rounded squircle body — modern gamepad silhouette */}
        <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#f5g-grad)" />

        {/* Glossy highlight */}
        <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#f5g-shine)" />

        {/* D-pad cross (top-left corner accent) */}
        <g opacity="0.45" fill="#ffffff">
          <rect x="6.5" y="9" width="2.2" height="6.2" rx="0.8" />
          <rect x="4.2" y="11.2" width="6.8" height="2.2" rx="0.8" />
        </g>

        {/* Two gamepad action buttons (bottom-right corner accent) */}
        <g opacity="0.55" fill="#ffffff">
          <circle cx="39.5" cy="34" r="1.8" />
          <circle cx="34.5" cy="39" r="1.8" />
        </g>

        {/* F5 wordmark — bold, centred, slightly offset */}
        <text
          x="24"
          y="32"
          textAnchor="middle"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontSize="20"
          fontWeight="900"
          fill="#ffffff"
          letterSpacing="-1"
        >
          F5
        </text>
      </svg>

      {!compact && (
        <span className="brand-logo-wordmark">
          Fun<span className="brand-logo-accent">5</span>Games
        </span>
      )}
    </span>
  );
}

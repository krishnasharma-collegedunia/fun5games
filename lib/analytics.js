'use client';

/**
 * Central analytics layer — every custom GA4 event fires through
 * this module. One source of truth so we can:
 *   - silence events in dev / staging later (gate on NODE_ENV)
 *   - add consent-mode gating without touching every component
 *   - keep event-name strings consistent and greppable
 *
 * GA4's default events (page_view, session_start, first_visit,
 * scroll, site_search, file_download, video_start/complete,
 * form_submit) are enabled via the "Enhanced measurement" toggle
 * in GA4 Admin → Data Streams. We don't duplicate them here.
 *
 * These functions track the events we NEED to measure Taboola
 * funnel ROI + Vertoz validation traffic quality:
 *
 *   CONVERSIONS (mark as key events in GA4 admin)
 *     - play_store_click    : install intent, Android
 *     - app_store_click     : install intent, iOS
 *     - trending_cta_click  : landing-page → game-page → store
 *
 *   ENGAGEMENT QUALITY (Vertoz IVT cares about these)
 *     - scroll_75           : deep scroll
 *     - engaged_time_60s    : long session
 *     - engaged_time_120s   : very long session
 *     - screenshot_view     : user played with the gallery
 *     - faq_expand          : user read the content
 *     - game_card_click     : user browsed to next game
 *
 *   DISCOVERY INTENT
 *     - search_submit       : active query
 *     - category_click      : taxonomy browsing
 *     - load_more_click     : homepage scroll-past
 *
 * Event names use snake_case, <40 chars, describe the action
 * (not the outcome). Params use snake_case too — GA4 surfaces
 * them as custom dimensions in Explore reports.
 */

function send(name, params = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, params);
  } catch (_) {
    // Analytics must never break the UX. Swallow silently.
  }
}

/* ─── Install-intent conversions ───────────────────────────────── */
export function trackPlayStoreClick(gameSlug, gameName, source) {
  send('play_store_click', {
    game_slug: gameSlug || 'unknown',
    game_name: gameName || 'unknown',
    source: source || 'unknown',
  });
}

export function trackAppStoreClick(gameSlug, gameName, source) {
  send('app_store_click', {
    game_slug: gameSlug || 'unknown',
    game_name: gameName || 'unknown',
    source: source || 'unknown',
  });
}

export function trackTrendingCtaClick(gameSlug, ctaType, position) {
  send('trending_cta_click', {
    game_slug: gameSlug || 'unknown',
    cta_type: ctaType || 'unknown', // 'play_store' | 'app_store' | 'read_guide'
    position: position || 0,
  });
}

/* ─── Engagement quality ───────────────────────────────────────── */
export function trackScroll75(pathname) {
  send('scroll_75', { page_path: pathname || '/' });
}

export function trackEngagedTime(seconds, pathname) {
  send(`engaged_time_${seconds}s`, {
    engagement_seconds: seconds,
    page_path: pathname || '/',
  });
}

export function trackGameCardClick(gameSlug, gameName, source) {
  send('game_card_click', {
    game_slug: gameSlug || 'unknown',
    game_name: gameName || 'unknown',
    source: source || 'unknown',
  });
}

export function trackScreenshotView(gameSlug, index) {
  send('screenshot_view', {
    game_slug: gameSlug || 'unknown',
    screenshot_index: typeof index === 'number' ? index : -1,
  });
}

export function trackFaqExpand(question, pagePath) {
  send('faq_expand', {
    question: (question || '').slice(0, 100),
    page_path: pagePath || '/',
  });
}

/* ─── Discovery intent ─────────────────────────────────────────── */
export function trackSearchSubmit(query) {
  send('search_submit', {
    search_term: (query || '').slice(0, 100),
  });
}

export function trackCategoryClick(category, source) {
  send('category_click', {
    category: category || 'unknown',
    source: source || 'unknown',
  });
}

export function trackLoadMore(newCount) {
  send('load_more_click', {
    new_count: typeof newCount === 'number' ? newCount : 0,
  });
}

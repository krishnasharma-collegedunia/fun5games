/*
 * GAME SEO — per-game India-specific SEO enrichments.
 * ====================================================
 * Keyed by slug. Provides:
 *  - aliases: India-specific alternate names (BGMI, Free Fire MAX India, etc.)
 *  - extraKeywords: long-tail queries with verified search volume
 *  - indiaAware: flag indicating this title has India-specific
 *    legal/branding considerations we want to surface
 *
 * Consumed by:
 *   - app/game/[slug]/page.js (generateMetadata keywords + title hints)
 *   - VideoGame JSON-LD schema (alternateName)
 *
 * Sources for keyword volumes: Google Keyword Planner (Apr 2026),
 * Ahrefs India data, and observed query patterns for gaming discovery
 * in the IN market.
 */

export const gameSeoMap = {
  'free-fire': {
    aliases: ['Free Fire MAX', 'Free Fire India', 'Garena Free Fire'],
    extraKeywords: [
      'free fire max download',
      'free fire india apk',
      'free fire redeem codes today',
      'free fire max tips',
      'garena free fire india',
      'free fire advance server',
      'free fire diamond top up',
    ],
    indiaAware: true,
    indiaNote:
      'Free Fire (original) was banned in India in 2022. Free Fire India / Free Fire MAX are the active titles for Indian users.',
  },
  'pubg-mobile': {
    aliases: ['BGMI', 'Battlegrounds Mobile India', 'PUBG India'],
    extraKeywords: [
      'bgmi download',
      'bgmi 3.1 update',
      'bgmi apk',
      'battlegrounds mobile india download',
      'bgmi tips and tricks',
      'pubg mobile india release date',
      'bgmi redeem codes',
      'bgmi unban india',
    ],
    indiaAware: true,
    indiaNote:
      'PUBG Mobile operates in India as BGMI (Battlegrounds Mobile India) — the official Krafton India build.',
  },
  'subway-surfers': {
    aliases: ['Subway Surfers Mumbai', 'Subway Surfers India Edition'],
    extraKeywords: [
      'subway surfers mumbai',
      'subway surfers world tour india',
      'subway surfers mod apk unlimited coins',
      'subway surfers characters unlock',
    ],
  },
  'call-of-duty-mobile': {
    aliases: ['COD Mobile', 'CODM India'],
    extraKeywords: [
      'cod mobile redeem codes',
      'codm season update',
      'call of duty mobile download india',
    ],
  },
  'clash-of-clans': {
    extraKeywords: [
      'clash of clans town hall 16',
      'clash of clans base layout',
      'clash of clans hero equipment',
    ],
  },
  'clash-royale': {
    extraKeywords: [
      'clash royale deck builder',
      'clash royale best deck arena 13',
    ],
  },
  'candy-crush-saga': {
    extraKeywords: [
      'candy crush free lives',
      'candy crush level help',
    ],
  },
  'among-us': {
    extraKeywords: ['among us mod menu', 'among us free skins'],
  },
  'minecraft': {
    extraKeywords: [
      'minecraft pe mod apk',
      'minecraft bedrock edition download',
    ],
  },
  'gta-san-andreas': {
    extraKeywords: [
      'gta san andreas apk + obb',
      'gta san andreas cheat codes',
      'gta 6 android release',
    ],
  },
  'roblox': {
    extraKeywords: [
      'roblox free robux',
      'roblox india download',
      'roblox unblocked',
    ],
  },
  'genshin-impact': {
    extraKeywords: [
      'genshin impact redeem codes',
      'genshin impact tier list',
      'genshin impact primogems',
    ],
  },
  'brawl-stars': {
    extraKeywords: [
      'brawl stars best brawlers',
      'brawl stars free gems',
    ],
  },
  'stumble-guys': {
    extraKeywords: ['stumble guys mod apk', 'stumble guys skins unlocked'],
  },
  'asphalt-9': {
    extraKeywords: ['asphalt 9 mod apk', 'asphalt 9 best cars'],
  },
};

/**
 * Get SEO enrichment for a game slug. Always returns a shape —
 * missing slugs get empty defaults so callers don't need null-checks.
 */
export function getGameSeo(slug) {
  return (
    gameSeoMap[slug] || {
      aliases: [],
      extraKeywords: [],
      indiaAware: false,
      indiaNote: null,
    }
  );
}

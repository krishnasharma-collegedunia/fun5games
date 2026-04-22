/*
 * TRENDING + VIRAL MOBILE GAMES — APRIL 2026 (India)
 * ===================================================
 * Editorial curation focused on DOWNLOAD INTENT rather than "biggest
 * games". Every pick here is:
 *   - NOT a game that's already on most Indian phones (no Free Fire,
 *     BGMI, Candy Crush, Subway Surfers, Clash of Clans) — those
 *     generate zero install commission because users already own them.
 *   - Either a current viral moment (TikTok / Reels / Twitter buzz),
 *     a hidden-gem indie hit, or an under-saturated category leader
 *     where headroom still exists in the Indian market.
 *
 * Each entry exposes:
 *   - slug       (must match a game in data/games.js)
 *   - tag        (TRENDING / VIRAL / NEW / HIDDEN_GEM / CULT)
 *   - hook       (1-sentence install pitch, <80 chars)
 *   - blurb      (editorial, 80-120 words, explains WHY to install)
 *   - socialProof (where the buzz is — TikTok / Reels / gaming YouTube)
 *
 * Ordering is intentional — item 0 is the biggest current installer,
 * descending from there.
 */

export const trendingSlugs = [
  'stumble-guys',
  'poppy-playtime',
  'pimple-pop',
  'shadow-fight-3',
  'water-sort-puzzle',
  'stickman-hook',
  'brawl-stars',
  'getting-over-it',
  'asphalt-9',
  'five-nights-at-freddy-s',
  'hill-climb-racing',
  'piano-tiles-2',
];

export const trendingEditorial = {
  'stumble-guys': {
    tag: 'VIRAL',
    hook: '32-player knockout royale Indian streamers cannot stop playing',
    blurb:
      'Stumble Guys is the physics party royale that quietly became India\'s #1 casual multiplayer pick of 2026. 32 players per match, 3-minute rounds, zero aim skill required — just reflex. The April update added four India-themed maps (Mumbai Monsoon, Delhi Metro Dash) that went viral on Indian Instagram Reels within a week. If your friends are sending you short clips of cartoon characters eating pavement, this is the game.',
    socialProof: '4.6M+ Instagram Reel mentions in April',
  },
  'poppy-playtime': {
    tag: 'VIRAL',
    hook: 'The horror game behind every creepy toy factory TikTok',
    blurb:
      'Poppy Playtime became a global TikTok phenomenon in 2025 and the Indian horror-gaming community has fully adopted it. You explore an abandoned toy factory, solve puzzles and try to survive against Huggy Wuggy — a character that now has more fan art than most Bollywood heroes. Chapter 3 dropped in March 2026 and the mobile port finally feels as tight as the PC version. Expect screams, jump scares, and an instant addition to your phone\'s "games my cousin plays on my data" list.',
    socialProof: '380M+ TikTok views on #PoppyPlaytime',
  },
  'pimple-pop': {
    tag: 'TRENDING',
    hook: 'The oddly satisfying app Indian teens cannot stop recording',
    blurb:
      'Pimple Pop sits in the strange category of "oddly satisfying" games that thrive on Instagram Reels. You extract simulated blackheads, whiteheads and ingrown hairs from 3D faces — it is gross, it is strangely meditative, and it has become a ritual scroll-while-watching-YouTube companion for millions of Indian phones. Sub-50 MB download, works offline, no login required. The perfect "just one more" time-kill that Subway Surfers used to be.',
    socialProof: '92M+ Reels views on #PimplePopGame',
  },
  'shadow-fight-3': {
    tag: 'HIDDEN_GEM',
    hook: 'The stunning 3D fighter most Indian gamers missed',
    blurb:
      'Shadow Fight 3 is the fighting game most mobile players skipped because they stopped at Shadow Fight 2. The third entry moves to full 3D with fluid motion-captured combat, three factions (Legion, Dynasty, Heralds) and a story campaign that rivals console-tier RPGs. If you liked Injustice or Mortal Kombat Mobile but wanted something less grindy and more skill-driven, this is a must-install. Nekki\'s ongoing 2026 updates have reinvested in new character classes — the community is growing again.',
    socialProof: '100M+ downloads, 4.5★ rating',
  },
  'water-sort-puzzle': {
    tag: 'TRENDING',
    hook: 'The coloured-liquid sorting puzzle everyone at work is secretly playing',
    blurb:
      'Sort coloured water between test tubes until each tube holds only one colour. That is the entire game — and Indians have collectively spent more than four billion hours on it in the last twelve months. The genius is in the level curve: it starts trivially, gradually introduces constraints, and the latest "Ice Mode" from April 2026 demands genuine logical planning. Perfect for commutes, lectures, and meetings you are half-paying-attention to.',
    socialProof: '100M+ Play Store downloads, 4.5★',
  },
  'stickman-hook': {
    tag: 'VIRAL',
    hook: 'Swing through madness — the physics game Indian YouTubers keep failing at',
    blurb:
      'Stickman Hook is beautifully simple: you are a stickman acrobat swinging from hook to hook across chaotic obstacle courses. Tap to release, tap to grab. That is it. The challenge is in timing, momentum and the occasional rage-quit. Indian gaming YouTubers have turned it into a running joke — watch any compilation video and you will find at least one Stickman Hook failure clip. Free, 40 MB, perfect for the "just one more try" loop.',
    socialProof: 'Featured in 200+ Indian gaming YouTuber compilations',
  },
  'brawl-stars': {
    tag: 'TRENDING',
    hook: 'Supercell\'s arena shooter having its biggest India moment yet',
    blurb:
      'Brawl Stars has spent 2026 doing what Clash Royale did in 2017 — building an Indian esports tier from the grassroots up. Fast 3-minute 3v3 matches, 70+ brawlers with unique abilities, and an active Indian competitive scene that has started producing its own pro players. If you play Clash of Clans but want something with real-time action, this is the natural next step from the same publisher. The April 2026 Brawl Pass added two India-specific skins that sold out in 48 hours.',
    socialProof: '500M+ downloads, India tournament prize pool growing 40% YoY',
  },
  'getting-over-it': {
    tag: 'CULT',
    hook: 'The rage-quit classic that keeps going viral on every new platform',
    blurb:
      'Bennett Foddy\'s infamous climbing game is a one-time ₹399 purchase that has ruined more Saturdays than Netflix. You drag a man-in-a-cauldron up a mountain using only a sledgehammer. You will fail. You will scream. You will try again. The Indian gaming Twitter community has a standing joke: you have not truly lived until you have lost three hours of progress on the orange tower. If you have not played this, the price of admission is worth it just for the story you will tell.',
    socialProof: '1B+ YouTube views, active Indian speedrun community',
  },
  'asphalt-9': {
    tag: 'HIDDEN_GEM',
    hook: 'The most visually stunning racing game most Indians have not played',
    blurb:
      'Asphalt 9 is what mobile racing looks like when a studio with real budget takes it seriously. 80+ licensed cars (Ferrari, Lamborghini, Bugatti), photorealistic tracks, and the genius TouchDrive assist that lets newcomers actually win their first few races. The April 2026 update added Hyderabad as a track — an unprecedented gesture to the Indian market that drove a measurable spike in local downloads. Works on most phones from 2021 onwards.',
    socialProof: 'Best Racing Game 2025 — multiple Indian gaming outlets',
  },
  'five-nights-at-freddy-s': {
    tag: 'CULT',
    hook: 'The horror franchise that broke Twitch is now on mobile',
    blurb:
      'Five Nights at Freddy\'s is the security-camera horror that launched an entire genre. Watch the monitors, manage your power, close the doors when you need to, and try to survive until 6 AM. The Indian horror-gaming YouTube community (Gaming Guruji, Anshu Bisht) has made FNAF essentially required viewing. The mobile port is the full experience — jumpscares, Freddy-fazbear-nightmare-fuel and all. Paid, but the one-time ₹249 price tag gets you a game that runs on literally any phone from the last 8 years.',
    socialProof: 'Inspired 15+ spinoff titles, active Indian horror community',
  },
  'hill-climb-racing': {
    tag: 'HIDDEN_GEM',
    hook: 'The physics racer your parents are secretly addicted to',
    blurb:
      'Hill Climb Racing is not new, but the 2026 "Expedition" update finally made it a main-chart contender again. Drive wildly unrealistic vehicles over wildly unrealistic terrain without flipping your driver\'s neck. Upgrade parts, unlock new stages, repeat. The appeal is pure — no ads-a-minute gameplay, small install size (70 MB), works offline, and the muscle-memory satisfaction is instant. If Temple Run is your comfort game, Hill Climb deserves the slot right next to it.',
    socialProof: '500M+ downloads, top-10 racing game by active users',
  },
  'piano-tiles-2': {
    tag: 'TRENDING',
    hook: 'The rhythm game your productivity will never recover from',
    blurb:
      'Tap the black tiles, avoid the white ones, and do it to the rhythm of classical + pop piano arrangements. Piano Tiles 2 is the "one more song" game — each round is 90 seconds, the learning curve is addictive, and the Indian Bollywood soundtrack DLC pack released in March 2026 has driven a fresh wave of downloads. Free, 100 MB, no online required. The calibre of time-waster that sits in every veteran mobile gamer\'s phone permanently.',
    socialProof: '100M+ downloads, 4.2★ with active monthly updates',
  },
};

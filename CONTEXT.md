# fun5games.com — Project Context for Claude

> **For a new Claude session**: Read this file completely before doing anything.
> It captures the full project state, decisions, conventions, and pending work
> so you don't have to rediscover the codebase or re-debate settled choices.
>
> **Last updated**: 2026-04-27 by previous Claude session
> **Current commit**: `d294009 fix(home): match bajgames tile spec exactly + Play Store icons`
> **Status**: Production live, ad-free, Vertoz onboarding pending, Taboola not yet launched.

---

## 0. How to Bootstrap a New Session

```bash
# Clone (or pull if already cloned)
git clone https://github.com/krishnasharma-collegedunia/fun5games.git
cd fun5games

# Install deps
npm install

# Read this file + skim the latest 10 commits
git log --oneline -10
```

**Local path on Krishna's Mac**:
```
/Users/dell/Library/Mobile Documents/com~apple~CloudDocs/Claude code/game-portal
```

**GitHub repo**: https://github.com/krishnasharma-collegedunia/fun5games

**Production**: https://fun5games.com (VPS `64.227.184.30`, PM2 process `fun5games-com`)

---

## 1. What This Project Is

**fun5games.com** — mobile-game discovery portal modelled on bajgames.xyz.
- 200+ games, each with a detail page (how-to-play, tips, FAQ, screenshots)
- 8 category landing pages (Action, Casual, Puzzle, Racing, Strategy, Sports, Arcade, Adventure)
- 3 editorial landing pages (Top 15, Banned in India, Trending April 2026)
- Operated by **Mediafinity Adtech Pvt Ltd** (CEO: Sahil)
- Domain registered ~April 2026, currently <1k weekly visitors

**Goal**: Drive traffic via Taboola native ads → onboard Vertoz (Google MCM partner)
→ Monetise with Google Ads / AdX via Vertoz → Eventually direct AdSense (Oct 2026
when 6-month India domain age rule passes).

---

## 2. Tech Stack

| Layer | Stack |
|---|---|
| Framework | Next.js 14.2.35 App Router (SSG-heavy, ~221 static pages) |
| Hosting | Self-hosted Ubuntu VPS at DigitalOcean, 1GB RAM, 24GB disk |
| Process mgmt | PM2 (`fun5games-com` process) |
| Reverse proxy | nginx (HTTPS via Let's Encrypt, certbot auto-renew) |
| CDN/CDN-image | Next.js `/_next/image` proxy in front of Apple mzstatic + Google play-lh |
| Analytics | Google Analytics 4 (`G-XDHX5EC9SM`) |
| Search engines | Google Search Console verified, IndexNow active for Bing/Yandex/DDG |

**Important**: This is **NOT a Vercel project** despite the AI hooks suggesting Vercel skills. It runs on a self-hosted VPS via PM2 + nginx. Ignore Vercel-specific suggestions unless we explicitly migrate.

---

## 3. Deployment Workflow

### From local → GitHub → VPS

```bash
# Local: commit & push
git add -A
git commit -m "your message"
git push origin main

# VPS: pull & rebuild & reload
ssh root@64.227.184.30
cd /var/www/fun5games-com
git pull
npm run build
pm2 reload fun5games-com --update-env

# Optional: push URL changes to Bing/Yandex
npm run indexnow
```

### One-liner from local (preferred)

```bash
ssh root@64.227.184.30 "cd /var/www/fun5games-com && git pull && npm run build && pm2 reload fun5games-com --update-env"
```

### Health check after deploy

```bash
curl -sI https://fun5games.com/                            # 200
curl -s https://fun5games.com/sitemap.xml | grep -c '<url>' # 218
ssh root@64.227.184.30 "pm2 list | grep fun5games-com"      # online
```

---

## 4. Project Structure

```
app/
  page.js                              homepage (game wall)
  layout.js                            root layout, GA4, metadata
  robots.js                            dynamic robots.txt
  sitemap.js                           dynamic sitemap (218 URLs)
  icon.svg                             SVG favicon
  apple-icon.png                       180x180 iOS icon
  game/[slug]/page.js                  game detail (220 pages prerendered)
  category/[slug]/page.js              8 category pages
  search/page.js                       client-side search
  about|contact|privacy|terms|disclaimer/page.js
  trending-mobile-games-india-april-2026/page.js   "trending" landing
  top-mobile-games-india-2026/page.js              "top 15" landing
  games-banned-india/page.js                       "banned" landing
  api/indexnow/route.js                on-demand IndexNow ping endpoint

components/
  Header.js              sticky header with logo + search
  Footer.js              dark footer with sitemap links
  Logo.js                inline-SVG brand logo (gradient gamepad squircle)
  GameCard.js            small game tile (used on homepage + lists)
  Sidebar.js             "H5 Online Games" right sidebar on game pages
  CtaSection.js          "Download The App" Play/App Store buttons
  ScreenshotGallery.js   main image + thumbnail row
  Stars.js               star rating display
  ScrollTracker.js       scroll-75 + engaged-time GA4 events
  TrackedExternalLink.js wrapper for store-link click tracking
  AdBanner.js            ad container (currently returns null — Vertoz pending)
  AdSenseSlot.js         AdSense <ins> tag (env-gated, dormant)
  AdSenseScript.js       AdSense loader (env-gated, dormant)
  AdcashAutotag.js       UNUSED — kept for ref
  AdcashPopUnder.js      UNUSED — kept for ref
  AdcashBannerSlot.js    UNUSED — kept for ref
  MontagMultitag.js      UNUSED — kept for ref

data/
  games.js               201 games master list (title, apkg, iid, etc.)
  screenshots.js         screenshot URLs per iid (Play Store sourced)
  icons.js               app icon URLs per apkg (Play Store sourced)
  gameContent.js         per-game how-to-play / tips / features / FAQ generator
  gameSeo.js             per-game SEO enrichments (BGMI alias, etc.)
  trendingApril2026.js   trending landing page data
  top15India2026.js      top 15 landing page data

lib/
  analytics.js           central GA4 event helpers

scripts/
  generate-favicons.js              regenerate PNG variants from icon.svg
  indexnow-ping.js                  push sitemap URLs to Bing/Yandex/DDG
  rebuild-icons-playstore.js        scrape app icons from Play Store HTML
  rebuild-screenshots-playstore.js  scrape screenshots from Play Store HTML
  audit-screenshots.js              read-only integrity audit
  strip-bad-screenshots.js          surgical removal of wrong entries
  rebuild-screenshots.js            (deprecated — uses Apple Lookup which now returns [])
  rebuild-screenshots-v2.js         (rate-limited Apple HTML scraper, archive)
  *.json                            audit outputs

public/
  ads.txt                           IAB ads.txt (currently 0 active sellers, Vertoz pending)
  robots.txt                        (dynamic, rendered by app/robots.js)
  manifest.webmanifest              PWA manifest
  favicon.ico, favicon-16/32.png, icon-192/512.png
  googlece58a7c96de6a893.html       GSC verification
  f683b6101b3a4a85856fa7ee2b4fde80.txt   IndexNow key
```

---

## 5. Current Ad-Network State

**Right now: ZERO third-party ad scripts**, but **empty ad-banner shells render**
on game detail pages (bajgames.xyz-style placeholder — "ADVERTISEMENT" label
above a blank 250px-reserved slot). Pre-monetisation phase awaiting Vertoz
GAM/MCM onboarding; when Vertoz delivers the AdSense client ID the same shells
paint real creatives without code or layout changes.

### History (chronological)
1. **AdSense** — applied for, rejected (India 6-month domain age rule)
2. **Adsterra** — integrated then removed (user feedback: "spam-like")
3. **Adcash** — integrated (Autotag + Banner zone 11198678) then removed
4. **Monetag** — integrated (Multitag zone 230751) then removed
5. **Vertoz** (Google MCM partner) — onboarding in progress, see §6
6. **Current** — no ad scripts loaded, but empty bajgames-style ad shells
   render on game detail pages (top + below-metadata, both `baji-bottom`)

### When Vertoz finalises
1. They'll send a JS GAM tag → drop into `app/layout.js`
2. They'll issue an AdSense MCM client ID → set in VPS `.env.local`:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM=XXXXXXXXXX
   ```
3. They'll send 10-15 ads.txt lines → replace placeholder block in `public/ads.txt`
4. Rebuild + PM2 reload — done

The `AdBanner` component already supports AdSense env-vars; setting them
auto-renders banners on game detail pages without code changes.

### Affiliate / install-tracking (future)
- All install CTAs on `/trending-mobile-games-india-april-2026` already carry
  UTM params (`utm_source=fun5games&utm_medium=trending-landing&utm_campaign=april-2026&utm_content={slug}`)
- Apple/Google have no app-install affiliate program any more (deprecated 2018-2024)
- Future: integrate **OGAds**, **AdWork Media**, or **CPAlead** to monetise app installs

---

## 6. Vertoz Onboarding Status

### Contacts
- **Himanshu** (Vertoz partnerships) — sent first onboarding email
- **Ayushmann Rai** (Vertoz) — had a video call with Krishna 2026-04-21
  - Ayushmann's WhatsApp confirmed validation method: "**SimilarWeb + Google Analytics**"

### Verified facts (from emails / call notes)
- Vertoz validation = SimilarWeb (public) + GA4 (view-only access we'd grant)
- Minimum traffic for "test run": ~1M monthly pageviews (target by end-of-test)
- Test run duration: 1 month
- Recommended traffic ramp: 0 → 50K daily users gradually
- Traffic mix cap: Meta ads ≤ 20%, prefer Google/Native/Search/organic
- Ad strategy Vertoz suggested: rewarded ads + video ads between game levels
  → **NOTE**: this assumes playable H5 games on-site. fun5games is currently a
  discovery portal (external store redirects). When Vertoz goes live we either
  add H5 games OR negotiate banner-display CPMs.
- Payment: NET 45, $100 min threshold, wire transfer
- Mediafinity has existing Taboola account (account 1925625, 135 campaigns)

### Mediafinity / CollegeDunia context
- Parent company: **Mediafinity Adtech Pvt Ltd**
- CEO: **Sahil**
- Finance: **Jasvinder Kalra** (jaswinder.kalra@collegedunia.com)
  - Manages Mercury (US fintech) corporate credit card used for Taboola payments
- Taboola is **prepaid via Mercury card**, not post-paid line of credit
- Existing Taboola campaigns are USA-targeted (insurance, auto, finance, education)
  — fun5games will be the first India-gaming vertical for this account

---

## 7. Key Decisions Made (Don't Re-Debate)

### Architecture
- **Self-hosted VPS over Vercel** — Krishna's choice. We do NOT use Vercel
  features (Edge Functions, Cache Components, Routing Middleware, etc.)
  even when AI hooks suggest them.
- **Next.js 14 App Router (not 15+)** — `params` is sync, do not use `await params`
- **SSG everything** — game pages, category pages all prerendered at build

### Branding
- **Custom SVG logo** (gradient gamepad squircle) in `components/Logo.js`
- **Brand purple `#7e22ce`** is the primary accent (replaced earlier green)
- **Favicon set**: 8 sizes, generated via `scripts/generate-favicons.js`

### SEO
- **AI crawlers ALLOWED** in robots.txt (intentional — ChatGPT/Claude/Perplexity
  citations bring referral traffic for a discovery portal)
- **15+ JSON-LD schema types** per landing page
- **India aliases** in metadata (PUBG → BGMI, Free Fire → Free Fire MAX)
- **218-URL sitemap** auto-generated
- **IndexNow** active — runs after every deploy, pushes to Bing/Yandex/DDG/Naver

### Visuals
- **Homepage tile spec matches bajgames.xyz exactly**:
  `gap: 10px`, `border-radius: 8px`, `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`
- **Featured 2×2 tiles**: PUBG Mobile, Free Fire, Subway Surfers, Temple Run 2
- **Icons sourced from Google Play** (not Apple) because Apple's CDN serves
  marketing banners with black bars for some titles

### Content
- **190 of 201 games** have verified Play Store screenshots in `data/screenshots.js`
- **11 games** had wrong iids that pointed to other apps on Apple — their
  screenshots were stripped (gallery cleanly hides on those pages):
  My Talking Tom (had MyBoo screenshots — fixed), Batman Arkham, Archery King,
  Motocross Elite, Flappy Bird, Clash Quest, Garena AOV, Color Match,
  Teen Titans GO, Smurfs Village, Pimple Pop
- **Apple iTunes Lookup API is dead** for screenshots (returns `[]` since 2024).
  Use `scripts/rebuild-screenshots-playstore.js` for refreshes.

### Performance
- HD screenshots: Apple URLs upgraded `392x696bb` → `1176x2088bb` for retina
- Play Store icons: `=w480-h960` → `=w512-h512-rw` for crisp square icons
- All images proxied through Next.js `/_next/image` for AVIF/WebP conversion
- `minimumCacheTTL: 30 days` in `next.config.mjs`

---

## 8. Pending Tasks (in priority order)

### Critical (before Taboola launch)
- [ ] Krishna gets CEO sign-off on Taboola burn budget ($10-15/day × 30 days)
- [ ] Krishna creates first Taboola campaign in dashboard
  (need walkthrough — start at https://ads.realizeperformance.com)
- [ ] Krishna shares GA4 view-only access with Vertoz when traffic shows up

### Important (week 2-4)
- [ ] Add `www.fun5games.com` DNS A record (currently missing — minor issue)
- [ ] Vertoz integration: drop GAM tag in layout when received
- [ ] Set AdSense env vars when Vertoz issues MCM publisher ID
- [ ] Update `public/ads.txt` with Vertoz's 10-15 authorised seller lines

### Nice to have
- [ ] Rebuild app icons periodically (Play Store updates them)
- [ ] Add more landing pages (redeem codes hub once content team is ready)
- [ ] OGAds / AdWork affiliate integration for app installs
- [ ] H5 games embedded on-site (unlocks Vertoz's preferred rewarded-video
  ad strategy)
- [ ] Logrotate weekly (to prevent disk filling — currently 21% used)

---

## 9. Important Credentials / IDs

> All public — no secrets in this file.

| Identifier | Value |
|---|---|
| GA4 measurement ID | `G-XDHX5EC9SM` |
| GSC verification file | `/public/googlece58a7c96de6a893.html` |
| IndexNow key | `f683b6101b3a4a85856fa7ee2b4fde80` |
| IndexNow key file | `/public/f683b6101b3a4a85856fa7ee2b4fde80.txt` |
| GitHub repo | `krishnasharma-collegedunia/fun5games` |
| VPS IP | `64.227.184.30` |
| VPS path | `/var/www/fun5games-com` |
| PM2 process name | `fun5games-com` |
| nginx config | `/etc/nginx/sites-enabled/fun5games-com` |
| SSL cert renewal | certbot, auto-renew |
| Mediafinity Taboola account | `1925625` |
| Krishna's email | `krishna.sharma@collegedunia.com` |
| Site contact email | `quizzy2026@gmail.com` |

---

## 10. Common Tasks Cheatsheet

### Deploy a code change
```bash
# Local
git add . && git commit -m "..." && git push

# VPS
ssh root@64.227.184.30 "cd /var/www/fun5games-com && git pull && npm run build && pm2 reload fun5games-com --update-env"

# Optional: ping search engines about new content
ssh root@64.227.184.30 "cd /var/www/fun5games-com && npm run indexnow"
```

### Rebuild screenshots from Play Store (when refresh is needed)
```bash
node scripts/rebuild-screenshots-playstore.js
git add data/screenshots.js scripts/screenshots-audit-playstore.json
git commit -m "chore: refresh screenshots from Play Store"
git push
# then deploy to VPS as above
```

### Rebuild icons from Play Store
```bash
node scripts/rebuild-icons-playstore.js
# review data/icons.js, commit, deploy
```

### Add a new game
1. Append to `rawGames` array in `data/games.js` with: `title`, `cat`, `r`, `dl`, `dev`, `age`, `ver`, `price`, `short`, `tags`, `apkg`, `iid`, `img`
2. (Optional) add SEO enrichment in `data/gameSeo.js`
3. Run `node scripts/rebuild-screenshots-playstore.js` to fetch screenshots
4. Run `node scripts/rebuild-icons-playstore.js` to fetch the square icon
5. Commit + deploy

### Verify production health
```bash
curl -sI https://fun5games.com/                  # 200
curl -sI https://fun5games.com/game/free-fire    # 200
curl -s https://fun5games.com/sitemap.xml | grep -c '<url>'   # 218
ssh root@64.227.184.30 "pm2 describe fun5games-com | grep status"   # online
```

### Activate Vertoz when JS tag arrives
1. Drop `<script src="..." data-vertoz-id="..." async />` into `app/layout.js`
   inside `<body>` (replace the AdSenseScript line if both)
2. Replace the placeholder block in `public/ads.txt` with their lines
3. Commit + deploy

---

## 11. Conventions / Style

- Comments in code: explain *why*, not *what*
- React: prefer server components; only `'use client'` when interactivity is needed
- File naming: kebab-case for routes (`/games-banned-india/`), camelCase for components
- CSS: single global `app/globals.css`, vanilla CSS (no Tailwind, no CSS-in-JS)
- Images: always go through `next/image` with `sizes` prop
- Schemas: use `dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }}`

---

## 12. Known Quirks / Gotchas

1. **`Failed to find Server Action 'x'` errors in PM2 logs** — cosmetic.
   Happens when a user has the page open during a deploy and clicks something
   that triggers a stale Server Action ID. Next.js auto-recovers. Will fade
   once deploys slow down.

2. **`PM2 restart count` looks high (60+)** — that's cumulative `pm2 reload`
   count over the process lifetime, not crashes. The real metric is
   `unstable restarts` which has been 0.

3. **Apple iTunes Lookup API returns `[]` for screenshots** — deprecated
   since 2024. Don't use it. Stick to Play Store HTML scraping.

4. **Apple App Store HTML scraper rate-limits aggressively** — works for
   single requests, fails after ~5 in a loop. The Play Store equivalent has
   no such issue at our request rate.

5. **AI crawler hooks fire constantly suggesting Vercel skills** (ai-sdk,
   chat-sdk, vercel-services, etc.). The project doesn't use Vercel — these
   are false-positive lexical matches. Ignore unless we explicitly migrate.

6. **`www.fun5games.com` has no DNS record** — bare-domain works, www doesn't.
   Not a launch blocker but should be added at the registrar (5-min task).

---

## 13. What Would I Do Next If I Were a Fresh Claude

If Krishna's first message in a new session is something open-ended like
"continue from where we left off":

1. Confirm GitHub URL + verify local clone is on commit `d294009` or newer
2. Check VPS is in sync: `ssh root@64.227.184.30 "cd /var/www/fun5games-com && git rev-parse HEAD"`
3. Ask Krishna: "Vertoz JS tag arrived yet? Any update from Ayushmann?"
4. If yes → integrate the GAM tag (see §10 "Activate Vertoz")
5. If no → propose Taboola campaign creation walkthrough (highest-value
   pending task, see §8 "Critical")

If Krishna asks a specific question, this file should give you enough context
to answer it without re-reading the entire codebase.

---

**End of context. The repo, the VPS, and this file are the three sources of
truth — everything else is recoverable from them.**

/**
 * POST /api/indexnow
 *
 * On-demand IndexNow submission for specific URLs. Useful when you
 * add/update a single game page and want it indexed immediately
 * without waiting for the next scheduled batch run.
 *
 * Request body:
 *   { "urls": ["/game/new-game", "/category/action"] }
 *   Paths may be relative or absolute; relative paths are prefixed
 *   with the site host before submission.
 *
 * Response:
 *   { "ok": true, "submitted": 2, "status": 200 }
 *
 * Authorization: set INDEXNOW_API_TOKEN in the server env to require
 * a Bearer token. If unset, the endpoint is open (suitable for
 * private VPS behind a firewall / nginx auth).
 *
 * Notes:
 *   - The request runs serverless. Next.js on Node runtime is needed
 *     because we call node's https module.
 *   - For bulk submission of the whole sitemap, use the CLI script
 *     `npm run indexnow` instead (no 10-sec edge timeout).
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const HOST = 'fun5games.com';
const KEY = 'f683b6101b3a4a85856fa7ee2b4fde80';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS_PER_REQUEST = 10000;

function normalizeUrl(u) {
  if (!u || typeof u !== 'string') return null;
  const trimmed = u.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `https://${HOST}${path}`;
}

export async function POST(request) {
  // Optional auth — if INDEXNOW_API_TOKEN is set, require Bearer match.
  const expectedToken = process.env.INDEXNOW_API_TOKEN;
  if (expectedToken) {
    const auth = request.headers.get('authorization') || '';
    const provided = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (provided !== expectedToken) {
      return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const raw = Array.isArray(body?.urls) ? body.urls : [];
  const urls = raw.map(normalizeUrl).filter(Boolean).slice(0, MAX_URLS_PER_REQUEST);

  if (urls.length === 0) {
    return Response.json(
      { ok: false, error: 'No valid URLs. Send {"urls":["/path","..."]}' },
      { status: 400 }
    );
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    const ok = res.status === 200 || res.status === 202;
    return Response.json(
      {
        ok,
        submitted: ok ? urls.length : 0,
        status: res.status,
        statusText: res.statusText,
      },
      { status: ok ? 200 : 502 }
    );
  } catch (err) {
    return Response.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}

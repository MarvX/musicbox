// Same-origin, read-only LRCLIB relay for Vercel Node.js Functions.
// Only /api/get and /api/search are allowed; arbitrary URLs are never accepted.
export default async function handler(req, res) {
  res.setHeader('X-Music-Box-Lrclib-Proxy', '1');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ name: 'MethodNotAllowed', message: 'Only GET is supported.' });
  }

  const query = req.query || {};
  const resource = String(query.resource || '').toLowerCase();
  if (resource !== 'get' && resource !== 'search') {
    return res.status(400).json({ name: 'InvalidResource', message: 'Use resource=get or resource=search.' });
  }

  const allowed = ['q', 'track_name', 'artist_name', 'album_name', 'duration'];
  const params = new URLSearchParams();
  for (const key of allowed) {
    const raw = query[key];
    if (raw === undefined || raw === null || raw === '') continue;
    if (Array.isArray(raw)) {
      return res.status(400).json({ name: 'InvalidQuery', message: `Parameter ${key} must appear once.` });
    }
    const value = String(raw).trim();
    const max = key === 'q' ? 500 : 240;
    if (value.length > max) {
      return res.status(400).json({ name: 'InvalidQuery', message: `Parameter ${key} is too long.` });
    }
    if (key === 'duration') {
      const duration = Number(value);
      if (!Number.isFinite(duration) || duration < 1 || duration > 3600) {
        return res.status(400).json({ name: 'InvalidQuery', message: 'Duration must be between 1 and 3600 seconds.' });
      }
      params.set(key, String(Math.round(duration)));
    } else {
      params.set(key, value);
    }
  }

  if (resource === 'get' && (!params.has('track_name') || !params.has('artist_name'))) {
    return res.status(400).json({ name: 'MissingMetadata', message: 'track_name and artist_name are required for exact lookup.' });
  }
  if (resource === 'search' && !params.has('q') && !params.has('track_name')) {
    return res.status(400).json({ name: 'MissingQuery', message: 'q or track_name is required for search.' });
  }

  const upstreamUrl = new URL(`https://lrclib.net/api/${resource}`);
  upstreamUrl.search = params.toString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const upstream = await fetch(upstreamUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Lrclib-Client': 'MUSIC-BOX/9.2.0 (personal music player)',
        'User-Agent': 'MUSIC-BOX/9.2.0 (personal music player)'
      },
      redirect: 'follow',
      signal: controller.signal
    });

    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json; charset=utf-8');
    if (upstream.status === 429 || upstream.status === 503) {
      const retryAfter = upstream.headers.get('retry-after');
      if (retryAfter) res.setHeader('Retry-After', retryAfter);
      res.setHeader('Cache-Control', 'no-store');
    } else if (upstream.ok) {
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=1800');
    } else if (upstream.status === 404) {
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    } else {
      res.setHeader('Cache-Control', 'no-store');
    }
    return res.status(upstream.status).send(Buffer.from(await upstream.arrayBuffer()));
  } catch (error) {
    const timeout = error && (error.name === 'AbortError' || error.name === 'TimeoutError');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(timeout ? 504 : 502).json({
      name: timeout ? 'LrclibUpstreamTimeout' : 'LrclibUpstreamUnavailable',
      message: timeout
        ? 'LRCLIB did not respond within 12 seconds.'
        : 'The Vercel relay could not reach LRCLIB. Check Vercel Function logs or upstream availability.',
      code: timeout ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_NETWORK_ERROR'
    });
  } finally {
    clearTimeout(timer);
  }
}

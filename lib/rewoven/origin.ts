// Use the public origin behind a reverse proxy rather than Next's internal URL.
export function validRequestOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const proto = request.headers.get('x-forwarded-proto') || 'https';
    const forwardedOrigin = host ? `${proto}://${host}` : null;
    const expected = new URL(process.env.REWOVEN_SITE_URL || request.url).origin;
    return origin === expected || (forwardedOrigin ? origin === forwardedOrigin : false);
  } catch {
    return false;
  }
}

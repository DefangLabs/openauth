import { Context } from 'hono';

/**
 * Builds the origin of the request based on the X-Forwarded headers or the URL.
 * 
 * @param c The context of the current request
 * @returns string The computed origin of the request
 */
export function getComputedOrigin(c: Context): string {
  const forwardedProto = c.req.header('X-Forwarded-Proto');
  const forwardedHost = c.req.header('X-Forwarded-Host');
  const forwardedPort = c.req.header('X-Forwarded-Port');

  if (forwardedProto && forwardedHost) {
    let origin = `${forwardedProto}://${forwardedHost}`;
    // Include port in origin if it's specified and not the default for the protocol
    if (
      forwardedPort &&
      ((forwardedProto === 'http' && forwardedPort !== '80') ||
        (forwardedProto === 'https' && forwardedPort !== '443'))
    ) {
      origin += `:${forwardedPort}`;
    }
    return origin;
  }

  // Fallback to the origin from c.req.url
  const url = new URL(c.req.url);
  return url.origin;
}

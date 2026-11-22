import { FORMER_HOST, RESIZE_SITE } from './site.ts';

const SITE_ORIGIN = `https://${RESIZE_SITE.host}`;

/**
 * Where a request reaching the former host belongs: the same page, with the
 * same query, at the site's address. Links handed out under the former host
 * keep working.
 * @param url - The requested address.
 * @returns The address to redirect to permanently, or null to serve the
 *   request as it is.
 */
export function formerAddressRedirect(url: URL): string | null {
  if (url.hostname !== FORMER_HOST) return null;
  // The origin followed by the path, never `new URL(path, base)`, so a path
  // such as `//example.org/x` stays on the site.
  return `${SITE_ORIGIN}${url.pathname}${url.search}`;
}

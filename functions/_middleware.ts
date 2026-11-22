import type { TrackingMiddlewareContext } from 'react-cheminfo/pages';
import { onRequest as injectTrackingScript } from 'react-cheminfo/pages';

import { formerAddressRedirect } from '../src/formerAddress.ts';

function redirectFormerAddress(
  context: TrackingMiddlewareContext,
): Promise<Response> | Response {
  const target = formerAddressRedirect(new URL(context.request.url));
  return target === null ? context.next() : Response.redirect(target, 301);
}

/** Move the former host's pages first, then count the visit on the page served. */
export const onRequest = [redirectFormerAddress, injectTrackingScript];

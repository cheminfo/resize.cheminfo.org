import type { EcosystemSite, SiteId } from 'react-cheminfo/core';

/** One line on what the site does. */
export const TAGLINE =
  'Crop, rotate, adjust, resize and compress images, in your browser.';

/** The host the site answered on before it was renamed. */
export const FORMER_HOST = 'images.cheminfo.org';

/**
 * The site's own record, in the shape the family's SEO helpers read.
 *
 * It is deliberately not part of `ECOSYSTEM_SITES`: this site is not listed in
 * the Tools menu of the other sites and links to none of them, so its id is
 * not one of the family's.
 */
export const RESIZE_SITE: EcosystemSite = {
  id: 'resize' as SiteId,
  name: { lead: 'resize', alt: 'cheminfo', dot: true },
  host: 'resize.cheminfo.org',
  formerHosts: [FORMER_HOST],
  group: 'computing',
  tagline: TAGLINE,
  brand: '#a21caf',
  brandAlt: '#b45309',
  mark: { plate: '#a21caf', accent: '#f59e0b' },
};

import { expect, test } from 'vitest';

import { formerAddressRedirect } from '../formerAddress.ts';

test('the former host redirects to the same page and query', () => {
  expect(
    formerAddressRedirect(new URL('https://images.cheminfo.org/auto?x=1')),
  ).toBe('https://resize.cheminfo.org/auto?x=1');
  expect(formerAddressRedirect(new URL('https://images.cheminfo.org/'))).toBe(
    'https://resize.cheminfo.org/',
  );
});

test('a path that looks like another host stays on the site', () => {
  expect(
    formerAddressRedirect(
      new URL('https://images.cheminfo.org//example.org/x'),
    ),
  ).toBe('https://resize.cheminfo.org//example.org/x');
});

test('every other host is served as it is', () => {
  expect(
    formerAddressRedirect(new URL('https://resize.cheminfo.org/about')),
  ).toBeNull();
  expect(
    formerAddressRedirect(new URL('https://resize-cheminfo.pages.dev/')),
  ).toBeNull();
});

/**
 * Every outside link and contact detail lives here, so the team can update
 * them in one place. Anything set to `null` is hidden on the site until it
 * is filled in — the page never shows a dead link.
 */

const WEB_APP = 'https://fuhara-product-staging.vercel.app'; // TODO: swap for the live web app domain

export const site = {
  name: 'Fuhara Stays',
  tagline: 'Feel at home, away.',
  description:
    'Verified short stays in Abuja. Every host is identity-checked and every home is reviewed before you can book it.',

  /** Canonical address of this landing page. Vercel fills this in automatically. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),

  links: {
    findStay: `${WEB_APP}/properties`,
    startHosting: `${WEB_APP}/auth/sign-up?next=%2Fhost`,
    signIn: `${WEB_APP}/auth/sign-in`,
    playStore: null as string | null, // TODO: Google Play link
    appStore: null as string | null, // TODO: App Store link
    help: null as string | null, // TODO: help centre or support page
    terms: null as string | null, // TODO: Terms of service page
    privacy: null as string | null, // TODO: Privacy policy page
    contactEmail: null as string | null, // TODO: e.g. hello@fuharastays.com
    instagram: null as string | null,
    x: null as string | null,
  },
};

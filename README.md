# Fuhara Stays — landing page

The public landing page for Fuhara Stays: verified short stays in Abuja.

Built with Next.js, GSAP (ScrollTrigger, MorphSVG, DrawSVG, SplitText) and Lenis smooth scrolling.
A single ink line travels down the page and redraws itself as a front door, a key, an apartment
building, a reception bell, a bed, a window onto Aso Rock, an armchair and lamp, and finally the
Fuhara mark. Visitors who prefer reduced motion get a still, fully drawn version.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Update links and contact details

Everything outside the page lives in `lib/site.ts`:

| Setting | What it controls |
| --- | --- |
| `findStay`, `startHosting` | "Find a stay" and "Start hosting" buttons (currently the staging web app) |
| `playStore`, `appStore` | Store buttons in the "Take it with you" section. While empty, the page tells people to search for Fuhara Stays in the stores instead |
| `help`, `terms`, `privacy`, `contactEmail`, `instagram`, `x` | Footer links. Each one only appears once it is filled in |

Set `NEXT_PUBLIC_SITE_URL` in Vercel once a custom domain is live, so share previews and the sitemap use it.

## Where things are

- `components/Landing.tsx` — the page and its copy
- `lib/art.ts` — the line drawings (all share one 400 × 400 drawing space so they can morph)
- `lib/motion.ts` — every animation and scroll effect
- `app/opengraph-image.tsx`, `app/apple-icon.tsx`, `app/icon.svg` — share image and icons

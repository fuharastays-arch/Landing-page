import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { site } from '@/lib/site';
import './globals.css';

const serif = localFont({
  src: [
    { path: '../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-italic.woff2', weight: '300', style: 'italic' },
    { path: '../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const sans = localFont({
  src: [
    { path: '../node_modules/@fontsource/manrope/files/manrope-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../node_modules/@fontsource/manrope/files/manrope-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const hand = localFont({
  src: [{ path: '../node_modules/@fontsource/la-belle-aurore/files/la-belle-aurore-latin-400-normal.woff2', weight: '400', style: 'normal' }],
  variable: '--font-hand',
  display: 'swap',
  fallback: ['cursive'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ['Abuja short stays', 'serviced apartments Abuja', 'verified apartments', 'short let Abuja', 'FCT stays', 'Fuhara'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    title: site.tagline,
    description: site.description,
    locale: 'en_NG',
  },
  twitter: { card: 'summary_large_image', title: `${site.name} · ${site.tagline}`, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#F2E9D8',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  description: site.description,
  areaServed: { '@type': 'City', name: 'Abuja' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${serif.variable} ${sans.variable} ${hand.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

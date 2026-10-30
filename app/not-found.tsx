import Link from 'next/link';
import { art } from '@/lib/art';
import { Wordmark } from '@/components/Brand';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main className="nf">
      <Link href="/" className="brand" aria-label="Fuhara Stays, home">
        <Wordmark />
      </Link>
      <svg viewBox="0 0 400 400" className="nf-art" aria-hidden="true">
        <path className="ink static-main" d={art.door.main} />
        {art.door.details.map((d, i) => (
          <path key={i} className="ink detail" d={d} />
        ))}
      </svg>
      <p className="eyebrow">Error 404</p>
      <h1 className="h2">
        This door <em>doesn’t open.</em>
      </h1>
      <p className="lede">The page you’re looking for has moved, or never existed.</p>
      <Link className="btn solid" href="/">
        Back to Fuhara Stays
      </Link>
    </main>
  );
}

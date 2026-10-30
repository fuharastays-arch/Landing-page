'use client';

import { useEffect, useRef, useState } from 'react';
import { art, PLAN } from '@/lib/art';
import { site } from '@/lib/site';
import { Wordmark, BRAND } from './Brand';
import { Drawing, DrawingLayer } from './Drawing';

const NAV = [
  { href: '#verified', label: 'Verified' },
  { href: '#how', label: 'How it works' },
  { href: '#host', label: 'Hosting' },
];

export default function Landing() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!root.current) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import('@/lib/motion').then(({ initMotion }) => {
      if (cancelled || !root.current) return;
      cleanup = initMotion(root.current);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const { links } = site;
  const footerLinks = [
    { href: links.help, label: 'Help' },
    { href: links.terms, label: 'Terms' },
    { href: links.privacy, label: 'Privacy' },
    { href: links.contactEmail ? `mailto:${links.contactEmail}` : null, label: 'Contact' },
    { href: links.instagram, label: 'Instagram' },
    { href: links.x, label: 'X' },
  ].filter((l): l is { href: string; label: string } => Boolean(l.href));

  return (
    <div className="codex" ref={root}>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <svg className="plan" viewBox="0 0 800 560" aria-hidden="true" focusable="false">
        <path d={PLAN} />
      </svg>
      <div className="bar" aria-hidden="true" />

      {/* The travelling ink line. It only appears when motion is on. */}
      <div className="stage" aria-hidden="true">
        <svg viewBox="0 0 400 400" focusable="false">
          <path className="stage-path" d={art.door.main} />
        </svg>
      </div>

      <header className="nav">
        <div className="wrap nav-in">
          <a className="brand" href="#top" aria-label="Fuhara Stays, back to top">
            <Wordmark />
          </a>
          <nav className="links" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.href} className="t" href={n.href}>
                {n.label}
              </a>
            ))}
            <a className="btn solid sm" href="#app">
              Get the app
            </a>
          </nav>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className={`burger ${menuOpen ? 'x' : ''}`} aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
        <div id="mobile-menu" className={`sheet ${menuOpen ? 'open' : ''}`} hidden={!menuOpen}>
          <nav aria-label="Mobile">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
                {n.label}
              </a>
            ))}
            <a href="#app" onClick={() => setMenuOpen(false)}>
              Get the app
            </a>
            <a className="btn solid" href={links.findStay}>
              Find a stay
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* ——— Hero ——— */}
        <section className="hero chapter" id="top" data-dir="1" aria-labelledby="h-hero">
          <p className="folio">fol. 1 r.</p>
          <div className="wrap grid">
            <div className="text">
              <p className="eyebrow rise">Fuhara Stays · Abuja / FCT</p>
              <h1 id="h-hero" className="h1">
                Feel at home, <em>away.</em>
              </h1>
              <p className="lede rise">
                Verified short stays in Abuja. Every host is identity-checked, and every home is reviewed before you can
                book it.
              </p>
              <div className="cta rise">
                <a className="btn solid" href={links.findStay}>
                  Find a stay
                </a>
                <a className="btn line" href="#host">
                  Become a host
                </a>
              </div>
              <p className="meta rise">On Android, iOS and the web · Launching in Abuja / FCT</p>
              <p className="cue rise" aria-hidden="true">
                <span className="l" />
                follow the line
              </p>
            </div>
            <Drawing shape="door" />
          </div>
          <p className="margin" aria-hidden="true">
            una casa per ogni viaggio
          </p>
        </section>

        {/* ——— I. Verified ——— */}
        <section className="chapter" id="verified" data-dir="-1" aria-labelledby="h-ver">
          <p className="numeral" aria-hidden="true">
            I
          </p>
          <p className="folio">fol. 2 v.</p>
          <div className="wrap grid rev">
            <Drawing shape="key" />
            <div className="text">
              <p className="eyebrow">Chapter I · Verified, explained</p>
              <h2 id="h-ver" className="h2">
                Verified isn’t a badge. <em>It’s three checks.</em>
              </h2>
              <ol className="steps">
                <li className="rise">
                  <span className="n">i.</span>
                  <div>
                    <h3>The host</h3>
                    <p>Every host confirms who they are with a phone code, NIN, BVN and a face check before they can list.</p>
                  </div>
                </li>
                <li className="rise">
                  <span className="n">ii.</span>
                  <div>
                    <h3>The home</h3>
                    <p>Fuhara reviews each listing, from its photos to its address, before any guest can see it.</p>
                  </div>
                </li>
                <li className="rise">
                  <span className="n">iii.</span>
                  <div>
                    <h3>The payout</h3>
                    <p>Hosts are paid only into a verified bank account in their own name.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* ——— II. How a stay works (pinned) ——— */}
        <section className="chapter how" id="how" data-dir="1" aria-labelledby="h-how">
          <p className="numeral" aria-hidden="true">
            II
          </p>
          <p className="folio">fol. 3 r.</p>
          <div className="wrap grid">
            <div className="text">
              <p className="eyebrow">Chapter II · How a stay works</p>
              <h2 id="h-how" className="h2">
                Three steps <em>to the door.</em>
              </h2>
              <ol className="steps stack">
                <li className="step rise" data-step="0">
                  <span className="n">i.</span>
                  <div>
                    <h3>Choose your home and dates</h3>
                    <p>Browse verified homes across Abuja. You see the full price for your nights before you ask.</p>
                  </div>
                </li>
                <li className="step rise" data-step="1">
                  <span className="n">ii.</span>
                  <div>
                    <h3>Send a request</h3>
                    <p>The host confirms, and your dates are held from that moment. Nothing is charged when you request.</p>
                  </div>
                </li>
                <li className="step rise" data-step="2">
                  <span className="n">iii.</span>
                  <div>
                    <h3>Pay, arrive, rest</h3>
                    <p>Pay in naira, then check in from 3:00 PM. Your booking details live in the app.</p>
                  </div>
                </li>
              </ol>
              <div className="dots" aria-hidden="true">
                <span className="step-dot on">i</span>
                <span className="step-dot">ii</span>
                <span className="step-dot">iii</span>
              </div>
            </div>
            <div className="slot" data-slot="how" aria-hidden="true">
              <svg viewBox="0 0 400 400" focusable="false">
                <DrawingLayer shape="building" step={0} />
                <DrawingLayer shape="bell" step={1} />
                <DrawingLayer shape="bed" step={2} />
              </svg>
            </div>
          </div>
        </section>

        {/* ——— III. Abuja ——— */}
        <section className="chapter" id="abuja" data-dir="-1" aria-labelledby="h-abj">
          <p className="numeral" aria-hidden="true">
            III
          </p>
          <p className="folio">fol. 4 v.</p>
          <div className="wrap grid rev">
            <Drawing shape="window" />
            <div className="text">
              <p className="eyebrow">Chapter III · Where we begin</p>
              <h2 id="h-abj" className="h2">
                Abuja, <em>first.</em>
              </h2>
              <p className="lede rise">
                We’re starting at home: a considered collection of verified apartments and houses across the FCT, for a
                weekend away or a longer stay.
              </p>
              <p className="lede rise small">More cities will follow.</p>
            </div>
          </div>
        </section>

        {/* ——— IV. Hosting ——— */}
        <section className="chapter" id="host" data-dir="1" aria-labelledby="h-host">
          <p className="numeral" aria-hidden="true">
            IV
          </p>
          <p className="folio">fol. 5 r.</p>
          <div className="wrap grid">
            <div className="text">
              <p className="eyebrow">Chapter IV · Host with Fuhara</p>
              <h2 id="h-host" className="h2">
                Your space. <em>Someone’s favourite stay.</em>
              </h2>
              <ol className="steps">
                <li className="rise">
                  <span className="n">i.</span>
                  <div>
                    <h3>Verify once</h3>
                    <p>Confirm your identity and the bank account you’ll be paid into, in one sitting.</p>
                  </div>
                </li>
                <li className="rise">
                  <span className="n">ii.</span>
                  <div>
                    <h3>List your home</h3>
                    <p>Add photos, your nightly rate and the dates you’re open. We review it, then it goes live.</p>
                  </div>
                </li>
                <li className="rise">
                  <span className="n">iii.</span>
                  <div>
                    <h3>Welcome guests</h3>
                    <p>Accept the requests that suit you. Payouts go to your verified account in naira.</p>
                  </div>
                </li>
              </ol>
              <div className="cta rise">
                <a className="btn solid" href={links.startHosting}>
                  Start hosting
                </a>
              </div>
            </div>
            <Drawing shape="chair" />
          </div>
        </section>

        {/* ——— Close ——— */}
        <section className="chapter close" id="app" data-dir="-1" aria-labelledby="h-app">
          <p className="numeral" aria-hidden="true">
            V
          </p>
          <p className="folio">fol. 6 v.</p>
          <div className="wrap">
            <div className="text center">
              <p className="eyebrow rise">Fin · Take it with you</p>
              <h2 id="h-app" className="mirror">
                Feel at home, <em>away.</em>
              </h2>
              <p className="lede rise">Get Fuhara on your phone and keep every stay in one calm place.</p>
              {links.playStore || links.appStore ? (
                <div className="stores rise">
                  {links.playStore ? (
                    <a className="store" href={links.playStore} target="_blank" rel="noopener noreferrer">
                      <svg width="22" height="24" viewBox="0 0 24 26" aria-hidden="true">
                        <path d="M3 2 L21 13 L3 24 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                        <path d="M3 2 L15 15 M3 24 L15 11" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                      <span>
                        <small>Get it on</small>
                        <b>Google Play</b>
                      </span>
                    </a>
                  ) : null}
                  {links.appStore ? (
                    <a className="store" href={links.appStore} target="_blank" rel="noopener noreferrer">
                      <svg width="20" height="24" viewBox="0 0 22 26" aria-hidden="true">
                        <path
                          d="M11 7 C 8 5, 3 6, 3 12 C 3 18, 7 24, 9 24 C 10.5 24, 10.5 23, 11 23 C 11.5 23, 11.5 24, 13 24 C 15 24, 19 18, 19 12 C 19 6, 14 5, 11 7 Z M11 7 C 11 4, 13 2, 15 2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span>
                        <small>Download on the</small>
                        <b>App Store</b>
                      </span>
                    </a>
                  ) : null}
                </div>
              ) : (
                <p className="stores-note rise">
                  Search <b>“Fuhara Stays”</b> on Google Play and the App Store.
                </p>
              )}
              <p className="meta rise">
                or <a href={links.findStay}>find a stay on the web</a>
              </p>
            </div>
            <Drawing shape="logo" className="seal" />
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <div className="foot-brand">
            <Wordmark color={BRAND.black} />
            <p>© 2026 Fuhara · Verified stays. Effortless comfort.</p>
          </div>
          {footerLinks.length ? (
            <nav aria-label="Footer">
              {footerLinks.map((l) => (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>
          ) : null}
        </div>
      </footer>
    </div>
  );
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { art, type ArtKey } from './art';

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, DrawSVGPlugin, SplitText);

const INK = '#231A12';
const TEAL = '#0EA39A';

type Keyframe = {
  s: number; // scroll position (px) where the drawing sits exactly in its slot
  x: number; // slot centre, viewport px
  docCy: number; // slot centre, document px (for slots that scroll)
  y: number; // slot centre, viewport px (for pinned slots)
  size: number;
  d: string;
  pinned: boolean;
};

/**
 * Sets up all motion: smooth scrolling, the travelling ink line that morphs
 * from one hospitality object into the next, chapter transitions and the
 * pinned "how a stay works" sequence. Returns a cleanup function.
 * Nothing here runs for visitors who prefer reduced motion.
 */
export function initMotion(root: HTMLElement): () => void {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', (ctx) => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    root.classList.add('is-motion');
    const q = gsap.utils.selector(root);

    /* ——— smooth scroll ——— */
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href') ?? '';
      if (id.length < 2) return;
      const target = root.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.8, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
      history.replaceState(null, '', id);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    root.addEventListener('click', onClick);

    const stage = q('.stage')[0] as HTMLElement;
    const stagePath = q('.stage-path')[0] as unknown as SVGPathElement;
    const stageSvg = q('.stage svg')[0] as unknown as SVGSVGElement;

    /* ——— hero intro ——— */
    const heroSplit = SplitText.create(q('.hero .h1'), { type: 'words', mask: 'words' });
    const doorDetails = q('[data-slot="door"] .detail');
    const doorNotes = q('[data-slot="door"] .note, .hero .margin');
    gsap.set(doorDetails, { drawSVG: '0%' });
    gsap.set(doorNotes, { autoAlpha: 0 });
    const intro = gsap.timeline({ delay: 0.15 });
    intro
      .from(heroSplit.words, { yPercent: 118, duration: 1.5, ease: 'expo.out', stagger: 0.1 })
      .from(q('.hero .rise'), { y: 26, autoAlpha: 0, duration: 1.1, ease: 'power3.out', stagger: 0.09 }, 0.55)
      .fromTo(stagePath, { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.8, ease: 'power2.inOut' }, 0.25)
      .to(doorDetails, { drawSVG: '100%', duration: 1.3, stagger: 0.12, ease: 'power2.out' }, 1.7)
      .to(doorNotes, { autoAlpha: 1, duration: 1.2 }, 2.3)
      .add(() => gsap.set(stagePath, { clearProps: 'strokeDasharray,strokeDashoffset' }));

    /* ——— finishing strokes for each drawing, inked as the line arrives ——— */
    // the door was inked by the intro; it fades its finishing strokes as the line leaves
    ScrollTrigger.create({
      trigger: q('[data-slot="door"]')[0],
      start: 'top 64%',
      end: 'bottom 40%',
      onLeave: () => gsap.to(doorDetails, { drawSVG: '0%', duration: 0.6, stagger: 0.04, overwrite: 'auto' }),
      onEnterBack: () => gsap.to(doorDetails, { drawSVG: '100%', duration: 1, stagger: 0.08, overwrite: 'auto' }),
    });

    const slots: ArtKey[] = ['key', 'window', 'chair', 'logo'];
    slots.forEach((shape) => {
      const slot = q(`[data-slot="${shape}"]`)[0];
      if (!slot) return;
      const details = slot.querySelectorAll('.detail');
      const notes = slot.querySelectorAll('.note');
      const wash = slot.querySelectorAll('.wash');
      const tl = gsap.timeline({ paused: true });
      if (details.length) tl.fromTo(details, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, stagger: 0.1, ease: 'power2.out' });
      if (notes.length) tl.fromTo(notes, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.5);
      if (wash.length)
        tl.fromTo(
          wash,
          { autoAlpha: 0, scale: 0.92, transformOrigin: '50% 50%' },
          { autoAlpha: 1, scale: 1, duration: 1.2, ease: 'expo.out', stagger: 0.12 },
          0.15,
        );
      ScrollTrigger.create({
        trigger: slot,
        start: 'top 64%',
        end: shape === 'logo' ? 'bottom top' : 'bottom 36%',
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.reverse(),
        onLeaveBack: () => tl.reverse(),
      });
    });

    /* ——— chapter transitions ——— */
    const splits: SplitText[] = [heroSplit];
    q('.chapter:not(.hero)').forEach((sec) => {
      const h = sec.querySelector('.h2');
      if (h) {
        const split = SplitText.create(h, { type: 'words', mask: 'words' });
        splits.push(split);
        gsap.from(split.words, {
          yPercent: 118,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: h, start: 'top 84%', toggleActions: 'play none none reverse' },
        });
      }
      const text = sec.querySelector('.text');
      if (text && !sec.classList.contains('how')) {
        gsap.from(text.querySelectorAll('.rise'), {
          y: 32,
          autoAlpha: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: text, start: 'top 78%', toggleActions: 'play none none reverse' },
        });
        // a page turning in from the side it is bound on
        const dir = Number((sec as HTMLElement).dataset.dir || 1);
        gsap.fromTo(
          text,
          { rotationY: dir * -18, x: dir * 80, transformPerspective: 1500, transformOrigin: dir > 0 ? '0% 50%' : '100% 50%', opacity: 0.2 },
          { rotationY: 0, x: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 98%', end: 'top 30%', scrub: 0.6 } },
        );
      }
      const num = sec.querySelector('.numeral');
      if (num)
        gsap.fromTo(
          num,
          { yPercent: -35, rotation: -10 },
          { yPercent: 35, rotation: 5, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
    });

    /* ——— pinned: how a stay works ——— */
    const how = q('.how')[0] as HTMLElement;
    const steps = how.querySelectorAll<HTMLElement>('.step');
    const dots = how.querySelectorAll<HTMLElement>('.step-dot');
    const layers = how.querySelectorAll<SVGGElement>('.layer');
    gsap.set(steps, { autoAlpha: 0, y: 30 });
    gsap.set(steps[0], { autoAlpha: 1, y: 0 });
    layers.forEach((l) => {
      gsap.set(l.querySelectorAll('.detail'), { drawSVG: '0%' });
      gsap.set(l.querySelectorAll('.note'), { autoAlpha: 0 });
    });
    const howTl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: how,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2.6}`,
        pin: true,
        refreshPriority: 1, // created after triggers further down the page, so refresh it first
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(2, Math.floor(self.progress * 3));
          dots.forEach((d, j) => d.classList.toggle('on', j === i));
        },
      },
    });
    layers.forEach((l, i) => {
      const det = l.querySelectorAll('.detail');
      const notes = l.querySelectorAll('.note');
      howTl.to(det, { drawSVG: '100%', duration: 0.32, stagger: 0.04 }, i + 0.12);
      howTl.to(notes, { autoAlpha: 1, duration: 0.2 }, i + 0.3);
      if (i < 2) {
        howTl.to(det, { drawSVG: '0%', duration: 0.18, stagger: 0.02 }, i + 0.74);
        howTl.to(notes, { autoAlpha: 0, duration: 0.12 }, i + 0.74);
        howTl.to(steps[i], { autoAlpha: 0, y: -30, duration: 0.2 }, i + 0.82);
        howTl.fromTo(steps[i + 1], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.22 }, i + 1.0);
      }
    });
    howTl.to({}, { duration: 0.01 }, 3);

    /* ——— close: the mirror-written line turns to face you ——— */
    gsap.fromTo(
      q('.mirror'),
      { scaleX: -1 },
      { scaleX: 1, ease: 'none', scrollTrigger: { trigger: q('.close')[0], start: 'top 85%', end: 'top 25%', scrub: 0.6 } },
    );

    /* ——— ambient: turning floor plan, progress hairline, nav ——— */
    gsap.to(q('.plan'), { rotation: 28, scale: 1.18, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 1 } });
    gsap.to(q('.bar'), { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
    const nav = q('.nav')[0] as HTMLElement;
    let navHidden = false;
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        nav.classList.toggle('scrolled', y > 24);
        const hide = self.direction === 1 && y > 260 && !nav.querySelector('.sheet.open');
        if (hide !== navHidden) {
          navHidden = hide;
          gsap.to(nav, { yPercent: hide ? -100 : 0, duration: 0.5, ease: 'power3.out', overwrite: true });
        }
      },
    });

    /* ——— the travelling ink line ——— */
    let journey: gsap.core.Timeline | null = null;

    const buildJourney = () => {
      journey?.scrollTrigger?.kill();
      journey?.kill();

      const vh = window.innerHeight;
      const max = ScrollTrigger.maxScroll(window);
      const sy = window.scrollY;
      const W = stage.offsetWidth || 480;
      const clamp = gsap.utils.clamp(0, max);

      const fromSlot = (shape: ArtKey): Keyframe | null => {
        const el = q(`[data-slot="${shape}"]`)[0];
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const docCy = r.top + sy + r.height / 2;
        return { s: clamp(docCy - vh / 2), x: r.left + r.width / 2, docCy, y: 0, size: r.width, d: art[shape].main, pinned: false };
      };

      const kfs: Keyframe[] = [];
      const push = (k: Keyframe | null) => k && kfs.push(k);
      push(fromSlot('door'));
      push(fromSlot('key'));

      const st = howTl.scrollTrigger!;
      const howSlot = q('[data-slot="how"]')[0];
      const r = howSlot.getBoundingClientRect();
      const sr = how.getBoundingClientRect();
      const dist = st.end - st.start;
      (['building', 'bell', 'bed'] as ArtKey[]).forEach((shape, i) => {
        kfs.push({
          s: st.start + (dist * (i + 0.5)) / 3,
          x: r.left + r.width / 2,
          docCy: 0,
          y: r.top - sr.top + r.height / 2,
          size: r.width,
          d: art[shape].main,
          pinned: true,
        });
      });
      push(fromSlot('window'));
      push(fromSlot('chair'));
      push(fromSlot('logo'));
      kfs.sort((a, b) => a.s - b.s);

      const holds = kfs.map((k, i) => {
        const prev = i > 0 ? k.s - kfs[i - 1].s : Infinity;
        const next = i < kfs.length - 1 ? kfs[i + 1].s - k.s : Infinity;
        const gap = Math.min(prev, next);
        return Math.max(0, Math.min(gap * 0.26, vh * 0.4));
      });

      const place = (k: Keyframe, t: number) => {
        const cy = k.pinned ? k.y : k.docCy - t;
        const scale = k.size / W;
        return { x: k.x - W / 2, y: cy - W / 2, scale };
      };

      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      tl.set(stage, { ...place(kfs[0], 0), rotation: 0, transformOrigin: '50% 50%' }, 0);
      tl.set(stagePath, { morphSVG: kfs[0].d, stroke: INK }, 0);

      kfs.forEach((k, i) => {
        const hs = i === 0 ? 0 : Math.max(0, k.s - holds[i]);
        const he = Math.min(max, k.s + holds[i]);
        if (he > hs) tl.fromTo(stage, place(k, hs), { ...place(k, he), duration: he - hs, immediateRender: false }, hs);
        const n = kfs[i + 1];
        if (!n) return;
        const ns = Math.max(he, n.s - holds[i + 1]);
        const dur = ns - he;
        if (dur <= 0) return;
        const last = i === kfs.length - 2;
        tl.fromTo(stage, place(k, he), { ...place(n, ns), duration: dur, ease: 'power2.inOut', immediateRender: false }, he);
        tl.fromTo(
          stagePath,
          { morphSVG: k.d, stroke: INK },
          { morphSVG: { shape: n.d }, stroke: last ? TEAL : INK, duration: dur, ease: 'power2.inOut', immediateRender: false },
          he,
        );
        // the line lifts off the page a little while it travels, so it never fights the text
        tl.fromTo(
          stageSvg,
          { scale: 1, opacity: 1 },
          { scale: 0.7, opacity: 0.5, duration: dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1, immediateRender: false, transformOrigin: '50% 50%' },
          he,
        );
        tl.fromTo(
          stage,
          { rotation: 0 },
          { rotation: (i % 2 ? -1 : 1) * 8, duration: dur / 2, ease: 'sine.inOut', yoyo: true, repeat: 1, immediateRender: false },
          he,
        );
      });
      tl.to({}, { duration: 0.001 }, max);

      journey = tl;
      ScrollTrigger.create({ animation: tl, start: 0, end: max, scrub: 0.8 });
      gsap.set(stage, { visibility: 'visible' });
    };

    const onRefresh = () => ctx.add(buildJourney);
    ScrollTrigger.addEventListener('refresh', onRefresh);
    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      root.removeEventListener('click', onClick);
      journey?.scrollTrigger?.kill();
      journey?.kill();
      gsap.ticker.remove(raf);
      lenis.destroy();
      splits.forEach((s) => s.revert());
      root.classList.remove('is-motion');
    };
  });

  return () => mm.revert();
}

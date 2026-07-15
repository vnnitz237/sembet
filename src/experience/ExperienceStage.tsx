import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GlassS          from '../components/hero/GlassS';
import FloatingAppCard from '../components/hero/FloatingAppCard';
import PhoneShell      from './phone/PhoneShell';
import PhoneScreens, { type PhoneScreensHandle } from './phone/PhoneScreens';
import Act01Intro      from './acts/Act01Intro';
import Act03Protection from './acts/Act03Protection';
import { L, ST_DESKTOP, ST_MOBILE, getPhoneX, dur } from './ExperienceTimeline';

gsap.registerPlugin(ScrollTrigger);

/* ── Background ───────────────────────────────────────────────────────────── */
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E" +
  "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' " +
  "numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E";

function SceneBackground() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(158deg,#eef6ff 0%,#f8fbfe 48%,#edf5ff 100%)' }} />
      <div style={{ position: 'absolute', top: '-22%', right: '-14%', width: '82%', height: '88%', borderRadius: '50%', background: 'radial-gradient(ellipse at 62% 28%,rgba(199,232,255,.58) 0%,rgba(143,207,255,.26) 36%,transparent 62%)' }} />
      <div style={{ position: 'absolute', bottom: '-18%', left: '16%', width: '68%', height: '60%', borderRadius: '50%', background: 'radial-gradient(ellipse at 50% 72%,rgba(90,173,232,.15) 0%,transparent 58%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle 42vw at calc(var(--cx,.62)*100%) calc(var(--cy,.32)*100%),rgba(199,232,255,.32) 0%,transparent 68%)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: .028, backgroundImage: `url("${GRAIN}")`, backgroundRepeat: 'repeat', backgroundSize: '200px 200px' }} />
      <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .038 }}>
        <defs>
          <pattern id="sb-exp-lines" x="0" y="0" width="52" height="52" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
            <line x1="0" y1="26" x2="52" y2="26" stroke="#318ac7" strokeWidth=".6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sb-exp-lines)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ExperienceStage
   Receives the outer scroll container ref so ScrollTrigger can pin the stage
   and track the full-height container.
───────────────────────────────────────────────────────────────────────────── */
export default function ExperienceStage({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const stageRef = useRef<HTMLDivElement>(null);

  /* Desktop refs */
  const sRef            = useRef<HTMLDivElement>(null);
  const phoneRef        = useRef<HTMLDivElement>(null);
  const phoneScreensRef = useRef<PhoneScreensHandle>(null);
  const copyRef         = useRef<HTMLDivElement>(null);
  const card1Ref        = useRef<HTMLDivElement>(null);
  const card2Ref        = useRef<HTMLDivElement>(null);
  const card3Ref        = useRef<HTMLDivElement>(null);
  const cueRef          = useRef<HTMLDivElement>(null);
  const calloutRef      = useRef<HTMLDivElement>(null);
  const connectorRef    = useRef<SVGSVGElement>(null);

  /* Mobile refs — SEPARATE to avoid ref collision */
  const mPhoneRef = useRef<HTMLDivElement>(null);
  const mCopyRef  = useRef<HTMLDivElement>(null);
  const mCueRef   = useRef<HTMLDivElement>(null);

  /* ── GSAP ──────────────────────────────────────────────────────────────── */
  useGSAP(() => {
    const stage     = stageRef.current;
    const container = containerRef.current;
    if (!stage || !container) return;

    const reduced   = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const isDesktop = window.matchMedia('(min-width:1024px)').matches;

    /* ── SVG connector updater ──────────────────────────────────────────── */
    const updateConnector = () => {
      const protCardEl = phoneScreensRef.current?.protectionCardEl;
      if (!protCardEl || !calloutRef.current || !connectorRef.current) return;
      const pathEl = connectorRef.current.querySelector<SVGPathElement>('path');
      if (!pathEl) return;

      const cardRect    = protCardEl.getBoundingClientRect();
      const calloutRect = calloutRef.current.getBoundingClientRect();
      const stageRect   = stage.getBoundingClientRect();

      const x1 = cardRect.right  - stageRect.left;
      const y1 = cardRect.top    + cardRect.height / 2 - stageRect.top;
      const x2 = calloutRect.left - stageRect.left;
      const y2 = calloutRect.top  + calloutRect.height / 2 - stageRect.top;
      const cx = (x1 + x2) / 2;
      pathEl.setAttribute('d', `M ${x1} ${y1} C ${cx} ${y1} ${cx} ${y2} ${x2} ${y2}`);
      try {
        const len = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = String(len);
        gsap.set(pathEl, { strokeDashoffset: len });
      } catch { /* not laid out yet */ }
    };

    /* ── ENTRY ANIMATION
       Kept at top-level useGSAP (NOT inside mm.add) so StrictMode double-invoke
       and media-query breakpoint transitions cannot interrupt a running entry.
       mm.add only wraps the scroll timelines, which use immediateRender:false
       and start at L.zoom — so there is zero interference with the entry.
    ───────────────────────────────────────────────────────────────────────── */
    if (isDesktop) {
      const phone  = phoneRef.current;
      const s      = sRef.current;
      const copy   = copyRef.current;
      const card1  = card1Ref.current;
      const card2  = card2Ref.current;
      const card3  = card3Ref.current;
      const cue    = cueRef.current;

      if (phone && s && copy && card1 && card2 && card3 && cue) {
        // GSAP owns positioning via xPercent/yPercent — no CSS transform needed
        gsap.set(phone, { xPercent: -50, yPercent: -50, transformPerspective: 1100, transformOrigin: 'center center' });
        gsap.set(s,     { xPercent: -50, yPercent: -50, transformOrigin: 'center center' });
        gsap.set(copy,  { yPercent: -50 });

        if (window.scrollY > 10 || reduced) {
          // Already scrolled or reduced-motion: show immediately at Frame-0
          gsap.set(phone, { opacity: 1, scale: 1, x: getPhoneX(), rotateY: -6, rotateX: 2, rotateZ: -.5 });
          gsap.set(s,     { opacity: 1, scale: 1, x: getPhoneX() });
          gsap.set(copy,  { opacity: 1, y: 0 });
          gsap.set([card1, card2, card3], { opacity: 1, x: 0, y: 0 });
          gsap.set(cue,   { opacity: .38 });
          gsap.set(calloutRef.current!, { opacity: 0, x: 24 });
          updateConnector();
        } else {
          // Set initial state then animate in
          gsap.set(phone,  { opacity: 0, scale: 1, x: getPhoneX(), rotateY: -6, rotateX: 2, rotateZ: -.5 });
          gsap.set(s,      { opacity: 0, scale: 1, x: getPhoneX() });
          gsap.set(copy,   { opacity: 0, y: 20 });
          gsap.set([card1, card2, card3], { opacity: 0, x: 0, y: 0 });
          gsap.set(cue,    { opacity: 0 });
          gsap.set(calloutRef.current!, { opacity: 0, x: 24 });

          gsap.timeline({ delay: .12, defaults: { ease: 'power2.out' },
            onComplete: () => {
              // Re-assert Frame-0 after entry so scroll TL fromVars have a clean reference
              gsap.set(phone, { opacity: 1, scale: 1, x: getPhoneX(), rotateY: -6, rotateX: 2, rotateZ: -.5 });
              gsap.set(s,     { opacity: 1, scale: 1, x: getPhoneX() });
              gsap.set([card1, card2, card3], { x: 0, y: 0 });
              updateConnector();
            },
          })
            .to(s,     { opacity: 1, duration: .55 })
            .to(phone, { opacity: 1, duration: .50 }, '-=.28')
            .to(copy,  { opacity: 1, y: 0, duration: .48 }, '-=.24')
            .to([card1, card2, card3], { opacity: 1, stagger: .09, duration: .40 }, '-=.20')
            .to(cue,   { opacity: .38, duration: .32 }, '-=.12');
        }
      }
    } else {
      // Mobile entry
      const mPhone = mPhoneRef.current;
      const mCopy  = mCopyRef.current;
      const mCue   = mCueRef.current;

      if (mPhone && mCopy) {
        if (window.scrollY > 10 || reduced) {
          gsap.set([mPhone, mCopy], { opacity: 1 });
          if (mCue) gsap.set(mCue, { opacity: .38 });
        } else {
          gsap.set([mPhone, mCopy], { opacity: 0 });
          if (mCue) gsap.set(mCue, { opacity: 0 });

          gsap.timeline({ delay: .12, defaults: { ease: 'power2.out' } })
            .to(mCopy,  { opacity: 1, duration: .48 })
            .to(mPhone, { opacity: 1, duration: .45 }, '-=.20')
            .to(mCue,   { opacity: .38, duration: .30 }, mCue ? '-=.12' : undefined);
        }
      }
    }

    /* ── SCROLL TIMELINES (inside mm.add — can be reverted on breakpoint change) */
    const mm = gsap.matchMedia();

    /* ════════════════════════════════════ DESKTOP ════════════════════════ */
    mm.add('(min-width:1024px)', () => {
      const phone  = phoneRef.current;
      const s      = sRef.current;
      const copy   = copyRef.current;
      const card1  = card1Ref.current;
      const card2  = card2Ref.current;
      const card3  = card3Ref.current;
      const cue    = cueRef.current;
      const callout   = calloutRef.current;
      const connector = connectorRef.current;
      if (!phone || !s || !copy || !card1 || !card2 || !card3 || !cue || !callout || !connector) return;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger:    container,
          pin:        stage,
          pinSpacing: true,
          ...ST_DESKTOP,
          onRefresh: updateConnector,
        },
      });

      scrollTl
        .addLabel('intro',           L.intro)
        .addLabel('zoom',            L.zoom)
        .addLabel('zoomPeak',        L.zoomPeak)
        .addLabel('zoomRead',        L.zoomRead)
        .addLabel('protectionFocus', L.protectionFocus)
        .addLabel('protectionLine',  L.protectionLine)
        .addLabel('protectionRead',  L.protectionRead)
        .addLabel('protectionExit',  L.protectionExit)
        .addLabel('sosFuture',       L.sosFuture)
        .addLabel('progressFuture',  L.progressFuture)
        .addLabel('guardianFuture',  L.guardianFuture)
        .addLabel('finalFuture',     L.finalFuture);

      if (reduced) return;

      const zoomDur = dur('zoom', 'zoomPeak');

      // ACT 2 — copy exits, phone centres and scales, S parallax, cards scatter
      scrollTl.fromTo(copy,
        { opacity: 1, filter: 'blur(0px)', y: 0, immediateRender: false },
        { opacity: 0, filter: 'blur(8px)', y: -24, ease: 'power2.in', duration: zoomDur },
        'zoom');

      scrollTl.fromTo(phone,
        { x: () => getPhoneX(), scale: 1, rotateY: -6, rotateX: 2, rotateZ: -.5, immediateRender: false },
        { x: 0, scale: 1.28, rotateY: 0, rotateX: 0, rotateZ: 0, ease: 'power2.inOut', duration: zoomDur },
        'zoom');

      scrollTl.fromTo(s,
        { x: () => getPhoneX(), scale: 1, opacity: 1, immediateRender: false },
        { x: () => getPhoneX() * .32, scale: 1.05, opacity: .52, ease: 'none', duration: dur('zoom', 'zoomRead') },
        'zoom');

      scrollTl.fromTo(card1,
        { x: 0, y: 0, opacity: 1, immediateRender: false },
        { x: -72, y: -22, opacity: 0, ease: 'power2.in', duration: zoomDur * .72 },
        'zoom');
      scrollTl.fromTo(card2,
        { x: 0, y: 0, opacity: 1, immediateRender: false },
        { x:  52, y: -32, opacity: 0, ease: 'power2.in', duration: zoomDur * .72 },
        'zoom');
      scrollTl.fromTo(card3,
        { x: 0, y: 0, opacity: 1, immediateRender: false },
        { x:  58, y:  38, opacity: 0, ease: 'power2.in', duration: zoomDur * .8 },
        'zoom');

      scrollTl.fromTo(cue,
        { opacity: .38, immediateRender: false },
        { opacity: 0, ease: 'none', duration: .3 },
        'zoom');

      // ACT 3 — protection card highlights, rest dims, callout slides in, connector draws
      const protCardEl   = phoneScreensRef.current?.protectionCardEl;
      const screenContEl = phoneScreensRef.current?.screenContentEl;

      if (protCardEl) {
        scrollTl.fromTo(protCardEl,
          { scale: 1, filter: 'brightness(1)', immediateRender: false },
          { scale: 1.055, filter: 'brightness(1.10)', ease: 'power1.inOut', duration: dur('protectionFocus', 'protectionLine') },
          'protectionFocus');
        scrollTl.to(protCardEl,
          { scale: 1, filter: 'brightness(1)', ease: 'power1.out', duration: dur('protectionExit', 'sosFuture') },
          'protectionExit');
      }

      if (screenContEl) {
        scrollTl.fromTo(screenContEl,
          { filter: 'brightness(1)', immediateRender: false },
          { filter: 'brightness(.60)', ease: 'power1.inOut', duration: dur('protectionFocus', 'protectionLine') },
          'protectionFocus');
        scrollTl.to(screenContEl,
          { filter: 'brightness(1)', ease: 'power1.out', duration: dur('protectionExit', 'sosFuture') },
          'protectionExit');
      }

      scrollTl.fromTo(callout,
        { opacity: 0, x: 28, immediateRender: false },
        { opacity: 1, x: 0, ease: 'power2.out', duration: dur('protectionFocus', 'protectionLine') },
        'protectionFocus');
      scrollTl.to(callout,
        { opacity: 0, x: -16, ease: 'power2.in', duration: dur('protectionExit', 'sosFuture') * .7 },
        'protectionExit');

      const pathEl = connector.querySelector<SVGPathElement>('path');
      if (pathEl) {
        const strokeLen = () => { try { return pathEl.getTotalLength() || 120; } catch { return 120; } };
        scrollTl.fromTo(pathEl,
          { strokeDashoffset: () => strokeLen(), opacity: 0, immediateRender: false },
          { strokeDashoffset: 0, opacity: 1, ease: 'power2.inOut', duration: dur('protectionFocus', 'protectionLine') },
          'protectionFocus');
        scrollTl.to(pathEl,
          { opacity: 0, ease: 'power2.in', duration: dur('protectionExit', 'sosFuture') * .5 },
          'protectionExit');
      }
    });

    /* ════════════════════════════════════ MOBILE ═════════════════════════ */
    mm.add('(max-width:1023px)', () => {
      const mPhone = mPhoneRef.current;
      const mCopy  = mCopyRef.current;
      if (!mPhone || !mCopy) return;
      if (reduced) return;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger:    container,
          pin:        stage,
          pinSpacing: true,
          ...ST_MOBILE,
        },
      });

      scrollTl
        .addLabel('zoom',     L.zoom)
        .addLabel('zoomPeak', L.zoomPeak);

      scrollTl.fromTo(mCopy,
        { opacity: 1, immediateRender: false },
        { opacity: 0, ease: 'power2.in', duration: dur('zoom', 'zoomPeak') },
        'zoom');

      scrollTl.fromTo(mPhone,
        { scale: 1, immediateRender: false },
        { scale: 1.12, ease: 'power2.inOut', duration: dur('zoom', 'zoomPeak') },
        'zoom');
    });

  }, { scope: containerRef });

  /* ── JSX ──────────────────────────────────────────────────────────────── */
  return (
    <div
      ref={stageRef}
      style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden' }}
      aria-label="Experiência SemBet"
    >
      <SceneBackground />

      {/* ═══════════════════════ DESKTOP ════════════════════════════════ */}
      <div className="hidden lg:block" style={{ position: 'absolute', inset: 0 }}>

        <div
          ref={sRef}
          style={{ position: 'absolute', left: '50%', top: '50%', width: '38vh', zIndex: 1, pointerEvents: 'none', willChange: 'transform,opacity,filter' }}
        >
          <GlassS className="w-full h-full" />
        </div>

        <div
          ref={phoneRef}
          style={{ position: 'absolute', left: '50%', top: '50%', zIndex: 3, willChange: 'transform,opacity,filter' }}
        >
          <PhoneShell>
            <PhoneScreens ref={phoneScreensRef} />
          </PhoneShell>
        </div>

        <div
          ref={copyRef}
          style={{
            position: 'absolute',
            left: 'var(--sb-gutter)', top: '50%',
            paddingTop: 'calc(var(--sb-nav-height)*.5)',
            zIndex: 5,
            maxWidth: 'min(38%,500px)',
            willChange: 'transform,opacity,filter',
          }}
        >
          <Act01Intro />
        </div>

        <div ref={card1Ref} style={{ position: 'absolute', top: '14%', left: '32%', zIndex: 4, willChange: 'transform,opacity' }}>
          <FloatingAppCard variant="protection" />
        </div>
        <div ref={card2Ref} style={{ position: 'absolute', top: '9%', right: '1.5%', zIndex: 4, willChange: 'transform,opacity' }}>
          <FloatingAppCard variant="progress" />
        </div>
        <div ref={card3Ref} style={{ position: 'absolute', bottom: '11%', right: '2.5%', zIndex: 4, willChange: 'transform,opacity' }}>
          <FloatingAppCard variant="support" />
        </div>

        <div
          ref={calloutRef}
          style={{
            position: 'absolute',
            left: 'calc(50% + max(165px,14.2vw))',
            top:  'calc(50% - 9vh)',
            zIndex: 8,
          }}
        >
          <Act03Protection />
        </div>

        <svg
          ref={connectorRef}
          aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 7, overflow: 'visible' }}
        >
          <path
            fill="none"
            stroke="rgba(49,138,199,.50)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 3px rgba(49,138,199,.28))' }}
          />
        </svg>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          aria-hidden
          style={{ position: 'absolute', bottom: '1.75rem', left: '50%', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontSize: '9px', fontWeight: 600, color: '#9ab0be', letterSpacing: '.22em', textTransform: 'uppercase' }}>Role</span>
          <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom,#9ab0be,transparent)' }} />
        </div>
      </div>

      {/* ═══════════════════════ MOBILE / TABLET ════════════════════════ */}
      <div
        className="lg:hidden flex flex-col overflow-hidden"
        style={{ height: '100%', paddingTop: 'var(--sb-nav-height)' }}
      >
        <div
          ref={mCopyRef}
          style={{ padding: '.875rem var(--sb-gutter) .5rem', willChange: 'opacity' }}
        >
          <Act01Intro compact />
        </div>

        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '.75rem' }}>
          <div style={{ position: 'absolute', top: '4%', left: '3%', zIndex: 4 }}>
            <FloatingAppCard variant="protection" />
          </div>
          <div style={{ position: 'absolute', top: '4%', right: '3%', zIndex: 4 }}>
            <FloatingAppCard variant="progress" />
          </div>
          <div ref={mPhoneRef} style={{ zIndex: 2, willChange: 'transform,opacity' }}>
            <PhoneShell>
              <PhoneScreens />
            </PhoneShell>
          </div>
        </div>

        <div
          ref={mCueRef}
          aria-hidden
          style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}
        >
          <span style={{ fontSize: '9px', fontWeight: 600, color: '#9ab0be', letterSpacing: '.22em', textTransform: 'uppercase' }}>Role</span>
        </div>
      </div>
    </div>
  );
}

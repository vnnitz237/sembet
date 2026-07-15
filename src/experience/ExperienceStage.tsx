import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import GlassS          from '../components/hero/GlassS';
import FloatingAppCard from '../components/hero/FloatingAppCard';
import PhoneShell      from './phone/PhoneShell';
import PhoneScreens, { type PhoneScreensHandle } from './phone/PhoneScreens';
import Act01Intro      from './acts/Act01Intro';
import Act03Protection, { type Act03ProtectionHandle } from './acts/Act03Protection';
import { L, TOTAL_DURATION, ST_DESKTOP, ST_MOBILE, getPhoneX, dur } from './ExperienceTimeline';

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
───────────────────────────────────────────────────────────────────────────── */
export default function ExperienceStage({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const stageRef = useRef<HTMLDivElement>(null);

  /* ── Desktop refs ──────────────────────────────────────────────────────── */
  const sRef            = useRef<HTMLDivElement>(null);
  const phoneRef        = useRef<HTMLDivElement>(null);
  const phoneScreensRef = useRef<PhoneScreensHandle>(null);
  const copyRef         = useRef<HTMLDivElement>(null);
  const card1Ref        = useRef<HTMLDivElement>(null);
  const card2Ref        = useRef<HTMLDivElement>(null);
  const card3Ref        = useRef<HTMLDivElement>(null);
  const cueRef          = useRef<HTMLDivElement>(null);

  /* ── Act 3 callout layer — lives in the desktop section, outside PhoneShell */
  const calloutContainerRef = useRef<HTMLDivElement>(null);
  const calloutInnerRef     = useRef<Act03ProtectionHandle>(null);
  const connectorRef        = useRef<SVGSVGElement>(null);

  /* ── Mobile refs — completely separate, no collision with desktop ───────── */
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

    /* ── updateConnectorGeometry ──────────────────────────────────────────
       Calculates the SVG path between the protection card's right edge and
       the callout container's left edge. Also aligns the callout Y to the
       card's vertical centre.

       Called via the connector tween's functional FROM value — this executes
       exactly when scroll reaches protectionFocus, at which point the phone
       is stable at scale 1.28, centred. getBoundingClientRect is accurate.

       Does NOT set strokeDashoffset — GSAP tween owns that property.
    ──────────────────────────────────────────────────────────────────────── */
    const updateConnectorGeometry = () => {
      const protCardEl  = phoneScreensRef.current?.protectionCardEl;
      const calloutCont = calloutContainerRef.current;
      const svgEl       = connectorRef.current;
      if (!protCardEl || !calloutCont || !svgEl) return;

      const pathEl = svgEl.querySelector<SVGPathElement>('path');
      if (!pathEl) return;

      const cardRect  = protCardEl.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();

      /* Start point: right edge of the protection card, vertically centred */
      const x1 = cardRect.right - stageRect.left;
      const y1 = cardRect.top + cardRect.height / 2 - stageRect.top;

      /* Align callout to the card's centre before measuring its left edge */
      calloutCont.style.top       = `${y1 + stageRect.top}px`;
      calloutCont.style.transform = 'translateY(-50%)';

      /* End point: left edge of callout container */
      const calloutRect = calloutCont.getBoundingClientRect();
      const x2 = calloutRect.left - stageRect.left - 8; // 8px gap before callout text

      /* Gentle horizontal bezier (subtle S-shape) */
      const dx  = x2 - x1;
      const cpX = x1 + dx * 0.45;
      pathEl.setAttribute('d',
        `M ${x1} ${y1} C ${cpX} ${y1 + 3} ${cpX + dx * 0.1} ${y1 - 3} ${x2} ${y1}`
      );

      try {
        const len = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = `${len}`;
      } catch { /* SVG not laid out */ }
    };

    /* ── ENTRY ANIMATION (top-level — NOT inside mm.add)
       Kept outside matchMedia so neither StrictMode double-invoke nor
       breakpoint transitions can interrupt a running entry animation.
    ──────────────────────────────────────────────────────────────────────── */
    if (isDesktop) {
      const phone  = phoneRef.current;
      const s      = sRef.current;
      const copy   = copyRef.current;
      const card1  = card1Ref.current;
      const card2  = card2Ref.current;
      const card3  = card3Ref.current;
      const cue    = cueRef.current;

      if (phone && s && copy && card1 && card2 && card3 && cue) {
        /* GSAP owns centering via xPercent/yPercent — no CSS transform on element */
        gsap.set(phone, { xPercent: -50, yPercent: -50, transformPerspective: 1100, transformOrigin: 'center center' });
        gsap.set(s,     { xPercent: -50, yPercent: -50, transformOrigin: 'center center' });
        gsap.set(copy,  { yPercent: -50 });
        /* Callout hidden until Act 3 */
        if (calloutContainerRef.current) gsap.set(calloutContainerRef.current, { opacity: 0 });

        if (window.scrollY > 10 || reduced) {
          /* Already scrolled or reduced-motion: jump to frame-0 */
          gsap.set(phone, { opacity: 1, scale: 1, x: getPhoneX(), rotateY: -6, rotateX: 2, rotateZ: -.5 });
          gsap.set(s,     { opacity: 1, scale: 1, x: getPhoneX() });
          gsap.set(copy,  { opacity: 1, y: 0 });
          gsap.set([card1, card2, card3], { opacity: 1, x: 0, y: 0 });
          gsap.set(cue,   { opacity: .38 });
        } else {
          /* Fade-in entry */
          gsap.set(phone,  { opacity: 0, scale: 1, x: getPhoneX(), rotateY: -6, rotateX: 2, rotateZ: -.5 });
          gsap.set(s,      { opacity: 0, scale: 1, x: getPhoneX() });
          gsap.set(copy,   { opacity: 0, y: 20 });
          gsap.set([card1, card2, card3], { opacity: 0, x: 0, y: 0 });
          gsap.set(cue,    { opacity: 0 });

          gsap.timeline({
            delay: .12,
            defaults: { ease: 'power2.out' },
            onComplete() {
              gsap.set(phone, { opacity: 1, scale: 1, x: getPhoneX(), rotateY: -6, rotateX: 2, rotateZ: -.5 });
              gsap.set(s,     { opacity: 1, scale: 1, x: getPhoneX() });
              gsap.set([card1, card2, card3], { x: 0, y: 0 });
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
      /* Mobile entry */
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

    /* ── SCROLL TIMELINES ─────────────────────────────────────────────────── */
    const mm = gsap.matchMedia();

    /* ══════════════════════════════════════════ DESKTOP ══════════════════ */
    mm.add('(min-width:1024px)', () => {
      const phone       = phoneRef.current;
      const s           = sRef.current;
      const copy        = copyRef.current;
      const card1       = card1Ref.current;
      const card2       = card2Ref.current;
      const card3       = card3Ref.current;
      const cue         = cueRef.current;
      const calloutCont = calloutContainerRef.current;
      const svgEl       = connectorRef.current;

      if (!phone || !s || !copy || !card1 || !card2 || !card3 || !cue || !calloutCont || !svgEl) return;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger:    container,
          pin:        stage,
          pinSpacing: true,
          ...ST_DESKTOP,
          onRefresh: updateConnectorGeometry,
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

      /* ── ACT 2 ────────────────────────────────────────────────────────── */
      const zoomDur = dur('zoom', 'zoomPeak');

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
        { x: -72, y: -22, opacity: 0, ease: 'power2.in', duration: zoomDur * .72 }, 'zoom');
      scrollTl.fromTo(card2,
        { x: 0, y: 0, opacity: 1, immediateRender: false },
        { x:  52, y: -32, opacity: 0, ease: 'power2.in', duration: zoomDur * .72 }, 'zoom');
      scrollTl.fromTo(card3,
        { x: 0, y: 0, opacity: 1, immediateRender: false },
        { x:  58, y:  38, opacity: 0, ease: 'power2.in', duration: zoomDur * .8 },  'zoom');

      scrollTl.fromTo(cue,
        { opacity: .38, immediateRender: false },
        { opacity: 0, ease: 'none', duration: .3 }, 'zoom');

      /* ── ACT 3 — protection focus ─────────────────────────────────────
         Timeline layout (L units):
           2.9  protectionFocus ──[0.3]──  3.2  protectionLine
                 secondaries dim, card grows, connector draws, callout reveals

           3.2  protectionLine ──[0.3]──  3.5  protectionRead
                 [reading stabilisation — connector fully drawn]

           3.5  protectionRead ──[0.7]──  4.2  protectionExit
                 [READING PAUSE — nothing moves]

           4.2  protectionExit ──[0.3]──  4.5  sosFuture
                 everything reverses cleanly
      ───────────────────────────────────────────────────────────────────── */

      /* Collect phone secondary elements (animated individually, not via a
         parent brightness wrapper — prevents grey overlay on the phone screen) */
      const greeting = phoneScreensRef.current?.greetingEl;
      const counter  = phoneScreensRef.current?.counterEl;
      const support  = phoneScreensRef.current?.supportEl;
      const metrics  = phoneScreensRef.current?.metricsEl;
      const nav      = phoneScreensRef.current?.navEl;
      const protCard = phoneScreensRef.current?.protectionCardEl;
      const titleEl  = calloutInnerRef.current?.titleEl;
      const descEl   = calloutInnerRef.current?.descEl;

      const secondaries = [greeting, counter, support, metrics, nav]
        .filter((el): el is HTMLElement => !!el);

      const focusDur = dur('protectionFocus', 'protectionLine'); // 0.3
      const exitDur  = dur('protectionExit',  'sosFuture');      // 0.3

      /* 1 — Secondary elements: selective contrast reduction.
         opacity 0.40 + blur 0.6px = subtle desaturation, not a grey overlay.
         Phone background (#f8fbfe) is unaffected — it's not a child of these elements. */
      if (secondaries.length > 0) {
        scrollTl.fromTo(secondaries,
          { opacity: 1, filter: 'blur(0px)', immediateRender: false },
          { opacity: 0.40, filter: 'blur(0.6px)', ease: 'power1.inOut', duration: focusDur },
          'protectionFocus');
        scrollTl.to(secondaries,
          { opacity: 1, filter: 'blur(0px)', ease: 'power1.out', duration: exitDur },
          'protectionExit');
      }

      /* 2 — Protection card: discrete growth.
         zIndex 4 in ScreenHome JSX ensures it sits above its dimmed siblings.
         No brightness filter — card stays at full white. */
      if (protCard) {
        scrollTl.fromTo(protCard,
          { scale: 1, immediateRender: false },
          { scale: 1.045, ease: 'power1.inOut', duration: focusDur },
          'protectionFocus');
        scrollTl.to(protCard,
          { scale: 1, ease: 'power1.out', duration: exitDur },
          'protectionExit');
      }

      /* 3 — Connector line.
         The strokeDashoffset FROM value is a function. GSAP evaluates it when
         the tween first activates (at protectionFocus label), meaning the phone
         IS at scale 1.28, centred. getBoundingClientRect returns correct coords.
         Side-effect: updateConnectorGeometry() also sets the callout's Y position. */
      const pathEl = svgEl.querySelector<SVGPathElement>('path');
      if (pathEl) {
        scrollTl.fromTo(pathEl,
          {
            strokeDashoffset: () => {
              updateConnectorGeometry();
              return pathEl.getTotalLength() || 120;
            },
            opacity: 0,
            immediateRender: false,
          },
          { strokeDashoffset: 0, opacity: 1, ease: 'power2.inOut', duration: focusDur },
          'protectionFocus');

        scrollTl.to(pathEl,
          {
            strokeDashoffset: () => pathEl.getTotalLength() || 120,
            opacity: 0,
            ease: 'power2.in',
            duration: exitDur * 0.65,
          },
          'protectionExit');
      }

      /* 4 — Callout container: flip hidden→visible at Act-3 entry.
         No opacity animation on the container — its children carry the reveal.
         scrollTl.set() in a scrubbed TL is reversible. */
      scrollTl.set(calloutCont, { opacity: 1 }, 'protectionFocus');
      scrollTl.set(calloutCont, { opacity: 0 }, 'protectionExit+=0.22');

      /* 5 — Callout title: blur-reveal */
      if (titleEl) {
        scrollTl.fromTo(titleEl,
          { filter: 'blur(10px)', opacity: 0, immediateRender: false },
          { filter: 'blur(0px)', opacity: 1, ease: 'power2.out', duration: focusDur * 0.85 },
          'protectionFocus+=0.05');
        scrollTl.to(titleEl,
          { filter: 'blur(10px)', opacity: 0, ease: 'power2.in', duration: exitDur * 0.55 },
          'protectionExit');
      }

      /* 6 — Callout description: blur-reveal, slight stagger after title */
      if (descEl) {
        scrollTl.fromTo(descEl,
          { filter: 'blur(10px)', opacity: 0, immediateRender: false },
          { filter: 'blur(0px)', opacity: 1, ease: 'power2.out', duration: focusDur * 0.85 },
          'protectionFocus+=0.10');
        scrollTl.to(descEl,
          { filter: 'blur(10px)', opacity: 0, ease: 'power2.in', duration: exitDur * 0.55 },
          'protectionExit+=0.04');
      }

      /* Anchor the timeline totalDuration to TOTAL_DURATION=10 so the scrub
         maps scroll progress 0→100% to timeline 0→10, keeping all label
         positions (L.zoom=1.4, L.protectionFocus=2.9 …) at the correct
         scroll positions. Without this, totalDuration would be ~4.5 (the last
         tween's end time) and protectionFocus would fire at the wrong scroll %. */
      scrollTl.to(stage, { duration: 0 }, TOTAL_DURATION);
    });

    /* ══════════════════════════════════════════ MOBILE ═══════════════════ */
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
        .addLabel('zoom',            L.zoom)
        .addLabel('zoomPeak',        L.zoomPeak)
        .addLabel('protectionFocus', L.protectionFocus)
        .addLabel('protectionExit',  L.protectionExit);

      /* Act 2: copy fades, phone scales */
      scrollTl.fromTo(mCopy,
        { opacity: 1, immediateRender: false },
        { opacity: 0, ease: 'power2.in', duration: dur('zoom', 'zoomPeak') }, 'zoom');
      scrollTl.fromTo(mPhone,
        { scale: 1, immediateRender: false },
        { scale: 1.08, ease: 'power2.inOut', duration: dur('zoom', 'zoomPeak') }, 'zoom');

      /* Act 3 mobile: skip connector/callout (no side space on mobile).
         Just dim secondary elements for context focus. */
      const greeting = phoneScreensRef.current?.greetingEl;
      const counter  = phoneScreensRef.current?.counterEl;
      const support  = phoneScreensRef.current?.supportEl;
      const metrics  = phoneScreensRef.current?.metricsEl;
      const nav      = phoneScreensRef.current?.navEl;
      const secondaries = [greeting, counter, support, metrics, nav]
        .filter((el): el is HTMLElement => !!el);

      if (secondaries.length > 0) {
        const focusDur = dur('protectionFocus', 'protectionLine');
        const exitDur  = dur('protectionExit',  'sosFuture');
        scrollTl.fromTo(secondaries,
          { opacity: 1, immediateRender: false },
          { opacity: 0.45, ease: 'power1.inOut', duration: focusDur }, 'protectionFocus');
        scrollTl.to(secondaries,
          { opacity: 1, ease: 'power1.out', duration: exitDur }, 'protectionExit');
      }
      /* Anchor mobile timeline to TOTAL_DURATION for correct scroll mapping */
      scrollTl.to(mPhone, { duration: 0 }, TOTAL_DURATION);
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

        {/* S letterform — z:1 */}
        <div
          ref={sRef}
          style={{ position: 'absolute', left: '50%', top: '50%', width: '38vh', zIndex: 1, pointerEvents: 'none', willChange: 'transform,opacity,filter' }}
        >
          <GlassS className="w-full h-full" />
        </div>

        {/* Phone — z:3 */}
        <div
          ref={phoneRef}
          style={{ position: 'absolute', left: '50%', top: '50%', zIndex: 3, willChange: 'transform,opacity,filter' }}
        >
          <PhoneShell>
            <PhoneScreens ref={phoneScreensRef} />
          </PhoneShell>
        </div>

        {/* Copy — z:5 */}
        <div
          ref={copyRef}
          style={{
            position: 'absolute', left: 'var(--sb-gutter)', top: '50%',
            paddingTop: 'calc(var(--sb-nav-height)*.5)',
            zIndex: 5, maxWidth: 'min(38%,500px)',
            willChange: 'transform,opacity,filter',
          }}
        >
          <Act01Intro />
        </div>

        {/* Floating cards — z:4 */}
        <div ref={card1Ref} style={{ position: 'absolute', top: '14%', left: '32%', zIndex: 4, willChange: 'transform,opacity' }}>
          <FloatingAppCard variant="protection" />
        </div>
        <div ref={card2Ref} style={{ position: 'absolute', top: '9%', right: '1.5%', zIndex: 4, willChange: 'transform,opacity' }}>
          <FloatingAppCard variant="progress" />
        </div>
        <div ref={card3Ref} style={{ position: 'absolute', bottom: '11%', right: '2.5%', zIndex: 4, willChange: 'transform,opacity' }}>
          <FloatingAppCard variant="support" />
        </div>

        {/* ── CALLOUT LAYER — outside PhoneShell entirely ──────────────── */}

        {/* SVG connector — fills stage so no overflow clip can cut the line.
            Path opacity starts at 0; GSAP animates it in Act 3. */}
        <svg
          ref={connectorRef}
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none',
            zIndex: 6,
            overflow: 'visible',
          }}
        >
          <path
            fill="none"
            stroke="rgba(49,138,199,0.5)"
            strokeWidth="1.2"
            strokeLinecap="round"
            style={{ opacity: 0 }}
          />
        </svg>

        {/* Callout container — z:9 (above phone z:3 and S z:1).
            top is set by updateConnectorGeometry to align with the card.
            opacity starts at 0; scroll TL flips it at protectionFocus. */}
        <div
          ref={calloutContainerRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 'calc(50% + max(178px, 14.5vw))',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 9,
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <Act03Protection ref={calloutInnerRef} />
        </div>

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
        <div ref={mCopyRef} style={{ padding: '.875rem var(--sb-gutter) .5rem', willChange: 'opacity' }}>
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

        <div ref={mCueRef} aria-hidden style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>
          <span style={{ fontSize: '9px', fontWeight: 600, color: '#9ab0be', letterSpacing: '.22em', textTransform: 'uppercase' }}>Role</span>
        </div>
      </div>
    </div>
  );
}

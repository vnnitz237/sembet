import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock } from 'lucide-react';
import StatusPill from '../components/ui/StatusPill';
import { SemBetLinkButton } from '../components/ui/SemBetButton';
import GlassS from '../components/hero/GlassS';
import PhoneMockup from '../components/hero/PhoneMockup';
import FloatingAppCard from '../components/hero/FloatingAppCard';

gsap.registerPlugin(ScrollTrigger);

/* S spine — same path as GlassS, used for the light-sweep overlay */


const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E" +
  "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' " +
  "numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E";

/* ── 6-layer background ──────────────────────────────────────────────────── */
function SceneBackground() {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* L1 – base: off-white with blue breath */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(158deg, #eef6ff 0%, #f8fbfe 48%, #edf5ff 100%)',
      }} />
      {/* L2 – upper-right bloom */}
      <div style={{
        position: 'absolute', top: '-22%', right: '-14%',
        width: '82%', height: '88%', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 62% 28%, rgba(199,232,255,0.58) 0%, rgba(143,207,255,0.26) 36%, transparent 62%)',
      }} />
      {/* L3 – lower-center secondary glow */}
      <div style={{
        position: 'absolute', bottom: '-18%', left: '16%',
        width: '68%', height: '60%', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 72%, rgba(90,173,232,0.15) 0%, transparent 58%)',
      }} />
      {/* L4 – cursor-reactive ambient (CSS vars set by App.tsx) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle 42vw at calc(var(--cx, 0.62) * 100%) calc(var(--cy, 0.32) * 100%), rgba(199,232,255,0.32) 0%, transparent 68%)',
      }} />
      {/* L5 – film grain */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: 0.028,
        backgroundImage: `url("${GRAIN}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
      }} />
      {/* L6 – diagonal micro-lines */}
      <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.038 }}>
        <defs>
          <pattern id="sb-lines" x="0" y="0" width="52" height="52"
            patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
            <line x1="0" y1="26" x2="52" y2="26" stroke="#318ac7" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sb-lines)" />
      </svg>
    </div>
  );
}

/* ── Light sweep — glowing stroke that traces the S ─────────────────────── */

/* ── Scroll cue ──────────────────────────────────────────────────────────── */
function ScrollCue() {
  return (
    <div aria-hidden style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <span style={{ fontSize: '9px', fontWeight: 600, color: '#9ab0be', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
        Role
      </span>
      <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, #9ab0be, transparent)' }} />
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden>
        <path d="M1 1L4 4L7 1" stroke="#9ab0be" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── Copy block — shared between desktop and mobile ──────────────────────── */
function CopyBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      gap: compact ? '0.75rem' : '1.5rem',
      alignItems: compact ? 'center' : 'flex-start',
      textAlign: compact ? 'center' : 'left',
    }}>
      <StatusPill />

      <h1 style={{
        fontSize: compact ? 'clamp(2.0rem, 7.5vw, 2.8rem)' : 'clamp(2.8rem, 4.4vw, 5.4rem)',
        fontWeight: 800,
        lineHeight: 1.0,
        letterSpacing: '-0.038em',
        color: '#172b3a',
      }}>
        {compact
          ? <>Sua decisão merece <span style={{ color: '#318ac7' }}>proteção.</span></>
          : <>Sua decisão<br />merece{' '}<span style={{ color: '#318ac7' }}>proteção.</span></>
        }
      </h1>

      <p style={{
        fontSize: compact ? '0.9rem' : 'clamp(0.95rem, 1.15vw, 1.1rem)',
        lineHeight: 1.75,
        color: '#607789',
        maxWidth: compact ? '380px' : '420px',
      }}>
        A SemBet cria uma barreira entre o impulso e a aposta,
        ajudando você a manter sua decisão e recuperar o controle.
      </p>

      <div style={{
        display: 'flex',
        flexDirection: compact ? 'column' : 'row',
        gap: '12px',
        width: compact ? '100%' : 'auto',
        maxWidth: compact ? '380px' : 'none',
      }}>
        <SemBetLinkButton
          href="#protecao" variant="primary"
          size={compact ? 'md' : 'lg'}
          className={compact ? 'justify-center' : ''}
        >
          Quero minha proteção
        </SemBetLinkButton>
        <SemBetLinkButton
          href="#como-funciona" variant="secondary"
          size={compact ? 'md' : 'lg'}
          className={compact ? 'justify-center' : ''}
        >
          Ver como funciona
        </SemBetLinkButton>
      </div>

      <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9ab0be', fontWeight: 500 }}>
        <Lock size={11} aria-hidden />
        Privacidade em primeiro lugar. Sem julgamentos.
      </p>
    </div>
  );
}

/* ── Scene01Hero ─────────────────────────────────────────────────────────── */
export default function Scene01Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const sWrapRef   = useRef<HTMLDivElement>(null);
  const phoneRef   = useRef<HTMLDivElement>(null);
  const copyRef    = useRef<HTMLDivElement>(null);
  const card1Ref   = useRef<HTMLDivElement>(null);
  const card2Ref   = useRef<HTMLDivElement>(null);
  const card3Ref   = useRef<HTMLDivElement>(null);
  const cueRef     = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section  = sectionRef.current;
    const sticky   = stickyRef.current;
    const sWrap    = sWrapRef.current;
    const phone    = phoneRef.current;
    const copy     = copyRef.current;
    const card1    = card1Ref.current;
    const card2    = card2Ref.current;
    const card3    = card3Ref.current;
    const cue      = cueRef.current;
    if (!section || !sticky || !sWrap || !phone || !copy || !card1 || !card2 || !card3 || !cue) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const reduced   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /*
     * ─────────────────────────────────────────────────────────────────────────
     * STEP 1 — Centering via GSAP (owns all transforms; no CSS transform on
     *          these elements, so nothing conflicts).
     * ─────────────────────────────────────────────────────────────────────────
     */
    gsap.set(sWrap, { xPercent: -50, yPercent: -50, transformOrigin: 'center' });
    gsap.set(phone, { xPercent: -50, yPercent: -50, transformOrigin: 'center' });
    gsap.set(copy,  { yPercent: -50 });

    /*
     * ─────────────────────────────────────────────────────────────────────────
     * STEP 2 — Deterministic FRAME-0 state.
     *          This is the visual starting point for BOTH timelines.
     *          All scroll-driven transforms start from these exact values.
     * ─────────────────────────────────────────────────────────────────────────
     */
    const setFrame0 = () => {
      gsap.set(sWrap,  { opacity: 1, scale: 1, filter: 'blur(0px)' });
      gsap.set(phone,  { opacity: 1, scale: 1, y: 0 });
      gsap.set(copy,   { opacity: 1, y: 0 });
      gsap.set([card1, card2, card3], { opacity: 1, x: 0, y: 0 });
      gsap.set(cue,    { opacity: 0.38 });
    };

    /*
     * ─────────────────────────────────────────────────────────────────────────
     * STEP 3 — Scroll-driven timeline (desktop only).
     *          Built once; driven exclusively by ScrollTrigger scrub.
     *          Uses fromTo() so start values are always explicit regardless
     *          of when ST initialises.
     * ─────────────────────────────────────────────────────────────────────────
     */
    const buildScrollTl = () => {
      if (!isDesktop) return;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: sticky,
          pinSpacing: true,
          start: 'top top',
          end: '+=180%',
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      /* All fromTo() — start values match Frame-0 exactly */

      /* Copy: dissolves out (first 40% of scroll) */
      scrollTl.fromTo(copy,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -40, ease: 'power2.in', duration: 0.4 },
        0,
      );

      /* S: recedes — parallax plane 2 */
      scrollTl.fromTo(sWrap,
        { scale: 1, opacity: 1, filter: 'blur(0px)' },
        { scale: 1.07, opacity: 0.32, filter: 'blur(2px)', ease: 'none', duration: 1 },
        0,
      );

      /* Phone: approaches — parallax plane 3 */
      scrollTl.fromTo(phone,
        { scale: 1, y: 0 },
        { scale: 1.1, y: -40, ease: 'none', duration: 1 },
        0,
      );

      /* Cards: disperse — parallax plane 4 */
      scrollTl.fromTo(card1,
        { x: 0, y: 0, opacity: 1 },
        { x: -80, y: -30, opacity: 0.2, ease: 'none', duration: 0.7 },
        0,
      );
      scrollTl.fromTo(card2,
        { x: 0, y: 0, opacity: 1 },
        { x: 60, y: -40, opacity: 0.2, ease: 'none', duration: 0.7 },
        0,
      );
      scrollTl.fromTo(card3,
        { x: 0, y: 0, opacity: 1 },
        { x: 65, y: 45, opacity: 0.2, ease: 'none', duration: 0.6 },
        0,
      );

      /* Scroll cue: fades immediately */
      scrollTl.fromTo(cue,
        { opacity: 0.38 },
        { opacity: 0, ease: 'none', duration: 0.1 },
        0,
      );
    };

    /*
     * ─────────────────────────────────────────────────────────────────────────
     * STEP 4 — Entry OR instant-show depending on scroll position at load.
     * ─────────────────────────────────────────────────────────────────────────
     */
    const scrolledOnLoad = window.scrollY > 10;

    if (reduced || scrolledOnLoad) {
      /*
       * prefers-reduced-motion OR page loaded/restored mid-scroll:
       * Show Frame-0 immediately. ScrollTrigger syncs to current position.
       */
      setFrame0();
      buildScrollTl();
      return;
    }

    /*
     * Fresh load at top of page:
     * 1. Hide all elements.
     * 2. Run short entry (~1.4s) — opacity + tiny translate only.
     * 3. On complete: call setFrame0() (idempotent settle), then build scroll TL.
     *
     * Entry NEVER animates scale, x-position, or any property that
     * the scroll TL also controls — zero property overlap.
     */
    gsap.set(sWrap,  { opacity: 0 });
    gsap.set(phone,  { opacity: 0, y: 18 });
    gsap.set(copy,   { opacity: 0, y: 20 });
    gsap.set([card1, card2, card3], { opacity: 0 });
    gsap.set(cue,    { opacity: 0 });

    const entry = gsap.timeline({
      delay: 0.15,
      defaults: { ease: 'power2.out' },
      onComplete() {
        setFrame0();
        buildScrollTl();
      },
    });

    entry
      .to(sWrap, { opacity: 1, duration: 0.55 })
      .to(phone, { opacity: 1, y: 0, duration: 0.50 }, '-=0.20')
      .to(copy,  { opacity: 1, y: 0, duration: 0.45 }, '-=0.22')
      .to([card1, card2, card3], { opacity: 1, duration: 0.40, stagger: 0.08 }, '-=0.18')
      .to(cue, { opacity: 0.38, duration: 0.30 }, '-=0.10');

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introdução SemBet"
      style={{ position: 'relative', minHeight: '100vh' }}
    >
      <div
        ref={stickyRef}
        style={{ height: '100vh', width: '100%', overflow: 'hidden', position: 'relative' }}
      >
        <SceneBackground />

        {/* ════════════════════════════════════════════════
            DESKTOP — cinematic absolute layout
            S is the frame. Phone born inside. Copy left.
            ════════════════════════════════════════════════ */}
        <div className="hidden lg:block" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>

          {/* Giant S — dominant, centered-right, 90vh tall */}
          {/* NOTE: no CSS transform — GSAP owns transforms via xPercent/yPercent */}
          <div
            ref={sWrapRef}
            aria-hidden
            style={{
              position: 'absolute',
              top: '50%', left: '57%',
              height: '90vh',
              aspectRatio: '260 / 340',
              overflow: 'visible',
              zIndex: 1,
              willChange: 'transform, opacity, filter',
            }}
          >
            <GlassS className="w-full h-full" />
          </div>

          {/* Phone — born inside the S */}
          {/* NOTE: no CSS transform — GSAP owns via xPercent/yPercent */}
          <div
            ref={phoneRef}
            style={{
              position: 'absolute',
              top: '50%', left: '57%',
              zIndex: 3,
              willChange: 'transform, opacity, filter',
            }}
          >
            <PhoneMockup />
          </div>

          {/* Card: Protection — upper left of phone */}
          <div
            ref={card1Ref}
            data-floating-card="" data-card-type="protection"
            style={{ position: 'absolute', top: '14%', left: '32%', zIndex: 4, willChange: 'transform, opacity' }}
          >
            <FloatingAppCard variant="protection" />
          </div>

          {/* Card: Progress — upper right */}
          <div
            ref={card2Ref}
            data-floating-card="" data-card-type="progress"
            style={{ position: 'absolute', top: '9%', right: '1.5%', zIndex: 4, willChange: 'transform, opacity' }}
          >
            <FloatingAppCard variant="progress" />
          </div>

          {/* Card: Support — lower right */}
          <div
            ref={card3Ref}
            data-floating-card="" data-card-type="support"
            style={{ position: 'absolute', bottom: '11%', right: '2.5%', zIndex: 4, willChange: 'transform, opacity' }}
          >
            <FloatingAppCard variant="support" />
          </div>

          {/* Copy — left side, vertically centered */}
          {/* NOTE: no CSS transform — GSAP owns via yPercent */}
          <div
            ref={copyRef}
            style={{
              position: 'absolute',
              left: 'var(--sb-gutter)',
              top: '50%',
              paddingTop: 'calc(var(--sb-nav-height) * 0.5)',
              zIndex: 5,
              maxWidth: 'min(38%, 500px)',
              willChange: 'transform, opacity',
            }}
          >
            <CopyBlock />
          </div>

          {/* Scroll cue */}
          <div
            ref={cueRef}
            style={{
              position: 'absolute',
              bottom: '1.75rem', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 5,
            }}
          >
            <ScrollCue />
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            MOBILE / TABLET — stacked layout
            ════════════════════════════════════════════════ */}
        <div
          className="lg:hidden flex flex-col overflow-hidden"
          style={{ height: '100%', paddingTop: 'var(--sb-nav-height)' }}
        >
          {/* Copy top */}
          <div style={{ padding: '0.875rem var(--sb-gutter) 0.5rem', display: 'flex', justifyContent: 'center' }}>
            <CopyBlock compact />
          </div>

          {/* Visual — phone clipped, cards above */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '4%', left: '3%', zIndex: 4 }}>
              <FloatingAppCard variant="protection" />
            </div>
            <div style={{ position: 'absolute', top: '4%', right: '3%', zIndex: 4 }}>
              <FloatingAppCard variant="progress" />
            </div>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
              <PhoneMockup />
            </div>
          </div>

          {/* Scroll cue */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem', opacity: 0.38 }} aria-hidden>
            <ScrollCue />
          </div>
        </div>
      </div>
    </section>
  );
}

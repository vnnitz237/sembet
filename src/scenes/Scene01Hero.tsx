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
const S_PATH =
  'M 196,62 C 220,32 198,20 158,20 ' +
  'C 100,20 44,56 44,98 ' +
  'C 44,140 90,164 134,182 ' +
  'C 178,200 216,228 216,272 ' +
  'C 216,314 176,322 128,322 ' +
  'C 82,322 44,306 36,282';

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
function LightSweep({ pathRef }: { pathRef: React.RefObject<SVGPathElement> }) {
  return (
    <svg
      viewBox="0 0 260 340"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        overflow: 'visible', pointerEvents: 'none', zIndex: 2,
      }}
    >
      <defs>
        <linearGradient id="sb-sweep-g" x1="30" y1="20" x2="216" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#ffffff"  stopOpacity="1.0" />
          <stop offset="45%"  stopColor="#c7e8ff"  stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5aade8"  stopOpacity="0.0" />
        </linearGradient>
        <filter id="sb-sweep-f" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        ref={pathRef}
        d={S_PATH}
        stroke="url(#sb-sweep-g)"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        filter="url(#sb-sweep-f)"
        opacity="0"
      />
    </svg>
  );
}

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
  const sweepRef   = useRef<SVGPathElement>(null) as React.RefObject<SVGPathElement>;
  const cueRef     = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set(
        [sWrapRef.current, phoneRef.current, copyRef.current,
          card1Ref.current, card2Ref.current, card3Ref.current, cueRef.current],
        { opacity: 1, clearProps: 'filter,transform' },
      );
      return;
    }

    /* ── Set invisible initial states before first paint ── */
    // xPercent/yPercent handle the -50% centering — no conflict with CSS transforms
    gsap.set(sWrapRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.97, filter: 'blur(52px)', transformOrigin: 'center' });
    gsap.set(phoneRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.88, filter: 'blur(28px)', transformOrigin: 'center' });
    gsap.set(copyRef.current,  { yPercent: -50, opacity: 0, y: 32 });
    gsap.set(card1Ref.current,  { opacity: 0, y: 18, x: -14 });
    gsap.set(card2Ref.current,  { opacity: 0, y: -16, x: 14 });
    gsap.set(card3Ref.current,  { opacity: 0, y: 20, x: 16 });
    gsap.set(cueRef.current,    { opacity: 0 });

    /* ── Init sweep stroke-dash ── */
    if (sweepRef.current) {
      const len = sweepRef.current.getTotalLength();
      sweepRef.current.style.strokeDasharray  = `${len}`;
      sweepRef.current.style.strokeDashoffset = `${len}`;
      gsap.set(sweepRef.current, { opacity: 1 });
    }

    /* ── Entry timeline ── */
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.out' } });

    tl
      /* S materializes from fog */
      .to(sWrapRef.current, { opacity: 0.55, filter: 'blur(26px)', scale: 0.985, duration: 0.88 })
      /* S sharpens — glass crystallizes */
      .to(sWrapRef.current, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.18, ease: 'power2.out' }, '-=0.26')
      /* Light traces the contour */
      .to(sweepRef.current, { strokeDashoffset: 0, duration: 1.38, ease: 'power1.inOut' }, '-=0.82')
      /* Phone born inside the glass */
      .to(phoneRef.current, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.08, ease: 'power2.out' }, '-=0.96')
      /* Copy surfaces */
      .to(copyRef.current, { opacity: 1, y: 0, duration: 0.82, ease: 'power2.out' }, '-=0.56')
      /* Cards float in — staggered */
      .to([card1Ref.current, card2Ref.current], { opacity: 1, y: 0, x: 0, duration: 0.72, stagger: 0.14, ease: 'power2.out' }, '-=0.36')
      .to(card3Ref.current, { opacity: 1, y: 0, x: 0, duration: 0.62, ease: 'power2.out' }, '-=0.40')
      /* Scroll cue breathes in */
      .to(cueRef.current, { opacity: 0.38, duration: 0.72 }, '-=0.18')
      /* Release expensive will-change after entry completes */
      .call(() => {
        if (sWrapRef.current) sWrapRef.current.style.willChange = 'transform, opacity';
        if (phoneRef.current) phoneRef.current.style.willChange = 'transform, opacity';
      });

    /* ── Scroll animations — desktop only ── */
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      /* Pin hero for 180vh of scroll */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: stickyRef.current,
        pinSpacing: true,
        start: 'top top',
        end: '+=180%',
        anticipatePin: 1,
      });

      /* Copy dissolves early — first 42% of scroll travel */
      gsap.to(copyRef.current, {
        opacity: 0, y: -44,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=42%',
          scrub: 1.9,
        },
      });

      /* S recedes — parallax plane 2 */
      gsap.to(sWrapRef.current, {
        scale: 1.07, opacity: 0.32, filter: 'blur(2px)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          scrub: 2.8,
        },
      });

      /* Phone approaches — parallax plane 3 */
      gsap.to(phoneRef.current, {
        scale: 1.12, y: -44,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          scrub: 2.2,
        },
      });

      /* Cards disperse — parallax plane 4 */
      gsap.to(card1Ref.current, {
        x: '-5vw', y: '-3vh', opacity: 0.20,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '+=88%', scrub: 1.6 },
      });
      gsap.to(card2Ref.current, {
        x: '4vw', y: '-4.5vh', opacity: 0.20,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '+=88%', scrub: 1.6 },
      });
      gsap.to(card3Ref.current, {
        x: '4.5vw', y: '4.5vh', opacity: 0.20,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '+=72%', scrub: 1.4 },
      });

      /* Scroll cue fades quickly */
      gsap.to(cueRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '+=12%', scrub: 1 },
      });
    });

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
            <LightSweep pathRef={sweepRef} />
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

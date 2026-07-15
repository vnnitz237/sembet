import { useRef } from 'react';
import { Lock } from 'lucide-react';
import StatusPill from '../components/ui/StatusPill';
import { SemBetLinkButton } from '../components/ui/SemBetButton';
import GlassS from '../components/hero/GlassS';
import PhoneMockup from '../components/hero/PhoneMockup';
import FloatingAppCard from '../components/hero/FloatingAppCard';

/* ─────────────────────────────────────────────────────────────────────────────
   Background: grain + light blobs
───────────────────────────────────────────────────────────────────────────── */
const GRAIN_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)'/%3E%3C/svg%3E";

function SceneBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      <div style={{
        position: 'absolute', top: '-10%', right: '-8%',
        width: '65%', height: '75%', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 60% 35%, rgba(199,232,255,0.28) 0%, transparent 65%)',
      }} />
      <div style={{
        position: 'absolute', top: '30%', left: '-12%',
        width: '55%', height: '50%', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 40% 50%, rgba(143,207,255,0.11) 0%, transparent 65%)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-5%', right: '5%',
        width: '40%', height: '40%', borderRadius: '50%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(90,173,232,0.07) 0%, transparent 65%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        opacity: 0.028,
        backgroundImage: `url("${GRAIN_URI}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Protection line — subtle decorative arc
───────────────────────────────────────────────────────────────────────────── */
function ProtectionLine() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 700"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id="pl-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#318ac7" stopOpacity="0" />
          <stop offset="25%"  stopColor="#318ac7" stopOpacity="0.20" />
          <stop offset="65%"  stopColor="#5aade8" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#8fcfff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 60,180 C 150,120 300,100 420,200 C 500,270 540,360 520,480"
        stroke="url(#pl-g)"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Scroll indicator
───────────────────────────────────────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: 0.42 }}>
      <span style={{ fontSize: '10px', fontWeight: 500, color: '#607789', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        Role para continuar
      </span>
      <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, #607789, transparent)' }} />
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
        <path d="M1 1L5 5L9 1" stroke="#607789" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Copy column
───────────────────────────────────────────────────────────────────────────── */
function CopyColumn() {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-3 lg:gap-6 lg:pr-10 xl:pr-16 lg:justify-center pt-4 lg:pt-0 pb-2 lg:pb-0">
      <StatusPill />

      <h1
        className="text-sb-heading font-bold tracking-tight"
        style={{ fontSize: 'clamp(2.25rem, 4.6vw, 5.5rem)', lineHeight: 1.02, letterSpacing: '-0.035em', maxWidth: '14ch' }}
      >
        Sua decisão merece{' '}
        <span style={{ color: '#318ac7' }}>proteção.</span>
      </h1>

      <p
        className="text-sb-body"
        style={{ fontSize: 'clamp(1rem, 1.35vw, 1.15rem)', lineHeight: 1.72, maxWidth: '530px' }}
      >
        A SemBet cria uma barreira entre o impulso e a aposta, ajudando você a
        manter sua decisão e recuperar o controle da sua vida.
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
        <SemBetLinkButton href="#protecao" variant="primary" size="lg" className="justify-center">
          Quero minha proteção
        </SemBetLinkButton>
        <SemBetLinkButton href="#como-funciona" variant="secondary" size="lg" className="justify-center">
          Ver como funciona
        </SemBetLinkButton>
      </div>

      <p className="flex items-center gap-1.5" style={{ fontSize: '12px', color: '#9ab0be', fontWeight: 500 }}>
        <Lock size={12} aria-hidden className="flex-shrink-0" />
        Privacidade em primeiro lugar. Sem julgamentos.
      </p>

      <div className="hidden lg:flex mt-1">
        <ScrollIndicator />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Visual column
───────────────────────────────────────────────────────────────────────────── */
function VisualColumn() {
  const protCardRef = useRef<HTMLDivElement>(null);
  const progCardRef = useRef<HTMLDivElement>(null);
  const suppCardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex items-center justify-center w-full h-[300px] sm:h-[460px] lg:h-full overflow-hidden lg:overflow-visible"
    >
      <ProtectionLine />

      {/* GlassS — z-index 1, behind phone. Hidden on mobile */}
      <div
        aria-hidden="true"
        className="hidden lg:block"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, marginTop: '-1%' }}
      >
        <GlassS className="w-[clamp(340px,40vw,540px)]" />
      </div>

      {/* PhoneMockup — z-index 2. Mobile: top-aligned so top of phone is visible */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}
           className="lg:!top-1/2 lg:![transform:translate(-50%,-50%)]">
        <PhoneMockup />
      </div>

      {/* Card: Protection — upper left */}
      <div
        ref={protCardRef}
        data-floating-card=""
        data-card-type="protection"
        className="absolute top-[8%] left-[1%] sm:top-[10%] sm:left-[3%] lg:top-[13%] lg:left-[-2%]"
        style={{ zIndex: 3, transformOrigin: 'center center' }}
      >
        <FloatingAppCard variant="protection" />
      </div>

      {/* Card: Progress — upper right */}
      <div
        ref={progCardRef}
        data-floating-card=""
        data-card-type="progress"
        className="absolute top-[5%] right-[1%] sm:top-[7%] sm:right-[2%] lg:top-[9%] lg:right-[1%]"
        style={{ zIndex: 3, transformOrigin: 'center center' }}
      >
        <FloatingAppCard variant="progress" />
      </div>

      {/* Card: Support — lower right, hidden on smallest screens */}
      <div
        ref={suppCardRef}
        data-floating-card=""
        data-card-type="support"
        className="hidden sm:block absolute bottom-[8%] right-[1%] sm:right-[2%] lg:bottom-[12%] lg:right-[2%]"
        style={{ zIndex: 3, transformOrigin: 'center center' }}
      >
        <FloatingAppCard variant="support" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Scene01Hero — exported scene
───────────────────────────────────────────────────────────────────────────── */
export default function Scene01Hero() {
  return (
    <section id="hero" aria-label="Introdução SemBet" style={{ minHeight: '200vh', position: 'relative' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col" style={{ zIndex: 1 }}>
        <SceneBackground />

        <div
          className="sb-container relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-[42%_58%] pt-[var(--sb-nav-height)] overflow-x-hidden"
        >
          <CopyColumn />
          <VisualColumn />
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex lg:hidden justify-center pb-5" aria-hidden="true">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}

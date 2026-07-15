import StatusPill from '../components/ui/StatusPill';
import SemBetButton, { SemBetLinkButton } from '../components/ui/SemBetButton';

/* ─────────────────────────────────────────────────────────────────────────────
   Scene 01 — Hero
   This file contains only the static structure and responsive grid.
   GlassS, PhoneMockup, GSAP timelines and scroll animations → Etapas 3–5.
───────────────────────────────────────────────────────────────────────────── */

/* Dev-only placeholder component — removed in Etapa 3 */
function DevPlaceholder({
  label,
  className = '',
  aspectRatio = '1 / 1',
}: {
  label: string;
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`[placeholder: ${label}]`}
      className={[
        'relative flex items-center justify-center rounded-sb-lg',
        'border border-dashed border-sb-border bg-sb-border-subtle/60',
        className,
      ].join(' ')}
      style={{ aspectRatio }}
    >
      <span className="text-sb-muted text-xs font-medium tracking-widest uppercase pointer-events-none select-none">
        {label}
      </span>
    </div>
  );
}

/* Discrete scroll indicator */
function ScrollIndicator() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col items-center gap-1.5 text-sb-muted"
    >
      <span className="text-[10px] font-medium tracking-[0.2em] uppercase">
        Role para descobrir
      </span>
      {/* Animated dot track */}
      <span className="w-px h-8 bg-gradient-to-b from-sb-border to-transparent block" />
    </div>
  );
}

export default function Scene01Hero() {
  return (
    /*
     * Outer wrapper: ~200vh tall so ScrollTrigger has room to scrub.
     * The inner sticky container pins the visual composition for the first 100vh.
     * Etapa 5 will wire GSAP ScrollTrigger to this structure.
     */
    <section
      id="hero"
      aria-label="Hero da SemBet"
      style={{ minHeight: '200vh' }}
      className="relative"
    >
      {/* ── Sticky container — pins while user scrolls through the 200vh ── */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col"
        style={{ zIndex: 'var(--sb-z-base)' }}
      >
        {/* Very subtle ambient blue glow — purely decorative */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 65% 40%, rgba(199,232,255,0.30) 0%, transparent 70%)',
          }}
        />

        {/* ── Main grid ──────────────────────────────────────────────────── */}
        <div
          className={[
            'sb-container relative z-10',
            'flex-1 flex flex-col',
            /* Desktop: side-by-side two-column layout */
            'lg:grid lg:grid-cols-[1fr_1fr] lg:items-center',
            'pt-[var(--sb-nav-height)]',
          ].join(' ')}
        >
          {/* ── LEFT — Copy column ──────────────────────────────────────── */}
          <div
            className={[
              'flex flex-col gap-6 lg:gap-8',
              /* Mobile: centered text; Desktop: left-aligned */
              'items-center text-center',
              'lg:items-start lg:text-left',
              'pt-10 lg:pt-0',
              'lg:pr-12 xl:pr-20',
            ].join(' ')}
          >
            {/* Status pill */}
            <StatusPill />

            {/* Headline */}
            <h1 className="text-sb-heading font-extrabold leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
              Sua decisão merece{' '}
              <span className="text-sb-action">proteção.</span>
            </h1>

            {/* Description */}
            <p
              className="text-sb-body leading-relaxed max-w-[480px]"
              style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)' }}
            >
              A SemBet cria uma barreira entre o impulso e a aposta, ajudando
              você a manter sua decisão e recuperar o controle da sua vida.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <SemBetLinkButton
                href="#protecao"
                variant="primary"
                size="md"
                className="justify-center sm:whitespace-nowrap"
              >
                Quero minha proteção
              </SemBetLinkButton>
              <SemBetButton
                variant="secondary"
                size="md"
                type="button"
                className="justify-center sm:whitespace-nowrap"
              >
                Ver como funciona
              </SemBetButton>
            </div>

            {/* Scroll indicator — hidden on mobile to keep CTA prominent */}
            <div className="hidden lg:flex mt-2">
              <ScrollIndicator />
            </div>
          </div>

          {/* ── RIGHT — Visual column ───────────────────────────────────── */}
          <div
            className={[
              'relative flex items-center justify-center',
              'w-full max-w-[480px] mx-auto lg:max-w-none lg:mx-0',
              /* Mobile: moderately tall; Desktop: full height area */
              'mt-10 lg:mt-0',
              'h-[320px] sm:h-[400px] lg:h-full',
            ].join(' ')}
          >
            {/* GlassS placeholder — replaced in Etapa 3 */}
            <DevPlaceholder
              label="Glass S"
              aspectRatio="1 / 1"
              className="absolute inset-8 lg:inset-12"
            />

            {/* PhoneMockup placeholder — replaced in Etapa 3 */}
            <DevPlaceholder
              label="Phone Mockup"
              aspectRatio="9 / 19.5"
              className="absolute z-10 w-[120px] sm:w-[140px] lg:w-[168px]"
            />

            {/*
             * FloatingAppCard placeholders — 3 cards extracted during scroll.
             * Positions are approximate; GSAP will take over in Etapa 5.
             */}
            <DevPlaceholder
              label="Card: Proteção ativa"
              aspectRatio="auto"
              className="absolute top-[10%] left-[2%] lg:left-[-8%] w-[130px] lg:w-[150px] py-6 hidden sm:flex"
            />
            <DevPlaceholder
              label="Card: SOS"
              aspectRatio="auto"
              className="absolute top-[10%] right-[2%] lg:right-[-8%] w-[100px] lg:w-[120px] py-6 hidden sm:flex"
            />
            <DevPlaceholder
              label="Card: Progresso"
              aspectRatio="auto"
              className="absolute bottom-[12%] left-1/2 -translate-x-1/2 w-[140px] lg:w-[160px] py-6 hidden sm:flex"
            />
          </div>
        </div>
        {/* ── End of main grid ────────────────────────────────────────────── */}
      </div>
      {/* ── End of sticky container ─────────────────────────────────────────── */}
    </section>
  );
}

// @ts-nocheck — legacy portfolio backup, not used in SemBet
import { useRef, useState, useMemo, Fragment, type CSSProperties } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import ContactButton from '../components/ContactButton';

// ─── Service card images ───────────────────────────────────────────────────
import imgLandingPages from '../assets/services/landing-pages.png';
import imgSaas from '../assets/services/saas.png';
import imgIa from '../assets/services/ia.png';
import imgMobile from '../assets/services/mobile.png';
import imgInstitucional from '../assets/services/institucional.png';
import imgDashboards from '../assets/services/dashboards.png';
import imgEcommerce from '../assets/services/ecommerce.png';
import imgSistemas from '../assets/services/sistemas.png';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────────────────
// ScrollDecryptText
// ─────────────────────────────────────────────────────────────────────────────

const POOL_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const POOL_LOWER = 'abcdefghijklmnopqrstuvwxyz';

function cryptoChar(char: string, index: number, tick: number): string {
  const pool = char >= 'a' && char <= 'z' ? POOL_LOWER : POOL_UPPER;
  return pool[(index * 17 + tick * 13) % pool.length];
}

function isLetter(char: string): boolean {
  return /[A-Za-zÀ-ÿ]/.test(char);
}

function ScrollDecryptText({
  text,
  progress,
  className,
  style,
}: {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  style?: CSSProperties;
}) {
  const chars = useMemo(() => text.split(''), [text]);
  const [revealed, setRevealed] = useState(0);
  const [tick, setTick] = useState(0);

  useMotionValueEvent(progress, 'change', (p) => {
    setRevealed(Math.min(Math.floor(p * chars.length), chars.length));
    setTick(Math.floor(p * 40));
  });

  return (
    <span className={className} style={style}>
      <span className="sr-only">{text.replace(/\n/g, ' ')}</span>
      <span aria-hidden="true">
        {chars.map((char, i) => {
          if (char === '\n') return <br key={i} />;
          if (char === ' ') return <Fragment key={i}>{' '}</Fragment>;
          const isRevealed = i < revealed;
          const display =
            !isRevealed && isLetter(char) ? cryptoChar(char, i, tick) : char;
          return (
            <span key={i} style={{ opacity: isRevealed ? 1 : 0.45 }}>
              {display}
            </span>
          );
        })}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ScrollRevealWords
// ─────────────────────────────────────────────────────────────────────────────

const ABOUT_TEXT =
  'Com mais de cinco anos de experiência em design, eu foco em branding, design de sites e experiência do usuário, eu realmente gosto de trabalhar com empresas que querem se destacar e apresentar sua melhor imagem. Vamos construir algo incrível juntos!';

function RevealWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min((index + 1) / total + 0.01, 1);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return (
    <motion.span style={{ opacity, display: 'inline' }}>
      {word}
    </motion.span>
  );
}

function ScrollRevealWords({
  text,
  progress,
  className,
  style,
}: {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  style?: CSSProperties;
}) {
  const words = text.split(' ');
  return (
    <p className={className} style={style} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <RevealWord word={word} index={i} total={words.length} progress={progress} />
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

interface ShowcaseItem {
  title: string;
  category: string;
  description: string;
  image: string;
}

const ROW_ONE: ShowcaseItem[] = [
  {
    title: 'Landing Pages',
    category: 'LANDING PAGE',
    description: 'Páginas estratégicas com design premium e foco em conversão.',
    image: imgLandingPages,
  },
  {
    title: 'SaaS',
    category: 'SAAS',
    description: 'Produtos digitais escaláveis, completos e fáceis de usar.',
    image: imgSaas,
  },
  {
    title: 'Inteligência Artificial',
    category: 'AI',
    description: 'Interfaces e automações inteligentes para otimizar operações.',
    image: imgIa,
  },
  {
    title: 'Aplicativos Mobile',
    category: 'MOBILE',
    description: 'Experiências digitais fluidas para dispositivos móveis.',
    image: imgMobile,
  },
];

const ROW_TWO: ShowcaseItem[] = [
  {
    title: 'Sites Institucionais',
    category: 'INSTITUCIONAL',
    description: 'Sites profissionais que aumentam autoridade e credibilidade.',
    image: imgInstitucional,
  },
  {
    title: 'Dashboards',
    category: 'DASHBOARD',
    description: 'Painéis visuais para organizar dados e decisões.',
    image: imgDashboards,
  },
  {
    title: 'E-commerce',
    category: 'E-COMMERCE',
    description: 'Lojas digitais modernas, rápidas e orientadas à conversão.',
    image: imgEcommerce,
  },
  {
    title: 'Sistemas Personalizados',
    category: 'SISTEMAS',
    description: 'Plataformas desenvolvidas de acordo com cada necessidade.',
    image: imgSistemas,
  },
];

const OBJS = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: 'Ícone da lua',
    className:
      'absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    side: 'left' as const,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: 'Objeto 3D',
    className:
      'absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]',
    side: 'left' as const,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: 'Ícone de lego',
    className:
      'absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    side: 'right' as const,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: 'Grupo 3D',
    className:
      'absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]',
    side: 'right' as const,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DataStream — scroll-synced particles for the About → Services transition
// ─────────────────────────────────────────────────────────────────────────────

function genStreamParticles() {
  const result = [];
  for (let i = 0; i < 28; i++) {
    const a = (i * 73 + 11) % 97;
    const b = (i * 37 + 7) % 83;
    const c = (i * 19 + 29) % 71;
    result.push({
      x: (10 + (a / 96) * 80).toFixed(1) + '%',
      startP: 0.88 + (b % 5) * 0.016,
      endP: Math.min(0.88 + (b % 5) * 0.016 + 0.06 + (c % 4) * 0.01, 1.0),
      startY: -30 + (b % 5) * 15,
      endY: 120 + (c % 5) * 60,
      isLine: i % 4 === 0,
      isSpark: i % 7 === 0,
      maxOpacity: 0.20 + (a % 4) * 0.08,
      color: i % 3 === 0 ? '#00ffb4' : i % 3 === 1 ? '#00c8ff' : '#4dffd2',
    });
  }
  return result;
}

const STREAM_PARTICLES = genStreamParticles();

function DataStreamParticle({
  progress,
  cfg,
}: {
  progress: MotionValue<number>;
  cfg: (typeof STREAM_PARTICLES)[number];
}) {
  const midP = cfg.startP + (cfg.endP - cfg.startP) * 0.35;
  const opacity = useTransform(
    progress,
    [cfg.startP, midP, cfg.endP],
    [0, cfg.maxOpacity, 0],
  );
  const y = useTransform(progress, [cfg.startP, cfg.endP], [cfg.startY, cfg.endY]);

  return (
    <motion.span
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: cfg.x,
        top: '45%',
        display: 'block',
        width: cfg.isLine ? 1 : cfg.isSpark ? 3 : 2,
        height: cfg.isLine ? 22 : cfg.isSpark ? 3 : 2,
        borderRadius: cfg.isLine ? 1 : '50%',
        backgroundColor: cfg.color,
        boxShadow: cfg.isSpark ? `0 0 6px ${cfg.color}` : 'none',
        opacity,
        y,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
    />
  );
}

function _DataStreamLayer({ progress }: { progress: MotionValue<number> }) {
  const layerOpacity = useTransform(progress, [0.86, 0.88], [0, 1]);
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 40, opacity: layerOpacity }}
    >
      {STREAM_PARTICLES.map((cfg, i) => (
        <DataStreamParticle key={i} progress={progress} cfg={cfg} />
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ShowcaseCard
// ─────────────────────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 13L13 3M13 3H6M13 3V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <motion.article
      tabIndex={0}
      className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group focus:outline-none"
      style={{
        aspectRatio: '3/2',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(255,255,255,0.06)',
        background: '#111',
        // Defined so Framer Motion can interpolate correctly on hover
        boxShadow: '0 0px 0px rgba(255,255,255,0), 0 0px 0px rgba(160,180,255,0)',
      }}
      whileHover={{
        scale: 1.015,
        y: -3,
        borderColor: 'rgba(255,255,255,0.15)',
        boxShadow:
          '0 8px 30px rgba(255,255,255,0.04), 0 0 24px rgba(160,180,255,0.06)',
        transition: { duration: 0.3, ease: EASE },
      }}
      whileFocus={{
        borderColor: 'rgba(255,255,255,0.22)',
        boxShadow:
          '0 0 0 2px rgba(255,255,255,0.18), 0 8px 30px rgba(255,255,255,0.04)',
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      </motion.div>

      <div
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.14)' }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex items-end justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] text-white/40 uppercase leading-none">
            {item.category}
          </span>
          <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base leading-tight">
            {item.title}
          </h3>
          <p className="text-white/50 text-[10px] sm:text-xs leading-relaxed hidden md:block">
            {item.description}
          </p>
        </div>
        <motion.span
          className="flex-shrink-0 text-white/40 group-hover:text-white/80 transition-colors duration-300"
          whileHover={{ x: 2, y: -2 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <ArrowIcon />
        </motion.span>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ScrollCard — per-card entry only (opacity 0→1, clamped — never goes back)
// ─────────────────────────────────────────────────────────────────────────────

// Each card: 0.05-wide entry window, 0.03 stagger
const CARD_RANGES: [number, number][] = [
  [0.30, 0.35],
  [0.33, 0.38],
  [0.36, 0.41],
  [0.39, 0.44],
  [0.42, 0.47],
  [0.45, 0.50],
  [0.48, 0.53],
  [0.51, 0.56],
];

function ScrollCard({
  item,
  progress,
  rangeStart,
  rangeEnd,
}: {
  item: ShowcaseItem;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
}) {
  // p goes 0→1 within the card's window, then clamps to 1 — never reverses
  const p = useTransform(progress, [rangeStart, rangeEnd], [0, 1]);
  const opacity = useTransform(p, [0, 1], [0, 1]);
  const y = useTransform(p, [0, 1], [30, 0]);
  const scale = useTransform(p, [0, 1], [0.96, 1]);
  const filter = useTransform(p, [0, 1], ['blur(10px)', 'blur(0px)']);

  return (
    <motion.div style={{ opacity, y, scale, filter, width: '100%' }}>
      <ShowcaseCard item={item} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Static fallback (prefers-reduced-motion)
// ─────────────────────────────────────────────────────────────────────────────

function StoryStatic() {
  const all = [...ROW_ONE, ...ROW_TWO];
  return (
    <>
      <section
        id="capabilities"
        className="py-20 sm:py-28 bg-[#0C0C0C]"
        style={{ overflowX: 'clip' }}
      >
        <div className="px-6 sm:px-10 md:px-16 mb-10 sm:mb-14">
          <span className="block text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-white/30 uppercase mb-3">
            Capacidades
          </span>
          <h2
            className="hero-heading font-black uppercase leading-[0.9] tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.4rem, 8vw, 9rem)' }}
          >
            O QUE POSSO
            <br />
            CONSTRUIR PARA VOCÊ
          </h2>
          <p className="text-white/40 font-light text-sm sm:text-base leading-relaxed max-w-md">
            Soluções digitais criadas para unir design, tecnologia, performance e inteligência
            artificial.
          </p>
        </div>
        <div className="px-4 sm:px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {all.map((item) => (
            <ShowcaseCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section
        id="about"
        className="relative py-20 sm:py-28 bg-[#0C0C0C] flex flex-col items-center justify-center"
      >
        {OBJS.map((obj) => (
          <div key={obj.alt} className={obj.className}>
            <img src={obj.src} alt={obj.alt} className="w-full h-auto" />
          </div>
        ))}
        <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 px-6">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Sobre mim
          </h2>
          <p
            className="mx-auto w-full max-w-[900px] px-6 text-center leading-[1.6] whitespace-normal text-[#D7E2EA] font-medium"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          >
            {ABOUT_TEXT}
          </p>
          <ContactButton />
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage 1 — CapabilitiesIntro (z-index: 10)
//
// MONOTONIC sequence — enter ONCE, hold, exit ONCE, never returns:
//   [0.00 → 0.08]  stage fades in (opacity 0→1, blur 12px→0px)
//   [0.08 → 0.24]  title + desc decrypt reveal
//   [0.24 → 0.34]  title shrinks/rises, desc fades (cards entering in parallel)
//   [0.34 → 0.58]  stage holds — title small, desc gone
//   [0.58 → 0.68]  stage exits (opacity 1→0, blur 0px→14px) — FINAL STATE: opacity 0
// ─────────────────────────────────────────────────────────────────────────────

function CapabilitiesIntro({ progress }: { progress: MotionValue<number> }) {
  // 4-keyframe enter-hold-hold-exit: before 0.00 → clamps to 0, after 0.68 → clamps to 0
  const stageOpacity = useTransform(
    progress,
    [0.00, 0.08, 0.58, 0.68],
    [0, 1, 1, 0],
  );
  const stageFilter = useTransform(
    progress,
    [0.00, 0.08, 0.58, 0.68],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(14px)'],
  );

  // Title decrypt: 0.08→0.24
  const titleProgress = useTransform(progress, [0.08, 0.24], [0, 1]);
  // Desc decrypt: 0.14→0.28
  const descProgress = useTransform(progress, [0.14, 0.28], [0, 1]);

  // Title shrinks as cards enter: scale 1→0.72, y 0→-140px during [0.24, 0.34]
  // After 0.34 clamps to: scale=0.72, y=-140 (stays out of cards' way)
  const titleScale = useTransform(progress, [0.24, 0.34], [1, 0.72]);
  const titleY = useTransform(progress, [0.24, 0.34], [0, -140]);

  // Description fades: opacity 1→0 during [0.24, 0.32], then clamps to 0
  const descOpacity = useTransform(progress, [0.24, 0.32], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col px-6 sm:px-10 md:px-16 pt-[10vh] sm:pt-[12vh] md:pt-[14vh]"
      style={{
        zIndex: 10,
        opacity: stageOpacity,
        filter: stageFilter,
        pointerEvents: 'none',
      }}
    >
      <span className="block text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-white/30 uppercase mb-3 sm:mb-4">
        Capacidades
      </span>

      <motion.h2
        className="hero-heading font-black uppercase leading-[0.9] tracking-tight mb-4 sm:mb-6"
        style={{
          fontSize: 'clamp(2rem, 7vw, 8rem)',
          scale: titleScale,
          y: titleY,
          transformOrigin: 'left top',
        }}
      >
        <ScrollDecryptText
          text={'O QUE POSSO\nCONSTRUIR PARA VOCÊ'}
          progress={titleProgress}
        />
      </motion.h2>

      <motion.p
        className="text-white/40 font-light text-sm sm:text-base leading-relaxed max-w-md"
        style={{ opacity: descOpacity }}
      >
        <ScrollDecryptText
          text="Soluções digitais criadas para unir design, tecnologia, performance e inteligência artificial."
          progress={descProgress}
        />
      </motion.p>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage 2 — CapabilitiesCards (z-index: 20)
//
// MONOTONIC sequence — enter ONCE, hold, exit ONCE, never returns:
//   [0.24 → 0.32]  stage fades in
//   [0.30 → 0.56]  8 cards enter staggered (within stage)
//   [0.56 → 0.62]  all cards fully visible, stage holds
//   [0.62 → 0.72]  stage exits — FINAL STATE: opacity 0
//
// NO filter on this wrapper — avoids compounding with per-card blur
// ─────────────────────────────────────────────────────────────────────────────

function CapabilitiesCards({ progress }: { progress: MotionValue<number> }) {
  // 4-keyframe enter-hold-hold-exit: before 0.24 → 0, after 0.72 → 0
  const stageOpacity = useTransform(
    progress,
    [0.24, 0.32, 0.62, 0.72],
    [0, 1, 1, 0],
  );

  // Enable pointer events only while the stage is meaningfully visible so
  // hover works on the cards; disable when invisible to avoid ghost blocking.
  const [cardsInteractive, setCardsInteractive] = useState(false);
  useMotionValueEvent(stageOpacity, 'change', (v) => {
    setCardsInteractive(v > 0.05);
  });

  const all = [...ROW_ONE, ...ROW_TWO];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 pt-[12vh]"
      style={{
        zIndex: 20,
        opacity: stageOpacity,
        pointerEvents: cardsInteractive ? 'auto' : 'none',
      }}
    >
      <div className="grid w-full max-w-[1680px] grid-cols-2 md:grid-cols-4 gap-4">
        {all.map((item, i) => (
          <ScrollCard
            key={item.title}
            item={item}
            progress={progress}
            rangeStart={CARD_RANGES[i][0]}
            rangeEnd={CARD_RANGES[i][1]}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage 3 — AboutStage (z-index: 30)
//
// MONOTONIC sequence — enters ONCE, holds until end, NO EXIT:
//   [0.68 → 0.78]  stage fades in (opacity 0→1)
//   [0.68 → 0.80]  stage blur resolves (blur 16px→0px) — explicitly ends at blur(0px)
//   [0.72 → 0.84]  3D objects slide in from sides
//   [0.72 → 0.84]  title enters
//   [0.82 → 0.96]  body text word-by-word reveal
//   [0.94 → 1.00]  button enters
//
// Filter ONLY on stage wrapper — no nested filter to avoid compounding
// ─────────────────────────────────────────────────────────────────────────────

function AboutStage({ progress }: { progress: MotionValue<number> }) {
  const [btnActive, setBtnActive] = useState(false);
  useMotionValueEvent(progress, 'change', (v) => {
    // Active only while button is visible and before the stage exits
    setBtnActive(v >= 0.88 && v < 0.92);
  });

  // Stage: 4-keyframe enter-hold-hold-exit — fires exactly once in each direction
  // Before 0.68 → clamps to 0 (hidden); after 0.99 → clamps to 0 (dissolved)
  const stageOpacity = useTransform(
    progress,
    [0.68, 0.78, 0.92, 0.99],
    [0, 1, 1, 0],
  );
  // Blur enters (16px→0px by 0.80), holds clear, then blurs out on data-stream exit
  const stageFilter = useTransform(
    progress,
    [0.68, 0.80, 0.92, 0.99],
    ['blur(16px)', 'blur(0px)', 'blur(0px)', 'blur(12px)'],
  );
  // Exit scale: shrinks slightly as content dissolves into the data stream
  const stageScale = useTransform(progress, [0.92, 0.99], [1, 0.97]);

  // 3D objects: fully in by 0.80 — parent stage handles exit
  const objOpacity = useTransform(progress, [0.73, 0.80], [0, 1]);
  const leftX = useTransform(progress, [0.73, 0.80], [-64, 0]);
  const rightX = useTransform(progress, [0.73, 0.80], [64, 0]);
  const objY = useTransform(progress, [0.73, 1.0], [0, -20]);

  // Title: fully in by 0.80 — parent stage handles exit
  const titleOpacity = useTransform(progress, [0.73, 0.80], [0, 1]);
  const titleY = useTransform(progress, [0.73, 0.80], [32, 0]);
  const titleScale = useTransform(progress, [0.73, 0.80], [0.96, 1]);

  // Text: fully revealed by 0.88 — pause before data-stream dissolve at 0.92
  const textProgress = useTransform(progress, [0.80, 0.88], [0, 1]);

  // Button: fully visible by 0.91 — brief pause before dissolve begins at 0.92
  const btnOpacity = useTransform(progress, [0.88, 0.91], [0, 1]);
  const btnScale = useTransform(progress, [0.88, 0.91], [0.96, 1]);
  const btnY = useTransform(progress, [0.88, 0.91], [18, 0]);

  return (
    <motion.div
      id="about"
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        zIndex: 30,
        opacity: stageOpacity,
        filter: stageFilter,
        scale: stageScale,
        pointerEvents: 'none',
      }}
    >
      {/* 3D decorative objects — positioned relative to this stage (absolute inset-0 = 100vh) */}
      {OBJS.map((obj) => (
        <motion.div
          key={obj.alt}
          className={obj.className}
          style={{
            opacity: objOpacity,
            x: obj.side === 'left' ? leftX : rightX,
            y: objY,
          }}
        >
          <img src={obj.src} alt={obj.alt} className="w-full h-auto" />
        </motion.div>
      ))}

      {/* Content — above the 3D objects */}
      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 md:gap-14 w-full">
        <motion.h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center w-full px-4"
          style={{
            fontSize: 'clamp(3rem, 12vw, 160px)',
            opacity: titleOpacity,
            y: titleY,
            scale: titleScale,
          }}
        >
          Sobre mim
        </motion.h2>

        <div className="flex flex-col items-center gap-10 sm:gap-14 w-full">
          <ScrollRevealWords
            text={ABOUT_TEXT}
            progress={textProgress}
            className="mx-auto w-full max-w-[900px] px-6 text-center leading-[1.6] whitespace-normal text-[#D7E2EA] font-medium"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          {/* pointer-events: auto on the button itself overrides parent's none */}
          <motion.div
            style={{
              opacity: btnOpacity,
              scale: btnScale,
              y: btnY,
              pointerEvents: btnActive ? 'auto' : 'none',
            }}
          >
            <ContactButton />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StorySection — 520vh container, ONE useScroll, ONE sticky pin, THREE layers
//
// Sequence (global scrollYProgress 0→1):
//   0.00–0.68  Stage 1 active (CapabilitiesIntro, z-10)
//   0.24–0.72  Stage 2 active (CapabilitiesCards, z-20)
//   0.68–1.00  Stage 3 active (AboutStage, z-30)
//
// Each stage is a separate absolute div — they do NOT share wrappers.
// All transforms are monotonic (enter once, hold, exit once or never).
// ─────────────────────────────────────────────────────────────────────────────

export default function StorySection() {
  const storyRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ['start start', 'end end'],
  });

  if (prefersReduced) return <StoryStatic />;

  return (
    // 520vh = ~4 full viewport scrolls — enough time for each stage to breathe
    <section ref={storyRef} className="relative" style={{ height: '520vh' }}>
      {/* Single sticky pin — all three stages live inside, layered by z-index */}
<div
  className="sticky top-0 overflow-hidden"
  style={{ height: '100vh', background: '#0C0C0C' }}
>
  <CapabilitiesIntro progress={scrollYProgress} />

  <CapabilitiesCards progress={scrollYProgress} />

  <AboutStage progress={scrollYProgress} />

  {/* Partículas removidas */}
</div>
    </section>
  );
}

import { useRef, useState, useMemo, Fragment } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Decrypt helpers ──────────────────────────────────────────────
const POOL_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const POOL_LOWER = 'abcdefghijklmnopqrstuvwxyz';

function cryptoChar(char: string, index: number, tick: number): string {
  const pool = char >= 'a' && char <= 'z' ? POOL_LOWER : POOL_UPPER;
  return pool[(index * 17 + tick * 13) % pool.length];
}

function isLetter(char: string): boolean {
  return /[A-Za-zÀ-ÿ]/.test(char);
}

// ── ScrollDecryptText ────────────────────────────────────────────
function ScrollDecryptText({
  text,
  progress,
  className,
  style,
}: {
  text: string;
  progress: MotionValue<number>;
  className?: string;
  style?: React.CSSProperties;
}) {
  const prefersReduced = useReducedMotion();
  const chars = useMemo(() => text.split(''), [text]);
  const [revealed, setRevealed] = useState(0);
  const [tick, setTick] = useState(0);

  useMotionValueEvent(progress, 'change', (p) => {
    if (prefersReduced) return;
    setRevealed(Math.min(Math.floor(p * chars.length), chars.length));
    setTick(Math.floor(p * 40));
  });

  if (prefersReduced) {
    return (
      <span className={className} style={style}>
        {text.split('\n').map((line, i, arr) => (
          <Fragment key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </Fragment>
        ))}
      </span>
    );
  }

  return (
    <span className={className} style={style}>
      <span className="sr-only">{text.replace(/\n/g, ' ')}</span>
      <span aria-hidden="true">
        {chars.map((char, i) => {
          if (char === '\n') return <br key={i} />;
          if (char === ' ') return <Fragment key={i}>{' '}</Fragment>;
          const isRevealed = i < revealed;
          const encrypt = !isRevealed && isLetter(char);
          const display = encrypt ? cryptoChar(char, i, tick) : char;
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

// ── Data ─────────────────────────────────────────────────────────
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
    image: '/images/showcase/landing-page.webp',
  },
  {
    title: 'SaaS',
    category: 'SAAS',
    description: 'Produtos digitais escaláveis, completos e fáceis de usar.',
    image: '/images/showcase/saas.webp',
  },
  {
    title: 'Inteligência Artificial',
    category: 'AI',
    description: 'Interfaces e automações inteligentes para otimizar operações.',
    image: '/images/showcase/ai.webp',
  },
  {
    title: 'Aplicativos Mobile',
    category: 'MOBILE',
    description: 'Experiências digitais fluidas para dispositivos móveis.',
    image: '/images/showcase/mobile-app.webp',
  },
];

const ROW_TWO: ShowcaseItem[] = [
  {
    title: 'Sites Institucionais',
    category: 'INSTITUCIONAL',
    description: 'Sites profissionais que aumentam autoridade e credibilidade.',
    image: '/images/showcase/institutional.webp',
  },
  {
    title: 'Dashboards',
    category: 'DASHBOARD',
    description: 'Painéis visuais para organizar dados e decisões.',
    image: '/images/showcase/dashboard.webp',
  },
  {
    title: 'E-commerce',
    category: 'E-COMMERCE',
    description: 'Lojas digitais modernas, rápidas e orientadas à conversão.',
    image: '/images/showcase/ecommerce.webp',
  },
  {
    title: 'Sistemas Personalizados',
    category: 'SISTEMAS',
    description: 'Plataformas desenvolvidas de acordo com cada necessidade.',
    image: '/images/showcase/custom-system.webp',
  },
];

// ── ArrowIcon ────────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

// ── ShowcaseCard ─────────────────────────────────────────────────
function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <motion.article
      className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        width: 'clamp(280px, 33vw, 500px)',
        aspectRatio: '3/2',
        border: '1px solid rgba(255,255,255,0.06)',
        background: '#111',
      }}
      whileHover={{ y: -6, transition: { duration: 0.4, ease: EASE } }}
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
        className="absolute inset-0 transition-opacity duration-400 group-hover:opacity-80"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.14)' }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold tracking-[0.18em] text-white/40 uppercase">
            {item.category}
          </span>
          <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">
            {item.title}
          </h3>
          <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-[260px] hidden sm:block">
            {item.description}
          </p>
        </div>

        <motion.span
          className="flex-shrink-0 text-white/40 group-hover:text-white/80 transition-colors duration-300"
          whileHover={{ x: 3, y: -3 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <ArrowIcon />
        </motion.span>
      </div>
    </motion.article>
  );
}

// ── ScrollCard — individual card reveal driven by scroll progress ─
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
  const prefersReduced = useReducedMotion();
  const p = useTransform(progress, [rangeStart, rangeEnd], [0, 1]);
  const opacity = useTransform(p, [0, 1], [0, 1]);
  const y = useTransform(p, [0, 1], prefersReduced ? [0, 0] : [50, 0]);
  const scale = useTransform(p, [0, 1], prefersReduced ? [1, 1] : [0.93, 1]);
  const filter = useTransform(
    p,
    [0, 1],
    prefersReduced ? ['blur(0px)', 'blur(0px)'] : ['blur(14px)', 'blur(0px)'],
  );

  return (
    <motion.div style={{ flexShrink: 0, opacity, y, scale, filter }}>
      <ShowcaseCard item={item} />
    </motion.div>
  );
}

// start/end within [0,1] for each card index (0–7)
function cardRange(index: number): [number, number] {
  const start = 0.72 + index * 0.032;
  return [start, Math.min(start + 0.075, 1.0)];
}

// ── Section ──────────────────────────────────────────────────────
export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Single scroll source: the tall container drives every animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Phase 0–20%: eyebrow fade-up
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.12, 0.20], [0, 1, 1]);
  const eyebrowY = useTransform(
    scrollYProgress,
    [0, 0.12],
    prefersReduced ? [0, 0] : [24, 0],
  );
  const eyebrowFilter = useTransform(
    scrollYProgress,
    [0, 0.12],
    prefersReduced ? ['blur(0px)', 'blur(0px)'] : ['blur(8px)', 'blur(0px)'],
  );

  // ── Phase 20–52%: title decrypt
  const titleProgress = useTransform(scrollYProgress, [0.20, 0.52], [0, 1]);
  const titleOpacity = useTransform(titleProgress, [0, 0.35, 1], [0, 0.55, 1]);
  const titleFilter = useTransform(
    titleProgress,
    [0, 0.35, 1],
    ['blur(8px)', 'blur(2px)', 'blur(0px)'],
  );

  // ── Phase 52–72%: description decrypt
  const descProgress = useTransform(scrollYProgress, [0.52, 0.72], [0, 1]);
  const descOpacity = useTransform(descProgress, [0, 0.5, 1], [0, 0.7, 1]);
  const descFilter = useTransform(
    descProgress,
    [0, 0.5, 1],
    ['blur(6px)', 'blur(1px)', 'blur(0px)'],
  );

  // ── Row parallax (continuous, gentle drift throughout scroll)
  const rowOneX = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['5%', '-5%'],
  );
  const rowTwoX = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['-5%', '5%'],
  );

  return (
    // 400 vh container = 300 vh of pinned scroll story after section anchors
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      {/* Sticky pinned section — stays at top:0 while container scrolls */}
      <section
        className="relative py-24 sm:py-32 md:py-40"
        style={{
          position: 'sticky',
          top: 0,
          background: '#0C0C0C',
          overflow: 'clip',
        }}
      >
        {/* header */}
        <div className="px-6 sm:px-10 md:px-16 mb-16 sm:mb-20 md:mb-24">

          {/* Eyebrow */}
          <motion.span
            className="block text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-white/30 uppercase mb-4"
            style={{ opacity: eyebrowOpacity, y: eyebrowY, filter: eyebrowFilter }}
          >
            Capacidades
          </motion.span>

          {/* Title — scroll-driven decrypt */}
          <div className="overflow-hidden mb-6">
            <motion.h2
              className="hero-heading font-black uppercase leading-[0.9] tracking-tight"
              style={{
                fontSize: 'clamp(2.4rem, 8vw, 9rem)',
                opacity: titleOpacity,
                filter: titleFilter,
              }}
            >
              <ScrollDecryptText
                text={'O QUE POSSO\nCONSTRUIR PARA VOCÊ'}
                progress={titleProgress}
              />
            </motion.h2>
          </div>

          {/* Description — scroll-driven decrypt */}
          <motion.p
            className="text-white/40 font-light text-sm sm:text-base leading-relaxed max-w-md"
            style={{ opacity: descOpacity, filter: descFilter }}
          >
            <ScrollDecryptText
              text="Soluções digitais criadas para unir design, tecnologia, performance e inteligência artificial."
              progress={descProgress}
            />
          </motion.p>
        </div>

        {/* row 1 — cards 0–3, appear during phase 72–90% */}
        <motion.div
          className="flex gap-4 sm:gap-5 mb-4 sm:mb-5"
          style={{ x: rowOneX, willChange: 'transform' }}
        >
          {ROW_ONE.map((item, i) => {
            const [start, end] = cardRange(i);
            return (
              <ScrollCard
                key={item.title}
                item={item}
                progress={scrollYProgress}
                rangeStart={start}
                rangeEnd={end}
              />
            );
          })}
        </motion.div>

        {/* row 2 — cards 4–7, appear during phase 85–100% */}
        <motion.div
          className="flex gap-4 sm:gap-5"
          style={{ x: rowTwoX, willChange: 'transform' }}
        >
          {ROW_TWO.map((item, i) => {
            const [start, end] = cardRange(i + 4);
            return (
              <ScrollCard
                key={item.title}
                item={item}
                progress={scrollYProgress}
                rangeStart={start}
                rangeEnd={end}
              />
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}

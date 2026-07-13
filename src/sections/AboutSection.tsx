import { useRef, type CSSProperties } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import ContactButton from '../components/ContactButton';

const ABOUT_TEXT =
  'Com mais de cinco anos de experiência em design, eu foco em branding, design de sites e experiência do usuário, eu realmente gosto de trabalhar com empresas que querem se destacar e apresentar sua melhor imagem. Vamos construir algo incrível juntos!';

// ── 3D decorative objects ─────────────────────────────────────────
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

// ── ScrollRevealText — character-by-character driven by a MotionValue ─
function RevealChar({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min((index + 1) / total + 0.005, 1);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return (
    <motion.span style={{ opacity }}>
      {char === ' ' ? ' ' : char}
    </motion.span>
  );
}

function ScrollRevealText({
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
  const chars = text.split('');
  return (
    <p className={className} style={style} aria-label={text}>
      <span aria-hidden="true">
        {chars.map((char, i) => (
          <RevealChar key={i} char={char} index={i} total={chars.length} progress={progress} />
        ))}
      </span>
    </p>
  );
}

// ── Reduced-motion static fallback ────────────────────────────────
function AboutStatic() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
    >
      {OBJS.map((obj) => (
        <div key={obj.alt} className={obj.className}>
          <img src={obj.src} alt={obj.alt} className="w-full h-auto" />
        </div>
      ))}

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Sobre mim
        </h2>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <p
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          >
            {ABOUT_TEXT}
          </p>
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

// ── ScrollDrivenObject — one 3D decorative image ──────────────────
function ScrollDrivenObject({
  obj,
  opacity,
  filter,
  x,
  y,
}: {
  obj: (typeof OBJS)[number];
  opacity: MotionValue<number>;
  filter: MotionValue<string>;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <motion.div className={obj.className} style={{ opacity, filter, x, y }}>
      <img src={obj.src} alt={obj.alt} className="w-full h-auto" />
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────
export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Single scroll source — the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Phase 0–25%: 3D objects emerge
  const objOpacity = useTransform(scrollYProgress, [0, 0.18, 0.25], [0, 1, 1]);
  const objFilter = useTransform(
    scrollYProgress,
    [0, 0.18],
    ['blur(12px)', 'blur(0px)'],
  );
  // Left objects slide in from left; right objects from right
  const leftX = useTransform(scrollYProgress, [0, 0.22], [-64, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.22], [64, 0]);
  // Gentle y parallax as section scrolls (floats upward slowly)
  const objY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  // ── Phase 12–48%: title reveal
  const titleOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.30, 0.48],
    [0, 0.65, 1],
  );
  const titleFilter = useTransform(
    scrollYProgress,
    [0.12, 0.30, 0.48],
    ['blur(14px)', 'blur(4px)', 'blur(0px)'],
  );
  const titleScale = useTransform(scrollYProgress, [0.12, 0.48], [0.96, 1]);
  const titleY = useTransform(scrollYProgress, [0.12, 0.48], [32, 0]);

  // ── Phase 44–80%: body text character reveal (progress 0→1)
  const textProgress = useTransform(scrollYProgress, [0.44, 0.80], [0, 1]);

  // ── Phase 72–92%: button entrance
  const btnOpacity = useTransform(scrollYProgress, [0.72, 0.88, 0.92], [0, 0.9, 1]);
  const btnFilter = useTransform(
    scrollYProgress,
    [0.72, 0.88],
    ['blur(8px)', 'blur(0px)'],
  );
  const btnScale = useTransform(scrollYProgress, [0.72, 0.92], [0.96, 1]);
  const btnY = useTransform(scrollYProgress, [0.72, 0.92], [20, 0]);

  if (prefersReduced) return <AboutStatic />;

  return (
    // 220 vh container gives ~120 vh of pinned scroll story
    <div ref={containerRef} style={{ height: '220vh', position: 'relative' }}>
      <section
        id="about"
        className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
        style={{ position: 'sticky', top: 0 }}
      >
        {/* 3D decorative objects */}
        {OBJS.map((obj) => (
          <ScrollDrivenObject
            key={obj.alt}
            obj={obj}
            opacity={objOpacity}
            filter={objFilter}
            x={obj.side === 'left' ? leftX : rightX}
            y={objY}
          />
        ))}

        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          {/* Title */}
          <motion.h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{
              fontSize: 'clamp(3rem, 12vw, 160px)',
              opacity: titleOpacity,
              filter: titleFilter,
              scale: titleScale,
              y: titleY,
            }}
          >
            Sobre mim
          </motion.h2>

          <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
            {/* Body text — character-by-character reveal */}
            <ScrollRevealText
              text={ABOUT_TEXT}
              progress={textProgress}
              className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
            />

            {/* Button */}
            <motion.div
              style={{
                opacity: btnOpacity,
                filter: btnFilter,
                scale: btnScale,
                y: btnY,
              }}
            >
              <ContactButton />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

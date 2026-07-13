import { useState, useEffect, useRef, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  animate,
} from 'framer-motion';
import Magnet from '../components/Magnet';
import avatarImg from '../assets/avatar.png';

const NAV_LINKS = [
  { label: 'Serviços', href: '#price' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Processo', href: '#process' },
  { label: 'Contato', href: '#contact' },
];

const TITLE_LINES = ['EU CRIO', 'EXPERIÊNCIAS', 'DIGITAIS'];

const STATS = [
  { label: 'Projetos', value: 25, suffix: '+' },
  { label: 'UI Exclusiva', value: 100, suffix: '%' },
  { label: 'Resposta', value: 24, suffix: 'h' },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeBlurUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(10px)', scale: 0.97 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.8, delay: d, ease },
  }),
};

const navFade = {
  hidden: { opacity: 0, y: -12 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease },
  }),
};

const titleClip = {
  hidden: { y: '120%' },
  show: (d: number = 0) => ({
    y: '0%',
    transition: { duration: 1.1, delay: d, ease },
  }),
};

// ─── Stack badges ──────────────────────────────────────────────────────────

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

type StackItem = { name: string; color: string; icon: React.ReactNode };

const STACK_ITEMS: StackItem[] = [
  {
    name: 'React',
    color: '#61DAFB',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
        <ellipse cx="12" cy="12" rx="10" ry="3.5" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-60 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    color: '#E2E8F0',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M4 4v16h2.5V8.8l9 11.2H18V4h-2.5v11.2L7 4H4z" />
      </svg>
    ),
  },
  {
    name: 'TailwindCSS',
    color: '#06B6D4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.67 3.5-1 .76 1.33 1.83 2 3.5 2 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.67-3.5 1-.76-1.33-1.83-2-3.5-2zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.67 3.5-1 .76 1.33 1.83 2 3.5 2 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.67-3.5 1-.76-1.33-1.83-2-3.5-2z" />
      </svg>
    ),
  },
  {
    name: 'Three.js',
    color: '#049EF4',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M12 2L22 19H2L12 2z" />
        <path d="M7 19l5-9 5 9H7z" />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    color: '#BB4B96',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M6 4h12v8H6zM6 12h6l6 6H6zM6 18l6 6v-6H6z" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    color: '#3ECF8E',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M13 2L4 14h7.5l-2 8 10.5-12H13.5z" />
      </svg>
    ),
  },
  {
    name: 'OpenAI',
    color: '#74AA9C',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
        <line x1="12" y1="3" x2="12" y2="7" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <line x1="3" y1="12" x2="7" y2="12" />
        <line x1="17" y1="12" x2="21" y2="12" />
        <line x1="5.64" y1="5.64" x2="8.46" y2="8.46" />
        <line x1="15.54" y1="15.54" x2="18.36" y2="18.36" />
        <line x1="5.64" y1="18.36" x2="8.46" y2="15.54" />
        <line x1="15.54" y1="8.46" x2="18.36" y2="5.64" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    color: '#CC785C',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d="M12 3L3 21h3.5l1.5-4h8l1.5 4H21L12 3zm0 5.5l2.8 8h-5.6L12 8.5z" />
      </svg>
    ),
  },
];

const BADGE_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

function StackBadge({
  item,
  isTapped,
  onTap,
}: {
  item: StackItem;
  isTapped: boolean;
  onTap: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || isTapped;

  const borderColor = active
    ? hexToRgba(item.color, 0.55)
    : 'rgba(255,255,255,0.05)';
  const boxShadow = active
    ? `0 0 0 1px ${hexToRgba(item.color, 0.2)}, 0 0 18px ${hexToRgba(item.color, 0.18)}, 0 8px 28px rgba(0,0,0,0.25)`
    : '0 0 0 0 transparent';

  return (
    <motion.button
      type="button"
      aria-pressed={active}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onTap}
      animate={{ scale: active ? 1.03 : 1 }}
      transition={{ duration: 0.25, ease: BADGE_EASE }}
      className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.12em] cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent"
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor,
        boxShadow,
        color: active ? item.color : 'rgba(215, 226, 234, 0.35)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Fixed-width icon slot — always reserves space to prevent layout shift */}
      <span
        className="flex-shrink-0 inline-flex items-center justify-center"
        style={{ width: '1em', height: '1em' }}
      >
        <motion.span
          className="inline-flex items-center justify-center w-full h-full"
          animate={
            active
              ? { opacity: 1, scale: 1, x: 0 }
              : { opacity: 0, scale: 0.8, x: -6 }
          }
          transition={{ duration: 0.25, ease: BADGE_EASE }}
        >
          {item.icon}
        </motion.span>
      </span>

      {item.name}
    </motion.button>
  );
}

// ─── StatCounter ───────────────────────────────────────────────────────────

function StatCounter({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const numRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    const el = numRef.current;
    const timeout = setTimeout(() => {
      const ctrl = animate(0, value, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(v) {
          el.textContent = String(Math.round(v));
        },
      });
      return () => ctrl.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={wrapRef}
      variants={fadeBlurUp}
      initial="hidden"
      animate="show"
      custom={delay}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-[#D7E2EA] font-semibold text-xl sm:text-2xl md:text-3xl tabular-nums">
        <span ref={numRef}>0</span>
        {suffix}
      </span>
      <span className="text-[#D7E2EA]/35 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium">
        {label}
      </span>
    </motion.div>
  );
}

// ─── HeroParticles ─────────────────────────────────────────────────────────

function HeroParticles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 1,
        d: Math.random() * 25 + 12,
        o: Math.random() * -20,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {dots.map((p) => (
        <div
          key={p.i}
          className="absolute rounded-full bg-white/[0.04]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            animation: `heroFloat ${p.d}s ease-in-out ${p.o}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}

// ─── HeroSection ───────────────────────────────────────────────────────────

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [tapActive, setTapActive] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const prefersReducedMotion = useReducedMotion();

  const rawOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [1, 1, 0]);
  const rawBlur = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    ['blur(0px)', 'blur(0px)', 'blur(18px)'],
  );
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const heroOpacity = prefersReducedMotion ? 1 : rawOpacity;
  const heroBlur = prefersReducedMotion ? 'blur(0px)' : rawBlur;
  const heroScale = prefersReducedMotion ? 1 : rawScale;
  const heroY = prefersReducedMotion ? 0 : rawY;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const sec = sectionRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - r.left - 300}px,${e.clientY - r.top - 300}px)`;
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const handleBadgeTap = (name: string) => {
    setTapActive((prev) => (prev === name ? null : name));
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col"
      style={{ overflow: 'clip', background: '#0C0C0C' }}
    >
      <motion.div
        className="relative flex-1 flex flex-col"
        style={{
          opacity: heroOpacity,
          filter: heroBlur,
          scale: heroScale,
          y: heroY,
        }}
      >
      {/* cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(118,33,176,0.06), transparent 70%)',
          willChange: 'transform',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
        }}
        aria-hidden
      />

      <HeroParticles />

      {/* nav */}
      <nav className="relative z-30 flex justify-center gap-6 sm:gap-10 md:gap-14 px-6 md:px-10 pt-7 md:pt-9">
        {NAV_LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            variants={navFade}
            initial="hidden"
            animate="show"
            custom={i * 0.08}
            className="group relative text-[#D7E2EA]/50 hover:text-[#D7E2EA] font-medium uppercase tracking-[0.15em] text-[11px] sm:text-xs md:text-sm blur-[0.3px] hover:blur-0 transition-all duration-300"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-full h-px bg-[#D7E2EA] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </motion.a>
        ))}
      </nav>

      {/* centre */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* heading */}
        <h1
          className="relative z-[5] text-center select-none"
          aria-label="Eu crio experiências digitais"
        >
          {TITLE_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block hero-heading font-black uppercase tracking-tight"
                style={{
                  fontSize: 'clamp(2.2rem, 10vw, 12rem)',
                  lineHeight: 0.92,
                }}
                variants={titleClip}
                initial="hidden"
                animate="show"
                custom={0.2 + i * 0.12}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* avatar */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[60%] -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10 w-[190px] sm:w-[310px] md:w-[400px] lg:w-[480px]"
        >
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <motion.div
              variants={fadeBlurUp}
              initial="hidden"
              animate="show"
              custom={0.55}
            >
              <motion.img
                src={avatarImg}
                alt="Vinicius"
                className="w-full h-auto"
                animate={{ scale: [1, 1.006, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ willChange: 'transform', display: 'block' }}
              />
            </motion.div>
          </Magnet>
        </div>
      </div>

      {/* bottom */}
      <div className="relative z-20 px-6 md:px-10 pb-5 sm:pb-7 md:pb-10 flex flex-col gap-5 sm:gap-7">
        {/* stack badges */}
        <motion.div
          variants={fadeBlurUp}
          initial="hidden"
          animate="show"
          custom={0.85}
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
        >
          {STACK_ITEMS.map((item) => (
            <StackBadge
              key={item.name}
              item={item}
              isTapped={tapActive === item.name}
              onTap={() => handleBadgeTap(item.name)}
            />
          ))}
        </motion.div>

        {/* desc + cta */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-5">
          <motion.p
            variants={fadeBlurUp}
            initial="hidden"
            animate="show"
            custom={0.65}
            className="text-[#D7E2EA]/75 font-medium text-sm sm:text-base leading-relaxed max-w-[280px] text-center sm:text-left"
          >
            Transformo ideias em produtos digitais com design premium, alta
            performance e inteligência artificial.
          </motion.p>

          <motion.a
            href="#contact"
            variants={fadeBlurUp}
            initial="hidden"
            animate="show"
            custom={0.85}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 text-[11px] sm:text-xs text-white font-semibold uppercase tracking-[0.2em] cursor-pointer select-none"
            style={{
              background:
                'linear-gradient(135deg, #18011F 0%, #B600A8 40%, #7621B0 75%, #BE4C00 100%)',
              boxShadow:
                '0 0 30px rgba(118,33,176,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <span
              className="absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(182,0,168,0.3), rgba(118,33,176,0.3))',
                filter: 'blur(14px)',
              }}
              aria-hidden
            />
            <span className="relative">Iniciar Projeto</span>
          </motion.a>
        </div>

        {/* stats */}
        <div className="flex justify-center gap-10 sm:gap-14 md:gap-20 pt-1">
          {STATS.map((s, i) => (
            <StatCounter key={s.label} {...s} delay={0.95 + i * 0.1} />
          ))}
        </div>
      </div>
      </motion.div>
    </section>
  );
}

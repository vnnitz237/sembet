import { useId } from 'react';

export interface GlassSProps {
  scale?: number;
  opacity?: number;
  blur?: number;
  rotation?: number;
  lightPosition?: { x: number; y: number };
  className?: string;
}

/**
 * Center-line spine of the S letterform.
 * Drawn as a thick stroke path — each layer adds depth and translucency.
 * No text, no foreignObject, no canvas. Pure SVG paths + gradients + filters.
 */
const S_SPINE =
  'M 196,62 C 220,32 198,20 158,20 ' +
  'C 100,20 44,56 44,98 ' +
  'C 44,140 90,164 134,182 ' +
  'C 178,200 216,228 216,272 ' +
  'C 216,314 176,322 128,322 ' +
  'C 82,322 44,306 36,282';

export default function GlassS({
  scale = 1,
  opacity = 1,
  blur = 0,
  rotation = 0,
  lightPosition = { x: 0.32, y: 0.26 },
  className = '',
}: GlassSProps) {
  const raw = useId();
  const uid = raw.replace(/:/g, 'gs');

  /* Light source mapped to viewBox 260×340 */
  const lx = lightPosition.x * 260;
  const ly = lightPosition.y * 340;

  const style: React.CSSProperties = {
    opacity,
    overflow: 'visible',
    transformOrigin: 'center',
    display: 'block',
  };
  const transforms: string[] = [];
  if (scale !== 1) transforms.push(`scale(${scale})`);
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (transforms.length) style.transform = transforms.join(' ');
  if (blur > 0) style.filter = `blur(${blur}px)`;

  return (
    <svg
      viewBox="0 0 260 340"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <defs>
        {/* ── Gradients ─────────────────────────────────────────────────── */}

        {/* Body: lit from upper-left toward lower-right */}
        <linearGradient
          id={`${uid}-body`}
          x1={lx} y1={ly} x2="240" y2="320"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#e8f5ff" stopOpacity="0.92" />
          <stop offset="30%"  stopColor="#c7e8ff" stopOpacity="0.80" />
          <stop offset="65%"  stopColor="#a8d8f5" stopOpacity="0.68" />
          <stop offset="100%" stopColor="#8fcfff" stopOpacity="0.55" />
        </linearGradient>

        {/* Inner shine: white highlight on lit side */}
        <linearGradient
          id={`${uid}-shine`}
          x1="28" y1="18" x2="210" y2="290"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.70" />
          <stop offset="45%"  stopColor="#ffffff" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#c7e8ff" stopOpacity="0.05" />
        </linearGradient>

        {/* Edge glint: bright on top-left, fading to blue */}
        <linearGradient
          id={`${uid}-edge`}
          x1="30" y1="14" x2="228" y2="326"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1.00" />
          <stop offset="40%"  stopColor="#c7e8ff" stopOpacity="0.80" />
          <stop offset="100%" stopColor="#5aade8" stopOpacity="0.30" />
        </linearGradient>

        {/* Outer glow: soft but present */}
        <linearGradient
          id={`${uid}-glow`}
          x1="130" y1="0" x2="130" y2="340"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#8fcfff" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#318ac7" stopOpacity="0.14" />
        </linearGradient>

        {/* Border outline gradient */}
        <linearGradient
          id={`${uid}-border`}
          x1="30" y1="14" x2="228" y2="326"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#8fcfff" stopOpacity="0.55" />
          <stop offset="50%"  stopColor="#5aade8" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#318ac7" stopOpacity="0.18" />
        </linearGradient>

        {/* ── Filters ───────────────────────────────────────────────────── */}

        {/* Single blur — only used on the outer glow layer */}
        <filter id={`${uid}-blur`} x="-55%" y="-40%" width="210%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
        </filter>

        {/* ── Mask — clips reflection to S body area ─────────────────── */}
        <mask id={`${uid}-mask`}>
          <path
            d={S_SPINE}
            stroke="white"
            strokeWidth="56"
            fill="none"
            strokeLinecap="round"
          />
        </mask>
      </defs>

      {/* ── 1. Diffuse outer glow ────────────────────────────────────────── */}
      <path d={S_SPINE} stroke={`url(#${uid}-glow)`} strokeWidth="90"
        fill="none" strokeLinecap="round"
        filter={`url(#${uid}-blur)`} opacity="0.80" />

      {/* ── 2. Border layer — slightly wider than body, defines S edge ───── */}
      <path d={S_SPINE} stroke={`url(#${uid}-border)`} strokeWidth="58"
        fill="none" strokeLinecap="round" opacity="0.60" />

      {/* ── 3. Glass body — main translucent form ────────────────────────── */}
      <path d={S_SPINE} stroke={`url(#${uid}-body)`} strokeWidth="52"
        fill="none" strokeLinecap="round" />

      {/* ── 4. Inner shine ────────────────────────────────────────────────── */}
      <path d={S_SPINE} stroke={`url(#${uid}-shine)`} strokeWidth="42"
        fill="none" strokeLinecap="round" />

      {/* ── 5. Frosted centre band ────────────────────────────────────────── */}
      <path d={S_SPINE} stroke="rgba(255,255,255,0.18)" strokeWidth="24"
        fill="none" strokeLinecap="round" />

      {/* ── 6. Reflection patch — masked to S body ───────────────────────── */}
      <g mask={`url(#${uid}-mask)`}>
        <ellipse cx={lx} cy={ly + 18} rx="62" ry="88" fill="white"
          opacity="0.30" transform={`rotate(-24 ${lx} ${ly + 18})`} />
        <ellipse cx={lx + 20} cy={ly - 10} rx="28" ry="40" fill="white"
          opacity="0.16" transform={`rotate(-18 ${lx + 20} ${ly - 10})`} />
      </g>

      {/* ── 7. Edge glint — finest bright outline ────────────────────────── */}
      <path d={S_SPINE} stroke={`url(#${uid}-edge)`} strokeWidth="1.8"
        fill="none" strokeLinecap="round" opacity="0.94" />
    </svg>
  );
}

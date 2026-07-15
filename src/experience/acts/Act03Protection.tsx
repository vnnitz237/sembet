import { forwardRef } from 'react';
import { ShieldCheck } from 'lucide-react';

/**
 * Act03Protection — callout that appears beside the phone in Act 3.
 *
 * Positioned absolutely in the stage by ExperienceStage.
 * GSAP controls: opacity, x (slides in from right), visibility.
 * Starts hidden (opacity:0).
 */
const Act03Protection = forwardRef<HTMLDivElement, Record<string, never>>((_, ref) => (
  <div
    ref={ref}
    aria-hidden="true"   // visible only after Act 3 starts; GSAP updates aria-hidden when appropriate
    style={{
      position: 'absolute',
      zIndex: 10,
      width: 'clamp(200px, 18vw, 260px)',
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: '16px',
      border: '1px solid rgba(49,138,199,0.14)',
      boxShadow: '0 12px 48px rgba(49,138,199,0.14), 0 2px 8px rgba(23,43,58,0.06)',
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      opacity: 0,
      willChange: 'transform, opacity',
    }}
  >
    {/* Icon */}
    <div
      style={{
        width: '36px', height: '36px', borderRadius: '10px',
        background: 'rgba(49,138,199,0.10)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <ShieldCheck size={18} color="#318ac7" aria-hidden />
    </div>

    {/* Text */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <p style={{
        fontSize: 'clamp(13px, 1vw, 15px)',
        fontWeight: 700,
        color: '#172b3a',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        margin: 0,
      }}>
        Proteção que trabalha em silêncio.
      </p>
      <p style={{
        fontSize: 'clamp(11px, 0.85vw, 13px)',
        color: '#607789',
        lineHeight: 1.6,
        margin: 0,
      }}>
        A SemBet identifica e bloqueia sites e aplicativos de apostas
        conhecidos enquanto você continua usando o celular normalmente.
      </p>
    </div>
  </div>
));

Act03Protection.displayName = 'Act03Protection';
export default Act03Protection;

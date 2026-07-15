import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface Act03ProtectionHandle {
  titleEl: HTMLParagraphElement | null;
  descEl:  HTMLParagraphElement | null;
}

/**
 * Act03Protection — minimal floating callout beside the phone in Act 3.
 *
 * Design: no heavy card box — just floating text with a blue dot + eyebrow.
 * Parent div in ExperienceStage controls position and container opacity.
 * Title and description are individually revealed via GSAP blur-reveal.
 */
const Act03Protection = forwardRef<Act03ProtectionHandle, object>((_, ref) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef  = useRef<HTMLParagraphElement>(null);

  useImperativeHandle(ref, () => ({
    get titleEl() { return titleRef.current; },
    get descEl()  { return descRef.current; },
  }));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: 'clamp(260px, 22vw, 360px)',
        padding: '4px 0',
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      }}
    >
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          aria-hidden="true"
          style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#318ac7', flexShrink: 0,
            boxShadow: '0 0 6px rgba(49,138,199,0.55)',
          }}
        />
        <span style={{
          fontSize: '10px', fontWeight: 700, color: '#318ac7',
          letterSpacing: '.18em', textTransform: 'uppercase',
        }}>
          Proteção ativa
        </span>
      </div>

      {/* Title — individually animated */}
      <p
        ref={titleRef}
        style={{
          fontSize: 'clamp(17px, 1.45vw, 22px)',
          fontWeight: 700,
          color: '#172b3a',
          lineHeight: 1.18,
          letterSpacing: '-0.025em',
          margin: 0,
          opacity: 0,
          willChange: 'filter, opacity',
        }}
      >
        Proteção que trabalha em silêncio.
      </p>

      {/* Thin divider */}
      <div aria-hidden style={{ width: '28px', height: '1px', background: 'rgba(49,138,199,0.28)' }} />

      {/* Description — individually animated */}
      <p
        ref={descRef}
        style={{
          fontSize: 'clamp(12px, 0.9vw, 14px)',
          color: '#607789',
          lineHeight: 1.72,
          margin: 0,
          opacity: 0,
          willChange: 'filter, opacity',
        }}
      >
        A SemBet identifica e bloqueia sites e aplicativos de apostas conhecidos
        enquanto você continua usando o celular normalmente.
      </p>
    </div>
  );
});

Act03Protection.displayName = 'Act03Protection';
export default Act03Protection;

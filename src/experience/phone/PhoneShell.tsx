import { forwardRef } from 'react';

interface PhoneShellProps {
  children: React.ReactNode;
}

/**
 * PhoneShell — the physical device frame only.
 * Children (screens) are rendered inside the screen area.
 * This component never unmounts; screen switching is handled by GSAP opacity on children.
 */
const PhoneShell = forwardRef<HTMLDivElement, PhoneShellProps>(({ children }, ref) => (
  <div
    ref={ref}
    aria-label="Interface do aplicativo SemBet — mockup ilustrativo"
    role="img"
    style={{
      width: 'clamp(260px, 20vw, 310px)',
      flexShrink: 0,
      position: 'relative',
    }}
  >
    {/* Chassis */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'clamp(34px, 4vw, 44px)',
        background: 'linear-gradient(145deg, #dde9f4 0%, #c6d8ea 60%, #b8cfe4 100%)',
        boxShadow:
          '0 40px 80px rgba(23,43,58,0.22), 0 10px 28px rgba(49,138,199,0.14), inset 0 1px 0 rgba(255,255,255,0.75)',
        border: '1.5px solid rgba(49,138,199,0.08)',
      }}
    />

    {/* Screen area */}
    <div
      style={{
        position: 'relative',
        margin: '10px',
        borderRadius: 'clamp(26px, 3.4vw, 36px)',
        overflow: 'hidden',
        background: '#f8fbfe',
        aspectRatio: '9 / 19.3',
        boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      {/* Camera pill */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '72px',
          height: '7px',
          borderRadius: '4px',
          background: '#c4d4e0',
          zIndex: 20,
        }}
      />
      {/* Screens slot — all screens rendered here simultaneously */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {children}
      </div>
    </div>

    {/* Surface gloss */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: '10px',
        borderRadius: 'clamp(26px, 3.4vw, 36px)',
        background: 'linear-gradient(108deg, rgba(255,255,255,0.26) 0%, transparent 45%)',
        pointerEvents: 'none',
        zIndex: 15,
      }}
    />
  </div>
));

PhoneShell.displayName = 'PhoneShell';
export default PhoneShell;

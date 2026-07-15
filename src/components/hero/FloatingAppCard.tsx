import { forwardRef } from 'react';
import { ShieldCheck, CalendarCheck, HeartHandshake } from 'lucide-react';

export type CardVariant = 'protection' | 'progress' | 'support';

interface FloatingAppCardProps {
  variant: CardVariant;
  className?: string;
  style?: React.CSSProperties;
}

const CARDS = {
  protection: {
    Icon: ShieldCheck,
    title: 'Proteção ativa',
    subtitle: 'Sites e aplicativos bloqueados',
    iconColor: '#318ac7',
    iconBg: 'rgba(49,138,199,0.10)',
  },
  progress: {
    Icon: CalendarCheck,
    title: '18 dias',
    subtitle: 'Sua decisão continua protegida',
    iconColor: '#5aade8',
    iconBg: 'rgba(90,173,232,0.10)',
  },
  support: {
    Icon: HeartHandshake,
    title: 'Estou com vontade de apostar',
    subtitle: 'Criar uma pausa agora',
    iconColor: '#8fcfff',
    iconBg: 'rgba(143,207,255,0.18)',
  },
} as const;

const FloatingAppCard = forwardRef<HTMLDivElement, FloatingAppCardProps>(
  ({ variant, className = '', style }, ref) => {
    const { Icon, title, subtitle, iconColor, iconBg } = CARDS[variant];
    const isWide = variant === 'support';

    return (
      <div
        ref={ref}
        data-floating-card=""
        data-card-type={variant}
        className={className}
        style={{
          transformOrigin: 'center center',
          background: 'rgba(255,255,255,0.86)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '14px',
          border: '1px solid rgba(226,238,245,0.90)',
          boxShadow:
            '0 8px 32px rgba(49,138,199,0.10), 0 2px 8px rgba(23,43,58,0.06)',
          padding: '11px 13px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          width: isWide ? '188px' : '166px',
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          ...style,
        }}
      >
        {/* Icon */}
        <div
          aria-hidden="true"
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '8px',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={15} color={iconColor} aria-hidden />
        </div>

        {/* Text */}
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#172b3a',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              marginBottom: '3px',
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: '10px',
              color: '#607789',
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    );
  },
);

FloatingAppCard.displayName = 'FloatingAppCard';
export default FloatingAppCard;

import { Shield, ShieldCheck, Home, TrendingUp, User, Bell } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   PhoneMockup — original neutral smartphone frame + SemBet app UI.
   No iPhone/Android-specific design. Created entirely in HTML/CSS.
───────────────────────────────────────────────────────────────────────────── */

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${pct}% da meta concluída`}
      style={{
        height: '5px',
        borderRadius: '3px',
        background: '#e2eef5',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: '3px',
          background: 'linear-gradient(90deg, #8fcfff 0%, #318ac7 100%)',
        }}
      />
    </div>
  );
}

const NAV_ITEMS = [
  { Icon: Home,       label: 'Início',    active: true  },
  { Icon: TrendingUp, label: 'Progresso', active: false },
  { Icon: Shield,     label: 'Proteção',  active: false },
  { Icon: User,       label: 'Perfil',    active: false },
] as const;

export default function PhoneMockup() {
  return (
    /* Outer 3-D frame */
    <div
      aria-label="Interface do aplicativo SemBet — mockup ilustrativo"
      role="img"
      style={{
        width: 'clamp(268px, 21vw, 326px)',
        flexShrink: 0,
        position: 'relative',
        transform:
          'perspective(1100px) rotateY(-6deg) rotateX(2deg) rotateZ(-0.5deg)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Phone chassis */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'clamp(34px, 4vw, 44px)',
          background:
            'linear-gradient(145deg, #dde9f4 0%, #c6d8ea 60%, #b8cfe4 100%)',
          boxShadow:
            '0 40px 80px rgba(23,43,58,0.24), 0 10px 28px rgba(49,138,199,0.16), inset 0 1px 0 rgba(255,255,255,0.75)',
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
          /* Intrinsic height via aspect ratio keeps layout stable */
          aspectRatio: '9 / 19.3',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Dynamic-island / camera pill */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '76px',
            height: '8px',
            borderRadius: '4px',
            background: '#c4d4e0',
            zIndex: 10,
          }}
        />

        {/* App chrome */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            paddingTop: '28px',
          }}
        >
          {/* ── App header ───────────────────────────── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 16px 4px',
            }}
          >
            <span
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#172b3a',
                letterSpacing: '-0.03em',
              }}
            >
              SemBet
            </span>
            <Bell size={13} color="#607789" aria-hidden />
          </div>

          {/* ── Scrollable content (no actual scroll — fixed layout) ───── */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '6px 13px 8px',
              overflow: 'hidden',
            }}
          >
            {/* Greeting */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <div
                aria-hidden="true"
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #c7e8ff 0%, #5aade8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#172b3a',
                  flexShrink: 0,
                }}
              >
                L
              </div>
              <div>
                <div style={{ fontSize: '9px', color: '#607789', lineHeight: 1 }}>
                  Boa tarde,
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#172b3a',
                    lineHeight: 1.1,
                  }}
                >
                  Lucas
                </div>
              </div>
            </div>

            {/* Status card */}
            <div
              style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '10px',
                padding: '9px 11px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(49,138,199,0.10)',
                boxShadow: '0 2px 8px rgba(49,138,199,0.07)',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '6px',
                  background: 'rgba(49,138,199,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={12} color="#318ac7" aria-hidden />
              </div>
              <div>
                <div
                  style={{ fontSize: '11px', fontWeight: 700, color: '#172b3a' }}
                >
                  Proteção ativa
                </div>
                <div style={{ fontSize: '9px', color: '#607789', marginTop: '1px' }}>
                  Tudo funcionando normalmente.
                </div>
              </div>
            </div>

            {/* Main counter */}
            <div
              style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '12px',
                padding: '12px 11px 10px',
                border: '1px solid rgba(49,138,199,0.08)',
                boxShadow: '0 2px 8px rgba(49,138,199,0.06)',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '38px',
                    fontWeight: 800,
                    color: '#172b3a',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}
                >
                  18
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#318ac7',
                    marginTop: '1px',
                  }}
                >
                  dias
                </div>
                <div
                  style={{ fontSize: '9px', color: '#607789', marginTop: '3px' }}
                >
                  protegendo sua decisão
                </div>
              </div>

              {/* Progress toward goal */}
              <div style={{ marginTop: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}
                >
                  <span style={{ fontSize: '9px', color: '#607789' }}>
                    Meta atual
                  </span>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#318ac7',
                    }}
                  >
                    30 dias
                  </span>
                </div>
                <ProgressBar pct={60} />
              </div>
            </div>

            {/* SOS / Support button — blue tones per brief */}
            <button
              type="button"
              aria-label="Preciso de apoio"
              style={{
                width: '100%',
                padding: '9px 0',
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #c7e8ff 0%, #8fcfff 100%)',
                border: '1px solid rgba(49,138,199,0.14)',
                fontSize: '11px',
                fontWeight: 700,
                color: '#172b3a',
                cursor: 'default',
                letterSpacing: '-0.01em',
              }}
            >
              Preciso de apoio
            </button>

            {/* Metrics row */}
            <div style={{ display: 'flex', gap: '7px' }}>
              <div
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.92)',
                  borderRadius: '9px',
                  padding: '7px 8px',
                  border: '1px solid rgba(49,138,199,0.08)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#172b3a',
                    letterSpacing: '-0.02em',
                  }}
                >
                  8
                </div>
                <div style={{ fontSize: '8px', color: '#607789', marginTop: '2px' }}>
                  acessos bloqueados
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.92)',
                  borderRadius: '9px',
                  padding: '7px 8px',
                  border: '1px solid rgba(49,138,199,0.08)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#318ac7',
                    letterSpacing: '-0.02em',
                  }}
                >
                  R$450
                </div>
                <div style={{ fontSize: '8px', color: '#607789', marginTop: '2px' }}>
                  estimados preservados
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom navigation ─────────────────────── */}
          <nav
            aria-label="Navegação do aplicativo"
            style={{
              display: 'flex',
              borderTop: '1px solid #e2eef5',
              padding: '7px 0 10px',
              background: 'rgba(248,251,254,0.96)',
              flexShrink: 0,
            }}
          >
            {NAV_ITEMS.map(({ Icon, label, active }) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Icon
                  size={15}
                  color={active ? '#318ac7' : '#9ab0be'}
                  aria-hidden
                />
                <span
                  style={{
                    fontSize: '8px',
                    color: active ? '#318ac7' : '#9ab0be',
                    fontWeight: active ? 700 : 400,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Screen surface gloss — subtle vertical highlight */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '10px',
          borderRadius: 'clamp(26px, 3.4vw, 36px)',
          background:
            'linear-gradient(108deg, rgba(255,255,255,0.28) 0%, transparent 45%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
    </div>
  );
}

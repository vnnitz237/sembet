import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Shield, ShieldCheck, Home, TrendingUp, User, Bell } from 'lucide-react';

export interface ScreenHomeHandle {
  protectionCardEl: HTMLDivElement | null;
  screenContentEl:  HTMLDivElement | null;
  /* secondary elements — animated individually in Act 3 */
  greetingEl:       HTMLDivElement | null;
  counterEl:        HTMLDivElement | null;
  supportEl:        HTMLButtonElement | null;
  metricsEl:        HTMLDivElement | null;
  navEl:            HTMLElement | null;
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${pct}% da meta concluída`}
      style={{ height: '5px', borderRadius: '3px', background: '#e2eef5', overflow: 'hidden' }}
    >
      <div style={{ height: '100%', width: `${pct}%`, borderRadius: '3px', background: 'linear-gradient(90deg,#8fcfff 0%,#318ac7 100%)' }} />
    </div>
  );
}

const NAV_ITEMS = [
  { Icon: Home,       label: 'Início',    active: true  },
  { Icon: TrendingUp, label: 'Progresso', active: false },
  { Icon: Shield,     label: 'Proteção',  active: false },
  { Icon: User,       label: 'Guardião',  active: false },
] as const;

const ScreenHome = forwardRef<ScreenHomeHandle, object>((_, ref) => {
  const protectionCardRef = useRef<HTMLDivElement>(null);
  const screenContentRef  = useRef<HTMLDivElement>(null);
  const greetingRef       = useRef<HTMLDivElement>(null);
  const counterRef        = useRef<HTMLDivElement>(null);
  const supportRef        = useRef<HTMLButtonElement>(null);
  const metricsRef        = useRef<HTMLDivElement>(null);
  const navRef            = useRef<HTMLElement>(null);

  useImperativeHandle(ref, () => ({
    get protectionCardEl() { return protectionCardRef.current; },
    get screenContentEl()  { return screenContentRef.current; },
    get greetingEl()       { return greetingRef.current; },
    get counterEl()        { return counterRef.current; },
    get supportEl()        { return supportRef.current; },
    get metricsEl()        { return metricsRef.current; },
    get navEl()            { return navRef.current; },
  }));

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        paddingTop: '26px',
        background: '#f8fbfe',
      }}
    >
      {/* App header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 16px 4px' }}>
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#172b3a', letterSpacing: '-0.03em' }}>SemBet</span>
        <Bell size={13} color="#607789" aria-hidden />
      </div>

      {/* Scrollable content wrapper */}
      <div
        ref={screenContentRef}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '6px 13px 8px', overflow: 'hidden' }}
      >
        {/* Greeting — secondary element */}
        <div ref={greetingRef} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <div
            aria-hidden="true"
            style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#c7e8ff 0%,#5aade8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 800, color: '#172b3a', flexShrink: 0,
            }}
          >L</div>
          <div>
            <div style={{ fontSize: '9px', color: '#607789', lineHeight: 1 }}>Boa tarde,</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#172b3a', lineHeight: 1.1 }}>Lucas</div>
          </div>
        </div>

        {/* ── "Proteção ativa" card — Act 3 PRIMARY target ── */}
        <div
          ref={protectionCardRef}
          style={{
            background: 'rgba(255,255,255,0.98)',
            borderRadius: '10px',
            padding: '9px 11px',
            display: 'flex', alignItems: 'center', gap: '8px',
            border: '1px solid rgba(49,138,199,0.12)',
            boxShadow: '0 2px 8px rgba(49,138,199,0.07)',
            position: 'relative',
            zIndex: 4,
            transformOrigin: 'center center',
            willChange: 'transform, filter',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: '22px', height: '22px', borderRadius: '6px',
              background: 'rgba(49,138,199,0.10)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <ShieldCheck size={12} color="#318ac7" aria-hidden />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#172b3a' }}>Proteção ativa</div>
            <div style={{ fontSize: '9px', color: '#607789', marginTop: '1px' }}>Tudo funcionando normalmente.</div>
          </div>
        </div>

        {/* Days counter — secondary element */}
        <div
          ref={counterRef}
          style={{
            background: 'rgba(255,255,255,0.95)', borderRadius: '12px',
            padding: '12px 11px 10px', border: '1px solid rgba(49,138,199,0.08)',
            boxShadow: '0 2px 8px rgba(49,138,199,0.06)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '38px', fontWeight: 800, color: '#172b3a', lineHeight: 1, letterSpacing: '-0.04em' }}>18</div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#318ac7', marginTop: '1px' }}>dias</div>
            <div style={{ fontSize: '9px', color: '#607789', marginTop: '3px' }}>protegendo sua decisão</div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '9px', color: '#607789' }}>Meta atual</span>
              <span style={{ fontSize: '9px', fontWeight: 700, color: '#318ac7' }}>30 dias</span>
            </div>
            <ProgressBar pct={60} />
          </div>
        </div>

        {/* Support button — secondary element */}
        <button
          ref={supportRef}
          type="button"
          aria-label="Preciso de apoio"
          style={{
            width: '100%', padding: '9px 0', borderRadius: '9px',
            background: 'linear-gradient(135deg,#c7e8ff 0%,#8fcfff 100%)',
            border: '1px solid rgba(49,138,199,0.14)',
            fontSize: '11px', fontWeight: 700, color: '#172b3a',
            cursor: 'default', letterSpacing: '-0.01em',
          }}
        >
          Preciso de apoio
        </button>

        {/* Metrics — secondary element */}
        <div ref={metricsRef} style={{ display: 'flex', gap: '7px' }}>
          {[
            { value: '8',     label: 'acessos bloqueados',    color: '#172b3a' },
            { value: 'R$450', label: 'estimados preservados', color: '#318ac7' },
          ].map(({ value, label, color }) => (
            <div
              key={label}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.92)', borderRadius: '9px',
                padding: '7px 8px', border: '1px solid rgba(49,138,199,0.08)', textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 800, color, letterSpacing: '-0.02em' }}>{value}</div>
              <div style={{ fontSize: '8px', color: '#607789', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav — secondary element */}
      <nav
        ref={navRef}
        aria-label="Navegação do aplicativo"
        style={{
          display: 'flex', borderTop: '1px solid #e2eef5',
          padding: '7px 0 10px', background: 'rgba(248,251,254,0.96)', flexShrink: 0,
        }}
      >
        {NAV_ITEMS.map(({ Icon, label, active }) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
            <Icon size={15} color={active ? '#318ac7' : '#9ab0be'} aria-hidden />
            <span style={{ fontSize: '8px', color: active ? '#318ac7' : '#9ab0be', fontWeight: active ? 700 : 400 }}>{label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
});

ScreenHome.displayName = 'ScreenHome';
export default ScreenHome;

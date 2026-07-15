import { forwardRef } from 'react';
import { Lock } from 'lucide-react';
import { SemBetLinkButton } from '../../components/ui/SemBetButton';
import StatusPill from '../../components/ui/StatusPill';

interface Act01IntroProps {
  compact?: boolean;
}

/**
 * Act01Intro — copy block shown in Act 1.
 *
 * On desktop: positioned absolute on the left side of the stage.
 * On mobile:  stacked above the phone.
 *
 * The ref points to the root div so ExperienceStage can animate
 * opacity + blur during Act 2 (copy exits as phone zooms in).
 */
const Act01Intro = forwardRef<HTMLDivElement, Act01IntroProps>(
  ({ compact = false }, ref) => (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: compact ? '10px' : '20px' }}>
      <StatusPill />

      <div>
        <h1
          style={{
            fontSize: compact ? 'clamp(28px, 5vw, 38px)' : 'clamp(40px, 4.2vw, 60px)',
            fontWeight: 800,
            color: '#172b3a',
            lineHeight: 1.08,
            letterSpacing: '-0.04em',
            margin: 0,
          }}
        >
          Sua decisão
          <br />
          merece{' '}
          <span style={{ color: '#318ac7' }}>proteção.</span>
        </h1>
      </div>

      <p
        style={{
          fontSize: compact ? '13px' : 'clamp(14px, 1.1vw, 17px)',
          color: '#607789',
          lineHeight: 1.65,
          maxWidth: '36ch',
          margin: 0,
        }}
      >
        A SemBet cria uma barreira entre o impulso e a aposta,
        ajudando você a manter sua decisão e recuperar o controle.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <SemBetLinkButton href="#protecao" variant="primary" size={compact ? 'md' : 'lg'}>
          Quero minha proteção
        </SemBetLinkButton>
        <SemBetLinkButton href="#como-funciona" variant="secondary" size={compact ? 'md' : 'lg'}>
          Ver como funciona
        </SemBetLinkButton>
      </div>

      <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#9ab0be', fontWeight: 500, margin: 0 }}>
        <Lock size={11} aria-hidden />
        Privacidade em primeiro lugar. Sem julgamentos.
      </p>
    </div>
  ),
);

Act01Intro.displayName = 'Act01Intro';
export default Act01Intro;

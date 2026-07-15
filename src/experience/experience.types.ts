import type React from 'react';

/** All DOM refs that the GSAP timeline in ExperienceStage needs. */
export interface ExperienceRefs {
  // ── Stage / container ───────────────────────────────────────────────────
  containerRef: React.RefObject<HTMLDivElement>;   // full-height scroll container
  stageRef:     React.RefObject<HTMLDivElement>;   // sticky 100vh stage

  // ── S letterform ────────────────────────────────────────────────────────
  sRef: React.RefObject<HTMLDivElement>;           // wrapper animated by scroll TL

  // ── Phone ───────────────────────────────────────────────────────────────
  phoneRef:  React.RefObject<HTMLDivElement>;      // outer wrapper (scroll TL: x, scale, rotation, opacity)

  // ── Phone internal elements (exposed via PhoneScreens) ──────────────────
  screenHomeRef:        React.RefObject<HTMLDivElement>;
  screenProtectionRef:  React.RefObject<HTMLDivElement>;
  screenSOSRef:         React.RefObject<HTMLDivElement>;
  screenProgressRef:    React.RefObject<HTMLDivElement>;
  screenGuardianRef:    React.RefObject<HTMLDivElement>;
  protectionCardRef:    React.RefObject<HTMLDivElement>;  // "Proteção ativa" card in ScreenHome
  screenContentRef:     React.RefObject<HTMLDivElement>;  // dimmed wrapper in ScreenHome

  // ── Act 01 – copy block ─────────────────────────────────────────────────
  copyRef:  React.RefObject<HTMLDivElement>;
  card1Ref: React.RefObject<HTMLDivElement>;
  card2Ref: React.RefObject<HTMLDivElement>;
  card3Ref: React.RefObject<HTMLDivElement>;
  cueRef:   React.RefObject<HTMLDivElement>;

  // ── Act 03 – protection callout + connector ─────────────────────────────
  calloutRef:    React.RefObject<HTMLDivElement>;
  connectorRef:  React.RefObject<SVGSVGElement>;
}

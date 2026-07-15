/**
 * ExperienceTimeline — single source of truth for all timing constants.
 *
 * TOTAL_DURATION: arbitrary GSAP timeline unit (1 unit ≈ 35vh of scroll for 3-act build).
 * Scroll height is end: '+=350%' (3.5 × viewport), so total experience = 4.5 × 100vh.
 *
 * Layout per act (in timeline units):
 *  0.0 – 1.4   (0% – 14%)   Intro: entry + reading pause
 *  1.4 – 2.6   (14% – 26%)  Zoom: phone centralises, copy exits
 *  2.6 – 2.9   (26% – 29%)  Zoom read: phone stable, user reads interface
 *  2.9 – 3.5   (29% – 35%)  Protection focus: card highlights, connector draws
 *  3.5 – 4.2   (35% – 42%)  Protection read: callout visible, steady
 *  4.2 – 4.5   (42% – 45%)  Protection exit: callout fades, connector retracts
 *  4.5+                      Future acts (stubs only in this build)
 */
export const TOTAL_DURATION = 10;

/** Named labels used across the codebase — prefer these over raw numbers. */
export const L = {
  intro:            0,
  zoom:             1.4,   // copy exits, phone starts moving
  zoomPeak:         2.4,   // phone fully zoomed
  zoomRead:         2.6,   // reading pause begins
  protectionFocus:  2.9,   // card starts to highlight
  protectionLine:   3.2,   // connector fully drawn
  protectionRead:   3.5,   // callout visible + hold
  protectionExit:   4.2,   // callout fades
  sosFuture:        4.5,
  progressFuture:   6.0,
  guardianFuture:   7.5,
  finalFuture:      8.8,
  end:              10,
} as const;

/** Duration between two labels (in timeline units). */
export const dur = (from: keyof typeof L, to: keyof typeof L): number =>
  L[to] - L[from];

/** Desktop ScrollTrigger config (3 acts → 350vh scroll). */
export const ST_DESKTOP = {
  start:              'top top' as const,
  end:                '+=350%',
  scrub:              1.2,
  anticipatePin:      1,
  invalidateOnRefresh: true,
  markers:            false,
} as const;

/** Mobile ScrollTrigger config — shorter, simpler. */
export const ST_MOBILE = {
  start:              'top top' as const,
  end:                '+=240%',
  scrub:              1,
  anticipatePin:      1,
  invalidateOnRefresh: true,
  markers:            false,
} as const;

/**
 * Phone x-offset so it appears at ~57% of stage width in Act 1.
 * Returns pixel value (7% of viewport width).
 * Used as a function so GSAP can re-evaluate on resize.
 */
export const getPhoneX = (): number => window.innerWidth * 0.07;

/**
 * S x-offset in Act 1 — same start position as phone, moves at different parallax rate.
 */
export const getSX = (): number => window.innerWidth * 0.07;

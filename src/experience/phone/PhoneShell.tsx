import { forwardRef } from 'react';
import PhoneCanvas from '../../three/PhoneCanvas';
import PhoneModel from '../../three/PhoneModel';
import ScreenOverlay from './ScreenOverlay';

interface PhoneShellProps {
  children: React.ReactNode;
}

/*
 * Screen alignment — derived analytically from the GLB's own geometry, not
 * eyeballed (see three/PhoneModel.tsx inspection notes):
 *   phone bbox   79.12mm × 163.08mm  (aspect 0.4851, W/H)
 *   screen bbox  73.01mm × 158.01mm, inset from phone edges by
 *     left 4.07% / right 3.64% / top 1.53% / bottom 1.58% (of phone W/H)
 * PhoneCanvas's camera (fov 24°, distance 2.7, model normalized to height 1)
 * fills 87.12% of the frame height. Because the wrapper's aspect-ratio below
 * is set to match the phone's own aspect (0.4851), that same 87.12% fill
 * fraction applies to width too — margins stay symmetric on all four sides.
 * Combining both gives the screen's box relative to the wrapper itself:
 */
const SCREEN_ALIGNMENT_STYLE = {
  '--screen-left': '9.99%',
  '--screen-top': '7.77%',
  '--screen-width': '80.4%',
  '--screen-height': '84.41%',
  '--screen-radius': 'clamp(18px, 2.6vw, 26px)',
} as React.CSSProperties;

/**
 * PhoneShell — the physical device frame only.
 * Children (screens) are rendered inside the screen area.
 * This component never unmounts; screen switching is handled by GSAP opacity on children.
 *
 * Anatomy: PhoneCanvas (the GLB — sole physical chassis) sits behind
 * ScreenOverlay (a plain clipping mask, no chrome of its own) which holds the
 * actual interface. Both share the same box — there is only one visual phone.
 */
const PhoneShell = forwardRef<HTMLDivElement, PhoneShellProps>(({ children }, ref) => (
  <div
    ref={ref}
    aria-label="Interface do aplicativo SemBet — mockup ilustrativo"
    role="img"
    style={{
      width: 'clamp(260px, 20vw, 310px)',
      aspectRatio: '0.4851',
      flexShrink: 0,
      position: 'relative',
      ...SCREEN_ALIGNMENT_STYLE,
    }}
  >
    {/* Chassis — the GLB is the only physical body of the phone */}
    <PhoneCanvas>
      <PhoneModel />
    </PhoneCanvas>

    {/* Interface — masked exactly to the GLB's screen mesh, no chrome of its own */}
    <ScreenOverlay>{children}</ScreenOverlay>
  </div>
));

PhoneShell.displayName = 'PhoneShell';
export default PhoneShell;

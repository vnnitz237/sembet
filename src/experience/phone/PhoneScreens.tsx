import { forwardRef, useImperativeHandle, useRef } from 'react';
import ScreenHome,       { type ScreenHomeHandle } from './screens/ScreenHome';
import ScreenProtection from './screens/ScreenProtection';
import ScreenSOS        from './screens/ScreenSOS';
import ScreenProgress   from './screens/ScreenProgress';
import ScreenGuardian   from './screens/ScreenGuardian';

/** All internal phone elements that ExperienceStage needs to animate. */
export interface PhoneScreensHandle {
  screenHomeEl:       HTMLDivElement | null;
  screenProtectionEl: HTMLDivElement | null;
  screenSOSEl:        HTMLDivElement | null;
  screenProgressEl:   HTMLDivElement | null;
  screenGuardianEl:   HTMLDivElement | null;
  protectionCardEl:   HTMLDivElement | null;
  screenContentEl:    HTMLDivElement | null;
}

/**
 * PhoneScreens — renders ALL screens simultaneously in the DOM.
 *
 * Every screen is absolutely positioned and stacked.
 * Visibility is controlled exclusively by GSAP (opacity / clip-path / filter).
 * No React state is used to decide which screen is active.
 */
const PhoneScreens = forwardRef<PhoneScreensHandle, object>((_, ref) => {
  const screenHomeRef       = useRef<ScreenHomeHandle>(null);
  const screenProtectionRef = useRef<HTMLDivElement>(null);
  const screenSOSRef        = useRef<HTMLDivElement>(null);
  const screenProgressRef   = useRef<HTMLDivElement>(null);
  const screenGuardianRef   = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    get screenHomeEl()       { return screenHomeRef.current?.screenContentEl?.parentElement as HTMLDivElement | null ?? null; },
    get screenProtectionEl() { return screenProtectionRef.current; },
    get screenSOSEl()        { return screenSOSRef.current; },
    get screenProgressEl()   { return screenProgressRef.current; },
    get screenGuardianEl()   { return screenGuardianRef.current; },
    get protectionCardEl()   { return screenHomeRef.current?.protectionCardEl ?? null; },
    get screenContentEl()    { return screenHomeRef.current?.screenContentEl ?? null; },
  }));

  return (
    <>
      {/* Home screen — visible in Acts 1–3 */}
      <ScreenHome ref={screenHomeRef} />

      {/* Future screens — hidden, aria-hidden, no tab focus */}
      <div ref={screenProtectionRef} aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', inset: 0 }}>
        <ScreenProtection />
      </div>
      <div ref={screenSOSRef} aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', inset: 0 }}>
        <ScreenSOS />
      </div>
      <div ref={screenProgressRef} aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', inset: 0 }}>
        <ScreenProgress />
      </div>
      <div ref={screenGuardianRef} aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', inset: 0 }}>
        <ScreenGuardian />
      </div>
    </>
  );
});

PhoneScreens.displayName = 'PhoneScreens';
export default PhoneScreens;

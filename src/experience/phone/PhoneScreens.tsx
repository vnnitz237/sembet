import { forwardRef, useImperativeHandle, useRef } from 'react';
import ScreenHome,       { type ScreenHomeHandle } from './screens/ScreenHome';
import ScreenProtection from './screens/ScreenProtection';
import ScreenSOS        from './screens/ScreenSOS';
import ScreenProgress   from './screens/ScreenProgress';
import ScreenGuardian   from './screens/ScreenGuardian';

export interface PhoneScreensHandle {
  protectionCardEl:   HTMLDivElement | null;
  screenContentEl:    HTMLDivElement | null;
  /* secondary elements for Act 3 individual targeting */
  greetingEl:         HTMLDivElement | null;
  counterEl:          HTMLDivElement | null;
  supportEl:          HTMLButtonElement | null;
  metricsEl:          HTMLDivElement | null;
  navEl:              HTMLElement | null;
}

const PhoneScreens = forwardRef<PhoneScreensHandle, object>((_, ref) => {
  const screenHomeRef       = useRef<ScreenHomeHandle>(null);
  const screenProtectionRef = useRef<HTMLDivElement>(null);
  const screenSOSRef        = useRef<HTMLDivElement>(null);
  const screenProgressRef   = useRef<HTMLDivElement>(null);
  const screenGuardianRef   = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    get protectionCardEl() { return screenHomeRef.current?.protectionCardEl ?? null; },
    get screenContentEl()  { return screenHomeRef.current?.screenContentEl  ?? null; },
    get greetingEl()       { return screenHomeRef.current?.greetingEl       ?? null; },
    get counterEl()        { return screenHomeRef.current?.counterEl        ?? null; },
    get supportEl()        { return screenHomeRef.current?.supportEl        ?? null; },
    get metricsEl()        { return screenHomeRef.current?.metricsEl        ?? null; },
    get navEl()            { return screenHomeRef.current?.navEl            ?? null; },
  }));

  // screenProtectionRef etc. kept for future acts
  void screenProtectionRef;
  void screenSOSRef;
  void screenProgressRef;
  void screenGuardianRef;

  return (
    <>
      <ScreenHome ref={screenHomeRef} />

      <div aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', inset: 0 }}>
        <ScreenProtection />
      </div>
      <div aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', inset: 0 }}>
        <ScreenSOS />
      </div>
      <div aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', inset: 0 }}>
        <ScreenProgress />
      </div>
      <div aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', inset: 0 }}>
        <ScreenGuardian />
      </div>
    </>
  );
});

PhoneScreens.displayName = 'PhoneScreens';
export default PhoneScreens;

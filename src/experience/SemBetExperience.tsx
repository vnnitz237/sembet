import { useRef } from 'react';
import ExperienceStage from './ExperienceStage';

/**
 * Outer scroll container.
 * Height = sticky viewport (100vh) + scrollable distance.
 * ST_DESKTOP end = +=350% → container total = 450vh.
 * ST_MOBILE  end = +=240% → but we use the same container; mobile ST just
 *   consumes less of the scroll distance.
 */
export default function SemBetExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: '450vh' }}
    >
      <ExperienceStage containerRef={containerRef} />
    </div>
  );
}

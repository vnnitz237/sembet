import { useEffect } from 'react';
import FloatingNavbar from './components/navigation/FloatingNavbar';
import Scene01Hero from './scenes/Scene01Hero';

/*
 * Old portfolio sections are preserved as files in src/sections/ for backup.
 * They are intentionally not imported here.
 */

function useCursorVars() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--cx', '0.62');
    root.style.setProperty('--cy', '0.32');
    const handle = (e: MouseEvent) => {
      root.style.setProperty('--cx', (e.clientX / window.innerWidth).toFixed(4));
      root.style.setProperty('--cy', (e.clientY / window.innerHeight).toFixed(4));
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);
}

export default function App() {
  useCursorVars();
  return (
    <div className="min-h-screen bg-sb-background overflow-x-hidden">
      <FloatingNavbar />
      <main id="main-content">
        <Scene01Hero />
      </main>
    </div>
  );
}

import FloatingNavbar from './components/navigation/FloatingNavbar';
import Scene01Hero from './scenes/Scene01Hero';

/*
 * Old portfolio sections are preserved as files in src/sections/ for backup.
 * They are intentionally not imported here.
 */

export default function App() {
  return (
    <div className="min-h-screen bg-sb-background overflow-x-hidden">
      <FloatingNavbar />
      <main id="main-content">
        <Scene01Hero />
      </main>
    </div>
  );
}

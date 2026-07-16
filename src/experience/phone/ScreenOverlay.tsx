/**
 * ScreenOverlay — HTML layer masked to the GLB's real screen area only.
 *
 * Draws nothing of its own: no chassis, no bezel, no shadow, no camera pill.
 * It is purely a clipping window, positioned with CSS custom properties
 * (--screen-left/top/width/height/radius, set by PhoneShell) so the interface
 * lines up with the physical screen mesh of the 3D model behind it. Each
 * screen (ScreenHome, ScreenProtection, …) already paints its own opaque
 * background filling this box.
 */
export default function ScreenOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 'var(--screen-left)',
        top: 'var(--screen-top)',
        width: 'var(--screen-width)',
        height: 'var(--screen-height)',
        borderRadius: 'var(--screen-radius)',
        overflow: 'hidden',
        transformOrigin: 'center',
      }}
    >
      {children}
    </div>
  );
}

import { Component, Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';

/*
 * three.js throws synchronously when a WebGL context can't be created
 * (disabled by browser policy, no GPU, some locked-down environments). That
 * throw happens during Canvas's own render, so React's Suspense won't catch
 * it — only an error boundary will. Without this, the failure unmounts the
 * entire app, not just the phone. ScreenOverlay lives outside this
 * boundary (a sibling in PhoneShell), so the interface keeps working even
 * when the 3D chassis can't render.
 */
class CanvasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/*
 * Camera distance is derived analytically for PhoneModel's fixed unit-height
 * normalization (see PhoneModel.tsx `fitScale`): with vertical FOV `V` and a
 * model of height 1 centred at the origin, the distance that lets the model
 * fill `FILL` of the frame height is:
 *   d = (0.5 / FILL) / tan(V/2)
 * FOV 24° + FILL 0.90 → d ≈ 2.61. Rounded to 2.7 for a touch of breathing room.
 */
const CAMERA_FOV = 24;
const CAMERA_DISTANCE = 2.7;

interface PhoneCanvasProps {
  children: ReactNode;
  className?: string;
}

/**
 * Transparent R3F canvas with soft, static "Apple-style" 3-point lighting.
 * No OrbitControls, no shadows, no postprocessing, no HDRI — matches the
 * lightweight, storytelling-first visual language of the rest of the scene.
 */
export default function PhoneCanvas({ children, className }: PhoneCanvasProps) {
  return (
    <CanvasErrorBoundary>
      <Canvas
        className={className}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ fov: CAMERA_FOV, near: 0.1, far: 20, position: [0, 0, CAMERA_DISTANCE] }}
        frameloop="demand"
        shadows={false}
        /*
         * react-use-measure (used internally by Canvas) re-measures its
         * container with getBoundingClientRect() on every `scroll` event by
         * default. getBoundingClientRect reflects CSS transforms, so during
         * the pinned scroll animation — which applies scale/perspective to
         * an ancestor of this canvas — that re-measurement bakes the
         * already-transformed size into the canvas's own CSS box, which
         * then gets transformed a second time by the same ancestor,
         * doubling the scale. Disabling scroll-triggered remeasurement
         * fixes it; the canvas still resizes correctly on real
         * viewport/layout changes.
         */
        resize={{ scroll: false }}
      >
        {/* Ambient — soft base fill, keeps blacks from crushing */}
        <ambientLight intensity={0.55} color="#f4f8ff" />

        {/* Key light — white, front-top-right */}
        <directionalLight position={[2.4, 3.2, 4]} intensity={1.2} color="#ffffff" />

        {/* Fill light — extremely light baby-blue, opposite side, low intensity */}
        <directionalLight position={[-3, 0.4, 2.2]} intensity={0.28} color="#cfe6ff" />

        {/* Rim light — discreet edge highlight from behind */}
        <directionalLight position={[-0.6, 1.6, -3.5]} intensity={0.3} color="#eaf4ff" />

        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  );
}

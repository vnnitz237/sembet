import { Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';

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
    <Canvas
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: CAMERA_FOV, near: 0.1, far: 20, position: [0, 0, CAMERA_DISTANCE] }}
      frameloop="demand"
      shadows={false}
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
  );
}

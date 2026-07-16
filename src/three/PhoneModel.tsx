import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/models/sembet-phone.glb';

/** Material name of the screen mesh inside the GLB — see three/README inspection report. */
const SCREEN_MATERIAL_NAME = '17ProMax_Screen';

export interface PhoneModelHandle {
  /** Outer control group — future GSAP tweens (position/rotation/scale) target this node. */
  group: THREE.Group | null;
  /** Screen mesh — reserved for future texture/video/HTML swap. */
  screenMesh: THREE.Mesh | null;
}

/*
 * The source GLB faces its camera-bump (back) side toward +Z. Rotating 180°
 * on Y brings the screen face toward the camera. Kept perfectly frontal (no
 * extra tilt) so the flat HTML ScreenOverlay lines up pixel-for-pixel with
 * the GLB's screen mesh — any "elegant tilt" is applied upstream, once, on
 * the shared CSS transform ancestor (ExperienceStage's `phoneRef`), which
 * rotates the whole PhoneShell subtree — canvas and overlay together — as a
 * single unit instead of two independently-computed rotations.
 */
const DEFAULT_ROTATION: [number, number, number] = [0, Math.PI, 0];

interface PhoneModelProps {
  /** Resting orientation shown before any future scroll-driven animation takes over. */
  rotation?: [number, number, number];
}

const PhoneModel = forwardRef<PhoneModelHandle, PhoneModelProps>(
  ({ rotation = DEFAULT_ROTATION }, ref) => {
    const { scene } = useGLTF(MODEL_URL);
    const controlGroupRef = useRef<THREE.Group>(null);

    const { model, center, fitScale, screenMesh } = useMemo(() => {
      const cloned = scene.clone(true);

      const box = new THREE.Box3().setFromObject(cloned);
      const size = new THREE.Vector3();
      const centerPoint = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(centerPoint);

      let screen: THREE.Mesh | null = null;
      cloned.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        const material = mesh.material as THREE.Material | THREE.Material[];
        const name = Array.isArray(material) ? material[0]?.name : material?.name;
        if (name === SCREEN_MATERIAL_NAME) {
          screen = mesh;
          /*
           * The GLB's screen mesh ships with a baked wallpaper texture +
           * emissive map. The HTML ScreenOverlay is the only thing meant to
           * be visible on the display now, so this mesh gets a flat neutral
           * material — no texture, no emissive — instead of its original
           * one. This only swaps the material reference on this cloned
           * instance; the cached/shared GLTF (and any other PhoneModel
           * instance, e.g. the mobile tree) is untouched.
           */
          mesh.material = new THREE.MeshBasicMaterial({ color: '#0a0d10' });
        }
      });

      return {
        model: cloned,
        center: centerPoint,
        fitScale: 1 / size.y, // normalizes model height to 1 unit
        screenMesh: screen,
      };
    }, [scene]);

    useImperativeHandle(
      ref,
      () => ({
        get group() {
          return controlGroupRef.current;
        },
        get screenMesh() {
          return screenMesh;
        },
      }),
      [screenMesh],
    );

    return (
      <group ref={controlGroupRef} rotation={rotation}>
        <group scale={fitScale}>
          <group position={[-center.x, -center.y, -center.z]}>
            <primitive object={model} />
          </group>
        </group>
      </group>
    );
  },
);

PhoneModel.displayName = 'PhoneModel';
export default PhoneModel;

useGLTF.preload(MODEL_URL);

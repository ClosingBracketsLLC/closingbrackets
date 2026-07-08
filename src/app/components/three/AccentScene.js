"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { makeBraceGeometry } from "./braceCurve";

function FloatingBrace() {
  const ref = useRef();
  const geometry = useMemo(
    () => makeBraceGeometry({ mirror: true, scale: 0.16, radius: 0.1 }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!ref.current) return;
    // Oscillate rather than spin — the brace should never read edge-on.
    ref.current.rotation.y = Math.sin(t * 0.35) * 0.55;
    ref.current.rotation.x = Math.sin(t * 0.28) * 0.14;
    ref.current.position.y = Math.sin(t * 0.55) * 0.25;
  });

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial
        color="#8B7CFF"
        emissive="#5B4DFF"
        emissiveIntensity={0.6}
        metalness={0.5}
        roughness={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/**
 * Interior-page accent: a single closing brace slowly turning in space.
 * Mounted at the right edge of PageHero on large screens via VisibilityGate.
 */
export default function AccentScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 6]} intensity={0.8} />
      <pointLight position={[0, 0, 5]} color="#8B7CFF" intensity={26} />
      <FloatingBrace />
    </Canvas>
  );
}

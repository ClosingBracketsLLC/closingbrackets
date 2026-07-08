"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { makeBraceGeometry } from "./braceCurve";

function Brace({ mirror, x, phase }) {
  const ref = useRef();
  const geometry = useMemo(
    () => makeBraceGeometry({ mirror, scale: 0.24, radius: 0.13 }),
    [mirror]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!ref.current) return;
    ref.current.position.y = Math.sin(t * 0.5 + phase) * 0.25;
    ref.current.rotation.y = Math.sin(t * 0.22 + phase) * 0.28;
    ref.current.rotation.x = Math.sin(t * 0.17 + phase) * 0.08;
  });

  return (
    <mesh ref={ref} geometry={geometry} position={[x, 0, 0]}>
      <meshStandardMaterial
        color={mirror ? "#8B7CFF" : "#565C85"}
        emissive={mirror ? "#5B4DFF" : "#2A2E55"}
        emissiveIntensity={mirror ? 0.65 : 0.45}
        metalness={0.5}
        roughness={0.28}
      />
    </mesh>
  );
}

function Motes({ count = 260 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = -2 - Math.random() * 8;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8B7CFF"
        size={0.06}
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Rig() {
  const ref = useRef();
  useFrame(({ pointer }) => {
    if (!ref.current) return;
    // Gentle pointer parallax, eased so it never feels twitchy.
    ref.current.rotation.y += (pointer.x * 0.14 - ref.current.rotation.y) * 0.04;
    ref.current.rotation.x += (-pointer.y * 0.08 - ref.current.rotation.x) * 0.04;
  });
  return (
    <group ref={ref}>
      <Brace mirror={false} x={-5.9} phase={0} />
      <Brace mirror x={5.9} phase={1.7} />
      <Motes />
    </group>
  );
}

/**
 * The home hero's 3D layer: two neon-tube curly braces floating around the
 * headline over a field of violet motes. Loaded only through VisibilityGate
 * (desktop + WebGL + motion-safe + idle), so it never taxes mobile or LCP.
 */
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 11], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 8]} intensity={0.9} />
      <pointLight position={[0, 0, 6]} color="#8B7CFF" intensity={40} />
      <Rig />
    </Canvas>
  );
}

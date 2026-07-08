"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 170;

/**
 * The agent swarm: glowing motes orbiting a shared center in tilted rings —
 * many small workers, one coordinated system. Backdrop for the AI-team section.
 */
function Swarm() {
  const ref = useRef();
  const agents = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        radius: 1.6 + Math.random() * 4.8,
        speed: 0.1 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 1.1,
        wobble: Math.random() * Math.PI * 2,
      })),
    []
  );
  const writePositions = useMemo(
    () => (array, t) => {
      agents.forEach((a, i) => {
        const angle = a.phase + t * a.speed;
        array[i * 3] = Math.cos(angle) * a.radius;
        array[i * 3 + 1] =
          Math.sin(angle) * a.radius * a.tilt * 0.45 +
          Math.sin(t * 0.9 + a.wobble) * 0.15;
        array[i * 3 + 2] = Math.sin(angle) * a.radius * 0.5 - 1.5;
      });
    },
    [agents]
  );

  // Pre-fill t=0 so the very first painted frame already shows the swarm.
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    writePositions(arr, 0);
    return arr;
  }, [writePositions]);

  useFrame(({ clock }) => {
    const attr = ref.current?.geometry?.attributes?.position;
    if (!attr) return;
    writePositions(attr.array, clock.elapsedTime);
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#A99DFF"
        size={0.12}
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function SwarmScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.8, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Swarm />
    </Canvas>
  );
}

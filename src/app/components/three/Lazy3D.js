"use client";

import dynamic from "next/dynamic";

// Client-side dynamic imports (ssr: false) so the three.js chunk is fetched
// only when a VisibilityGate actually opens. Each export is a drop-in scene.
export const Hero3D = dynamic(() => import("./HeroScene"), { ssr: false });
export const Accent3D = dynamic(() => import("./AccentScene"), { ssr: false });
export const Swarm3D = dynamic(() => import("./SwarmScene"), { ssr: false });

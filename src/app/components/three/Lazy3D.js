"use client";

import dynamic from "next/dynamic";

// Client-side dynamic import (ssr: false) so the three.js chunk is fetched
// only when a VisibilityGate actually opens.
export const Swarm3D = dynamic(() => import("./SwarmScene"), { ssr: false });

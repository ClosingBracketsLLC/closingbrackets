"use client";

import { useEffect, useRef } from "react";
import { mountScrollWorld } from "./scrub-engine";
import {
  brand,
  cta,
  sections,
  connectors,
  connectorsMobile,
} from "@/data/world";

/**
 * Mounts the vanilla scrub engine into a container React owns but never
 * re-renders.
 *
 * The engine builds and mutates its own DOM inside this div, so React and the
 * engine must not both manage the subtree. `children` (the static SEO block) is
 * rendered once by the server and left alone; the engine hides it on mount. The
 * `mounted` ref guards against React 19 StrictMode's double-invoked effects,
 * which would otherwise mount two full worlds on top of each other in dev.
 */
export default function ScrollWorld({ children }) {
  const ref = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current || !ref.current) return;
    mounted.current = true;

    mountScrollWorld(ref.current, {
      brand,
      cta,
      hint: "scroll to fly in",
      nav: true,
      atmosphere: true,
      diveScroll: 1.4,
      connScroll: 0.9,
      // Wider seam dissolve + scrub inertia: with the smoothed scroll bounding the
      // camera's effective velocity, a fast flick flies through every crossfade in
      // order instead of cutting past it. 0.12 = lerp factor per frame (~600ms to
      // settle after a hard flick).
      crossfade: 0.18,
      scrubSmooth: 0.12,
      scrollMobileFactor: 1.2,
      sections,
      connectors,
      connectorsMobile,
    });
  }, []);

  return (
    // role="main": the engine hides the static <main data-sw-seo> on mount,
    // which would leave the visible page without a main landmark. The hidden
    // element's landmark is ignored by the a11y tree, so these don't conflict.
    <div id="world" role="main" ref={ref}>
      {children}
    </div>
  );
}

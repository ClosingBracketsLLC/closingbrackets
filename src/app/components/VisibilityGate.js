"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders decorative (3D/canvas) children only when ALL of the following hold:
 *  - the viewport is within [minWidth, maxWidth],
 *  - the device reports WebGL support (when `needsWebGL`),
 *  - the user has NOT requested reduced motion,
 *  - the element has scrolled near the viewport (IntersectionObserver), and
 *  - the browser is idle (requestIdleCallback) so mounting never competes
 *    with the initial paint / hydration.
 *
 * Otherwise it renders `fallback` (a static, cheap visual). Because 3D scenes
 * are dynamically imported, a closed gate means the three.js chunk is never
 * even downloaded — mobile and reduced-motion users pay zero cost.
 */
export default function VisibilityGate({
  children,
  fallback = null,
  rootMargin = "200px",
  minWidth = 0,
  maxWidth = Infinity,
  needsWebGL = false,
  className = "",
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = window.innerWidth;
    if (w < minWidth || w > maxWidth) return;

    if (needsWebGL) {
      let hasWebGL = false;
      try {
        const canvas = document.createElement("canvas");
        hasWebGL =
          !!window.WebGLRenderingContext &&
          !!(
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl")
          );
      } catch {
        hasWebGL = false;
      }
      if (!hasWebGL) return;
    }

    const el = ref.current;
    if (!el) return;

    let idleId;
    const mount = () => {
      // The timeout matters: a continuously rendering canvas elsewhere on the
      // page can starve requestIdleCallback indefinitely on slow devices.
      const ric = window.requestIdleCallback
        ? (cb) => window.requestIdleCallback(cb, { timeout: 1000 })
        : (cb) => setTimeout(cb, 200);
      idleId = ric(() => setReady(true));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          mount();
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      const cic = window.cancelIdleCallback;
      if (cic && idleId) cic(idleId);
    };
  }, [rootMargin, minWidth, maxWidth, needsWebGL]);

  return (
    <div ref={ref} className={className} aria-hidden>
      {ready ? children : fallback}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders decorative (canvas) children only when ALL of the following hold:
 *  - the user has NOT requested reduced motion,
 *  - the element has scrolled near the viewport (IntersectionObserver), and
 *  - the browser is idle (requestIdleCallback) so mounting never competes
 *    with the initial paint / hydration.
 *
 * Otherwise it renders `fallback` (a static, cheap visual).
 */
export default function VisibilityGate({
  children,
  fallback = null,
  rootMargin = "200px",
  className = "",
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let idleId;
    const mount = () => {
      const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
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
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} aria-hidden>
      {ready ? children : fallback}
    </div>
  );
}

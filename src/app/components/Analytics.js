"use client";

import { useEffect } from "react";

/**
 * Conversion events on the analytics the site already ships (Microsoft
 * Clarity, loaded by layout.js when NEXT_PUBLIC_CLARITY_ID is set). Three
 * events, named in the master brief: `cta_click`, `form_start`, `form_submit`.
 * `track` is a no-op when Clarity is absent, so nothing here can break a page.
 */
export function track(name) {
  if (typeof window.clarity === "function") window.clarity("event", name);
}

/* Every primary action on the site is one of these: the header CTA, the panel
   buttons, and the flight's own buttons (built client-side by the engine,
   which is why this is one delegated listener rather than props). */
const CTA_SELECTOR = "a.site-cta, a.cb-btn, a.sw-btn";

/** Mounted by layout.js only when Clarity is configured. */
export default function Analytics() {
  useEffect(() => {
    const onClick = (e) => {
      if (e.target.closest(CTA_SELECTOR)) track("cta_click");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

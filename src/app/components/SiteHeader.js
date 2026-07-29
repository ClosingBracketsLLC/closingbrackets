"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand, cta, navLinks } from "@/data/site";

/**
 * Viewport width, in px, at or below which the burger replaces the inline nav.
 * MUST stay in sync with the `@media (max-width: 720px)` block in globals.css
 * that swaps `.site-nav` for `.site-burger` — this value is what closes the
 * menu on the way back up, so a drift between the two reintroduces exactly the
 * orphaned-panel state it exists to prevent.
 */
const BURGER_UNDER = 720;

/**
 * Publishes scroll progress (0..1) as a `--progress` custom property on the
 * header, which the ECG fill clips and fades itself against.
 *
 * Two deliberate choices keep this cheap on the homepage, where it shares the
 * main thread with the scroll engine's video scrubbing:
 *  - the scroll handler only reads `scrollY` (no layout-forcing reads) and
 *    defers the write to one rAF;
 *  - the scrollable distance is measured only when the document actually
 *    resizes, watched with a ResizeObserver on <body>. It must be <body>, not
 *    <html>: the root element is locked to viewport height here, so its own box
 *    never changes when the scroll world sets its track height.
 *
 * `scrim` opts the route into the bar's ink backing (see .site-header::before).
 * It is written as an ATTRIBUTE from inside the same rAF rather than held as
 * React state on purpose: this fires on every scroll frame, and a setState here
 * would re-render the header — and on the homepage, contend with the engine's
 * video scrubbing — to toggle one class.
 */
function useScrollProgress(ref, scrim) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let max = 0;
    let frame = 0;
    let last = -1;
    let lastScrim = null;

    const measure = () => {
      max = Math.max(0, document.body.scrollHeight - window.innerHeight);
    };
    const paint = () => {
      frame = 0;
      // A page with nothing to scroll reads as fully seen rather than as an
      // empty bar that looks broken.
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1;
      const value = Math.round(ratio * 1000) / 1000;
      if (value !== last) {
        last = value;
        el.style.setProperty("--progress", value);
      }

      // Off at the very top so the hero band still meets the bar with nothing
      // between them; on as soon as anything is actually passing underneath.
      const want = scrim && window.scrollY > 6 ? "on" : null;
      if (want !== lastScrim) {
        lastScrim = want;
        if (want) el.setAttribute("data-scrim", want);
        else el.removeAttribute("data-scrim");
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    remeasure();
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      // Navigating from a standard page to the homepage must not leave the ink
      // backing behind on the transparent bar.
      el.removeAttribute("data-scrim");
    };
  }, [ref, scrim]);
}

/**
 * The site's one header, fixed on every page including the scroll world.
 *
 * Client-side for two reasons only: marking the current route
 * (`usePathname`), and the small-screen menu. There is no data fetching and no
 * layout effect, so the hydration cost is one small component.
 *
 * The scroll engine used to render its own topbar; it no longer does (see
 * ScrollWorld's `nav: false` and the empty-topbar guard in scrub-engine.js), so
 * this is the only header in the DOM.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // `trailingSlash: true` means routes resolve as "/services/", but be tolerant
  // of either form so a link written without the slash still lights up.
  const here = pathname?.replace(/\/?$/, "/");

  // The homepage is a fixed scroll world — nothing passes under the bar there,
  // and the transparent-over-video look is the approved one. Every other route
  // scrolls real copy beneath it and needs the ink backing.
  useScrollProgress(headerRef, here !== "/");

  // Close on navigation. Without this the panel stays open over the page the
  // visitor just asked for. Adjusted during render against the previous path
  // rather than in an effect: an effect would render the stale open menu once
  // before closing it, and React flags the synchronous setState as a cascading
  // render. https://react.dev/learn/you-might-not-need-an-effect
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  // Everything that dismisses an open panel, in one effect that only exists
  // while the panel is open: Escape, and growing past the breakpoint.
  //
  // The width case is not cosmetic. Above BURGER_UNDER the burger is display:
  // none and the inline nav is back, so a menu left open from a narrow layout
  // hangs under a bar that already lists the same three links, and its
  // `aria-expanded` now describes a control the visitor cannot see. Rotating a
  // tablet with the menu open is the ordinary way to land there.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    // The exact complement of the CSS query, not a `min-width: 721px` mirror of
    // it: a viewport at 720.5px matches neither, which would leave the menu
    // open in the one state this is meant to catch.
    const mq = window.matchMedia(`(max-width: ${BURGER_UNDER}px)`);
    const onWidth = (e) => { if (!e.matches) setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWidth);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWidth);
    };
  }, [menuOpen]);

  const isHere = (href) => here === href;

  return (
    <header className="site-header" ref={headerRef}>
      <Link href={brand.href} className="site-brand">
        <img src="/logo-mark.svg" alt="" width="24" height="28" />
        <span className="site-brand__name">{brand.name}</span>
      </Link>

      <nav className="site-nav" aria-label="Main">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="site-nav__link"
            aria-current={isHere(href) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="site-header__end">
        <Link href={cta.href} className="site-cta cb-halftone">
          {cta.label}
        </Link>

        {/* Small screens only: the links do not fit beside brand + CTA. */}
        <button
          type="button"
          className="site-burger"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden className={menuOpen ? "is-open" : undefined} />
        </button>
      </div>

      {/* `hidden` (not just visually closed) keeps the links out of the
          accessibility tree and out of the tab order while collapsed. */}
      <div id="site-menu" className="site-menu" hidden={!menuOpen}>
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="site-menu__link"
            aria-current={isHere(href) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </div>

      {/*
        The header's bottom border: a scroll-progress bar drawn as a heart-rhythm
        trace. Two identical waveforms sit on top of each other — a dim track
        across the full width, and a lit fill clipped to how far down the page
        you are, so the trace "draws in" as you scroll and trails off behind
        the leading edge.

        Decorative, so it is hidden from assistive tech; the progress it reports
        is already conveyed by the scrollbar itself. The waveform is a repeating
        mask (geometry only) over solid fills, which keeps both colours on brand
        tokens instead of baking hexes into a data URI.
      */}
      <div className="site-ecg" aria-hidden="true">
        <span className="site-ecg__track" />
        <span className="site-ecg__fill" />
      </div>
    </header>
  );
}

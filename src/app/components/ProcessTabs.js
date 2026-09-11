"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { NarrationList, Numeral } from "./primitives";
import { tracks } from "@/data/process";

/**
 * The two drawing sets on the homepage: how a Build-a-Bot gets built, how a
 * site or app gets built. Copy and artwork come from data/process.js.
 *
 * A real tablist (roving tabindex, arrow keys, Home/End, selection follows
 * focus) rather than two buttons toggling a class, so a keyboard user gets
 * the same two sheets a pointer does. Both panels are in the DOM and the
 * inactive one is `hidden`: crawlers read all twelve steps, and the
 * drawings in the hidden panel stay unfetched (lazy images in a display:none
 * subtree do not load) until someone opens it.
 *
 * Each track sets `--cb-accent` on its own panel, so the cells, numerals and
 * button inside it take the track's colour without any prop threading — the
 * same rule every strip on the site follows.
 */

const TAB_KEYS = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_i, n) => n - 1,
};

export default function ProcessTabs() {
  const [active, setActive] = useState(tracks[0].id);
  const base = useId();
  const tabRefs = useRef([]);

  const tabId = (t) => `${base}-tab-${t.id}`;
  const panelId = (t) => `${base}-panel-${t.id}`;

  function onKeyDown(e) {
    const move = TAB_KEYS[e.key];
    if (!move) return;
    e.preventDefault();
    const i = tracks.findIndex((t) => t.id === active);
    const next = move(i, tracks.length);
    setActive(tracks[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="cb-sheets mt-9">
      <div role="tablist" aria-label="Process by service" className="cb-sheets__tabs">
        {tracks.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={tabId(t)}
              aria-selected={selected}
              aria-controls={panelId(t)}
              tabIndex={selected ? 0 : -1}
              style={{ "--cb-accent": t.accent }}
              className="cb-sheets__tab"
              onClick={() => setActive(t.id)}
              onKeyDown={onKeyDown}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tracks.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={panelId(t)}
          aria-labelledby={tabId(t)}
          hidden={t.id !== active}
          tabIndex={0}
          style={{ "--cb-accent": t.accent }}
          className="cb-sheets__panel"
        >
          <p className="max-w-2xl leading-relaxed text-slate">{t.lede}</p>

          <ol className="cb-strip mt-7 sm:grid-cols-2 lg:grid-cols-3">
            {t.steps.map((step, i) => (
              <li
                key={step.title}
                className={`cb-cell cb-tone ${i % 2 ? "cb-tone--br" : "cb-tone--bl"} flex flex-col`}
              >
                <figure className="flex h-full flex-col">
                  <img
                    className="cb-sheet"
                    src={step.art.src}
                    srcSet={step.art.srcSet}
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    width={step.art.width}
                    height={step.art.height}
                    alt={step.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-baseline gap-3">
                      <Numeral value={i + 1} className="text-3xl" />
                      <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-bone">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate">{step.body}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>

          {t.coda && (
            <NarrationList eyebrow={t.coda.eyebrow} items={t.coda.items} className="mt-6" />
          )}

          <div className="mt-8 flex justify-end">
            <Link href={t.cta.href} className="cb-halftone cb-btn">
              {t.cta.label}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

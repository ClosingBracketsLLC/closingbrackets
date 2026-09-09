import Link from "next/link";
import CtaPanel from "./CtaPanel";
import SiteFooter from "./SiteFooter";
import {
  AccentList,
  NarrationList,
  NumberedStrip,
  SectionHeading,
} from "./primitives";
import { delegation, doors, headings } from "@/data/home";
import { notDelegate } from "@/data/build-a-bot";
import { startClose } from "@/data/site";

/**
 * The structured half of the homepage, in document flow after the scroll
 * world.
 *
 * The flight (ScrollWorld + data/world.js) is a fixed-position stage: its
 * track sets the document height and every layer under the header is
 * `position: fixed` at z-10 (stage), z-20 (copy), z-30 (hint), z-40 (route
 * rail). This section is `relative` at z-45 with an ink background, so once
 * the track is exhausted it scrolls up OVER the final frame like a curtain —
 * the engine holds the finale's last frame (the rocket) under it, and the
 * feathered gradient at this section's top keeps that edge from reading as a
 * hard cut. `data-scrim-from` tells SiteHeader where in-flow content begins,
 * so its ink scrim waits for this section.
 *
 * Copy lives in data/home.js. Four beats: the two doors, how delegation
 * works with the limits beneath it, the close, the footer. Proof lives on
 * /work/ (reached from the flight's "See the work" and the nav), not here.
 */

export default function HomeTail() {
  return (
    <section className="relative z-[45]" aria-label="What we build">
      {/* A transparent beat, then the curtain: the finale scene and its CTA
          hold on screen for ~40vh of scroll once the flight completes instead
          of being covered the moment they land. */}
      <div aria-hidden className="pointer-events-none h-[40vh]" />
      <div
        aria-hidden
        className="pointer-events-none h-28 bg-gradient-to-b from-transparent to-ink"
      />
      <div className="bg-ink" data-scrim-from>
        <div className="mx-auto w-full max-w-6xl px-6 pt-4">
          <SectionHeading eyebrow={headings.doors.eyebrow} title={headings.doors.title}>
            {headings.doors.body}
          </SectionHeading>
          <div className="cb-strip mt-9 lg:grid-cols-2">
            {doors.map((door, i) => (
              <article
                key={door.id}
                style={{ "--cb-accent": door.accent }}
                className={`cb-cell cb-tone ${
                  i % 2 ? "cb-tone--br" : "cb-tone--tl"
                } flex flex-col p-7 sm:p-9`}
              >
                <p className="cb-eyebrow text-[var(--cb-accent)]">{door.eyebrow}</p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight text-bone sm:text-[1.7rem]">
                  {door.title}
                </h3>
                <p className="mt-4 leading-relaxed text-slate">{door.body}</p>
                <AccentList items={door.points} className="mt-6" />
                <div className="cb-footrule mt-auto pt-7">
                  <Link href={door.cta.href} className="cb-halftone cb-btn">
                    {door.cta.label}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-24">
            <SectionHeading eyebrow={headings.delegation.eyebrow} title={headings.delegation.title}>
              {headings.delegation.body}
            </SectionHeading>
            <NumberedStrip items={delegation} />
            <NarrationList
              eyebrow="What we will not automate"
              items={notDelegate}
              className="mt-6"
            />
          </section>

          <CtaPanel {...startClose} />

          <SiteFooter />
        </div>
      </div>
    </section>
  );
}

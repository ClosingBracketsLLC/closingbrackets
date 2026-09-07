import Link from "next/link";
import CtaPanel from "./CtaPanel";
import EngagementRules from "./EngagementRules";
import SiteFooter from "./SiteFooter";
import {
  ACCENT,
  AccentList,
  BuildTags,
  NarrationList,
  NumberedStrip,
  SectionHeading,
  cellTone,
} from "./primitives";
import { delegation, doors, fit, headings, selectedWorkIds } from "@/data/home";
import { notDelegate } from "@/data/build-a-bot";
import { routes, startClose } from "@/data/site";
import { builds } from "@/data/work";

/**
 * The structured half of the homepage, in document flow after the scroll
 * world.
 *
 * The flight (ScrollWorld + data/world.js) is a fixed-position stage: its
 * track sets the document height and every layer under the header is
 * `position: fixed` at z-10 (stage), z-20 (copy), z-30 (hint), z-40 (route
 * rail). This section is `relative` at z-45 with an ink background, so once
 * the track is exhausted it scrolls up OVER the final frame like a curtain —
 * the feathered gradient at its top is what keeps that edge from reading as a
 * hard cut across the rocket. `data-scrim-from` tells SiteHeader where in-flow
 * content begins, so its ink scrim waits for this section.
 *
 * Copy lives in data/home.js. The concept builds are read from data/work.js so
 * the card and the /work/ entry cannot describe different projects, and every
 * one keeps its "Concept build" label: nothing on this page is a client.
 */

const selected = selectedWorkIds
  .map((id) => builds.find((b) => b.id === id))
  .filter(Boolean);

const CONCEPT_TONES = ["cb-tone--tl", "cb-tone--br", "cb-tone--bl"];

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

          <section className="mt-24">
            <SectionHeading eyebrow={headings.work.eyebrow} title={headings.work.title}>
              {headings.work.body}
            </SectionHeading>
            <div className="cb-strip mt-9 lg:grid-cols-3">
              {selected.map((build, i) => (
                <article
                  key={build.id}
                  style={{ "--cb-accent": build.accent }}
                  className={`cb-cell cb-tone ${CONCEPT_TONES[i % 3]} flex flex-col p-7`}
                >
                  <BuildTags build={build} />
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl leading-snug text-bone">
                    <Link
                      href={`${routes.work}#${build.id}`}
                      className="transition after:absolute after:inset-0 after:content-[''] hover:text-cyan focus-visible:outline-none"
                    >
                      {build.client}
                    </Link>
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate">
                    {build.shows}
                  </p>
                </article>
              ))}
            </div>
            <Link href={routes.work} className="cb-link mt-7">
              All concept builds, and how a project runs <span aria-hidden>→</span>
            </Link>
          </section>

          <EngagementRules />

          <section className="mt-24">
            <SectionHeading eyebrow={headings.fit.eyebrow} title={headings.fit.title}>
              {headings.fit.body}
            </SectionHeading>
            <div className="cb-strip mt-9 sm:grid-cols-2">
              {[
                { label: "A fit", text: fit.yes, accent: ACCENT.cyan },
                { label: "Not a fit", text: fit.no, accent: ACCENT.coral },
              ].map((cell, i) => {
                const { style, tone } = cellTone(i, cell.accent);
                return (
                  <div key={cell.label} style={style} className={`cb-cell cb-tone ${tone} p-7`}>
                    <p className="cb-eyebrow text-[var(--cb-accent)]">{cell.label}</p>
                    <p className="mt-4 leading-relaxed text-bone">{cell.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <CtaPanel {...startClose} />

          <SiteFooter />
        </div>
      </div>
    </section>
  );
}

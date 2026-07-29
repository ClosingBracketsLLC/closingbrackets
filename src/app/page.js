import ScrollWorld from "./components/ScrollWorld";
import { sections } from "@/data/world";

// Title and description come from the layout defaults; only the canonical is
// page-specific.
export const metadata = {
  alternates: { canonical: "https://closingbrackets.com/" },
};

const [hero, ...rest] = sections;
const finaleCta = sections[sections.length - 1].cta.primary;

export default function Home() {
  return (
    <>
      <div id="top" />
      <ScrollWorld>
        {/*
          The first frame of the flight, server-rendered.

          The engine builds its DOM client-side, so the hero image — which IS
          the LCP element — used to be created only after hydration: the bytes
          arrived early (they were preloaded) but nothing could paint them until
          React had booted. Emitting the <img> in the HTML instead lets it paint
          straight off the preload scanner, with no JS on the path at all.

          <picture> replaces the three <link rel=preload> tags this used to
          carry, because the source media queries do the same tier selection
          natively AND give us an element to paint. Source order is the
          selection order, and it is an EXACT mirror of the engine's own pick
          (see scrub-engine.js): reduced-motion gets the stills-mode artwork,
          phone-class viewports (short side ≤600px) get the mobile poster,
          everyone else the full poster. Change one and the other must follow,
          or the fetched tier and the engine's tier diverge into two downloads.

          The engine's own scene 0 mounts on top of this with the same source
          (a cache hit, not a second request) and is fully opaque, so the
          handoff is invisible; .sw-preboot in globals.css matches its initial
          transform so nothing shifts.
        */}
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet={hero.still} />
          <source
            media="(max-width: 600px), (max-height: 600px)"
            srcSet={hero.posterMobile}
          />
          <img
            className="sw-preboot"
            src={hero.poster}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        {/*
          The engine renders every visible word client-side, so without this block
          the page ships zero crawlable text. It mirrors the exact copy in
          src/data/world.js, gets hidden by the engine on mount, and is what
          crawlers, link previews, and no-JS visitors actually read.
        */}
        <main data-sw-seo>
          <p>{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p>{hero.body}</p>

          {rest.map((s) => (
            <div key={s.id}>
              <h2>
                {s.eyebrow} — {s.title}
              </h2>
              <p>{s.body}</p>
              {/* Section CTAs are real internal links, so they belong here too:
                  the engine's buttons are built client-side and would otherwise
                  be invisible to crawlers. The finale's is emitted below, last,
                  where the flight actually ends. */}
              {s.cta?.secondary ? (
                <p>
                  <a href={s.cta.secondary.href}>{s.cta.secondary.label}</a>
                </p>
              ) : null}
            </div>
          ))}

          <p>
            <a href={finaleCta.href}>{finaleCta.label}</a>
          </p>
        </main>
      </ScrollWorld>
    </>
  );
}

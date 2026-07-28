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
      {/*
        The engine builds its DOM client-side, so the hero image (the LCP
        element) is otherwise discovered only after hydration. React hoists
        these into <head>. The media split is an EXACT mirror of the
        engine's phoneClass pick (viewport short side ≤600px — see
        scrub-engine.js): change one and the other must follow, or the
        preloaded tier and the fetched tier diverge. Reduced-motion
        visitors get the full still (the engine's stills mode). Data-saver
        also forces stills mode but has no media query; those users may
        fetch one unused poster.
      */}
      <link
        rel="preload"
        as="image"
        href={hero.poster}
        media="(min-width: 601px) and (min-height: 601px) and (prefers-reduced-motion: no-preference)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={hero.posterMobile}
        media="(max-width: 600px) and (prefers-reduced-motion: no-preference), (max-height: 600px) and (prefers-reduced-motion: no-preference)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={hero.still}
        media="(prefers-reduced-motion: reduce)"
        fetchPriority="high"
      />
      <div id="top" />
      <ScrollWorld>
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

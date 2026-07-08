import JsonLd, { breadcrumbSchema } from "./JsonLd";
import { BracketTick } from "./BracketMark";
import VisibilityGate from "./VisibilityGate";
import { Accent3D } from "./three/Lazy3D";

/**
 * Consistent interior-page header reused across all routes. Owns the page H1
 * and (when breadcrumbs are passed) the BreadcrumbList JSON-LD. On large
 * screens a 3D closing brace floats at the right edge (lazy, gated).
 */
export default function PageHero({ eyebrow, title, subtitle, breadcrumbs }) {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora opacity-80" aria-hidden />
      <div className="void-grid absolute inset-0" aria-hidden />
      <VisibilityGate
        minWidth={1280}
        needsWebGL
        className="absolute inset-y-0 right-0 w-[320px] opacity-80"
      >
        <Accent3D />
      </VisibilityGate>
      <div className="container relative z-10 pb-16 pt-24 text-center md:pb-20 md:pt-32">
        {eyebrow ? (
          <p className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
            <BracketTick />
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold tracking-display text-ink-hi md:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-2xl text-base md:text-xl">
            {subtitle}
          </p>
        ) : null}
      </div>
      {breadcrumbs ? <JsonLd data={breadcrumbSchema(breadcrumbs)} /> : null}
    </section>
  );
}

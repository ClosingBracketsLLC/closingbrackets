import Link from "next/link";

/**
 * The closing conversion panel. Every standard page ends on one, and they are
 * the same object with different copy — so it lives here rather than as three
 * near-identical blocks that drift apart.
 *
 * One primary action per panel, by design. `secondary` is for the lower-intent
 * route out (the catalogue, the work) and is deliberately styled as a ghost so
 * it never competes with the ask.
 */
export default function CtaPanel({
  caption,
  title,
  body,
  action,
  secondary,
  accent = "#ff4e64",
  className = "mt-24",
}) {
  return (
    <section
      style={{ "--cb-accent": accent }}
      className={`cb-panel cb-panel--marked relative isolate overflow-hidden p-8 sm:p-11 ${className}`}
    >
      <span aria-hidden className="cb-speedlines" />
      {caption && <p className="cb-halftone cb-caption">{caption}</p>}
      <h2
        className={`max-w-xl font-[family-name:var(--font-display)] text-2xl leading-tight text-balance text-bone sm:text-3xl ${
          caption ? "mt-5" : ""
        }`}
      >
        {title}
      </h2>
      <p className="mt-4 max-w-xl leading-relaxed text-slate">{body}</p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link href={action.href} className="cb-halftone cb-btn">
          {action.label}
        </Link>
        {secondary && (
          <Link href={secondary.href} className="cb-btn cb-btn--ghost">
            {secondary.label}
          </Link>
        )}
      </div>
    </section>
  );
}

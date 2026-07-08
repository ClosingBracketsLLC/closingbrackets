import { BracketTick } from "./BracketMark";

/**
 * Capability showcase card — honest framing baked in: the `kind` badge
 * ("Demo build" / "Living proof") makes clear this is not client work.
 */
export default function ShowcaseCard({ showcase, expanded = false, headingLevel = "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="card flex h-full flex-col p-7 md:p-8">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            showcase.kind === "Living proof"
              ? "border-violet text-violet"
              : "border-line text-ink-low"
          }`}
        >
          {showcase.kind}
        </span>
      </div>
      <Heading className="mt-4 font-display text-xl font-semibold tracking-display text-ink-hi md:text-2xl">
        {showcase.title}
      </Heading>
      <p className="mt-3 text-sm md:text-base">{showcase.summary}</p>
      {expanded ? (
        <ul className="mt-5 flex flex-col gap-3">
          {showcase.details.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-sm">
              <BracketTick className="mt-0.5" />
              {d}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-2">
          {showcase.stack.map((t) => (
            <span
              key={t}
              className="rounded-md border border-line bg-void-2 px-2.5 py-1 text-xs font-medium text-ink-mid"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs italic text-ink-low">{showcase.proof}</p>
      </div>
    </article>
  );
}

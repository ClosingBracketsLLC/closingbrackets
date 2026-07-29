/**
 * The small presentational pieces every page repeats.
 *
 * These were the same handful of utility-class strings pasted across
 * /services/, /work/ and /content/ — extracted here so the bulleted list, the
 * tag row and the section heading are defined once and can be restyled once.
 * Anything with real behaviour or its own layout gets its own file; this is
 * only the shared vocabulary.
 *
 * Colour comes from `--cb-accent`, which every consumer sets on an ancestor.
 * Nothing here reads a colour prop — that is what kept the accent consistent
 * down a panel in the first place.
 */

/** Section header: caption eyebrow, ruled title, optional standfirst. */
export function SectionHeading({ eyebrow, title, id, children }) {
  return (
    <header>
      {eyebrow && <p className="cb-eyebrow">{eyebrow}</p>}
      <h2
        id={id}
        className={`cb-rule font-[family-name:var(--font-display)] text-3xl text-bone ${
          eyebrow ? "mt-4" : ""
        }`}
      >
        {title}
      </h2>
      {children && (
        <p className="mt-5 max-w-2xl leading-relaxed text-slate">{children}</p>
      )}
    </header>
  );
}

/** Bulleted list with a square accent marker. */
export function AccentList({ items, className = "" }) {
  return (
    <ul className={`grid gap-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate">
          <span
            aria-hidden
            className="mt-2 h-1.5 w-1.5 shrink-0 bg-[var(--cb-accent)]"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Row of static terms — a tech stack, the examples inside a service line. */
export function TagRow({ items, label, className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label={label}>
      {items.map((item) => (
        <li key={item} className="cb-tag">
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Inset frame list — a panel within a panel, for the named things inside a
 * block of work. The pill row it replaces read as a filter bar; none of these
 * lists are filterable, and square corners keep the comic frame reading as
 * print rather than as a second deck of cards.
 */
export function FrameList({ items, label, className = "" }) {
  return (
    <ul className={`cb-inset ${className}`} aria-label={label}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Large outlined figure — a panel number, a stage number, an issue number. */
export function Numeral({ value, className = "text-5xl" }) {
  return (
    <span aria-hidden className={`cb-numeral ${className}`}>
      {typeof value === "number" ? String(value).padStart(2, "0") : value}
    </span>
  );
}

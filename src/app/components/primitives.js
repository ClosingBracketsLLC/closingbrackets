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

/* ------------------------------------------------------------------ */
/* Strip cells — the comic-page vocabulary every listing page shares.  */
/* ------------------------------------------------------------------ */

export const ACCENT = { cyan: "#2ef2dc", coral: "#ff4e64" };

/**
 * Accent and dot-screen corner for the i-th cell of a strip. Cells alternate
 * cyan/coral and screen from opposite corners, so a row of cells reads as a
 * page someone laid out rather than wallpaper. An explicit `accent` keeps the
 * colour but still alternates the corner.
 */
export function cellTone(i, accent) {
  const odd = i % 2 === 1;
  return {
    style: { "--cb-accent": accent ?? (odd ? ACCENT.coral : ACCENT.cyan) },
    tone: odd ? "cb-tone--bl" : "cb-tone--tr",
  };
}

/**
 * A strip of numbered cells: numeral, title, body. The shape behind every
 * "steps", "stages", "rules" and "what happens next" block on the site.
 * `items` is [{ title, body, accent? }]; `numeral(item, i)` overrides the
 * 1-based default (the process stages carry their own "01" labels).
 * Renders an <ol> unless the items are not a sequence.
 */
export function NumberedStrip({
  items,
  cols = "sm:grid-cols-3",
  as: Tag = "ol",
  numeral = (_item, i) => i + 1,
  cellClass = "p-6 sm:p-7",
  className = "mt-9",
}) {
  const Cell = Tag === "ol" ? "li" : "div";
  return (
    <Tag className={`cb-strip ${cols} ${className}`}>
      {items.map((item, i) => {
        const { style, tone } = cellTone(i, item.accent);
        return (
          <Cell key={item.title} style={style} className={`cb-cell cb-tone ${tone} ${cellClass}`}>
            <Numeral value={numeral(item, i)} className="text-4xl" />
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl leading-snug text-bone">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">{item.body}</p>
          </Cell>
        );
      })}
    </Tag>
  );
}

/**
 * The narration box with a captioned list — the page's one loud device where
 * it is used (the limits on the homepage, /build-a-bot/ and /about/).
 */
export function NarrationList({ eyebrow, items, accent = ACCENT.coral, className = "" }) {
  return (
    <div style={{ "--cb-accent": accent }} className={`cb-narration p-7 sm:p-8 ${className}`}>
      <p className="cb-eyebrow text-[var(--cb-accent)]">{eyebrow}</p>
      <AccentList items={items} className="mt-4" />
    </div>
  );
}

/**
 * The label row on a build card: "Concept build", the engagement shape, and
 * the sector. This is the honesty disclosure — every card that shows a build
 * carries it, on /work/ and on the homepage alike.
 */
export function BuildTags({ build }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="cb-eyebrow text-[var(--cb-accent)]">
        {build.concept ? "Concept build" : "Live"}
      </span>
      {build.shape && <span className="cb-eyebrow">{build.shape}</span>}
      <span className="text-xs text-slate">{build.sector}</span>
    </div>
  );
}

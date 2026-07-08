import { BracketTick } from "./BracketMark";

/**
 * Standard section opener: a bracket-tick eyebrow, a display H2, and an
 * optional lead paragraph. Replaces the old `// comment` code-eyebrow motif
 * everywhere.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  as: Tag = "h2",
}) {
  const centered = align === "center";
  return (
    <div
      className={`mb-14 max-w-2xl ${centered ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-low ${
            centered ? "justify-center" : ""
          }`}
        >
          <BracketTick />
          {eyebrow}
        </p>
      ) : null}
      <Tag className="font-display text-3xl font-semibold tracking-display text-ink-hi md:text-5xl">
        {title}
      </Tag>
      {lead ? <p className="mt-5 text-base md:text-lg">{lead}</p> : null}
    </div>
  );
}

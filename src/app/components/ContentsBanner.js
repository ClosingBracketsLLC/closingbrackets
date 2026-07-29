/**
 * The contents banner — a comic page's title strip, printed as a panel across
 * the top of the sections it indexes.
 *
 * This replaced the row of pill chips that used to do the job. A pill says
 * "tag, filter me" and belongs to a web UI; these are the page's contents,
 * so they read as printed type with the section number inked in accent.
 *
 * Renders as a .cb-cell, which means it drops straight into a .cb-strip as the
 * first panel of a comic page (/services/) or stands on its own above a run of
 * sections (/services/catalog/) — the cell draws its own edge either way.
 *
 * `items` is [{ href, title, accent }]. Numbering is positional and is the
 * reading order of the page below; each item's number must match the numeral
 * on the section it points at, so both sides should be driven from one list.
 *
 * There is no visible caption. `label` names the nav for assistive tech, which
 * is the only consumer that needed one — a sighted reader can see that a row
 * of numbered page sections is a contents list.
 */
export default function ContentsBanner({ label, items, className = "" }) {
  return (
    <nav
      aria-label={label}
      className={`cb-cell cb-tone cb-tone--bl flex flex-wrap items-baseline gap-x-7 gap-y-3 px-7 py-6 sm:px-9 ${className}`}
    >
      {items.map((item, i) => (
        <a
          key={item.href}
          href={item.href}
          style={item.accent ? { "--cb-accent": item.accent } : undefined}
          className="cb-index"
        >
          <span aria-hidden className="cb-index__n">
            {String(i + 1).padStart(2, "0")}
          </span>
          {item.title}
        </a>
      ))}
    </nav>
  );
}

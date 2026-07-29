import { Fragment } from "react";
import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import ContentsBanner from "../../components/ContentsBanner";
import CtaPanel from "../../components/CtaPanel";
import { SITE_URL, graphLd, itemListLd, pageOg, url } from "@/data/site";
import { assurances, catalog, hybrids, tiers } from "@/data/services";
import { Numeral } from "../../components/primitives";

const TITLE = "Service catalogue";
const PATH = "/services/catalog/";

export const metadata = {
  title: "Full Service Catalogue",
  /* Trimmed to fit: at 181 characters this was cut off mid-list in results. */
  description:
    "Every service Closing Brackets offers, in full: project builds, monthly retainers, AI audits, agent swarms, automation, growth marketing, and bundled tiers.",
  alternates: { canonical: url(PATH) },
  /* Built with pageOg, never by hand: Next shallow-merges metadata, so a page
     declaring `openGraph` REPLACES the layout's object rather than merging
     into it. This page had none at all, which meant it inherited the layout's
     card but advertised the site's generic title on every share. */
  openGraph: pageOg({
    title: "The full service catalogue — every service, in full",
    description:
      "Project work, ongoing retainers, AI builds and bundled tiers. Each one says what is actually in it, and each is priced on the scope you agree.",
    path: PATH,
  }),
};

/*
 * The page's own contents, in reading order. ONE list drives three things: the
 * banner links, the numeral on each section heading, and the ItemList
 * structured data — so a section cannot be numbered 04 in the banner and 05 on
 * the page, and cannot appear in the markup but go missing from the schema.
 *
 * `Web + AI bundles` had no id at all before this, so it was the one block of
 * real catalogue content with no anchor to link at.
 */
const SECTIONS = [
  ...catalog.map((group) => ({
    id: group.id,
    title: group.title,
    accent: group.accent,
    description: group.blurb,
  })),
  {
    id: "tiers",
    title: "Bundled tiers",
    accent: "#2ef2dc",
    description:
      "The à la carte services above, packaged. Each tier is everything in the one before it plus what is named.",
  },
  {
    id: "bundles",
    title: "Web + AI bundles",
    accent: "#ff4e64",
    description:
      "Where the two halves of the business are bought together. Every one starts with the AI maturity audit.",
  },
];

/** 1-based position of a section, so its numeral matches its banner entry. */
const sectionNo = (id) => SECTIONS.findIndex((s) => s.id === id) + 1;

/*
 * Dot-screen corners for a two-up run, cycled by position.
 *
 * This page was the last one still laid out as floating cards in a `gap` grid —
 * the card deck the rest of the site was rebuilt to stop being — and at ~45
 * entries it was the worst place for it: every card the same size, the same
 * weight, the same screen, for six screens of scrolling. It is a comic page
 * now, like /services/ and /work/: hard ink gutter, each cell drawing its own
 * edge.
 *
 * The order is tl → br → tr → bl rather than a simple alternation because in a
 * two-column grid a two-step cycle puts the same corner directly above itself
 * every other row. Four steps means no cell is screened from the same side as
 * the cell beside it OR the cell under it, which is the whole point of varying
 * it — a page of identically screened boxes reads as wallpaper.
 */
const TONES = ["cb-tone--tl", "cb-tone--br", "cb-tone--tr", "cb-tone--bl"];
const toneAt = (i) => TONES[i % TONES.length];

/* The group the mid-page call to action follows. Chosen by entry count, not by
   position: project work and AI projects are 22 of the 45 services between
   them, so this is the halfway mark as a reader experiences it. */
const MID_BREAK = "ai-projects";

/* Three levels deep, so the breadcrumb helper in data/site.js (which only
   models two) does not fit — this one is built out here. */
const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Services", item: url("/services/") },
    { "@type": "ListItem", position: 3, name: TITLE, item: url(PATH) },
  ],
};

/* The page is a listing, so it says so. Sections rather than all ~50 services:
   an ItemList entry wants a URL, the sections have anchors and the individual
   services do not, and fifty entries all pointing at the same page URL is the
   kind of padding that earns a manual action rather than a rich result. */
const jsonLd = graphLd(
  breadcrumb,
  itemListLd(
    "Service catalogue",
    SECTIONS.map((section) => ({
      name: section.title,
      url: url(`${PATH}#${section.id}`),
      description: section.description,
    })),
  ),
);

export default function Catalog() {
  const count = catalog.reduce((n, group) => n + group.items.length, 0);

  return (
    <PageLayout
      eyebrow="Catalogue"
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services/" },
      ]}
      title="Everything we offer, in full"
      intro={`${count} services across project work, ongoing retainers, AI builds and bundled tiers. Each one says what is actually in it. Nothing here is priced on this page — scope comes first, then one fixed price for exactly that scope.`}
      accent="#2ef2dc"
      width="max-w-6xl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The contents banner — the same panel /services/ opens with, because
          this is the same move: there is enough page here that landing at the
          top with no map is a bad experience. */}
      <ContentsBanner
        label="Catalogue sections"
        items={SECTIONS.map((section) => ({
          href: `#${section.id}`,
          title: section.title,
          accent: section.accent,
        }))}
        className="mt-8"
      />

      {catalog.map((group) => (
        <Fragment key={group.id}>
        <section
          id={group.id}
          style={{ "--cb-accent": group.accent }}
          className="mt-20 scroll-mt-28"
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <Numeral value={sectionNo(group.id)} className="text-5xl" />
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-bone sm:text-4xl">
              {group.title}
            </h2>
          </div>
          <p className="mt-4 text-sm" style={{ color: group.accent }}>
            {group.kind}
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-slate">{group.blurb}</p>

          {/* No --lift here, unlike the old cards: nothing in this run is a
              link, and a panel that rises and drops a shadow under the pointer
              promises a click that never arrives. The cell's own ink response
              (fill firms up, border takes the accent) is the honest version. */}
          <div className="cb-strip mt-9 md:grid-cols-2">
            {group.items.map((item, i) => (
              <article
                key={item.name}
                className={`cb-cell cb-tone ${toneAt(i)} flex flex-col p-6 sm:p-7`}
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-bone">
                  {item.name}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: group.accent }}
                >
                  {item.brief}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate">
                  {item.detail}
                </p>
                <p className="cb-footrule mt-6 pt-4 text-xs text-slate">
                  <span className="font-[family-name:var(--font-display)] tracking-[0.14em] uppercase">
                    Goes with
                  </span>
                  <span className="ml-2">{item.pairs}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* A way out, halfway down.

            This page is six screens of scrolling and had exactly one call to
            action, at the bottom of the sixth — so a reader who found what they
            needed in the first group had to scroll past thirty services they
            did not want in order to act on it. The break lands after AI
            projects, which is the midpoint by entry count rather than by
            section number.

            Deliberately slimmer than CtaPanel: this is a door held open in
            passing, and the same marked panel with speed lines twice on one
            page turns the closing ask into a repeat. */}
        {group.id === MID_BREAK && (
          <aside
            style={{ "--cb-accent": "#ff4e64" }}
            className="cb-panel mt-16 flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <p className="max-w-xl leading-relaxed text-slate">
              <span className="text-bone">Seen the one you need?</span> You do not
              have to read the rest. Name it and we will come back with the scope,
              real dates, and one price for exactly that.
            </p>
            <Link href="/contact/" className="cb-halftone cb-btn shrink-0">
              Get a fixed-scope plan
            </Link>
          </aside>
        )}
        </Fragment>
      ))}

      {/* ---------------------------------------------------------------- */}
      <section id="tiers" className="mt-24 scroll-mt-28">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <Numeral value={sectionNo("tiers")} className="text-5xl" />
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-bone sm:text-4xl">
            Bundled tiers
          </h2>
        </div>
        <p className="mt-4 text-sm text-cyan">Monthly · bundled</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate">
          The à la carte services above, packaged. Each tier is everything in
          the one before it plus what is named — so moving up never means
          giving anything up.
        </p>

        {/* A ladder, run as a one-column comic page. It was a hairline table
            built from raw utilities — the one block on the site drawing its own
            borders instead of using the panel system — which is why it read as
            a spec sheet dropped into a comic. Each rung alternates its screen
            so the climb is visible as you scroll rather than seven identical
            bars. Each tier is everything in the one before it, so the copy
            column is left to breathe rather than stretched to the panel edge. */}
        <ol className="cb-strip mt-9">
          {tiers.map((tier, i) => (
            <li
              key={tier.name}
              className={`cb-cell cb-tone ${
                i % 2 ? "cb-tone--bl" : "cb-tone--tr"
              } p-6 sm:flex sm:gap-9 sm:p-7`}
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:w-56 sm:shrink-0 sm:flex-col sm:items-start sm:gap-1">
                <Numeral value={tier.n} className="text-3xl" />
                <h3 className="font-[family-name:var(--font-display)] text-lg text-bone">
                  {tier.name}
                </h3>
                <p className="text-xs text-slate">Minimum term {tier.term}</p>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate sm:mt-0">
                {tier.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="bundles" className="mt-24 scroll-mt-28">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <Numeral value={sectionNo("bundles")} className="text-5xl" />
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-bone sm:text-4xl">
            Web + AI bundles
          </h2>
        </div>
        <p className="mt-4 text-sm text-coral">Monthly · bundled</p>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate">
          Where the two halves of the business are bought together. Every one of
          these starts with the AI maturity audit, and the audit is what locks
          the final scope.
        </p>
        <div className="cb-strip mt-9 md:grid-cols-2">
          {hybrids.map((h, i) => (
            <article
              key={h.name}
              style={{ "--cb-accent": i % 2 ? "#ff4e64" : "#2ef2dc" }}
              className={`cb-cell cb-tone ${toneAt(i)} flex flex-col p-7`}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-bone">
                  {h.name}
                </h3>
                <span
                  className="font-[family-name:var(--font-display)] text-xs tracking-[0.1em] uppercase"
                  style={{ color: i % 2 ? "#ff4e64" : "#2ef2dc" }}
                >
                  {h.tag}
                </span>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate">{h.body}</p>
              <dl className="cb-footrule mt-6 flex flex-wrap gap-x-8 gap-y-2 pt-4 text-xs">
                <div>
                  <dt className="font-[family-name:var(--font-display)] tracking-[0.14em] text-slate uppercase">
                    Minimum term
                  </dt>
                  <dd className="mt-1 text-slate">{h.term}</dd>
                </div>
                <div>
                  <dt className="font-[family-name:var(--font-display)] tracking-[0.14em] text-slate uppercase">
                    Best fit
                  </dt>
                  <dd className="mt-1 text-slate">{h.fit}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-24">
        <h2 className="cb-rule font-[family-name:var(--font-display)] text-2xl text-bone">
          How this is kept honest
        </h2>
        <div className="cb-strip mt-9 sm:grid-cols-3">
          {assurances.map((a, i) => (
            <div
              key={a.title}
              className={`cb-cell cb-tone ${
                i % 2 ? "cb-tone--bl" : "cb-tone--tr"
              } p-6 sm:p-7`}
            >
              <h3 className="font-[family-name:var(--font-display)] text-base leading-snug text-cyan">
                {a.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The shared closing panel rather than a hand-built copy of it. This was
          the one page ending on its own near-identical section, which is how
          the corner tick and the caption register had already drifted off it. */}
      <CtaPanel
        caption="Fifty services, one conversation"
        title="Not sure which of these you need?"
        body="That is what the first conversation is for. Describe the problem rather than the service, and we will tell you which of the above actually applies — including when the answer is none of them."
        action={{ label: "Start a conversation", href: "/contact/" }}
        secondary={{ label: "Back to services", href: "/services/" }}
        className="mt-20"
      />
    </PageLayout>
  );
}

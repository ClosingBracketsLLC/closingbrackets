import Link from "next/link";
import PageLayout from "../components/PageLayout";
import ClipFrame from "../components/ClipFrame";
import CtaPanel from "../components/CtaPanel";
import { AccentList, Numeral, SectionHeading, TagRow } from "../components/primitives";
import { breadcrumbLd, graphLd, itemListLd, pageOg, url } from "@/data/site";
import { services } from "@/data/services";
import { builds, stages } from "@/data/work";

const TITLE = "Work";
const PATH = "/work/";

export const metadata = {
  title: "Work & How a Project Runs",
  description:
    "Concept builds showing what a Closing Brackets engagement produces, and the five stages every project runs through: scope, build, integrate, hand over, grow.",
  alternates: { canonical: url(PATH) },
  openGraph: pageOg({
    title: "Work — what we build, and how a project runs",
    description:
      "Concept builds showing what an engagement produces end to end, and the five stages every project runs through.",
    path: PATH,
  }),
};

/*
 * The builds run as a comic page: the featured build is the splash across the
 * top, and the rest fall into tiers split 7/5 → 5/7. Equal columns read as a
 * grid; unequal ones read as a page someone laid out. Each panel is handed its
 * span and its dot-screen corner here rather than at the call site, and no two
 * panels in a tier take their screen from the same side — a page of identically
 * screened boxes reads as wallpaper. Cycles, so adding a sixth build needs no
 * edit here.
 */
const TIERS = [
  { span: "lg:col-span-7", tone: "cb-tone--tl" },
  { span: "lg:col-span-5", tone: "cb-tone--br" },
  { span: "lg:col-span-5", tone: "cb-tone--bl" },
  { span: "lg:col-span-7", tone: "cb-tone--tr" },
];

/* Real client work sorts above concept builds automatically, so the first
   confirmed case study takes the top slot without touching this file. */
const ordered = [...builds].sort(
  (a, b) => Number(a.concept ?? false) - Number(b.concept ?? false),
);
const featured = ordered.find((b) => b.featured) ?? ordered[0];
const others = ordered.filter((b) => b !== featured);
const allConcept = ordered.every((b) => b.concept);

/* An ItemList and nothing more. There is deliberately no Review, Rating or
   testimonial markup anywhere on this page: these are concept builds, and
   structured data claiming otherwise would be the one lie a prospect could
   catch us in. See the note at the top of data/work.js. */
const jsonLd = graphLd(
  breadcrumbLd(TITLE, PATH),
  itemListLd(
    allConcept ? "Concept builds" : "Selected work",
    ordered.map((build) => ({
      name: build.client,
      url: url(`${PATH}#${build.id}`),
      description: build.summary,
    })),
  ),
  /* The process, as an ordered list rather than as HowTo. HowTo describes steps
     the reader performs; these are stages an engagement moves through, and the
     reader does none of them. ItemList is the honest shape, and "how does a
     project with you actually run" is a question worth being extractable for. */
  {
    "@type": "ItemList",
    name: "How a Closing Brackets project runs",
    description:
      "The five stages every engagement moves through, in the same order every time.",
    numberOfItems: stages.length,
    itemListElement: stages.map((stage, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: stage.title,
      description: stage.body,
    })),
  },
);

/** Service lines a build draws on — the route from proof back to the offer. */
function ServiceLines({ ids }) {
  if (!ids?.length) return null;
  const lines = ids.map((id) => services.find((s) => s.id === id)).filter(Boolean);
  if (!lines.length) return null;

  return (
    <div className="mt-6">
      <p className="cb-eyebrow">Lines of work involved</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {lines.map((line) => (
          <li key={line.id}>
            {/* --link, not a bare .cb-tag: the stack row directly above this one
                is inert terms in identical boxes, so without a distinct
                affordance half the terms on the panel are clickable and nothing
                says which half. */}
            <Link href={`/services/#${line.id}`} className="cb-tag cb-tag--link">
              {line.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The body of a build, in the order a reader needs it: the problem, what we
 * made, and what it demonstrates. `columns` splits it across a grid for the
 * featured slot; the grid cards run it in one column.
 */
function BuildBody({ build, columns = false }) {
  return (
    <>
      <p className={columns ? "max-w-3xl text-lg leading-relaxed text-slate" : "text-slate"}>
        {build.summary}
      </p>

      <div className={columns ? "mt-9 gap-12 lg:grid lg:grid-cols-2" : "mt-7"}>
        <div>
          <p className="cb-eyebrow">What was built</p>
          <AccentList items={build.work} className="mt-3" />
        </div>

        <div className={columns ? "mt-8 lg:mt-0" : "mt-7"}>
          {/* Concept builds say what they demonstrate; a real case study would
              carry a client-confirmed outcome in the same slot. */}
          <p className="cb-eyebrow">{build.concept ? "What it shows" : "Outcome"}</p>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: "var(--cb-accent)" }}
          >
            {build.concept ? build.shows : build.outcome}
          </p>
          <TagRow items={build.stack} label="Technology used" className="mt-6" />
          <ServiceLines ids={build.lines} />
        </div>
      </div>
    </>
  );
}

export default function Work() {
  return (
    <PageLayout
      eyebrow={TITLE}
      title="What we build, and how a project runs"
      intro="Every engagement follows the same five stages, and you can tell which one you are in at any point. Below are builds that show what comes out the other end."
      accent="#ff4e64"
      width="max-w-6xl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* The "Read this first" narration box that used to sit here was removed
          on request, ahead of real client work replacing these builds.

          What still carries the disclosure until that lands: the per-card
          "Concept build" eyebrow on every build below, the "What it shows"
          label standing in for "Outcome", the FAQ answer on /contact/, and the
          deliberate absence of Review/Rating/testimonial structured data (see
          the note on jsonLd above). Do not remove those as well — a page of
          invented companies with no disclosure at all is the one thing on this
          site a prospect could catch us in. */}

      {/* Featured build — the splash panel, and the only moving thing on the
          page. Screened bottom-right, where the copy is: a dot tone laid over
          the film frame would fight the footage. */}
      <article
        id={featured.id}
        style={{ "--cb-accent": featured.accent }}
        className="cb-panel cb-splash cb-tone cb-tone--br mt-8 scroll-mt-28 overflow-hidden"
      >
        {featured.clip && (
          <ClipFrame
            poster={featured.poster}
            posterMobile={featured.posterMobile}
            clip={featured.clip}
            clipMobile={featured.clipMobile}
            alt={`${featured.client} — launch film still`}
            className="aspect-[16/9] w-full sm:aspect-[21/9]"
          />
        )}
        <div className="p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            {featured.concept && (
              <span className="cb-eyebrow text-[var(--cb-accent)]">Concept build</span>
            )}
            <span className="text-xs text-slate">{featured.sector}</span>
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-tight text-bone sm:text-4xl">
            {featured.client}
          </h2>
          <div className="mt-6">
            <BuildBody build={featured} columns />
          </div>
          <Link href="/content/evergreen-softwash-launch-film/" className="cb-link mt-9">
            How the film was cut <span aria-hidden>→</span>
          </Link>
        </div>
      </article>

      <div className="cb-strip mt-3 lg:grid-cols-12">
        {others.map((build, i) => (
          <article
            key={build.id}
            id={build.id}
            style={{ "--cb-accent": build.accent }}
            className={`cb-cell cb-tone ${TIERS[i % TIERS.length].tone} ${
              TIERS[i % TIERS.length].span
            } flex scroll-mt-28 flex-col p-7 sm:p-9`}
          >
            <div className="flex flex-wrap items-center gap-3">
              {build.concept && (
                <span className="cb-eyebrow text-[var(--cb-accent)]">Concept build</span>
              )}
              <span className="text-xs text-slate">{build.sector}</span>
            </div>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl leading-tight text-bone">
              {build.client}
            </h2>
            <div className="mt-4 flex flex-1 flex-col">
              <BuildBody build={build} />
            </div>
          </article>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Five panels, read left to right — the shape of the process is the
          point, so it gets the strip rather than a stack of full-width rows. */}
      <section className="mt-24">
        <SectionHeading eyebrow="The process" title="How a project runs">
          The same five stages every time, in the same order, so you can always
          say which one you are in and what comes next.
        </SectionHeading>
        <ol className="cb-strip mt-9 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage, i) => (
            <li
              key={stage.step}
              style={{ "--cb-accent": i % 2 ? "#ff4e64" : "#2ef2dc" }}
              /* Padding tightens at the five-across breakpoint. The row is
                 fixed at the content column's width, so each cell is ~215px
                 there and generous padding was eating it: the copy fell to
                 roughly twenty characters a line, which is below the point
                 where a measure reads as a paragraph at all. Five in a row is
                 the shape of the process and stays; the padding is what gives. */
              className={`cb-cell cb-tone ${
                i % 2 ? "cb-tone--bl" : "cb-tone--tr"
              } p-6 sm:p-7 lg:px-5 lg:py-6`}
            >
              <Numeral value={stage.step} className="text-4xl" />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl leading-snug text-bone">
                {stage.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{stage.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <CtaPanel
        caption="Stage one"
        title="Start with a fixed-scope plan"
        body="The first stage is the scope document. Tell us what you want built and you will have what gets made, a timeline with real dates, and one fixed price — before any work begins."
        action={{ label: "Get a fixed-scope plan", href: "/contact/" }}
        secondary={{ label: "See what we do", href: "/services/" }}
        accent="#2ef2dc"
        className="mt-20"
      />
    </PageLayout>
  );
}

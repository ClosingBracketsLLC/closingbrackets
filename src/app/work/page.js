import Link from "next/link";
import PageLayout from "../components/PageLayout";
import ClipFrame from "../components/ClipFrame";
import CtaPanel from "../components/CtaPanel";
import { AccentList, Numeral, SectionHeading, TagRow } from "../components/primitives";
import { breadcrumbLd, graphLd, itemListLd, pageOg, url } from "@/data/site";
import { services } from "@/data/services";
import { builds, deliverables, stages } from "@/data/work";

const TITLE = "Work";
const PATH = "/work/";

export const metadata = {
  title: "Work & How We Build",
  description:
    "Concept builds showing what a Closing Brackets engagement produces end to end, and the five stages every project runs through: scope, build, integrate, hand over, grow.",
  alternates: { canonical: url(PATH) },
  openGraph: pageOg({
    title: "Work — what we build, and how a project runs",
    description:
      "Concept builds showing what an engagement produces end to end, and the five stages every project runs through.",
    path: PATH,
  }),
};

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
            <Link href={`/services/#${line.id}`} className="cb-tag transition hover:text-bone">
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

      {/* Said once, up front, in plain words. The per-card tags repeat it, but
          nobody should have to infer this from a badge. */}
      {allConcept && (
        <aside
          style={{ "--cb-accent": "#ff4e64" }}
          className="cb-narration flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:gap-7 sm:p-7"
        >
          <span className="cb-caption cb-caption--ghost self-start">Read this first</span>
          <p className="max-w-3xl text-sm leading-relaxed text-slate">
            <span className="text-bone">These are concept builds.</span> Each one
            was designed and built by us to show what an engagement produces end
            to end — the companies are invented, and nothing below is a client, a
            testimonial, or a measured result. Real case studies go up here when
            clients confirm them in writing, and not before.
          </p>
        </aside>
      )}

      {/* Featured build — the only moving thing on the page. */}
      <article
        id={featured.id}
        style={{ "--cb-accent": featured.accent }}
        className="cb-panel cb-panel--marked mt-5 scroll-mt-28 overflow-hidden"
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
              <span className="cb-caption cb-caption--ghost">Concept build</span>
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

      <div className="cb-strip mt-5 lg:grid-cols-2">
        {others.map((build) => (
          <article
            key={build.id}
            id={build.id}
            style={{ "--cb-accent": build.accent }}
            className="cb-cell flex scroll-mt-28 flex-col p-7 sm:p-9"
          >
            <div className="flex flex-wrap items-center gap-3">
              {build.concept && (
                <span className="cb-caption cb-caption--ghost">Concept build</span>
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
              className="cb-cell p-6 sm:p-7"
            >
              <Numeral value={stage.step} className="text-4xl" />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl text-bone">
                {stage.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{stage.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <SectionHeading eyebrow="At handover" title="What you are left holding" />
        <ul className="cb-strip mt-9 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item, i) => (
            <li
              key={item}
              style={{ "--cb-accent": i % 2 ? "#ff4e64" : "#2ef2dc" }}
              className="cb-cell flex gap-4 p-6 text-sm leading-relaxed text-slate"
            >
              <span aria-hidden className="cb-tick mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
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

import Link from "next/link";
import PageLayout from "../components/PageLayout";
import CtaPanel from "../components/CtaPanel";
import { AccentList, Numeral, SectionHeading, TagRow } from "../components/primitives";
import { breadcrumbLd, faqLd, graphLd, itemListLd, pageOg, url } from "@/data/site";
import { engagement, faqs, hireABot, services } from "@/data/services";
import { builds } from "@/data/work";

const TITLE = "Services";
const PATH = "/services/";

export const metadata = {
  title: "Custom Software, AI Consulting, Integration & Growth",
  description:
    "The five things Closing Brackets does: custom software development, AI consulting, AI integration, AI automation, and growth marketing. Fixed scope, real dates, one price.",
  alternates: { canonical: url(PATH) },
  openGraph: pageOg({
    title: "Services — custom software, AI, and growth marketing",
    description:
      "Five lines of work and about fifty services behind them. Fixed scope, real dates, one price, no hourly billing.",
    path: PATH,
  }),
};

/* Structured data. One graph, three nodes: where the page sits, what it lists,
   and the questions it answers — the FAQ node is worth the most here, and only
   stays valid because every answer is rendered visibly further down. */
const jsonLd = graphLd(
  breadcrumbLd(TITLE, PATH),
  itemListLd(
    "Services",
    services.map((service) => ({
      name: service.title,
      url: url(`${PATH}#${service.id}`),
      description: service.summary,
    })),
  ),
  faqLd(faqs),
);

const [lead, ...rest] = services;

/* Three concept builds to point at from here, featured one first. Three rather
   than all five: this is a signpost to /work/, not a second copy of it. */
const proof = [builds.find((b) => b.featured), ...builds.filter((b) => !b.featured)]
  .filter(Boolean)
  .slice(0, 3);

/** One service line as a comic panel. `wide` runs the lead across the grid. */
function ServicePanel({ service, index, wide = false }) {
  return (
    <article
      id={service.id}
      style={{ "--cb-accent": service.accent }}
      className={`cb-cell scroll-mt-28 p-7 sm:p-9 ${wide ? "lg:col-span-2" : ""}`}
    >
      <div className={wide ? "lg:flex lg:items-start lg:gap-14" : ""}>
        <div className={wide ? "lg:w-2/5" : ""}>
          <div className="flex items-baseline gap-4">
            <Numeral value={index + 1} className="text-5xl sm:text-6xl" />
            {/* h2: each line is a top-level section of this page, and the
                anchor nav above points straight at it. */}
            <h2 className="font-[family-name:var(--font-display)] text-2xl leading-tight text-bone sm:text-[1.7rem]">
              {service.title}
            </h2>
          </div>
          <p className="mt-5 text-slate">{service.summary}</p>
        </div>

        <div className={wide ? "mt-8 lg:mt-0 lg:flex-1" : "mt-7"}>
          <AccentList items={service.points} />

          <div className="mt-7 border-t border-rain/70 pt-5">
            <p className="cb-eyebrow">In this line</p>
            <TagRow
              items={service.examples}
              label={`Examples of ${service.title}`}
              className="mt-3"
            />
            <Link
              href={`/services/catalog/#${service.catalogAnchor}`}
              className="cb-link mt-5"
            >
              See everything in it
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <PageLayout
      eyebrow={TITLE}
      title="Five lines of work: custom software, AI, and growth"
      intro="One small senior team scopes the work, writes the code, and is still there when it goes live. Below is the shape of what we do; the full catalogue runs to about fifty services."
      accent="#2ef2dc"
      width="max-w-6xl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Answers "what do you actually do" before anyone scrolls, and gives the
          five panels below a set of in-page anchors worth linking to. */}
      <nav aria-label="Service lines" className="flex flex-wrap gap-2 border-y border-rain py-4">
        {services.map((service, i) => (
          <a
            key={service.id}
            href={`#${service.id}`}
            style={{ "--cb-accent": service.accent }}
            className="cb-chip"
          >
            <span aria-hidden style={{ color: service.accent }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {service.title}
          </a>
        ))}
      </nav>

      <section className="cb-strip mt-8 lg:grid-cols-2">
        <ServicePanel service={lead} index={0} wide />
        {rest.map((service, i) => (
          <ServicePanel key={service.id} service={service} index={i + 1} />
        ))}
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The terms sit here rather than at the bottom: this is the point in
          the page where "so how does buying it work" arrives. */}
      <section className="mt-24">
        <SectionHeading eyebrow="How we sell it" title="Fixed scope, real dates, one price">
          No hourly billing, no time-and-materials, and no estimate that quietly
          becomes a range. You agree one scope and one price, and that is the
          price.
        </SectionHeading>
        <div className="cb-strip mt-9 sm:grid-cols-3">
          {engagement.map((term, i) => (
            <div
              key={term.title}
              style={{ "--cb-accent": i === 1 ? "#ff4e64" : "#2ef2dc" }}
              className="cb-cell p-7"
            >
              <Numeral value={i + 1} className="text-4xl" />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg text-bone">
                {term.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{term.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The value-menu entry point, given its own stage — it is the easiest
          thing on the page to say yes to, and the usual route into the rest. */}
      <section
        style={{ "--cb-accent": "#ff4e64" }}
        className="cb-panel cb-panel--marked relative mt-24 isolate overflow-hidden p-8 sm:p-11"
      >
        <span aria-hidden className="cb-speedlines" />
        <p className="cb-halftone cb-caption">Start small</p>
        <h2 className="mt-5 max-w-xl font-[family-name:var(--font-display)] text-3xl leading-tight text-balance text-bone sm:text-4xl">
          {hireABot.title}
        </h2>

        <p className="cb-balloon mt-7 max-w-xl p-6 text-lg leading-relaxed text-bone">
          {hireABot.lede}
        </p>

        <div className="mt-12 grid gap-9 sm:grid-cols-2">
          <div>
            <p className="cb-eyebrow">What comes with it</p>
            <AccentList items={hireABot.included} className="mt-4" />
          </div>
          <div>
            <p className="cb-eyebrow">Jobs people hire one for</p>
            <TagRow items={hireABot.roles} label="Agent roles" className="mt-4" />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Proof, next to the ask. Labelled concept builds here as well as on
          /work/ — the label travels with the work, never just its own page. */}
      <section className="mt-24">
        <SectionHeading eyebrow="What it looks like built" title="Five lines, one engagement">
          Every build below draws on more than one of these lines, because most
          problems do. They are concept builds — designed and built by us to show
          what an engagement produces, with invented companies and no client
          results attached.
        </SectionHeading>
        <div className="cb-strip mt-9 lg:grid-cols-3">
          {proof.map((build) => (
            <Link
              key={build.id}
              href={`/work/#${build.id}`}
              style={{ "--cb-accent": build.accent }}
              className="cb-cell flex flex-col p-7"
            >
              <span className="cb-caption cb-caption--ghost self-start">Concept build</span>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl leading-tight text-bone">
                {build.client}
              </h3>
              <p className="mt-2 text-xs text-slate">{build.sector}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate">
                {build.shows}
              </p>
              <span className="cb-link mt-6">
                Read the build <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Rendered in full, not behind disclosure toggles: these answers are
          the FAQPage structured data above, and hidden text that does not
          match what a visitor reads is the fastest way to lose the rich
          result entirely. */}
      <section className="mt-24">
        <SectionHeading eyebrow="Before you ask" title="Questions we get every week" />
        <div className="cb-strip mt-9 lg:grid-cols-2">
          {faqs.map((item, i) => (
            <div
              key={item.q}
              style={{ "--cb-accent": i % 2 ? "#ff4e64" : "#2ef2dc" }}
              className="cb-cell p-7"
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-bone">
                {item.q}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="mt-24">
        <Link
          href="/services/catalog/"
          style={{ "--cb-accent": "#2ef2dc" }}
          className="cb-panel cb-panel--lift cb-panel--marked group flex flex-col gap-8 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <div className="max-w-xl">
            <p className="cb-eyebrow text-cyan">The full menu</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight text-bone">
              Every service, with what is actually in it
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Project work, ongoing retainers, AI builds and bundled tiers — each
              one described in full rather than in a bullet, and each one priced
              on the scope you agree rather than on a rate card.
            </p>
            <span className="cb-link mt-6">
              Open the catalogue <span aria-hidden>→</span>
            </span>
          </div>
          <span className="cb-halftone cb-burst shrink-0">
            About 50
            <br />
            services
          </span>
        </Link>
      </section>

      <CtaPanel
        caption="One business day"
        title="Tell us what you want to build"
        body="Describe the project and you will know the exact scope, real dates, and one fixed price before anything starts. We read every enquiry ourselves, and the first answer costs nothing."
        action={{ label: "Get a fixed-scope plan", href: "/contact/" }}
        secondary={{ label: "See how a project runs", href: "/work/" }}
        className="mt-6"
      />
    </PageLayout>
  );
}

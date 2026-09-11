import { Fragment } from "react";
import Link from "next/link";
import PageLayout from "../components/PageLayout";
import CtaPanel from "../components/CtaPanel";
import ProcessStrip from "../components/ProcessStrip";
import {
  ACCENT,
  AccentList,
  FrameList,
  NarrationList,
  Numeral,
  SectionHeading,
  cellTone,
} from "../components/primitives";
import { SITE_URL, breadcrumbLd, call, graphLd, pageOg, routes, url } from "@/data/site";
import {
  bands,
  bandsNote,
  close,
  delegate,
  delegateNote,
  hero,
  isNot,
  letter,
  notDelegate,
  oversight,
  timeline,
  usd,
  walkthrough,
} from "@/data/build-a-bot";

const TITLE = "Build-a-Bot";
const PATH = routes.bot;

export const metadata = {
  title: "Build-a-Bot: Custom Agent for Delegated Tasks",
  description: `One custom agent, scoped by a job letter, wired to your tools, with a stop condition and a human it escalates to. From ${usd(bands[0].from)}. ${timeline} No hourly billing.`,
  alternates: { canonical: url(PATH) },
  openGraph: pageOg({
    title: "Build-a-Bot — a custom agent for the tasks you delegate",
    description:
      "Not a chatbot. Not a platform. One worker, scoped to your business, with limits, a sample job letter, and starting price bands.",
    path: PATH,
  }),
};

/* The product as a Service with its starting bands as Offers. `minPrice`,
   never `price`: these are bands, and the exact figure comes from the letter. */
const jsonLd = graphLd(breadcrumbLd(TITLE, PATH), {
  "@type": "Service",
  "@id": url(`${PATH}#service`),
  name: TITLE,
  serviceType: "Custom AI agent for delegated tasks",
  description: hero.intro,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  offers: [...bands, oversight].map((band) => ({
    "@type": "Offer",
    name: band.name,
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      minPrice: band.from,
      ...(band.per ? { unitText: band.per } : {}),
    },
  })),
});

const h2 = "font-[family-name:var(--font-display)] text-2xl leading-tight text-bone sm:text-[1.7rem]";

export default function BuildABot() {
  return (
    <PageLayout eyebrow={TITLE} title={hero.title} intro={hero.intro} accent="#2ef2dc" width="max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* What you delegate / what you do not — the two halves of every job
          letter, as one tier. The limits take the page's one narration box. */}
      <section className="cb-strip mt-8 lg:grid-cols-12">
        <div
          id="delegate"
          style={{ "--cb-accent": ACCENT.cyan }}
          className="cb-cell cb-tone cb-tone--tl scroll-mt-28 p-7 sm:p-9 lg:col-span-7"
        >
          <Numeral value={1} className="text-5xl" />
          <h2 className={`mt-4 ${h2}`}>What you delegate</h2>
          <p className="mt-4 leading-relaxed text-slate">
            Examples of jobs people hand to one agent. Each one is a task with
            an input, an output, and a rule for what to do when it is unsure.
          </p>
          <FrameList items={delegate} label="Examples of delegated jobs" className="mt-6" />
          <p className="mt-6 text-sm leading-relaxed text-slate">{delegateNote}</p>
        </div>

        <div
          id="limits"
          style={{ "--cb-accent": ACCENT.coral }}
          className="cb-cell cb-tone cb-tone--br scroll-mt-28 flex flex-col p-7 sm:p-9 lg:col-span-5"
        >
          <Numeral value={2} className="text-5xl" />
          <h2 className={`mt-4 ${h2}`}>What you do not delegate</h2>
          <NarrationList eyebrow="Goes to a person" items={notDelegate} className="mt-6" />
          <p className="mt-6 text-sm leading-relaxed text-slate">
            These go to a person by design, not by exception. If you want the
            agent to decide one of them later, that is a new line in the letter,
            with a rule written down first.
          </p>
        </div>
      </section>

      <section id="job-letter" className="mt-24 scroll-mt-28">
        <SectionHeading eyebrow="The scope model" title="The job letter">
          Every Build-a-Bot engagement is a delegation letter, not a feature
          list. If it is not in the letter, it is not in the bot. More tasks
          means a change order or a second bot.
        </SectionHeading>
        <figure
          style={{ "--cb-accent": ACCENT.cyan }}
          className="cb-panel cb-tone cb-tone--tr mt-9 p-7 sm:p-10"
        >
          <p className="cb-eyebrow">{letter.title}</p>
          <div className="mt-7 grid gap-9 sm:grid-cols-2">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg text-cyan">Delegate</h3>
              <AccentList items={letter.delegate} className="mt-4" />
            </div>
            <div style={{ "--cb-accent": ACCENT.coral }}>
              <h3 className="font-[family-name:var(--font-display)] text-lg text-coral">
                Do not delegate
              </h3>
              <AccentList items={letter.keep} className="mt-4" />
            </div>
          </div>
          <figcaption className="cb-footrule mt-8 pt-5 text-sm text-bone">{letter.caption}</figcaption>
        </figure>
      </section>

      <section id="process" className="mt-24 scroll-mt-28">
        <SectionHeading eyebrow="How a project runs" title="Scope, build, integrate, hand over, stabilise">
          Usable software each week, not a status report. Pilot against your
          real records, then production. {timeline}
        </SectionHeading>
        <ProcessStrip />
      </section>

      {/* Starting bands. Published on purpose (the brief asks for them), as
          bands rather than a rate card: the exact price is the letter's. Two
          groups by how the agent is wired in, then the optional retainer and
          the free hour for anyone who cannot name the job yet. */}
      <section id="price" className="mt-24 scroll-mt-28">
        <SectionHeading eyebrow="Starting price bands" title="What Build-a-Bot costs">
          {bandsNote} {timeline}
        </SectionHeading>
        <div className="cb-strip mt-9 lg:grid-cols-2">
          {bands.map((band, i) => {
            const { style, tone } = cellTone(i);
            return (
              <article
                key={band.id}
                id={band.id}
                style={style}
                className={`cb-cell cb-tone ${tone} flex scroll-mt-28 flex-col p-7 sm:p-9`}
              >
                <p className="cb-eyebrow text-[var(--cb-accent)]">From</p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-none text-bone sm:text-4xl">
                  {usd(band.from)}
                </p>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl leading-snug text-bone">
                  {band.name}
                </h3>
                <p className="mt-3 leading-relaxed text-slate">{band.lede}</p>
                <div className="mt-6">
                  <h4 className="cb-subhead">What it connects to</h4>
                  <FrameList items={band.includes} label={`${band.name}: systems`} className="mt-4" />
                </div>
                <div className="mt-6">
                  <h4 className="cb-subhead">Jobs at this level</h4>
                  <AccentList items={band.examples} className="mt-4" />
                </div>
              </article>
            );
          })}
        </div>

        <div className="cb-strip mt-3 sm:grid-cols-2">
          <div
            style={{ "--cb-accent": ACCENT.cyan }}
            className="cb-cell cb-tone cb-tone--tl flex flex-col p-6 sm:p-7"
          >
            <p className="cb-eyebrow text-[var(--cb-accent)]">From</p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-none text-bone">
              {usd(oversight.from)}
              <span className="text-base text-slate"> / {oversight.per}</span>
            </p>
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl leading-snug text-bone">
              {oversight.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">{oversight.body}</p>
          </div>

          {/* The free hour, where paid scoping used to be: how a price gets
              found when nobody can name the job yet. */}
          <div
            style={{ "--cb-accent": ACCENT.coral }}
            className="cb-cell cb-tone cb-tone--br flex flex-col p-6 sm:p-7"
          >
            <p className="cb-eyebrow text-[var(--cb-accent)]">Free</p>
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl leading-snug text-bone">
              {walkthrough.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate">{walkthrough.body}</p>
            <div className="cb-footrule mt-auto pt-6">
              <a href={call.href} className="cb-btn cb-btn--ghost">
                Book the hour
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading eyebrow="In plain terms" title="What it is, and what it is not">
          A worker with a job description, allowed to act inside tools you
          already use, monitored, with a stop rule and a human.
        </SectionHeading>
        {/* Two cells per row, both screened from the row's corner: the pair
            reads as one line of the table. */}
        <div className="cb-strip mt-9 sm:grid-cols-2">
          {isNot.map((row, i) => (
            <Fragment key={row.is}>
              <div style={{ "--cb-accent": ACCENT.cyan }} className={`cb-cell cb-tone ${cellTone(i).tone} p-6`}>
                <p className="cb-eyebrow text-[var(--cb-accent)]">It is</p>
                <p className="mt-3 leading-relaxed text-bone">{row.is}</p>
              </div>
              <div style={{ "--cb-accent": ACCENT.coral }} className={`cb-cell cb-tone ${cellTone(i).tone} p-6`}>
                <p className="cb-eyebrow text-[var(--cb-accent)]">It is not</p>
                <p className="mt-3 leading-relaxed text-slate">{row.not}</p>
              </div>
            </Fragment>
          ))}
        </div>
        <p className="mt-7 text-sm leading-relaxed text-slate">
          Not sure your task fits?{" "}
          <Link href={routes.about} className="cb-link">
            Read who we are and what we will not take <span aria-hidden>→</span>
          </Link>
        </p>
      </section>

      <CtaPanel {...close} accent={ACCENT.cyan} />
    </PageLayout>
  );
}

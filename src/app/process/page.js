import Link from "next/link";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import ProcessSteps from "../components/ProcessSteps";
import GuaranteeStrip from "../components/GuaranteeStrip";
import CTASection from "../components/CTASection";
import { BracketTick } from "../components/BracketMark";
import { differentiators, comparison } from "@/data/differentiators";

export const metadata = {
  title: "Process & Guarantees",
  description:
    "How Closing Brackets works: a transparent four-step process — Discover, Design & build, Launch, Grow — backed by six guarantees you can hold us to.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="How we work — and what you can hold us to"
        subtitle="A calm, transparent path from first call to a product that keeps paying off. Four stages, always visible, never a black box."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ]}
      />

      {/* The four steps, expanded */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <ProcessSteps />
        </div>
      </section>

      {/* Differentiators */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="void-grid absolute inset-0" aria-hidden />
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="What sets us apart"
            title="Boutique focus, senior execution"
            lead="We keep the team small on purpose. It means the people who sell the work are the people who build it."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 80} className="h-full">
                <div className="card h-full p-8">
                  <h3 className="font-display text-lg font-semibold text-ink-hi">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-sm">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="Our guarantees"
            title="What you can hold us to"
          />
          <GuaranteeStrip />
        </div>
      </section>

      {/* Comparison */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="void-grid absolute inset-0" aria-hidden />
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="How we compare"
            title="Boutique vs. big agency vs. freelancer"
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {comparison.map((col, i) => (
              <Reveal key={col.label} delay={i * 80} className="h-full">
                <div
                  className={`card h-full p-8 ${
                    col.highlight ? "!border-violet shadow-glow-violet" : ""
                  }`}
                >
                  <h3
                    className={`font-display text-xl font-semibold ${
                      col.highlight ? "text-violet" : "text-ink-hi"
                    }`}
                  >
                    {col.label}
                  </h3>
                  <ul className="mt-6 flex flex-col gap-3">
                    {col.rows.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm">
                        {col.highlight ? (
                          <BracketTick className="mt-0.5" />
                        ) : (
                          <span className="mt-0.5 text-ink-low" aria-hidden>
                            ·
                          </span>
                        )}
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 text-center">
            <Link
              href="/services"
              className="text-sm font-semibold text-violet hover:underline underline-offset-4"
            >
              See services & engagement models →
            </Link>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}

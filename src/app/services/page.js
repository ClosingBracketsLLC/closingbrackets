import Link from "next/link";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import EngagementCards from "../components/EngagementCards";
import CTASection from "../components/CTASection";
import { BracketTick } from "../components/BracketMark";
import { services } from "@/data/site";

export const metadata = {
  title: "Services",
  description:
    "Custom software, digital marketing, and AI automation from one senior team — plus three engagement models. Every project starts with a free strategy call and a fixed-scope proposal.",
  alternates: { canonical: "/services" },
};

const integrated = [
  {
    title: "One team, one throughline",
    body: "The people who design your product also market it and automate it. No hand-offs, no lost context, no finger-pointing between vendors.",
  },
  {
    title: "Senior from day one",
    body: "You work directly with the people writing the code and shaping the strategy — not a junior pool behind an account manager.",
  },
  {
    title: "AI woven in, not bolted on",
    body: "We build with AI in the loop, so software, growth, and automation reinforce each other instead of living in separate silos.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Software, growth & AI — one senior team"
        subtitle="Three tightly integrated pillars that take you from first idea to a product that ships fast, ranks, and keeps converting."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      {/* Pillar cards */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <div className="flex flex-col gap-6">
            {services.map((s, i) => (
              <Reveal key={s.slug}>
                <div className="card flex flex-col gap-8 p-8 md:p-12 lg:flex-row lg:items-center">
                  <div className="flex-1">
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
                      <BracketTick />
                      0{i + 1}
                    </p>
                    <h2 className="font-display text-3xl font-semibold tracking-display text-ink-hi md:text-4xl">
                      {s.name}
                    </h2>
                    <p className="mt-3 text-lg font-medium text-ink-hi">
                      {s.tagline}
                    </p>
                    <p className="mt-3 max-w-xl text-base">{s.summary}</p>
                    <Link
                      href={`/services/${s.slug}`}
                      className="btn-ghost mt-7"
                    >
                      Explore {s.name}
                    </Link>
                  </div>
                  <div className="flex-1">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
                      What&apos;s included
                    </p>
                    <ul className="flex flex-col gap-3.5">
                      {s.offerings.map((o) => (
                        <li key={o} className="flex items-start gap-3 text-base">
                          <BracketTick className="mt-0.5" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why one integrated team */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="void-grid absolute inset-0" aria-hidden />
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="Why one team"
            title="Why it works better together"
            lead="Most agencies do one of these things. We do all three under one roof — so the strategy, the build, and the automation actually fit."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {integrated.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="card h-full p-8">
                  <h3 className="font-display text-xl font-semibold text-ink-hi">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="Engagement models"
            title="Three ways to work with us"
            lead="No fine print, no surprise invoices — every engagement starts with a free discovery call and a clear plan."
          />
          <EngagementCards />
        </div>
      </section>

      <CTASection />
    </>
  );
}

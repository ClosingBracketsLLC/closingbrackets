import Link from "next/link";
import HeroVisual from "./components/HeroVisual";
import AgentTeamSection from "./components/AgentTeamSection";
import SectionHeading from "./components/SectionHeading";
import Reveal from "./components/Reveal";
import ShowcaseCard from "./components/ShowcaseCard";
import FounderCard from "./components/FounderCard";
import ProofBar from "./components/ProofBar";
import ProcessSteps from "./components/ProcessSteps";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import JsonLd, { faqSchema } from "./components/JsonLd";
import { BracePair } from "./components/BracketMark";
import { services } from "@/data/site";
import { showcases } from "@/data/showcases";
import { faqs } from "@/data/faqs";

export const metadata = {
  title:
    "Closing Brackets — Web Agency in Spokane, WA · Software, Marketing & AI",
  description:
    "Closing Brackets is a Spokane web agency building websites, custom software, growth marketing, and AI automation that pay for themselves. Fixed-scope pricing, you own the code.",
  alternates: { canonical: "/" },
};

const arrow = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Home() {
  return (
    <>
      {/* 1 · Hero — answers what / for whom / do what in the first fold */}
      <section className="relative overflow-hidden">
        <HeroVisual />
        <div className="container relative z-10 pb-24 pt-24 text-center md:pb-32 md:pt-36">
          <p className="mb-5 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
            <BracePair>Consulting · Software · Marketing · AI</BracePair>
          </p>
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold tracking-display text-ink-hi sm:text-5xl md:text-7xl">
            Websites, software &{" "}
            <span className="gd-title">AI that pay for themselves.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base md:text-xl">
            One senior team that designs it, builds it, markets it, and
            automates it — so your next project actually grows the business.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-signal">
              Book a free strategy call
            </Link>
            <Link href="/work" className="btn-ghost">
              See what we build {arrow}
            </Link>
          </div>
          <p className="mt-6 text-xs font-medium text-ink-low">
            Fixed-scope pricing · You own the code · Reply in 1 business day
          </p>
        </div>
      </section>

      {/* 2 · Three pillars */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title="Three disciplines, one throughline"
            lead="Most agencies do one of these. We do all three under one roof, so the strategy, the build, and the automation actually fit together."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="card group flex h-full flex-col p-8 transition-colors duration-200 hover:!border-violet"
                >
                  <span className="font-display text-sm font-bold text-violet">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-display text-ink-hi md:text-2xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-ink-hi">
                    {s.tagline}
                  </p>
                  <p className="mt-3 text-sm">{s.summary}</p>
                  <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-violet">
                    Explore {arrow}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Trust fold — real founder + verifiable proof, no fake testimonials */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="void-grid absolute inset-0" aria-hidden />
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="Who you're hiring"
            title="Talk to the engineer, not an account manager"
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal className="h-full">
              <FounderCard />
            </Reveal>
            <Reveal delay={100} className="h-full">
              <ProofBar />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 · The agent swarm — how we deliver better and faster */}
      <AgentTeamSection />

      {/* 5 · Capability showcases — honest by design */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <SectionHeading
            eyebrow="Proof of craft"
            title="No fake case studies here"
            lead="These are demo builds and living proof — judge the craft, then let's make yours the first real one on this page."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {showcases.slice(0, 3).map((sc, i) => (
              <Reveal key={sc.slug} delay={i * 80} className="h-full">
                <ShowcaseCard showcase={sc} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/work"
              className="text-sm font-semibold text-violet hover:underline underline-offset-4"
            >
              See all demo builds →
            </Link>
          </div>
        </div>
      </section>

      {/* 6 · Process */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="void-grid absolute inset-0" aria-hidden />
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="How it works"
            title="Four steps, zero black boxes"
            lead="Fixed scope, visible milestones, and a hand-off where you own everything."
          />
          <ProcessSteps compact />
          <div className="mt-12 text-center">
            <Link
              href="/process"
              className="text-sm font-semibold text-violet hover:underline underline-offset-4"
            >
              See the full process & guarantees →
            </Link>
          </div>
        </div>
      </section>

      {/* 7 · FAQ */}
      <FAQSection />
      <JsonLd data={faqSchema(faqs)} />

      {/* 8 · Closing CTA — the only pre-footer band */}
      <CTASection />
    </>
  );
}

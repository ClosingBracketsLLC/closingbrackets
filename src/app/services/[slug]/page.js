import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import AgentTeamSection from "../../components/AgentTeamSection";
import SectionHeading from "../../components/SectionHeading";
import Reveal from "../../components/Reveal";
import FAQSection from "../../components/FAQSection";
import CTASection from "../../components/CTASection";
import JsonLd, { serviceSchema, faqSchema } from "../../components/JsonLd";
import { BracketTick } from "../../components/BracketMark";
import { processSteps } from "@/data/process";
import { services } from "@/data/site";
import { faqs } from "@/data/faqs";

// Page-relevant FAQ subsets (indexes into data/faqs.js).
const faqIndexesBySlug = {
  "custom-software": [1, 2, 5],
  "digital-marketing": [2, 4, 5],
  "ai-automation": [3, 2, 5],
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const pageFaqs = (faqIndexesBySlug[service.slug] || [])
    .map((i) => faqs[i])
    .filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.seo.h1}
        subtitle={service.tagline}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      />
      <JsonLd data={serviceSchema(service)} />

      {/* Intro + offerings */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-display text-ink-hi md:text-4xl">
                {service.summary}
              </h2>
              <p className="mt-6 text-base md:text-lg">{service.seo.intro}</p>
              <Link href="/contact" className="btn-signal mt-8">
                Book a free strategy call
              </Link>
            </div>
            <Reveal>
              <div className="card p-8">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
                  What&apos;s included
                </p>
                <ul className="flex flex-col gap-4">
                  {service.offerings.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-base">
                      <BracketTick className="mt-0.5" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AI pillar: the agent-team offering in depth */}
      {service.slug === "ai-automation" ? (
        <AgentTeamSection withCta={false} />
      ) : null}

      {/* What shipping looks like */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="void-grid absolute inset-0" aria-hidden />
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="How it ships"
            title="From first call to launched"
            lead="The same transparent four-step process, whatever we're building."
          />
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <li key={step.n}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="card h-full p-6">
                    <span className="font-display text-sm font-bold text-violet">
                      {step.n}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-semibold text-ink-hi">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs font-semibold text-ink-low">
                      {step.timeframe}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
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

      {/* Relevant FAQ subset */}
      {pageFaqs.length ? (
        <>
          <FAQSection items={pageFaqs} title="Common questions" />
          <JsonLd data={faqSchema(pageFaqs)} />
        </>
      ) : null}

      <CTASection
        title={`Let's talk about ${service.name.toLowerCase()}.`}
        lead="Tell us where your business is stuck or what you want to build. You'll get an honest read on scope, cost, and whether it's worth doing."
      />
    </>
  );
}

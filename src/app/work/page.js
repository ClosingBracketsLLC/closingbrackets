import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import ShowcaseCard from "../components/ShowcaseCard";
import CTASection from "../components/CTASection";
import { showcases } from "@/data/showcases";

export const metadata = {
  title: "Work",
  description:
    "Capability demos from Closing Brackets — a SaaS dashboard, an AI support agent, a headless storefront, and this site itself. Honest showcases, no fake case studies.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="What we build, shown honestly"
        subtitle="We're a young agency, so here's the deal: no invented clients, no stock-photo case studies. These are demo builds and living proof — judge the craft."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]}
      />

      <section className="relative py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {showcases.map((sc, i) => (
              <Reveal key={sc.slug} delay={(i % 2) * 80} className="h-full">
                <ShowcaseCard showcase={sc} expanded headingLevel="h2" />
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-14 max-w-xl text-center text-sm text-ink-low">
            Every card above is labeled for what it is. When client work ships,
            it replaces these — with real names, real numbers, and the client&apos;s
            sign-off.
          </p>
        </div>
      </section>

      <CTASection
        title="Want yours to be the first real one here?"
        lead="Early clients get outsized attention — your project becomes the case study we build our reputation on."
      />
    </>
  );
}

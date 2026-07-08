import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import CTASection from "../components/CTASection";
import BracketMark from "../components/BracketMark";
import { site } from "@/data/site";

export const metadata = {
  title: "About",
  description:
    "Closing Brackets is a boutique, AI-native web agency in Spokane, WA, founded by Robert Collins. We finish what other teams leave open — software, marketing, and AI that actually ships.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Finish the work",
    body: "Half-built projects and open loops are the norm in this industry. We close them — shipped, documented, and handed over.",
  },
  {
    title: "Senior, not staffed-out",
    body: "No junior pool, no offshore hand-offs. The people you talk to are the people building your product.",
  },
  {
    title: "AI as leverage",
    body: "We use AI to move faster and do more with a lean team — so you get agency-grade output without the agency overhead.",
  },
  {
    title: "Outcomes over output",
    body: "Pretty pixels are table stakes. We measure ourselves on revenue, rankings, and the work AI quietly takes off your plate.",
  },
];

const model = [
  {
    title: "Lean & senior",
    body: "A small team of experienced operators. The person scoping your project is the person building it — you never get passed down to a junior bench.",
  },
  {
    title: "Augmented by AI",
    body: "We use AI as leverage across design, code, content, and research — so a boutique team ships at the scale of a much larger agency.",
  },
  {
    title: "Specialists on tap",
    body: "Around the core, a trusted network of senior specialists plugs in per project — the right depth without a bloated headcount.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We close the brackets others leave open"
        subtitle="A boutique, AI-native agency built on a simple idea: finish the work, ship it well, and make it pay off."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* Origin / mission */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                eyebrow="The mission"
                title="Named after the thing that finishes the job"
              />
              <p className="-mt-8 text-base">
                In code, an unclosed bracket breaks everything. The whole
                program refuses to run until someone goes back and closes it.
                That&apos;s most digital work we see: sites half-launched,
                campaigns half-measured, AI projects stuck in a slide deck.
              </p>
              <p className="mt-4 text-base">
                Closing Brackets exists to close those loops. We design, build,
                market, and automate — then we ship it, document it, and hand
                you something that actually works. No open ends.
              </p>
            </div>
            <Reveal>
              <div className="card flex items-center justify-center p-16">
                <BracketMark size={160} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="void-grid absolute inset-0" aria-hidden />
        <div className="container relative z-10">
          <div className="card mx-auto max-w-3xl p-8 md:p-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
              A note from the founder
            </p>
            <blockquote className="text-lg text-ink-hi md:text-xl">
              &quot;I started Closing Brackets because I was tired of watching
              good businesses get handed half-finished work. My promise is
              simple: you get a senior partner who ships, tells you the truth
              about scope and cost, and leaves you owning clean code and real
              results — not a dependency on us.&quot;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet/40 bg-void-2 font-display text-base font-bold text-violet"
              >
                RC
              </span>
              <div>
                <p className="font-display font-semibold text-ink-hi">
                  {site.founder}
                </p>
                <p className="text-sm text-ink-low">
                  Founder, {site.name} · {site.locality}, {site.region}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`mailto:${site.email}`} className="btn-signal">
                Email {site.founder.split(" ")[0]}
              </a>
              <a href={`tel:${site.phone}`} className="btn-ghost">
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <SectionHeading eyebrow="Values" title="What we optimize for" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 80} className="h-full">
                <div className="card h-full p-8">
                  <h3 className="font-display text-xl font-semibold text-ink-hi">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-base">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The model — honest team framing */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="void-grid absolute inset-0" aria-hidden />
        <div className="container relative z-10">
          <SectionHeading
            eyebrow="The model"
            title="How a small team ships big work"
            lead="Big-agency capability without the overhead, the hand-offs, or the junior bench."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {model.map((m, i) => (
              <Reveal key={m.title} delay={i * 80} className="h-full">
                <div className="card h-full p-8">
                  <h3 className="font-display text-xl font-semibold text-ink-hi">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-base">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

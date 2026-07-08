import PageHero from "../components/PageHero";
import ContactForm from "../components/ContactForm";
import FAQSection from "../components/FAQSection";
import JsonLd, { faqSchema } from "../components/JsonLd";
import { site } from "@/data/site";
import { faqs } from "@/data/faqs";

export const metadata = {
  title: "Contact",
  description:
    "Start a project with Closing Brackets. Tell us what you're building or growing and get a reply from the engineer — not a sales team — within one business day.",
  alternates: { canonical: "/contact" },
};

// Cost & timeline questions — the ones people arrive here asking.
const contactFaqs = [faqs[2], faqs[1], faqs[5]].filter(Boolean);

const nextSteps = [
  {
    n: "01",
    title: "We read it — personally",
    body: "Your message lands with the founder, not a queue. You'll hear back within one business day.",
  },
  {
    n: "02",
    title: "Free strategy call",
    body: "30 minutes on your goals and constraints. If we're not the right fit, we'll say so and point you somewhere better.",
  },
  {
    n: "03",
    title: "Fixed-scope proposal",
    body: "A clear plan with scope, timeline, and price. No open-ended hourly meters, no surprise invoices.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you're building"
        subtitle="A sentence or two is plenty. You'll get a reply from the person who'd actually build it — within one business day."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      <section className="relative py-16 lg:py-24">
        <div className="container">
          <div className="grid items-start gap-10 lg:grid-cols-5">
            {/* Form */}
            <div className="card p-6 md:p-10 lg:col-span-3">
              <ContactForm variant="full" formName="Contact page" />
            </div>

            {/* Direct contact + what happens next */}
            <div className="flex flex-col gap-8 lg:col-span-2">
              <div className="card p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
                  Prefer direct?
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={`tel:${site.phone}`}
                    className="font-display text-xl font-semibold text-ink-hi hover:text-violet"
                  >
                    {site.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm font-semibold text-violet hover:underline underline-offset-4"
                  >
                    {site.email}
                  </a>
                  <p className="text-sm text-ink-low">
                    {site.locality}, {site.region} · Serving clients across the
                    US
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-low">
                  What happens next
                </p>
                <ol className="flex flex-col gap-4">
                  {nextSteps.map((s) => (
                    <li key={s.n} className="flex gap-4">
                      <span className="font-display text-sm font-bold text-violet">
                        {s.n}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-hi">
                          {s.title}
                        </p>
                        <p className="mt-1 text-sm">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={contactFaqs} title="Before you ask" />
      <JsonLd data={faqSchema(contactFaqs)} />
    </>
  );
}

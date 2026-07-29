import PageLayout from "../components/PageLayout";
import ContactForm from "../components/ContactForm";
import { Numeral, SectionHeading } from "../components/primitives";
import {
  SITE_URL,
  author,
  breadcrumbLd,
  faqLd,
  graphLd,
  pageOg,
  url,
} from "@/data/site";
import { faqs } from "@/data/services";

const TITLE = "Contact";
const PATH = "/contact/";

export const metadata = {
  title: "Contact — Get a Fixed-Scope Plan",
  description:
    "Tell Closing Brackets what you want built. Robert reads every enquiry himself and replies within one business day with a fixed scope, real dates, and one price.",
  alternates: { canonical: url(PATH) },
  /* Built with pageOg, never by hand — this page had no openGraph at all, so
     it was the one conversion page whose shares carried the site's generic
     card copy instead of its own. */
  openGraph: pageOg({
    title: "Contact Closing Brackets — get a fixed-scope plan",
    description:
      "Describe the project. What comes back is what gets built, a timeline with real dates, and one fixed price. One business day, no charge for the first answer.",
    path: PATH,
  }),
};

/*
 * What happens after the send button, in the order it happens.
 *
 * The page used to be the form and nothing else, which made the site's highest-
 * intent page its least designed one: a blank textarea, no indication of what
 * writing in it costs you, and no answer to the two questions everyone has at a
 * form — who reads this, and what comes back. Every line below is a commitment
 * already made in the copy elsewhere on the site; collecting them here is what
 * makes the form worth filling in rather than merely fillable.
 */
const NEXT = [
  {
    title: "A person reads it",
    /* Named, not "a person". The promise is identical either way; only one of
       them is a commitment somebody can be held to, and an anonymous "we read
       every enquiry ourselves" is what every agency contact page says. */
    body: `${author.line} Not a queue and not a bot — the same people who would do the work read the enquiry, which is why the first reply is useful rather than a request to book a call.`,
    accent: "#ff4e64",
  },
  {
    title: "One business day",
    body: "You get an answer inside a business day, even when the answer is that this is not work we are right for. Nothing sits in a pipeline waiting for a follow-up sequence.",
    accent: "#2ef2dc",
  },
  {
    title: "A fixed-scope plan",
    body: "What gets built, a timeline with real dates, and one price for exactly that scope. No hourly billing, and no number that moves once work starts.",
    accent: "#ff4e64",
  },
];

/*
 * Structured data. One graph, three nodes: where the page sits, what kind of
 * page it is, and the questions it answers.
 *
 * The FAQ node is worth the most of the three. It is the only markup on the
 * site eligible for a rich result AND the format answer engines extract from
 * most readily — a buying objection with a direct answer under it is exactly
 * the passage shape they quote. It only stays valid because every answer is
 * rendered visibly further down, in the same words.
 */
const jsonLd = graphLd(
  breadcrumbLd(TITLE, PATH),
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}${PATH}#contact`,
    url: url(PATH),
    name: "Contact Closing Brackets",
    description:
      "Describe a project and get back a fixed scope, a timeline with real dates, and one price. Replies within one business day.",
    mainEntity: { "@id": `${SITE_URL}/#organization` },
  },
  faqLd(faqs),
);

export default function Contact() {
  return (
    <PageLayout
      eyebrow={TITLE}
      title="Tell us what you want to build"
      intro="Describe your project in the form below. We read every enquiry ourselves and reply within one business day. What you get back is a fixed-scope plan: what we will build, a timeline with real dates, and one fixed price. No hourly billing."
      /* Coral, unlike the rest of the site. This is the page the whole site
         points at, and coral is what it points with — the header CTA, every
         closing panel's button. Landing here on cyan made the conversion page
         the one place the conversion colour was absent. */
      accent="#ff4e64"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mt-12">
        <ContactForm />
      </div>

      {/* Below the form, not beside it: the form is the action, and anything
          set alongside it competes for the same attention at the same moment.
          Here it answers the question people have immediately after sending. */}
      <section className="mt-20">
        <SectionHeading eyebrow="After you send" title="What happens next">
          Three steps, and you can hold us to all of them.
        </SectionHeading>
        <ol className="cb-strip mt-9 sm:grid-cols-3">
          {NEXT.map((step, i) => (
            <li
              key={step.title}
              style={{ "--cb-accent": step.accent }}
              className={`cb-cell cb-tone ${
                i % 2 ? "cb-tone--bl" : "cb-tone--tr"
              } p-6 sm:p-7`}
            >
              <Numeral value={i + 1} className="text-4xl" />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl leading-snug text-bone">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The objections, answered before anyone has to raise them.

          These lived on /services/ and were removed from it on purpose: that
          page is the five-line pitch, and a FAQ appendix was pulling it back
          toward being a document. They belong here instead. Every question
          below is one somebody asks at exactly this moment — looking at an
          empty textarea, deciding whether describing their business to a
          stranger is worth the twenty minutes — and an unanswered objection at
          the form is the cheapest conversion loss on the site.

          Rendered in full rather than behind disclosure toggles: these answers
          are the FAQPage structured data above, and hidden text that does not
          match what a visitor reads loses the rich result entirely.

          No balloon, burst or narration box here — the page already spends its
          one loud device on the email escape hatch below. */}
      <section className="mt-20">
        <SectionHeading eyebrow="Before you write" title="Questions people ask first">
          The things worth knowing before you spend twenty minutes describing
          your business to strangers.
        </SectionHeading>
        <div className="cb-strip mt-9 lg:grid-cols-2">
          {faqs.map((item, i) => (
            <div
              key={item.q}
              style={{ "--cb-accent": i % 2 ? "#2ef2dc" : "#ff4e64" }}
              className={`cb-cell cb-tone ${
                i % 2 ? "cb-tone--bl" : "cb-tone--tr"
              } p-7 sm:p-8`}
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg leading-snug text-bone">
                {item.q}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The way out for people who will not fill in a form — a real one, given
          the same weight as the form rather than buried in the footer. The
          page's one speech balloon lands on it, because this is the line the
          page would actually say out loud. */}
      <section
        style={{ "--cb-accent": "#2ef2dc" }}
        className="mt-20"
      >
        <p className="cb-balloon max-w-2xl p-7 text-lg leading-relaxed text-bone">
          Would rather just email? Write to{" "}
          <a
            href="mailto:admin@closingbrackets.com"
            className="text-cyan underline decoration-cyan/40 underline-offset-4 transition hover:decoration-cyan"
          >
            admin@closingbrackets.com
          </a>{" "}
          and say what you are trying to build. It reaches {author.name} directly
          and gets the same answer in the same day.
        </p>
      </section>
    </PageLayout>
  );
}
